import express from 'express';

import { getCourseCategories, getCourseCategorie, createCourseCategorie, updateCourseCategorie, deleteCourseCategorie } from '../controllers/courseCategorie.controller.js';

const router = express.Router();

router.get('/', getCourseCategories);
router.post('/', createCourseCategorie);
router.get('/:id', getCourseCategorie);
router.patch('/:id', updateCourseCategorie);
router.delete('/:id', deleteCourseCategorie);


export default router;