// Import the required modules
const express = require("express")
const router = express.Router()
const {
  capturePayment,
  // verifySignature,
  verified,
  email,
} = require("../controllers/payments")
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verified", auth, isStudent, verified)
router.post(
  "/email",
  auth,
  isStudent,
  email
)
// router.post("/verifySignature", verifySignature)

module.exports = router
