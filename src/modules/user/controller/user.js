import UserModel from "../../../../DB/model/user.model.js";
import { asynchandlier } from "../../../services/erroeHandling.js";


// Function to upgrade the role of a user by admin
export const upgradeUserRole =asynchandlier(async (req, res) => {
    const { userId } = req.params;
    const { newRole } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (newRole && ['student', 'Admin', 'instructor'].includes(newRole) && user.role !== newRole) {
            user.role = newRole;
            await user.save();
            return res.status(200).json({ message: 'User role upgraded successfully', user: user.role});
        } else {
            return res.status(400).json({ message: 'Invalid new role or same as current role' });
        }

});


export const GetAllStududents =asynchandlier(async (req, res) => {
   
        const Students = await UserModel.find({role:"student"}).select("-password -updatedAt -createdAt -confirmEmail ")
        if (!Students) {
            return res.status(404).json({ message: 'Not Found Any Users' });
        }
     
        
      return res.status(400).json({ message: 'Student Data',StudentData:Students });

});
