// import jwt from "jsonwebtoken";


// const auth = (req, res, next) => {
//   const token = req.headers.authorization;



//   try {
//     // jwt.verify(token, process.env.JWT_SECRET);
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   console.log("Decoded token:", decoded);
//     next();
//   } catch (error) {
//     console.log("JWT Error:", error.message);
//     return res.json({
        
//       success: false,
//       message: "Invalid token",
//     });
//   }
// }

// export default auth;

// middleware/auth.js


import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({ success: false, message: "No token provided" });
  }

  // Format: "Bearer <token>"
  const token = authHeader.split(" ")[1];
  console.log("Extracted token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // user info attach kar do
    console.log("Decoded token:", decoded);
    next();
  } catch (error) {
    console.log("JWT Error:", error.message);
    return res.json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default auth;
