import express from 'express';
import { login, signup } from '../controllers/auth.controller.js';

const router = express.Router();



router.post('/sign-up' , signup);
router.post('/sign-in', login)


export default router ; 