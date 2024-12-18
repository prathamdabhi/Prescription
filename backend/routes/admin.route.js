import express from "express";
import {
  addDoctor,
  loginAdmin,
  getDoctorList,
  appointmentAdmin,
  appointmentCancel,
  adminDashboard,
} from "../controllers/admin.controller.js";
import { changeDoctorAvailability } from "../controllers/doctor.controller.js";
import upload from "../middleware/multer.middleware.js";
import authAdmin from "../middleware/authAdmin.middleware.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", authAdmin, getDoctorList);
adminRouter.post("/change-availability", authAdmin, changeDoctorAvailability);
adminRouter.get("/admin-appointments", authAdmin, appointmentAdmin);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);
adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;
