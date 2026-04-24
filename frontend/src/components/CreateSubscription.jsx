import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const CreateSubscription = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  
  const [userId, setUserId] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setStartDate(today);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await api.post('/subscriptions', {
        user_id: userId,
        meal_plan_id: parseInt(planId),
        start_date: startDate
      });
      
      setMessage('Subscription created successfully!');
      setTimeout(() => navigate('/my-subscription'), 2000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat().join(', ');
        setError(errorMessages);
      } else {
        setError('An error occurred while creating the subscription.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Complete Subscription</h2>
      
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>User ID</label>
          <input 
            type="number" 
            className="form-control" 
            value={userId} 
            onChange={(e) => setUserId(e.target.value)} 
            required 
            min="1"
          />
          <small style={{ color: '#6c757d', marginTop: '4px', display: 'block' }}>
            (Enter ID 1, 2, or 3. If the user already has an active sub, it will fail.)
          </small>
        </div>
        
        <div className="form-group">
          <label>Meal Plan ID</label>
          <input 
            type="number" 
            className="form-control" 
            value={planId} 
            disabled 
          />
        </div>
        
        <div className="form-group">
          <label>Start Date</label>
          <input 
            type="date" 
            className="form-control" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            required 
          />
        </div>
        
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Processing...' : 'Confirm Subscription'}
        </button>
      </form>
    </div>
  );
};

export default CreateSubscription;
