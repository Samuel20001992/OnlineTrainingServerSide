import mongoose from 'mongoose';
import { stringify } from 'querystring';

const courseCategorieSchema = mongoose.Schema({
    name: String,
    image:String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var CourseCategorieModel = mongoose.model('CourseCategorieModel', courseCategorieSchema);

export default CourseCategorieModel;