import { useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();
  const { userData, setUserData, checkUser } = useAuth();
  const [form, setForm] = useState({
    name: userData.firstName || '',
    lastName: userData.lastName || '',
    username: userData.username || '',
    email: userData.email || '',
    password: '',
    confirmPassword: '',
    image: userData.image || '',
  });
  const [file, setFile] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setFile(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();

      if (form.name) formData.append('firstName', form.name);
      if (form.lastName) formData.append('lastName', form.lastName);
      if (form.username) formData.append('username', form.username);
      if (form.email) formData.append('email', form.email);
      if (form.password) formData.append('password', form.password);

      if (file) formData.append('image', file);

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/auth/update`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      await checkUser();
      resetFormData();
      setAlertVisible(true);

      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      backdrop: true,
    });

    if (result.isConfirmed) {
      navigate('/');

      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/auth/delete`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        setUserData(null);

        Swal.fire('Deleted!', 'Your account has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting account:', error);
        Swal.fire(
          'Error!',
          'There was an error deleting your account.',
          'error'
        );
      }
    }
  };

  return (
    <div className='max-w-2xl w-full mx-auto py-6 px-4 sm:px-6 lg:px-8'>
      {alertVisible && (
        <div className='alert alert-success mb-4 text-center text-green-700 bg-green-100 border border-green-300 rounded-lg py-2 px-4'>
          Profile updated successfully!
        </div>
      )}
      <form onSubmit={handleSubmit} className='space-y-4'>
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
            {showPassword ? (
              <AiOutlineEyeInvisible size={23} />
            ) : (
              <AiOutlineEye size={23} />
            )}
          </button>
        </div>
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
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible size={23} />
            ) : (
              <AiOutlineEye size={23} />
            )}
          </button>
        </div>
        <div className='flex flex-col'>
          <label className='text-lg'>Photo</label>
          <input
            className='border border-gray-300 p-2 rounded-md w-full'
            name='image'
            type='file'
            accept='image/*'
            onChange={handleFileChange}
          />
          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt='Preview'
              className='mt-4 w-24 h-24 object-cover rounded-full'
            />
          )}
        </div>
        <div className='flex justify-center items-center'>
          <button
            type='submit'
            className='btn btn-success px-11 rounded-md w-full sm:w-auto text-white'
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color='#fff' /> : 'Update'}
          </button>
        </div>
      </form>
      {loading && (
        <p className='text-center mt-4 text-green-600'>
          Updating profile, please wait...
        </p>
      )}
      <div className='flex justify-center items-center mt-6'>
        <button
          onClick={handleDelete}
          className='btn btn-danger bg-red-500 text-white p-4 rounded-md w-full sm:w-auto'
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Form;
