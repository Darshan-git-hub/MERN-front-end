import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    consumer_number: '',
    address: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert password and consumer_number to numbers
      const payload = {
        ...formData,
        password: Number(formData.password),
        consumer_number: Number(formData.consumer_number)
      };
      const response = await axios.post('http://localhost:5000/api/auth/signup', payload);
      console.log('Signup response:', response.data);
      alert(response.data.message);
      navigate('/signin');
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Error creating user');
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="number"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter a numeric password"
            required
          />
        </div>
        <div>
          <label htmlFor="consumer_number">Consumer Number</label>
          <input
            type="number"
            id="consumer_number"
            name="consumer_number"
            value={formData.consumer_number}
            onChange={handleChange}
            placeholder="Enter your consumer number"
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;