
import InstructorModel from "../../../../DB/model/Instructor.model.js"
import { asynchandlier } from "../../../services/erroeHandling.js"
import UserModel from "../../../../DB/model/user.model.js"
import ExamModel from "../../../../DB/model/Exams.model.js"
import ExamResultModel from "../../../../DB/model/ExamResualt.model.js"

export const CraetExam = asynchandlier(async (req, res, next) => {

    // check Teacher found
    const Instructor= await InstructorModel.findById(req.user._id)
    if (!Instructor) {
        next(new Error("Instructor not found"))
    }else{
            req.body.Createdby =req.user._id
            req.body.CourseId =req.params.CourseId
            const NewExam= await ExamModel.create(req.body)
            await Instructor.exams.push(NewExam._id)
            Instructor.save()
           res.status(200).json({ message: "exam is created successfully", NewExam })
       
    } 
})


export const GetExams = asynchandlier(async (req, res, next) => {
 
        const exams = await ExamModel.find({CourseId:req.params.CourseId,examStatus:"live"}).populate({
            path: 'Questions',
            model: 'Question',
            select: '-correctAnswer -Incorrect -updatedAt -createdAt',
            populate: {
                path: "CreatedBy",
                select: "name",
            }
        });

        if (!exams || exams.length === 0) {
            return res.status(404).json({ message: 'No exams found or exam still pending' });
        }
        res.status(200).json({ message:"all exams and related questions",exams });
   
})


export const GetExamById = asynchandlier(async (req, res, next) => {

    const Exam = await ExamModel.findOne({_id:req.params.id,CourseId:req.params.CourseId}).populate({
        path: 'Questions',
        model: 'Question',
        select: '-correctAnswer -Incorrect -updatedAt -createdAt',
        populate: {
            path: "CreatedBy",
            select: "name",
        }
    });
    if (Exam.examStatus="pending") {
       return res.status(200).json({ message: "exam is still pending " })
    }
    if (!Exam) {
        next(new Error(`not found Exam  with id: ${req.params.id}`))
    } else {

        res.status(200).json({ message: "This is Exam ", Exam })

    }

})


export const UpdateExam = asynchandlier(async (req, res, next) => {

    const Exam = await ExamModel.findById({_id:req.params.id, Createdby:req.user._id})
    if (!Exam) {
        next(new Error(`not found Exam  with id: ${req.params.id}`))
    } else {

       const UpdateExam= await ExamModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
       res.status(200).json({ message: " Exam Updated ",UpdateExam })

    }

})


export const WriteExam = asynchandlier(async (req, res, next) => {

    //  student found
    const StudentFound = await UserModel.findOne({_id:req.user._id})
    if (!StudentFound) {
        next(new Error("studen not found"))
        return;
    }
  
    // if (StudentFound.IsSuspended || StudentFound.Iswitdrawn) {
    //     next(new Error("You can not take this exam you are IsSuspended  or Iswitdrawn"))
    //     return;
    // }

    // Exam found
    const ExamFound = await ExamModel.findOne({_id:req.params.id,CourseId:req.params.CourseId}).populate({
        path: 'Questions',
        model: 'Question',
        select: '-updatedAt -createdAt',
        populate: {
            path: "CreatedBy",
            select: "name",
        }
    })
    


    if (!ExamFound) {
        next(new Error("exam not found"))
        return;
    }
    const questions = ExamFound.Questions
    console.log(questions);
   
    const examResualt = await ExamResultModel.findOne({ studentId: StudentFound._id, ExamId: ExamFound._id })
    if (examResualt) {
        next(new Error("You have aready take this exam"))
        return;
    }

    //check if student answer All Questios
    const StudentAnswer = req.body.Answers
    if (questions.length != StudentAnswer.length) {
        next(new Error(" you have not answer all questions"))
        return;
    }
    let correctAnswer = 0
    let WrongAnswer = 0
    let score = 0
    let AnsweredQuestions = 0
    let grade = 0
    let TotalQuestion = 0
    let status = ""
    let remark = ""

    // check  exam Answers
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i]
        if (question.correctAnswer === StudentAnswer[i]) {
            console.log({"studentcorrrrrrrrrect":StudentAnswer[i]});
            console.log({"corrrrrrrrrect":question.correctAnswer} );
            correctAnswer++
            score++
            question.Incorrect = true
        } else {

            WrongAnswer++

        }

    }
    /// Exam Report
    TotalQuestion = questions.length
    grade = (correctAnswer / TotalQuestion) * 100
    AnsweredQuestions = questions.map(question => {
        return {
            question: question.question,
            correctAnswer: question.correctAnswer,
            Incorrect: question.Incorrect
        }

    })

    // student status
    if (grade >= 50) {
        status = "passed"
    } else {
        status = "failed"
    }

    // remark
    if (grade >= 80) {
        remark = "Excellent"
    } else if (grade >= 70) {
        remark = "Very good"
    } else if (grade >= 60) {
        remark = "good"
    } else if (grade >= 50) {
        remark = "fair"
    } else {
        remark = "poor"
    }

    // // assgin resualt 
    const finalResualt = await ExamResultModel.create({

        ExamId: ExamFound._id,
        studentId: StudentFound._id,
        grade,
        score,
        remark,
        status,
        answerQesutions: AnsweredQuestions,

    })
    
    // push resualt to student
    StudentFound.examResults.push(finalResualt._id)
    await StudentFound.save()

    res.status(201).json({ message: " you are Submit  come back for check  resualt later",finalResualt
    })

})


export const updateExamStatus = asynchandlier(async (req ,res,next) => {
    const {ExamId}= req.params.examId
    const {ExamStatus}= req.body
         const Exam = await ExamModel.findOne({ExamId,examStatus:"pending"});
         if (!Exam) {
             throw new Error('exam not found or it aready live');
         }
         Exam.examStatus = ExamStatus;
         await Exam.save();
         res.status(201).json({ message: 'examStatus updeated successfully', examStatus: Exam.examStatus});

 
 });





export const DeleteExam = asynchandlier(async (req, res) => {
    const examId = req.params.id;
        const deletedExam = await ExamModel.findOneAndDelete({ _id: examId });

        if (deletedExam) {
            res.status(200).json({ message: 'Exam deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Exam not found.' });
        }
  
});






