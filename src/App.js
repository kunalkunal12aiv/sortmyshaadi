import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/navbar';
import ErrorBoundary from './utils/errorBoundary';
import { LoadingFallback } from './utils/loadingFallback';
import { CartProvider } from './contexts/CartContext';
import Cart from './pages/Cart';
import { VenueOwnerProvider } from './contexts/VenueOwnerContext';
import VenueOwnerRoute from './components/VenueOwnerRoute';

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
const PhoneVerification = React.lazy(() => import('./components/PhoneVerification'));
const AddPreviousWeddings = React.lazy(() => import('./pages/AddPreviousWeddings'));
const VenueManagement = React.lazy(() => import('./pages/venue-owner/VenueManagement'));
const VenueOwnerAuth = React.lazy(() => import('./pages/auth/VenueOwnerAuth'));
const VenueOwnerDashboard = React.lazy(() => import('./pages/venue-owner/Dashboard'));
const VenueOwnerProfile = React.lazy(() => import('./pages/venue-owner/Profile'));
const VenueOwnerBookings = React.lazy(() => import('./pages/venue-owner/Bookings'));
const WeddingEvents = React.lazy(() => import('./pages/WeddingEvents'));

function App() {
  return (
    <ErrorBoundary>
      <GoogleOAuthProvider clientId="532030902759-20ucr69j9578qkprl0dvjnmhvjdlbe02.apps.googleusercontent.com">
        <CartProvider>
          <Router>
            <AuthProvider>
              <VenueOwnerProvider>
                <div className="App">
                  <Navbar />
                  <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<Home />} />
                      <Route path="/venues" element={<VenueList />} />
                      <Route path="/venue/:id" element={<VenueDetail />} />
                      <Route path="/decor" element={<DecorList />} />
                      <Route path="/decor/:categoryId" element={<DecorCategory />} />
                      <Route path="/decor/:categoryId/:itemId" element={<DecorDetail />} />
                      <Route path="/budget-calculator" element={<BudgetCalculator />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/signin" element={<GoogleSignIn />} />
                      <Route path="/signup" element={<SignUp />} />

                      {/* Auth Routes */}
                      <Route path="/phone-verification" element={<PhoneVerification />} />

                      {/* Admin Protected Routes */}
                      <Route 
                        path="/calendar" 
                        element={
                          <AdminRoute>
                            <Calendar />
                          </AdminRoute>
                        } 
                      />
                      <Route 
                        path="/bulk-upload" 
                        element={
                          <AdminRoute>
                            <BulkUpload />
                          </AdminRoute>
                        } 
                      />
                      <Route 
                        path="/calendar-manager" 
                        element={
                          <AdminRoute>
                            <CalendarManager />
                          </AdminRoute>
                        } 
                      />
                      <Route 
                        path="/manage-venues" 
                        element={
                          <AdminRoute>
                            <VenueList2 />
                          </AdminRoute>
                        } 
                      />
                      <Route 
                        path="/edit-venue/:id" 
                        element={
                          <AdminRoute>
                            <EditVenue />
                          </AdminRoute>
                        } 
                      />
                      <Route 
                        path="/add-venue" 
                        element={
                          <AdminRoute>
                            <AddVenue />
                          </AdminRoute>
                        } 
                      />
                      <Route 
                        path="/add-previous-weddings/:venueId" 
                        element={
                          <AdminRoute>
                            <AddPreviousWeddings />
                          </AdminRoute>
                        } 
                      />
                      <Route
                        path="/venue-owner/add-previous-weddings"
                        element={
                          <AdminRoute>
                            <AddPreviousWeddings />
                          </AdminRoute>
                        }
                      />

                      {/* Venue Owner Routes */}
                      <Route path="/venue-owner/auth" element={<VenueOwnerAuth />} />
                      <Route
                        path="/venue-owner/dashboard"
                        element={
                          <VenueOwnerRoute>
                            <VenueOwnerDashboard />
                          </VenueOwnerRoute>
                        }
                      />
                      <Route
                        path="/venue-owner/profile"
                        element={
                          <VenueOwnerRoute>
                            <VenueOwnerProfile />
                          </VenueOwnerRoute>
                        }
                      />
                      <Route
                        path="/venue-owner/bookings"
                        element={
                          <VenueOwnerRoute>
                            <VenueOwnerBookings />
                          </VenueOwnerRoute>
                        }
                      />
                      <Route
                        path="/venue-owner/manage"
                        element={
                          <VenueOwnerRoute>
                            <VenueManagement />
                          </VenueOwnerRoute>
                        }
                      />
                      <Route
                        path="/venue-owner/add-previous-weddings/:venueId"
                        element={
                          <VenueOwnerRoute>
                            <AddPreviousWeddings />
                          </VenueOwnerRoute>
                        }
                      />
                      <Route path="/wedding-events/:venueId" element={<WeddingEvents />} />
                    </Routes>
                  </Suspense>
                </div>
              </VenueOwnerProvider>
            </AuthProvider>
          </Router>
        </CartProvider>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  );
}

export default App;