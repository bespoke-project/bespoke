import { useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthProvider';
import axios from 'axios';

const SignUpModal = ({ onClose }) => {
  const { setIsLoggedIn, setUserData } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'The password and confirm password do not match. Please try again.',
      });
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        { username, firstName, lastName, email, password },
        { withCredentials: true }
      );

      if (response.data) {
        setIsLoggedIn(true);
        setUserData(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You have successfully registered!',
        }).then(() => {
          onClose();
          window.location.href = '/logForm';
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'An error occurred during registration. Please try again.',
        // text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <div className='modal modal-open'>
      <div className='modal-box'>
        <h2 className='font-bold text-lg'>Sign Up</h2>
        <form onSubmit={handleSubmit} className='mt-4'>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='input input-bordered w-full mb-3'
            required
          />
          <input
            type='text'
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='input input-bordered w-full mb-3'
            required
          />
          <input
            type='text'
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className='input input-bordered w-full mb-3'
            required
          />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='input input-bordered w-full mb-3'
            required
          />
          <div className='relative mb-3'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='input input-bordered w-full'
              required
            />
            <button
              type='button'
              className='absolute right-3 top-3'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className='relative mb-3'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='input input-bordered w-full'
              required
            />
            <button
              type='button'
              className='absolute right-3 top-3'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button type='submit' className='btn btn-primary w-full mt-4'>
            Sign Up
          </button>
        </form>
        <button className='btn btn-secondary w-full mt-4' onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SignUpModal;
