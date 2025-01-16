import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/navbar';
import ErrorBoundary from './utils/errorBoundary';
import { LoadingFallback } from './utils/loadingFallback';
import { CartProvider } from './contexts/CartContext';
import Cart from './pages/Cart';

// Lazy load components
const Home = React.lazy(() => import('./pages/home'));
const VenueList = React.lazy(() => import('./pages/vanuelist'));
const VenueDetail = React.lazy(() => import('./pages/vanuedetail'));
const EditVenue = React.lazy(() => import('./pages/editvanue'));
const VenueList2 = React.lazy(() => import('./pages/VenueList'));
const DecorList = React.lazy(() => import('./pages/decor/decorhome'));
const DecorDetail = React.lazy(() => import('./pages/decor/decor_detail'));
const DecorCategory = React.lazy(() => import('./pages/decor/decor_category'));
const BudgetCalculator = React.lazy(() => import('./pages/budgetcalculator'));
const AdminRoute = React.lazy(() => import('./components/PrivateRoute'));
const AddVenue = React.lazy(() => import('./pages/AddVenue'));
const BulkUpload = React.lazy(() => import('./pages/BulkUpload'));
const CalendarManager = React.lazy(() => import('./pages/CalendarManager'));
const GoogleSignIn = React.lazy(() => import('./pages/auth/signin'));
const SignUp = React.lazy(() => import('./pages/auth/signup'));
const Calendar = React.lazy(() => import('./components/calendar/calendar'));

function App() {
  return (
    <ErrorBoundary>
      <GoogleOAuthProvider clientId="532030902759-20ucr69j9578qkprl0dvjnmhvjdlbe02.apps.googleusercontent.com">
        <CartProvider>
          <Router>
            <AuthProvider>
              <div className="App">
                <Navbar />
                <Suspense fallback={<LoadingFallback />}>
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
                </Suspense>
              </div>
            </AuthProvider>
          </Router>
        </CartProvider>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  );
}

export default App;