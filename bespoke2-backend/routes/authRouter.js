import { Router } from 'express';
import * as authController from '../controllers/auth.js';
import verifyToken from '../middlewares/verifyToken.js';
import { uploadSingle } from '../middlewares/upload.js';

const authRouter = Router();

authRouter.post('/register', authController.signUp);
authRouter.post('/login', authController.signIn);
authRouter.get('/me', verifyToken, authController.getUser);
authRouter.post('/logout', verifyToken, authController.signOut);
authRouter.put(
  '/update',
  verifyToken,
  uploadSingle.single('image'),
  authController.updateUser
);
authRouter.delete('/delete', verifyToken, authController.deleteUser);

export default authRouter;
