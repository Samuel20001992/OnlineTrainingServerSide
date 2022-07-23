import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    first_name: String,
    middle_name: String,
    last_name: String,
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;