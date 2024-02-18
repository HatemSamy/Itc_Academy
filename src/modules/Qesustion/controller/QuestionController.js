import ExamModel from "../../../../DB/model/Exams.model.js"
import QuestionModel from "../../../../DB/model/Question.model.js"
import { asynchandlier } from "../../../services/erroeHandling.js"





export const CraeteQuestion = asynchandlier(async (req, res, next) => {

    const { Question, optionA, optionB, optionC, optionD, correctAnswer } = req.body
    //find exam
    const ExamFound = await ExamModel.findById(req.params.id)
    if (!ExamFound) {
        return next(new Error("exam Not found"))
    } else {

        const QuestionFound = await QuestionModel.findOne({ Question })
        if (QuestionFound) {
            return next(new Error("Question is aready Exist"))

        } else {
            // Create Question
            const CreateQuestion = await QuestionModel.create({
                Question,
                optionA,
                optionB,
                optionC,
                optionD,
                correctAnswer,
                CreatedBy:req.user._id,
                ExamId:req.params.id

            })
            //Push question to exam
            ExamFound.Questions.push(CreateQuestion._id)
            ExamFound.save()

            return res.status(200).json({ message: "QuestionCreated Successfully", CreateQuestion })
        }
    }

})


export const GetQuestions = asynchandlier(async (req, res, next) => {

    const CheckQuestion = await QuestionModel.find({ExamId:req.params.examId})
    if (!CheckQuestion) {
        return next(new Error("not found  Question"))
    } else {

        return res.status(200).json({ message: "This is  Question",data: CheckQuestion })

    }

})

export const GetSingleQuestion = asynchandlier(async (req, res, next) => {


    const Question = await QuestionModel.findById(req.params.id)
    if (!Question) {
        return next(new Error(`not found Question by id: ${req.params.id}`))
    } else {

        return res.status(200).json({ message: " Question feched succssefully", Question })
    }
})

export const UpdateQuestion = asynchandlier(async (req, res, next) => {
    req.body.UpdatedBy = req.user._id
    const Checkexist = await QuestionModel.findOne({ _id:req.params.id,CreatedBy:req.user._id})

    if (!Checkexist) {
        return next(new Error(` Question by id: ${req.params.id} not found`))

    } else {
        const updatedQuestion = await QuestionModel.findByIdAndUpdate(req.params.id, req.body, { new: true })

        return res.status(200).json({ message: `Question with id: ${req.params.id} Updated Succssfully`, data:updatedQuestion })

    }


})


export const DeleteQuestion = asynchandlier(async (req, res, next) => {

    const CheckQuestion =  await QuestionModel.findOneAndDelete({_id:req.params.id,CreatedBy:req.user._id,ExamId:req.params.examId})
    if (!CheckQuestion) {
        return next (new Error(`Question by id: ${req.params.id} not found`))
    }

   return res.status(200).json({ message: `Question by id: ${req.params.id} Deleted Successfully`, CheckQuestion })

})