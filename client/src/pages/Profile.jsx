import { Button, FileInput, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    personalInfo: '',
    beautyPreferences: '',
    subscription: '',
    photo: null
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/profile/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        if (response.ok) {
          const profile = await response.json();
          setFormData({
            personalInfo: profile.personalInfo,
            beautyPreferences: profile.beautyPreferences,
            subscription: profile.subscription,
            photo: null
          });
          setIsUpdating(true);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('personalInfo', formData.personalInfo);
    formDataToSend.append('beautyPreferences', formData.beautyPreferences);
    formDataToSend.append('subscription', formData.subscription);
    if (formData.photo) {
      formDataToSend.append('photo', formData.photo);
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/profile/${isUpdating ? 'update' : 'create'}`, {
        method: isUpdating ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Profile ${isUpdating ? 'updated' : 'created'} successfully!`);
        navigate('/profile');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [id]: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <p className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              F
            </span>
            Salon
          </p>
          <p className='text-sm mt-5'>{isUpdating ? 'Update' : 'Create'} your profile.</p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <label htmlFor="personalInfo" className='block text-sm font-medium text-gray-700'>Personal Information</label>
              <TextInput
                type='text'
                placeholder='Enter your personal information'
                id='personalInfo'
                value={formData.personalInfo}
                onChange={handleChange}
                required
                className='text-gray-900 placeholder-gray-500'
              />
            </div>
            <div>
              <label htmlFor="beautyPreferences" className='block text-sm font-medium text-gray-700'>Beauty Preferences</label>
              <TextInput
                type='text'
                placeholder='Enter your beauty preferences'
                id='beautyPreferences'
                value={formData.beautyPreferences}
                onChange={handleChange}
                required
                className='text-gray-900 placeholder-gray-500'
              />
            </div>
            <div>
              <label htmlFor="subscription" className='block text-sm font-medium text-gray-700'>Subscription</label>
              <TextInput
                type='text'
                placeholder='Enter your subscription details'
                id='subscription'
                value={formData.subscription}
                onChange={handleChange}
                required
                className='text-gray-900 placeholder-gray-500'
              />
            </div>
            <div>
              <label htmlFor="photo" className='block text-sm font-medium text-gray-700'>Profile Photo</label>
              <FileInput
                id='photo'
                onChange={handleChange}
                className='text-gray-900 placeholder-gray-500'
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>
              {isUpdating ? 'Update Profile' : 'Create Profile'}
            </Button>
          </form>
          {message && <p className='mt-4 text-center text-red-500'>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
