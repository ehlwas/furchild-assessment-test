import React, { useState, useEffect } from 'react';
import api from '../api';

const ViewSubscription = () => {
  const [userId, setUserId] = useState(1);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSubscription = async (id) => {
    setLoading(true);
    setError(null);
    setSubscription(null);
    
    try {
      const response = await api.get(`/subscriptions/${id}`);
      setSubscription(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('No active subscription found for this user.');
      } else {
        setError('Failed to fetch subscription details.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch immediately for default user 1
  useEffect(() => {
    fetchSubscription(userId);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchSubscription(userId);
  };

  return (
    <div>
      <div className="card" style={{ marginBottom: '2rem' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ margin: 0, flex: 1 }}>
            <label>View Subscription for User ID</label>
            <input 
              type="number" 
              className="form-control" 
              value={userId} 
              onChange={(e) => setUserId(e.target.value)} 
              min="1"
            />
          </div>
          <button type="submit" className="btn" style={{ width: 'auto' }} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {subscription && (
        <div className="card">
          <h2>Current Subscription</h2>
          <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
            <div>
              <strong>Status: </strong>
              <span style={{ 
                background: '#d4edda', 
                color: '#155724', 
                padding: '0.25rem 0.5rem', 
                borderRadius: '4px',
                textTransform: 'capitalize',
                fontWeight: 'bold'
              }}>
                {subscription.status}
              </span>
            </div>
            <div>
              <strong>Start Date: </strong> {new Date(subscription.start_date).toLocaleDateString()}
            </div>
            {subscription.mealPlan && (
              <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
                <h3 style={{ marginTop: 0, color: '#4ecdc4' }}>{subscription.mealPlan.name}</h3>
                <p>{subscription.mealPlan.description}</p>
                <div style={{ fontWeight: 'bold' }}>
                  ${parseFloat(subscription.mealPlan.price).toFixed(2)} / month
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewSubscription;
