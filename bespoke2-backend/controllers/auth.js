import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

// REGISTER
export const signUp = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new ErrorResponse('Email already exists', 409);

  const hash = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    firstName,
    lastName,
    username,
    email,
    password: hash,
  });

  const token = jwt.sign({ uid: newUser.id }, process.env.JWT_SECRET);
  res.status(201).send({ token });
});

// LOGIN
export const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({
    where: { email },
    attributes: ['id', 'password'],
  });
  if (!existingUser) throw new ErrorResponse('Email does not exist', 404);

  const match = await bcrypt.compare(password, existingUser.password);
  if (!match) throw new ErrorResponse('Password is incorrect', 401);

  const token = jwt.sign({ uid: existingUser.id }, process.env.JWT_SECRET, {
    expiresIn: '30m',
  });

  res.cookie('token', token, { maxAge: 1800000 });
  res.send({ status: 'logged in' });
});

// LOGOUT
export const signOut = asyncHandler(async (req, res, next) => {
  res.clearCookie('token');
  res.send({ status: 'logged out' });
});

// UPDATE USER INFO
export const updateUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, username, email, favorites } = req.body;

  const updateData = {};

  if (firstName) updateData.firstName = firstName;
  if (lastName) updateData.lastName = lastName;
  if (username) updateData.username = username;
  if (email) updateData.email = email;
  if (favorites) updateData.favorites = favorites;

  if (req.file) {
    updateData.image = req.file.path;
  }

  try {
    const [updatedCount, updatedUsers] = await User.update(updateData, {
      where: { id: req.uid },
      returning: true,
    });

    if (updatedCount === 0) {
      throw new ErrorResponse('User not found', 404);
    }

    res.send({ status: 'User info updated', user: updatedUsers[0] });
  } catch (error) {
    console.error('Update error:', error);
    next(error);
  }
});

// Verify User
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.uid);
  res.json(user);
});

// DELETE USER
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.uid);

  if (!user) throw new ErrorResponse('User not found', 404);

  await user.destroy();
  res.send({ status: 'User deleted' });
});
