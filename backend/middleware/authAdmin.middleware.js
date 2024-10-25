import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res
        .status(400)
        .json({ success: false, message: "Not Authorized please login again" });
    }
    const decodeToken = jwt.verify(atoken, process.env.JWT_SECRET);
    if (decodeToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res
        .status(400)
        .json({ success: false, message: "Not Authorized please login again" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export default authAdmin;
