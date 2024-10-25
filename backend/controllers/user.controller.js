import validator from "validator";
import bcrypt from "bcrypt";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import Appointment from "../model/appointment.model.js";
import Doctor from "../model/doctor.model.js";
import randombytes from "randombytes";
import Payment from "../model/payment.model.js";
import randomBytes from "randombytes";
//API TO REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "please fill all fields" });
    }
    //verify email
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "please enter a valid email" });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    //validate password
    if (password.length < 8) {
      return res
        .status(400)
        .json({
          success: false,
          message: "password must be at least 8 characters",
        });
    }
    //create User
    const createUseer = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = await User(createUseer);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ success: true, user, token });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

//API FOR USER LOGIN
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "please fill all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(200).json({ success: true, token });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

//API USER DATA FOR PROFILE
const getProfileData = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await User.findById(userId).select("-password");
    res.status(200).json({ success: true, userData });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

//API FOR UPDATE USER DATA
const updateUserProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, gender, dob } = req.body;
    const imageFile = req.file;
    if (!name || !phone || !gender || !dob) {
      return res
        .status(400)
        .json({ success: false, message: "please fill all fields" });
    }

    const userData = await User.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      gender,
      dob,
    });
    if (imageFile) {
      const upoadImage = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = upoadImage.secure_url;
      await User.findByIdAndUpdate(userId, { image: imageUrl });
    }
        // Update the user's name in their appointments
        await Appointment.updateMany(
          { userId },
          { $set: { "userData.name": name } }
        );
    res
      .status(200)
      .json({ success: true, message: "user data updated successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};


//API FOR BOOK APPOINTMENT
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await Doctor.findById(docId).select("-password");
    if (!docData.available) {
      return res
        .status(400)
        .json({ success: false, message: "doctor not available" });
    }

    let slots_book = docData.slots_book;

    //check for slot avilability
    if (slots_book[slotDate]) {
      if (slots_book[slotDate].includes(slotTime)) {
        return res
          .status(400)
          .json({ success: false, message: "slot not available" });
      } else {
        slots_book[slotDate].push(slotTime);
      }
    } else {
      slots_book[slotDate] = [];
      slots_book[slotDate].push(slotTime);
    }

    const userData = await User.findById(userId);

    // delete docData.slots_book

    const appointmentData = {
      userId,
      docId,
      slotDate,
      slotTime,
      amount: docData.fees,
      doctorData: docData,
      userData,
      date: Date.now(),
    };

    const newAppointment = await Appointment(appointmentData);
    await newAppointment.save();

    // SAVE NEW SLOTS DATA IN DOCTOR DATA
    await Doctor.findByIdAndUpdate(docId, { slots_book });

    res
      .status(200)
      .json({ success: true, message: "appointment booked successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

//API FOR GET APPOINTMENT DATA
const getAppointmentData = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await Appointment.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

//API FOR CENCELL APPOINMENT
const cancellAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    const appointmentData = await Appointment.findById(appointmentId);

    //VERIFY APPOINTMENT USER
    if (appointmentData.userId !== userId) {
      return res.json({
        success: false,
        message: "you are not authorized to cancel this appointment",
      });
    }

    await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

    //RELEASING DOCTOR SLOT
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await Doctor.findById(docId);
    let slots_book = doctorData.slots_book;

    slots_book[slotDate] = slots_book[slotDate].filter((e) => e !== slotTime);

    await Doctor.findByIdAndUpdate(docId, { slots_book });

    res.json({ success: true, message: "Appointment Cencelled" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const changepaymentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await Appointment.findById(appointmentId);

    if (appointmentData.payment) {
      return res
        .status(400)
        .json({ success: false, message: "payment already done" });
    }

    const paymentData = await Appointment.findByIdAndUpdate(appointmentId, {
      payment: true,
    });

    return res
      .status(200)
      .json({ success: true, message: "payment done successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

//get amount
const getAmount = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await Appointment.findById(appointmentId);
    return res.status(200).json({ success: true, appointmentData });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

//API FOR DELERTING APPOINMENT
const deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await Appointment.findByIdAndDelete(appointmentId);
    return res
      .status(200)
      .json({ success: true, message: "appointment deleted successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// API FOR CREATE PAYMENT
const createPayment = async (req, res) => {
  try {
    const {
      cardHolderName,
      craditCardNumber,
      date,
      cvv,
      paymentStatus,
      appointmentId,
      amount,
    } = req.body;
    if (!cardHolderName || !craditCardNumber || !cvv) {
      return res
        .status(400)
        .json({ success: false, message: "please fill all fields" });
    }

    const transactionId = randomBytes(10).toString("hex");

    const appointmentData = await Appointment.findById(appointmentId);

    const paymentData = {
      cardHolderName,
      craditCardNumber,
      date,
      cvv,
      transactionId,
      amount,
      paymentStatus,
    };

    const newPayment = await Payment(paymentData);
    const payment = await newPayment.save();
    res.status(200).json({ success: true, payment });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  userLogin,
  getProfileData,
  updateUserProfile,
  bookAppointment,
  getAppointmentData,
  cancellAppointment,
  createPayment,
  getAmount,
  changepaymentStatus,
  deleteAppointment,
};
