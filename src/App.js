import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ErrorBoundary from './utils/errorBoundary';
import { LoadingFallback } from './utils/loadingFallback';
import { CartProvider } from './contexts/CartContext';
import SidebarNav from './components/navigation/SidebarNav';
import Unauthorized from './pages/Unauthorized';
import { VenueOwnerProvider } from './contexts/VenueOwnerContext';
import { ShortlistProvider } from './contexts/ShortlistContext';
import WebsiteDashboard from './pages/website/WebsiteDashboard';
import EditWebsite from './pages/website/EditWebsite';
import GuestBook from './pages/website/GuestBook';
import GroupChat from './pages/website/GroupChat';
import WebsiteBuilder from './pages/website-builder/WebsiteBuilder';
import WebsiteTemplate from './components/website-builder/WebsiteTemplate';

// Lazy load components
const Cart = React.lazy(() => import('./pages/Cart'));
const ComparePage = React.lazy(() => import('./pages/ComparePage'));
const Home = React.lazy(() => import('./pages/home'));
const VenueList = React.lazy(() => import('./pages/vanuelist'));
const VenueDetail = React.lazy(() => import('./pages/vanuedetail'));
const EditVenue = React.lazy(() => import('./pages/editvanue'));
const VenueList2 = React.lazy(() => import('./pages/VenueList'));
const DecorList = React.lazy(() => import('./pages/decor/decorhome'));
const DecorDetail = React.lazy(() => import('./pages/decor/decor_detail'));
const DecorCategory = React.lazy(() => import('./pages/decor/decor_category'));
const BudgetCalculator = React.lazy(() => import('./pages/budgetcalculator'));
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
const Shortlist = React.lazy(() => import('./pages/Shortlist'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const GuestList = React.lazy(() => import('./components/guest-list/GuestList'));
const WeddingChecklist = React.lazy(() => import('./components/checklist/WeddingChecklist'));
const VendorManagement = React.lazy(() => import('./components/vendors/VendorManagement'));
const SavedItems = React.lazy(() => import('./components/saved/SavedItems'));
const Timeline = React.lazy(() => import('./components/timeline/Timeline'));
const Settings = React.lazy(() => import('./components/settings/Settings'));
const Budget = React.lazy(() => import('./components/budget/Budget'));
const Profile = React.lazy(() => import('./components/profile/Profile'));
const RSVP = React.lazy(() => import('./pages/RSVP'));
const InvitationPage = React.lazy(() => import('./pages/InvitationPage'));

function AppContent() {
  const location = useLocation();
  const isPublicWebsite = location.pathname.startsWith('/sites/');
  const sidebarPaths = [
    '/dashboard',
    '/guest-list',
    '/checklist',
    '/vendors',
    '/saved',
    '/timeline',
    '/budget',
    '/website-builder',
    '/settings',
    '/profile'
  ];
  const showSidebar = sidebarPaths.includes(location.pathname);

  return (
    <div className="flex h-screen">
      {!isPublicWebsite && showSidebar && <SidebarNav />}
      <div className="flex-1 overflow-auto">
        {!isPublicWebsite && <Navbar />}
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
            <Route path="/shortlist" element={<Shortlist />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/rsvp/:guestId" element={<RSVP />} />
            <Route path="/invitation/:guestId" element={<InvitationPage />} />

            {/* Auth Routes */}
            <Route path="/phone-verification" element={<PhoneVerification />} />

            {/* Admin Protected Routes */}
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/bulk-upload" element={<BulkUpload />} />
            <Route path="/calendar-manager" element={<CalendarManager />} />
            <Route path="/manage-venues" element={<VenueList2 />} />
            <Route path="/edit-venue/:id" element={<EditVenue />} />
            <Route path="/add-venue" element={<AddVenue />} />
            <Route path="/add-previous-weddings/:venueId" element={<AddPreviousWeddings />} />
            <Route path="/venue-owner/add-previous-weddings" element={<AddPreviousWeddings />} />

            {/* Venue Owner Routes */}
            <Route path="/venue-owner/auth" element={<VenueOwnerAuth />} />
            <Route path="/venue-owner/dashboard" element={<VenueOwnerDashboard />} />
            <Route path="/venue-owner/profile" element={<VenueOwnerProfile />} />
            <Route path="/venue-owner/bookings" element={<VenueOwnerBookings />} />
            <Route path="/venue-owner/manage" element={<VenueManagement />} />
            <Route path="/venue-owner/add-previous-weddings/:venueId" element={<AddPreviousWeddings />} />
            <Route path="/wedding-events/:venueId" element={<WeddingEvents />} />

            {/* Routes that were wrapped in PrivateRoute */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/guest-list" element={<GuestList />} />
            <Route path="/checklist" element={<WeddingChecklist />} />
            <Route path="/vendors" element={<VendorManagement />} />
            <Route path="/saved" element={<SavedItems />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* New Website System Routes */}
            <Route path="/website" element={<WebsiteDashboard />} />
            <Route path="/website/edit" element={<EditWebsite />} />
            <Route path="/website/guestbook" element={<GuestBook />} />
            <Route path="/website/chat" element={<GroupChat />} />

            {/* Website Builder Routes */}
            <Route path="/website-builder" element={<WebsiteBuilder />} />
            <Route 
              path="/sites/:slug" 
              element={
                <WebsiteTemplate 
                  key={location.pathname}  // Force re-render on route change
                />
              } 
            />
          </Routes>
        </Suspense>
        {!isPublicWebsite && <Footer />}
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <GoogleOAuthProvider clientId="532030902759-20ucr69j9578qkprl0dvjnmhvjdlbe02.apps.googleusercontent.com">
        <CartProvider>
          <Router>
            <AuthProvider>
              <VenueOwnerProvider>
                <ShortlistProvider>
                  <AppContent />
                </ShortlistProvider>
              </VenueOwnerProvider>
            </AuthProvider>
          </Router>
        </CartProvider>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  );
}

export default App;