import express from 'express'
import  { create,read,update,del} from '../Controller/noteController'
import { protect } from '../Controller/authController';
const router = express.Router();

router.route(`/`).get(read);
router.route(`/`).post(protect,create);
router.route(`/`).patch(update);
router.route(`/`).delete(del);



export default router;