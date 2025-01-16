import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/navbar';
import Home from './pages/home';
import VenueList from './pages/vanuelist';
import VenueDetail from './pages/vanuedetail';
import EditVenue from './pages/editvanue';
import VenueList2 from './pages/VenueList';
import DecorList from './pages/decor/decorhome';
import DecorDetail from './pages/decor/decor_detail';
import DecorCategory from './pages/decor/decor_category';  // Changed import name
import BudgetCalculator from './pages/budgetcalculator';
import AdminRoute from './components/PrivateRoute';
import AddVenue from './pages/AddVenue';
import BulkUpload from './pages/BulkUpload';    
import CalendarManager from './pages/CalendarManager';
import GoogleSignIn from './pages/auth/signin';
import SignUp from './pages/auth/signup';
import Calendar from './components/calendar/calendar';
import { CartProvider } from './contexts/CartContext';
import Cart from './pages/Cart';

function App() {
  return (
    <GoogleOAuthProvider clientId="532030902759-20ucr69j9578qkprl0dvjnmhvjdlbe02.apps.googleusercontent.com">
      <CartProvider>
        <Router>
          <AuthProvider>
            <div className="App">
              <Navbar />
              <Routes>
                <Route path="/venues" element={<VenueList />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/bulk-upload" element={<BulkUpload />} />
                <Route path="/signin" element={<GoogleSignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/calendar-manager" element={<CalendarManager />} />
                <Route path="/venue/:id" element={<VenueDetail />} />
                <Route path="/manage-venues" element={<VenueList2 />} />
                <Route path="/edit-venue/:id" element={<EditVenue />} />
                <Route path="/decor" element={<DecorList />} />
                <Route path="/decor/:categoryId" element={<DecorCategory />} />
                <Route path="/decor/:categoryId/:itemId" element={<DecorDetail />} />
                <Route path="/" element={<Home />} />
                <Route path="/budget-calculator" element={<BudgetCalculator />} />
                <Route path="/cart" element={<Cart />} />
                <Route 
                  path="/add-venue" 
                  element={
                    <AdminRoute>
                      <AddVenue />
                    </AdminRoute>
                  } 
                />
              </Routes>
            </div>
          </AuthProvider>
        </Router>
      </CartProvider>
    </GoogleOAuthProvider>
  );
}

export default App;