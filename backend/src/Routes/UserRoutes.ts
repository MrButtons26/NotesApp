import express from 'express'
import  { signUp, login} from '../Controller/authController'
const router = express.Router();


//sign up for user
router.route(`/signup`).post(signUp);


//login for user
router.route(`/login`).post(login);

export default router;