import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        minLength: 1
    },
    password: {
        type: String,
        required: true,
        minLength: [5, 'MinLength 5 Characters']
    },
    phone: {
        type: String,
        required: true,
        minLength: [5, 'MinLength 5 Characters']
    },
    role: {
        type: String,
        enum: ['user', 'Admin'],
        default: "user"
    },
    enrolled_courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
    passwordChangedAt: Date
}, { timestamps: true });

// Hash Password

// userSchema.pre('save', function (next) {
//     if (!this.isModified('password')) {
//         return next(); // Skip if password is not modified
//     }
//     // Hash the password
//     this.password = bcrypt.hashSync(this.password,parseInt(process.env.SALTROUND));
//     next();
// });

// userSchema.pre('findOneAndUpdate', function () {
//     if (this._update.password) {
//         this._update.password = bcrypt.hashSync(this._update.password, parseInt(process.env.SALTROUND));
//     }
// });

// userSchema.pre('updateOne', function () {
//     if (this._update.password) {
//         this._update.password = bcrypt.hashSync(this._update.password, parseInt(process.env.SALTROUND));
//     }
// });

const UserModel = mongoose.model('user', userSchema);

export default UserModel;
