import mongoose from 'mongoose';
import { stringify } from 'querystring';

const topicSchema = mongoose.Schema({
    title: String,
    content: String,
    image: String,
    status: String,
    language: String,

    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var TopicModel = mongoose.model('TopicModel', topicSchema);

export default TopicModel;