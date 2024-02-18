import joi from "joi";


 //joi validation for creating Exam
export const CraetExam = {

    body: joi.object().required().keys({

        title: joi.string().required().messages({

            "any.required": "title is required"
        }),
        
        duration: joi.string().required(),
        description: joi.string(),
        examType: joi.string().required(),
        totalMark: joi.number().required(),
        passMark: joi.number().required(),

    }),
    params: joi.object().required().keys({
        CourseId: joi.string().required(),

    })
}
 //joi validation for get Exam

export const GetExamById = {

    params: joi.object().required().keys({

        id:joi.string().required(),
        CourseId:joi.string().required(),

    })
}
 //joi validation for write exam

export const writeExam = {

    params: joi.object().required().keys({

        id: joi.string().required().messages({

            "any.required": "id is required"
        }),
        CourseId: joi.string().required().messages({

            "any.required": "courseId is required"
        }),


    }),

    body:joi.object().required().keys({
        Answers:joi.array().required()

    })
}