import express from 'express';   
import { authUser, getUserProfile, registerUser, logoutUser, updateUserProfile }
 from '../controllers/user.controller.js';
 import {protect} from '../middleware/auth.middleware.js';

const router = express.Router();


router.post('/auth', authUser);
router.post('/', registerUser);
router.post('/logout', logoutUser); 
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);


export default router;