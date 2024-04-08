
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs"
import { asynchandlier } from '../../../services/erroeHandling.js';
import UserModel from '../../../../DB/model/user.model.js';
import { sendEmail } from '../../../services/email.js';





// signup ............................>>>

export const signup = asynchandlier(async (req, res, next) => {
 
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
        return next(new Error('E-mail Aleardy Exist', 409));
    }
    const newUser = new UserModel(req.body);

    const token = await jwt.sign({ id: newUser._id,role:newUser.role}, process.env.emailToken)
    const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`

    const message = `<a href="${link}"> ConfirmEmail <a/>`

    const info = await sendEmail(req.body.email, "confirmEmail", message)
    if (info?.accepted?.length) {
        const savedUser = await newUser.save()


        savedUser.toJSON = function () {
            const obj = this.toObject();
            delete obj.password;
            return obj;
        };

        return res.status(201).json({ massage: "Accouent Created successfully", savedUser })

    } else {
        return next(new Error("email regicted"))


    }

})




export const signin = asynchandlier(async (req, res,next) => {
    const { email, password} = req.body;
   

    const user = await UserModel.findOne({ email });
    if (!user) {
        return next(new Error('E-mail not exist', 404));

    }
    if (!user.confirmEmail) {
        return next(new Error('please Confirm your email frist',400));
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return next(new Error('Invalid credentials',400));

    }
    user.toJSON = function () {
        const obj = this.toObject();
        delete obj.password;
        return obj;
    };

    const token = jwt.sign({ name: user.firstName, role: user.role, userId: user._id }, process.env.tokenSignature);
    return res.json({ message: "Success Signin",token , UserData:user});


})




/// sendCode ............................>>>

export const sendCode = asynchandlier(async (req, res, next) => {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: "E-mail Not Exist" });
        }
        const accessCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.code = accessCode;
        await user.save();
        sendEmail(user.email, `<h1> Access Code</h1>`, accessCode);
        res.json({ message: "Code Send Successfully" });
  
});





export const confirmEmail= asynchandlier(async(req,res,next)=>{

    const {token} =req.params
    
    const decoded= await jwt.verify(token,process.env.emailToken)
    if(!decoded ){
      return  next (new (Error("invalid pay load or it is aready confirmed")))
    
    }else{
    
     const User= await UserModel.findOneAndUpdate({_id:decoded.id,confirmEmail:false},{confirmEmail:true})
     console.log(User);
      return res.status(200).json({message:"E-mail confirmed successfuly Plz login"})
    

    }})

// forgetPassword ............................>>>
export const forgetPassword = async (req, res, next) => {
    const { email, code, password } = req.body;

        const user = await UserModel.findOne({ email, code });

        if (!user) {
            return res.status(401).json({ message: "User does not exist or invalid code" });
        }
        const HashPassword = await bcrypt.hash(password,parseInt(process.env.SALTROUND))
        const updateUser = await UserModel.findOneAndUpdate(
            { email },
            { code: '', password:HashPassword},
            { new: true }
        );
        if (updateUser) {
            return res.status(401).json({ message: "Password reset successfully",updateUser});
            
        }else {
            return  next (new Error("Failed to reset password"));
        }

};




