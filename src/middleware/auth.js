import jwt from 'jsonwebtoken'
import UserModel from '../../DB/model/user.model.js'
import { asynchandlier } from '../services/erroeHandling.js'
import { log } from 'console'



export const Roles = {
    Admin: "Admin",
    Student: "student",
    instructor: "instructor"

}

export const AccessRoles = {
    create: [Roles.Admin],
    general: [Roles.Admin, Roles.Student, Roles.instructor],
    Admin: [Roles.Admin],
    Student: [Roles.Student],
    // MultipleRole: [Roles.instructor, Roles.Student ,Roles.Admin],
    DoupleRole: [Roles.instructor, Roles.Admin],
    instructorRole: [Roles.instructor]

}




// export const selectModel = (role) => {
//     let userCollection;

//     if (role === 'user' || role === 'Admin' ) {
//         userCollection = UserModel;
//     } else if (role === 'instructor') {
//         userCollection = InstructorModel;
//     } else {
//         return null;
//     }
//     return userCollection

// }



// export const authentication = (accessRole) => {
//     return asynchandlier(async (req,res, next) => {

//         const { authorization } = req.headers
//         console.log(authorization);

//         if (!authorization?.startsWith(process.env.BearerKey)) {
//             // res.status(401).json({ message: "invalid bearerKey" })
//         next (new Error("invalid bearerKey"))

//         }

//         const token = authorization.split(process.env.BearerKey)[1]
//         const decoded =  await jwt.verify(token , process.env.tokenSignature)
//         if (!decoded.userId) {
//             res.status(401).json({ message: "invalid token Payload" })


//         } else {

//             const user = await UserModel.findById(decoded.userId) 
//             if (!user) {
//                 res.status(404).json({ message: " validation error ,user not found" })

//             } else {
//                 if (!accessRole.includes(user.role)) {
//                     next (new Error("access Denied, not authraized role"))
//                 } else {
//                     req.user = user
//                     next() 
//                 }

//             }

//         }

//     })

// }



export const authentication = (accessRole) => {
    return asynchandlier(async (req, res, next) => {
        const { authorization } = req.headers;

        if (!authorization?.startsWith(process.env.BearerKey)) {
            return res.status(404).json({ message: "Invalid bearer key" });
        }

        const token = authorization.split(process.env.BearerKey)[1];
        const decoded = await jwt.verify(token, process.env.tokenSignature);

        // Extract role from the token payload
        const userRole = decoded.role;

        if (!userRole) {
            return res.status(404).json({ message: "Invalid token payload: role not found" });
        }

        const user = await UserModel.findById(decoded.userId);

        if (!user || user === null) {
            return res.status(404).json({ message: "Logged user not found" });
        }

        if (!accessRole.includes(user.role)) {
            return res.status(400).json({ message: "Access Denied, not authorized role" });
        }

        if (user.role === 'instructor' && !user.active) {
            return res.status(400).json({ message: "Your account is inactive. , Please Active your account" });
        }

        req.user = user;
        next();
    });
};


