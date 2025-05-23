
import joi from "joi";



export const SignupSchema = {

    body: joi.object().required().keys({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        email: joi.string().required().email(),
        phone: joi.string().pattern(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/).required(),
        password:joi.string().required(),
        cpassword: joi.string().required().valid(joi.ref('password')).messages({
            'any.only': 'Passwords do not match',
        }),
    })
}

export const AdminRegister = {

    body: joi.object().required().keys({
        Name: joi.string().required(),
        email: joi.string().required().email(),
        password: joi.string().required(),
       
    })
}

export const login = {
    body: joi.object().required().keys({
        email: joi.string().required().email(),
        password: joi.string().required(),
    })
}

export const confirmEmail = {

    params: joi.object().required().keys({

        token: joi.string().required()
       

    })
}


export const forgetPassword = {

    body: joi.object().required().keys({
        code: joi.number().required(),
        password: joi.string().required(),
       
    })
}

