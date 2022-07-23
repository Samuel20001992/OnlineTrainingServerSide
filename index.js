
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import courseCategorieRoutes from './routes/courseCategorie.routes.js';
import topicRoutes from './routes/topic.router.js';
const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());


app.use('/users', userRoutes);
app.use('/courses', courseRoutes);
app.use('/courseCategories', courseCategorieRoutes);
app.use('/topics', topicRoutes);
const CONNECTION_URL = 'mongodb://localhost:27017/training';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

