import jwt from 'jsonwebtoken'
import UserModel from '../../DB/model/user.model.js'
import { asynchandlier } from '../services/erroeHandling.js'
import InstructorModel from '../../DB/model/Instructor.model.js'


export const Roles = {
    Admin: "Admin",
    User: "user",
    instructor: "instructor"

}

export const AccessRoles = {
    create: [Roles.Admin],
    general: [Roles.Admin,Roles.User,Roles.instructor],

    Admin: [Roles.Admin],
    userrole: [Roles.User],
    MultipleRole: [Roles.instructor, Roles.User],
    instructorRole:[Roles.instructor]

}




export const selectModel = (role) => {
    let userCollection;

    if (role === 'user' || role === 'Admin' ) {
        userCollection = UserModel;
    } else if (role === 'instructor') {
        userCollection = InstructorModel;
    } else {
        return null;
    }
    return userCollection

}



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
                throw new Error('Invalid bearer key');
            }

            const token = authorization.split(process.env.BearerKey)[1];
            const decoded = await jwt.verify(token, process.env.tokenSignature);

            // Extract role from the token payload
            const userRole = decoded.role;

            if (!userRole) {
                throw new Error('Invalid token payload: role not found');
            }

            // Check if the user exists in the database based on the role
            let user;
            if (userRole === 'instructor') {
                user = await InstructorModel.findById(decoded.userId);
            } else {
                user = await UserModel.findById(decoded.userId);
            }
            console.log(user);

            if (!user) {
                throw new Error('User not found');
            }

            if (!accessRole.includes(user.role)) {
               return res.status(400).json({message:"access Denied, not authraized role"})
            }
            req.user = user;
            next();
        
    })
}

