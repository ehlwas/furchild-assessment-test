import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const MealPlanList = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await api.get('/meal-plans');
        setMealPlans(response.data);
      } catch (err) {
        setError('Failed to fetch meal plans.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlans();
  }, []);

  const handleSubscribe = (planId) => {
    navigate(`/subscribe/${planId}`);
  };

  if (loading) return <div>Loading meal plans...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div>
      <h2>Available Meal Plans</h2>
      <div className="grid">
        {mealPlans.map((plan) => (
          <div key={plan.id} className="card">
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <div className="price">${parseFloat(plan.price).toFixed(2)} / mo</div>
            <button 
              className="btn" 
              onClick={() => handleSubscribe(plan.id)}
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlanList;
