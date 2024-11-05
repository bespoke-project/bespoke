import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';

const Form = () => {
  const { userData, setUserData } = useAuth();
  const [form, setForm] = useState({
    name: userData.firstName || '',
    lastName: userData.lastName || '',
    username: userData.username || '',
    email: userData.email || '',
    password: '',
    confirmPassword: '',
    image: userData.image || '',
  });
  const [alertVisible, setAlertVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetFormData = () => {
    setForm({
      name: userData.firstName || '',
      lastName: userData.lastName || '',
      username: userData.username || '',
      email: userData.email || '',
      password: '',
      confirmPassword: '',
      image: userData.image || '',
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Only send non-empty fields
    const updatedData = {};
    if (form.name) updatedData.firstName = form.name;
    if (form.lastName) updatedData.lastName = form.lastName;
    if (form.username) updatedData.username = form.username;
    if (form.email) updatedData.email = form.email;
    if (form.image) updatedData.image = form.image;
    if (form.password) updatedData.password = form.password;

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/auth/update`,
        updatedData,
        { withCredentials: true }
      );

      setUserData(response.data.user);
      resetFormData();
      setAlertVisible(true);

      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className='max-w-2xl w-full mx-auto py-6 px-4 sm:px-6 lg:px-8'>
      {alertVisible && (
        <div className='alert alert-success mb-4'>
          User data updated successfully!
        </div>
      )}
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* First Name Field */}
        <div className='flex flex-col'>
          <label className='text-lg'>First Name</label>
          <input
            className='border border-gray-300 p-2 rounded-md w-full'
            name='name'
            value={form.name}
            onChange={handleChange}
            type='text'
            placeholder='Enter your first name'
          />
        </div>
        {/* Last Name Field */}
        <div className='flex flex-col'>
          <label className='text-lg'>Last Name</label>
          <input
            className='border border-gray-300 p-2 rounded-md w-full'
            name='lastName'
            value={form.lastName}
            onChange={handleChange}
            type='text'
            placeholder='Enter your last name'
          />
        </div>
        {/* Username Field */}
        <div className='flex flex-col'>
          <label className='text-lg'>Username</label>
          <input
            className='border border-gray-300 p-2 rounded-md w-full'
            name='username'
            value={form.username}
            onChange={handleChange}
            type='text'
            placeholder='Enter your username'
          />
        </div>
        {/* Email Field */}
        <div className='flex flex-col'>
          <label className='text-lg'>Email</label>
          <input
            className='border border-gray-300 p-2 rounded-md w-full'
            name='email'
            value={form.email}
            onChange={handleChange}
            type='email'
            placeholder='Enter your email'
          />
        </div>
        {/* Password Field */}
        <div className='flex flex-col relative'>
          <label className='text-lg'>Password</label>
          <input
            className='border border-gray-300 p-2 rounded-md w-full'
            name='password'
            value={form.password}
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter your password'
            required
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-2 top-9'
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {/* Confirm Password Field */}
        <div className='flex flex-col relative'>
          <label className='text-lg'>Confirm Password</label>
          <input
            className='border border-gray-300 p-2 rounded-md w-full'
            name='confirmPassword'
            value={form.confirmPassword}
            onChange={handleChange}
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder='Confirm your password'
            required
          />
          <button
            type='button'
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className='absolute right-2 top-9'
          >
            {showConfirmPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {/* Photo Field */}
        <div className='flex flex-col'>
          <label className='text-lg'>Photo</label>
          <input
            className='border border-gray-300 p-2 rounded-md w-full'
            name='image'
            placeholder='Enter image URL (Optional)'
            onChange={handleChange}
            type='text'
            value={form.image}
          />
        </div>
        {/* Submit Button */}
        <div className='flex justify-center'>
          <button
            type='submit'
            className='btn btn-success border-gray-300 p-2 rounded-md w-full sm:w-auto'
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
