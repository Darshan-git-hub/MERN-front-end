import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AutomobileForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    model: '',
    year: '',
    price: '',
    description: ''
  });

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
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/automobiles', formData, {
        headers: {
          'x-auth-token': token
        }
      });
      toast.success('Automobile added successfully!');
      setFormData({
        companyName: '',
        model: '',
        year: '',
        price: '',
        description: ''
      });
    } catch (error) {
      console.error('Error adding automobile:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Error adding automobile');
    }
  };

  return (
    <div className="container">
      <h1>Add New Automobile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="companyName">Company Name</label>
          <input 
            type="text" 
            id="companyName" 
            name="companyName" 
            value={formData.companyName} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="model">Model</label>
          <input 
            type="text" 
            id="model" 
            name="model" 
            value={formData.model} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="year">Year</label>
          <input 
            type="number" 
            id="year" 
            name="year" 
            value={formData.year} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input 
            type="number" 
            id="price" 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required
          ></textarea>
        </div>
        <button type="submit">Add Automobile</button>
      </form>
    </div>
  );
};

export default AutomobileForm;