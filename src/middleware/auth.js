import jwt from 'jsonwebtoken'
import UserModel from '../../DB/model/user.model.js'
import { asynchandlier } from '../services/erroeHandling.js'






export const Roles = {
    Admin: "Admin",
    User: "user"

}

export const AccessRoles = {
    create: [Roles.Admin],
    userrole: [Roles.User],
    MultipleRole: [Roles.Admin, Roles.User],

}



export const authentication = (accessRole) => {
    return asynchandlier(async (req,res, next) => {

        const { authorization } = req.headers
        console.log(authorization);

        if (!authorization?.startsWith(process.env.BearerKey)) {
            // res.status(401).json({ message: "invalid bearerKey" })
        next (new Error("invalid bearerKey"))

        }

        const token = authorization.split(process.env.BearerKey)[1]
        const decoded =  await jwt.verify(token,process.env.tokenSignature)
        if (!decoded.userId) {
            res.status(401).json({ message: "invalid token Payload" })


        } else {

            const user = await UserModel.findById(decoded.userId) 
            if (!user) {
                res.status(404).json({ message: " validation error ,user not found" })

            } else {
                if (!accessRole.includes(user.role)) {
                    next (new Error("access Denied, not authraized role"))
                } else {
                    req.user = user
                    next() 
                }
            
            }

        }

    })

}