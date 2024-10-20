import express from 'express';

// CRUD-Operationen Create/add, Read/get, Update/update, Delete/delete
import {
    addNewUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
  } from "../controllers/users.js";


  const usersRouter = express.Router();
  
  // Hier wird den Routenteil definiert, der ab /users/ kommt! (Siehe server/index.js), also "Unterroutes"
usersRouter.route('/').get(getAllUsers).post(addNewUser);
usersRouter
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

export default usersRouter;


