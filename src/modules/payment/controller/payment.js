import CourseModel from "../../../../DB/model/course.model.js";
import PaymentModel from "../../../../DB/model/payments.model.js";
import { asynchandlier } from "../../../services/erroeHandling.js";



// export const payment = asynchandlier(async (req, res,next) => {
    
//     const { studentId, courseId, paymentAmount } = req.body;
//     let payment = await PaymentModel.findOne({ studentId, courseId });
//     if (!payment) {
//         payment = new PaymentModel({
//             studentId,
//             courseId,
//             CoursePrice: CourseModel.Price,
//             remainingAmount: CourseModel.Price - paymentAmount,
//             paymentAmount,
//             paymentDate: new Date(),
//             payTimes: 1 
//         });
//     } else {
//         payment.paymentAmount += paymentAmount;
//         payment.remainingAmount = payment.CoursePrice - payment.paymentAmount;
//         payment.payTimes += 1;
//         payment.paymentDate = new Date();
//     }
//         await payment.save();
//         res.status(201).json({message:"payment Add ",data:payment});
   
// })


export const payment = async (req, res, next) => {
    const { studentId, courseId, paymentAmount } = req.body;

        let payment = await PaymentModel.findOne({ studentId, courseId });
        const course = await CourseModel.findById(courseId);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        if (payment && payment.remainingAmount === 0) {
            return res.status(400).json({ error: 'The course has already been fully paid' });
        }
         if (payment && payment.remainingAmount < paymentAmount) {
            return res.status(400).json(`The remainingAmount only ${payment.remainingAmount}`);
        }
   

        if (!payment) {
            payment = new PaymentModel({
                studentId,
                courseId,
                CoursePrice: course.price,
                remainingAmount: course.price - paymentAmount,
                payments: [{
                    amount: paymentAmount,
                    paymentDate: new Date()
                }]
            });
        } else {
            payment.payments.push({
                amount: paymentAmount,
                paymentDate: new Date()
            });
            payment.remainingAmount = course.price - payment.payments.reduce((total, payment) => total + payment.amount, 0);
        }
         
        await payment.save();
        
        res.status(201).json({ message: "Payment added", payment});
  
}



export const findStudentPayments = asynchandlier(async (req, res) => {
   
        const { studentId,courseId } = req.body;

        const payment = await PaymentModel.findOne({studentId,courseId});
        if (!payment || payment.length === 0) {
            return res.status(404).json({ error: 'No payments found for this student' });
        }
        res.status(201).json({message:"student payments",data:payment});
  
});



export const FindCoursePayments = asynchandlier(async (req, res) => {
   
    const { courseId } = req.params;

    const payments = await PaymentModel.find({ courseId });
    if (!payments || payments.length === 0) {
        return res.status(404).json({ error: 'No payments found for this student' });
    }
    res.status(201).json({message:"student payments",data:payments});

});




