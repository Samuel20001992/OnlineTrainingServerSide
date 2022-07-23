import mongoose from 'mongoose';
import { stringify } from 'querystring';

const courseSchema = mongoose.Schema({
    name: String,
    image:String,
    courseCategory: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var CourseModel = mongoose.model('CourseModel', courseSchema);

export default CourseModel;