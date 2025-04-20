import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AutomobileTable = () => {
  const [automobiles, setAutomobiles] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentAutomobile, setCurrentAutomobile] = useState({
    _id: null,
    companyName: '',
    model: '',
    year: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    fetchAutomobiles();
  }, []);

  const fetchAutomobiles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/automobiles', {
        headers: {
          'x-auth-token': token
        }
      });
      setAutomobiles(response.data);
    } catch (error) {
      console.error('Error fetching automobiles:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Error fetching automobiles');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/automobiles/${id}`, {
        headers: {
          'x-auth-token': token
        }
      });
      setAutomobiles(automobiles.filter(auto => auto._id !== id));
      toast.success('Automobile deleted successfully!');
    } catch (error) {
      console.error('Error deleting automobile:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Error deleting automobile');
    }
  };

  const handleEdit = (automobile) => {
    setEditing(true);
    setCurrentAutomobile(automobile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAutomobile({
      ...currentAutomobile,
      [name]: value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/automobiles/${currentAutomobile._id}`, 
        currentAutomobile,
        {
          headers: {
            'x-auth-token': token
          }
        }
      );
      setAutomobiles(automobiles.map(auto => (auto._id === currentAutomobile._id ? response.data : auto)));
      setEditing(false);
      setCurrentAutomobile({
        _id: null,
        companyName: '',
        model: '',
        year: '',
        price: '',
        description: ''
      });
      toast.success('Automobile updated successfully!');
    } catch (error) {
      console.error('Error updating automobile:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Error updating automobile');
    }
  };

  return (
    <div className="container">
      <h1>Automobile Inventory</h1>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Model</th>
            <th>Year</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {automobiles.map(auto => (
            <tr key={auto._id}>
              <td>{auto.companyName}</td>
              <td>{auto.model}</td>
              <td>{auto.year}</td>
              <td>${auto.price.toLocaleString()}</td>
              <td>{auto.description}</td>
              <td>
                <button 
                  onClick={() => handleEdit(auto)} 
                  style={{ background: '#4caf50', marginRight: '5px' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(auto._id)} 
                  style={{ background: '#f44336' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <form onSubmit={handleUpdate} style={{ marginTop: '20px' }}>
          <h2>Edit Automobile</h2>
          <div>
            <label htmlFor="companyName">Company Name</label>
            <input 
              type="text" 
              id="companyName" 
              name="companyName" 
              value={currentAutomobile.companyName} 
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
              value={currentAutomobile.model} 
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
              value={currentAutomobile.year} 
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
              value={currentAutomobile.price} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea 
              id="description" 
              name="description" 
              value={currentAutomobile.description} 
              onChange={handleChange} 
              required
            ></textarea>
          </div>
          <button type="submit">Update Automobile</button>
        </form>
      )}
    </div>
  );
};

export default AutomobileTable;