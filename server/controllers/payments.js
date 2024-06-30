const { instance } = require("../config/razorpay")
const Course = require("../models/Course")
const crypto = require("crypto")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const CourseProgress = require("../models/CourseProgress")

// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  
  const { courses } = req.body
  const userId = req.user.id
  if (courses.length === 0) {
    return res.json({ success: false, message: "Please Provide Course ID" })
  }

  console.log("courses", courses)

  let total_amount = 0

  for (const course_id of courses) {
    let course
    try {
      // Find the course by its ID
      course = await Course.findById(course_id)

      // If the course is not found, return an error
      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" })
      }

      // Check if the user is already enrolled in the course
      const uid = new mongoose.Types.ObjectId(userId)
      if (course.studentsEnroled.includes(uid)) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" })
      }

      // Add the price of the course to the total amount
      total_amount += course.price

      console.log(total_amount)

    } catch (error) {
      console.log(error)
      console.log("error1")
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  // const options = {
  //   amount: total_amount * 100,
  //   currency: "INR",
  //   receipt: Math.random(Date.now()).toString(),
  // }

  // await enrollStudents(courses, userId, res)
  return res.status(200).json({ success: true, message: "Payment Initiated", amount : total_amount })

  // try {
  //   // Initiate the payment using Razorpay
  //   console.log("sui")
  //   const paymentResponse = await instance.orders.create(options)
  //   console.log(paymentResponse)
  //   res.json({
  //     success: true,
  //     data: paymentResponse,
  //   })
  // } catch (error) {
  //   console.log(error)
  //   console.log("2")
  //   res
  //     .status(500)
  //     .json({ success: false, message: "Could not initiate order." })
  // }
}

// verify the payment
// exports.verifyPayment = async (req, res) => {
//   const razorpay_order_id = req.body?.razorpay_order_id
//   const razorpay_payment_id = req.body?.razorpay_payment_id
//   const razorpay_signature = req.body?.razorpay_signature
//   const courses = req.body?.courses

//   const userId = req.user.id

//   if (
//     !razorpay_order_id ||
//     !razorpay_payment_id ||
//     !razorpay_signature ||
//     !courses ||
//     !userId
//   ) {
//     return res.status(200).json({ success: false, message: "Payment Failed" })
//   }

//   let body = razorpay_order_id + "|" + razorpay_payment_id

//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_SECRET)
//     .update(body.toString())
//     .digest("hex")

//   if (expectedSignature === razorpay_signature) {
//     await enrollStudents(courses, userId, res)
//     return res.status(200).json({ success: true, message: "Payment Verified" })
//   }

//   return res.status(200).json({ success: false, message: "Payment Failed" })
// }


exports.verified = async (req, res) => {
  console.log(req.body)

  // if (!req.body || !userId) {
  //   return res.status(200).json({ success: false, message: "Payment Failed" })
  // }
  const userId = req.user.id
    await enrollStudents(req.body, userId, res)
    return res.status(200).json({ success: true, message: "Payment Verified" })
}

// exports.verified = async (req, res) => {
//   const courses = req.body;
//   const userId = req.user ? req.user.id : null;

//   // Validate the course ID
//   if (Array.isArray(courses) && courses.length > 0) {
//     let course;
//     try {
//       course = mongoose.Types.ObjectId(courses[0]);
//     } catch (error) {
//       return res.status(400).json({ success: false, message: "Invalid Course ID" });
//     }

//     if (!userId) {
//       return res.status(400).json({ success: false, message: "Missing User ID" });
//     }

//     try {
//       await enrollStudents(course, userId, res);
//       return res.status(200).json({ success: true, message: "Payment Verified" });
//     } catch (error) {
//       console.error("Error enrolling students:", error);
//       return res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
//   } else {
//     return res.status(400).json({ success: false, message: "Courses data is invalid or missing" });
//   }
// };



// Send Payment Success Email
// exports.sendPaymentSuccessEmail = async (req, res) => {
//   const { orderId, paymentId, amount } = req.body

//   const userId = req.user.id

//   if (!orderId || !paymentId || !amount || !userId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please provide all the details" })
//   }

//   try {
//     const enrolledStudent = await User.findById(userId)

//     await mailSender(
//       enrolledStudent.email,
//       `Payment Received`,
//       paymentSuccessEmail(
//         `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
//         amount / 100,
//         orderId,
//         paymentId
//       )
//     )
//   } catch (error) {
//     console.log("error in sending mail", error)
//     return res
//       .status(400)
//       .json({ success: false, message: "Could not send email" })
//   }
// }


exports.email = async (req, res) => {
  const { amount } = req.body

  const userId = req.user.id

  console.log(amount, userId)
  // if ( !amount || !userId) {
  //   return res
  //     .status(400)
  //     .json({ success: false, message: "Please provide all the details" })
  // }

  try {
    const enrolledStudent = await User.findById(userId)
    console.log(enrollStudents)
    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,  amount, 1, 1)
    )
    return res.status(200).json({
      success : true,
      message : "Email Sent Successfully"
    })
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}



// enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Course ID and User ID" })
  }

  for (const courseId of courses) {
    try {
      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnroled: userId } },
        { new: true }
      )

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" })
      }
      console.log("Updated course: ", enrolledCourse)

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      })
      // Find the student and add the course to their list of enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      )

      console.log("Enrolled student: ", enrolledStudent)
      // Send an email notification to the enrolled student
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      )

      console.log("Email sent successfully: ", emailResponse.response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }
}