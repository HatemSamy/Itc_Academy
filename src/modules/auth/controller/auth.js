
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { asynchandlier } from '../../../services/erroeHandling.js';
import UserModel from '../../../../DB/model/user.model.js';
import { sendEmail } from '../../../services/email.js';




// signup ............................>>>

export const signup = asynchandlier(async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (user) {
            return next(new Error('E-mail Aleardy Exist', 409));
        }
        const HashPassword= await bcrypt.hashSync(req.body.password, parseInt(process.env.SALTROUND))
        req.body.password=HashPassword
        const newUser = new UserModel(req.body);
        await newUser.save();
        res.status(200).json({ message: 'Signup Success', data: newUser });
    } catch (error) {
        next(error);
    }
})



// signin ............................>>>

export const signin = asynchandlier(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            const match = await bcrypt.compareSync(password, user.password);
            if (match) {
                const token = jwt.sign({ name: user.firstName, role: user.role, userId: user._id }, process.env.tokenSignature);
                return res.json({ message: "Success Signin", data: user, token });
            } else {
                return res.json({ message: 'Incorrect password' });
            }
        } else {
            return res.json({ message: 'E-mail Not Registered' });
        }
    } catch (error) {
        next(error);
    }
})




/// sendCode ............................>>>

export const sendCode = asynchandlier(async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: "E-mail Not Exist" });
        }
        const accessCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.code = accessCode;
        await user.save();
        sendEmail(user.email, `<h1> Access Code</h1>`, accessCode);
        res.json({ message: "Code Send Successfully" });
    } catch (error) {
        next(error);
    }
});




// logout ............................>>>

// export const logout = catchAsyncError(async (req, res, next) => {
//     try {
//         const authHeader = req.headers['token'];
//         if (authHeader && authHeader.startsWith(process.env.BearerKey)) {
//             const token = authHeader.split(process.env.BearerKey)[1];
//             jwt.verify(token, 'SKEY', async (err, decoded) => {
//                 if (err) {
//                     return next(new AppError('Invalid or expired token. Logout failed.', 401));
//                 }
//                 await userModel.findByIdAndUpdate(decoded.userId, { token: '' });
//                 res.clearCookie('token');
//                 res.json({ message: 'Logged out successfully' });
//             });
//         } else {
//             return next(new AppError('Token not provided. Logout failed.', 401));
//         }
//     } catch (error) {
//         next(error);
//     }
// });



// forgetPassword ............................>>>


export const forgetPassword = async (req, res, next) => {
    try {
        const { email, code, password } = req.body;

        const user = await UserModel.findOne({ email: email, code: code })

        if (!user) {
            return res.status(401).json({ message: "user not exist or In-valid code " });
        }
        const hashpassword = await bcrypt.hashSync(password, parseInt(process.env.SALTROUND))
        const updateUser = await UserModel.findOneAndUpdate(
            { _id: user._id },
            { code: '', password: hashpassword },
            { new: true }
        );
        console.log(hashpassword , updateUser);
        res.json({ message: "Password updated successfully", updateUser });
    } catch (error) {
        next(error);
    }
};
