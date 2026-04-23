import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import MealPlanList from './components/MealPlanList';
import CreateSubscription from './components/CreateSubscription';
import ViewSubscription from './components/ViewSubscription';

function App() {
  return (
    <Router>
      <div className="container">
        <header className="header">
          <h1>🐾 Pet Meal Subscription</h1>
          <p style={{ color: '#6c757d', fontSize: '1.1rem' }}>
            Provide your furry friend with the best nutrition.
          </p>
        </header>

        <nav className="nav">
          <NavLink to="/" end>Meal Plans</NavLink>
          <NavLink to="/my-subscription">My Subscription</NavLink>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<MealPlanList />} />
            <Route path="/subscribe/:planId" element={<CreateSubscription />} />
            <Route path="/my-subscription" element={<ViewSubscription />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
