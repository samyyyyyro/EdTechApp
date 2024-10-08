// import { toast } from "react-hot-toast"

// // import rzpLogo from "../../assets/Logo/rzp_logo.png"
// import { resetCart } from "../../slices/cartSlice"
// import { setPaymentLoading } from "../../slices/courseSlice"
// import { apiConnector } from "../apiConnector"
// import { studentEndpoints } from "../apis"

// const {
//   COURSE_PAYMENT_API,
//   COURSE_VERIFY_API,
//   SEND_PAYMENT_SUCCESS_EMAIL_API,
// } = studentEndpoints

// // Load the Razorpay SDK from the CDN
// function loadScript(src) {
//   return new Promise((resolve) => {
//     const script = document.createElement("script")
//     script.src = src
//     script.onload = () => {
//       resolve(true)
//     }
//     script.onerror = () => {
//       resolve(false)
//     }
//     document.body.appendChild(script)
//   })
// }

// // Buy the Course
// export async function BuyCourse(
//   token,
//   courses,
//   user_details,
//   navigate,
//   dispatch
// ) {
//   const toastId = toast.loading("Loading...")
//   console.log(courses)
//   try {
//     // Loading the script of Razorpay SDK
//     // const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
//     console.log("2")
//     // if (!res) {
//     //   toast.error(
//     //     "Razorpay SDK failed to load. Check your Internet Connection."
//     //   )
//     //   return
//     // }
//     console.log("3")
//     // Initiating the Order in Backend
//     const orderResponse = await apiConnector(
//       "POST",
//       COURSE_PAYMENT_API,
//       {
//         courses,
//       },
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     )
//     console.log('4')
//     if (!orderResponse.data.success) {
//       throw new Error(orderResponse.data.message)
//     }
//     console.log("PAYMENT RESPONSE FROM BACKEND............", orderResponse.data)

//     // sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)
//     // verifyPayment({ ...response, courses }, token, navigate, dispatch)


//     // Opening the Razorpay SDK

//     // const options = {
//     //   key: process.env.RAZORPAY_KEY,
//     //   currency: orderResponse.data.data.currency,
//     //   amount: `${orderResponse.data.data.amount}`,
//     //   order_id: orderResponse.data.data.id,
//     //   name: "StudyNotion",
//     //   description: "Thank you for Purchasing the Course.",
//     //   image: rzpLogo,
//     //   prefill: {
//     //     name: `${user_details.firstName} ${user_details.lastName}`,
//     //     email: user_details.email,
//     //   },
//     //   handler: function (response) {
//     //     sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)
//     //     console.log("payment done successfully")
//     //     verifyPayment({ ...response, courses }, token, navigate, dispatch)
//     //   },
//     // }
//     // console.log("yaha")
//     // const paymentObject = new window.Razorpay(options)
//     // console.log("sui")

//     // paymentObject.open()
//     // paymentObject.on("payment.failed", function (response) {
//     //   toast.error("Oops! Payment Failed.")
//     //   console.log(response.error)
//     // })

    
    
//     verified(courses , token, navigate, dispatch)
//     console.log("payment done successfully", courses)
//     email(orderResponse.data.amount, token)

//   } catch (error) {
//     console.log("PAYMENT API ERROR............", error)
//     toast.error("Could Not make Payment.")
//   }
//   toast.dismiss(toastId)
// }

// // Verify the Payment
// // async function verifyPayment(bodyData, token, navigate, dispatch) {
// //   const toastId = toast.loading("Verifying Payment...")
// //   dispatch(setPaymentLoading(true))
// //   try {
// //     const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
// //       Authorization: `Bearer ${token}`,
// //     })

// //     console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)

// //     if (!response.data.success) {
// //       throw new Error(response.data.message)
// //     }

// //     toast.success("Payment Successful. You are Added to the course ")
// //     navigate("/dashboard/enrolled-courses")
// //     dispatch(resetCart())
// //   } catch (error) {
// //     console.log("PAYMENT VERIFY ERROR............", error)
// //     toast.error("Could Not Verify Payment.")
// //   }
// //   toast.dismiss(toastId)
// //   dispatch(setPaymentLoading(false))
// // }


// async function verified(courses, token, navigate, dispatch) {
//   const toastId = toast.loading("Verifying Payment...")
//   dispatch(setPaymentLoading(true))
//   try {
//     const response = await apiConnector("POST", COURSE_VERIFY_API, courses, {
//       Authorization: `Bearer ${token}`,
//     })

//     console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)

//     if (!response.data.success) {
//       throw new Error(response.data.message)
//     }

//     toast.success("Payment Successful. You are Added to the course ")
//     navigate("/dashboard/enrolled-courses")
//     dispatch(resetCart())
//   } catch (error) {
//     console.log("PAYMENT VERIFY ERROR............", error)
//     toast.error("Could Not Verify Payment.")
//   }
//   toast.dismiss(toastId)
//   dispatch(setPaymentLoading(false))
// }



// // Send the Payment Success Email
// // async function sendPaymentSuccessEmail(response, amount, token) {
// //   try {
// //     await apiConnector(
// //       "POST",
// //       SEND_PAYMENT_SUCCESS_EMAIL_API,
// //       {
// //         orderId: response.razorpay_order_id,
// //         paymentId: response.razorpay_payment_id,
// //         amount,
// //       },
// //       {
// //         Authorization: `Bearer ${token}`,
// //       }
// //     )
// //   } catch (error) {
// //     console.log("PAYMENT SUCCESS EMAIL ERROR............", error)
// //   }
// // }

// async function email( amount, token) {
//   try {
//     console.log("email part started")
//     console.log(amount, token)
//     await apiConnector(
//       "POST",
//       SEND_PAYMENT_SUCCESS_EMAIL_API,
//       {
//         // orderId: response.razorpay_order_id,
//         // paymentId: response.razorpay_payment_id,
//         amount,
//       },
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     )
//     console.log("finished")
//   } catch (error) {
//     console.log("PAYMENT SUCCESS EMAIL ERROR............", error)
//   }
// }



import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";


const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}


export async function BuyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try{
        //load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        //initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
                                {courses},
                                {
                                    Authorization: `Bearer ${token}`,
                                })

        if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
        console.log("PRINTING orderResponse", orderResponse);
        // console.log(orderResponse.data.message.currency);
        console.log("1")
        //options
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"StudyNotion",
            description: "Thank You for Purchasing the Course",
            image:rzpLogo,
            prefill: {
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler: function(response) {
                //send successful wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount,token );
                //verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }
        //miss hogya tha 
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })

    }
    catch(error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{
        const response  = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization:`Bearer ${token}`,
        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, ypou are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}