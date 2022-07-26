import express from 'express';

import { getCourses, getCourse, createCourse, updateCourse, deleteCourse } from '../controllers/course.controller.js';

const router = express.Router();

router.get('/', getCourses);
router.post('/', createCourse);
router.get('/:id', getCourse);
router.patch('/:id', updateCourse);
router.delete('/:id', deleteCourse);


export default router;