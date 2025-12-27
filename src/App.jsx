import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import { auth, onAuthStateChanged } from "./screens/Services/firebase";

// GLOBAL COMPONENTS
import Header from "./components/Header";
import Footer from "./components/Footer";

// AUTH
import Login from "./screens/auth/Login";

// HOME
import Home from "./screens/Home/HomeScreen";

// EXPLORE
import Explore from "./screens/Explore/ExploreScreen";

// PROFILE
import Profile from "./screens/Profile/ProfileScreen";
import ProfileSetupWeb from "./screens/auth/ProfileSetupWeb";
import Bookings from "./screens/Profile/Bookings";
import YourConsultations from "./screens/Profile/YourConsultations";
import OrdersScreen from "./screens/OrdersScreen";

// STATIC PAGES
import TermsAndConditions from "./screens/TermsAndConditions";
import PrivacyPolicyPage from "./screens/auth/PrivacyPolicyPage";
import RefundPolicyPage from "./screens/auth/RefundPolicyPage";
import ShippingPolicyPage from "./screens/auth/ShippingPolicyPage";
import HelpSupportPage from "./screens/auth/HelpSupportPage";

// SERVICES
import HomeCareServicesScreen from "./screens/Services/HomeCareServicesScreen";
import WellnessTrainers from "./screens/Services/WellnessTrainers";
import TransplantConnect from "./screens/Services/TransplantConnect";
import VideoConsultation from "./screens/Services/VideoConsultation";
import Yoga from "./screens/Services/Yoga";
import Pilates from "./screens/Services/Pilates";
import Zumba from "./screens/Services/Zumba";
import PersonalTraining from "./screens/Services/PersonalTraining";
import WellnessPage from "./screens/Services/WellnessPage";
import SelfTestsPage from "./screens/Services/SelfTestsPage";

// PRODUCT CATEGORIES
import BabyCareProductsScreen from "./screens/products/BabyCareProductsScreen";
import BeautyProductsScreen from "./screens/products/BeautyProductsScreen";
import GymProductsScreen from "./screens/products/GymProductsScreen";
import MedicineProductsScreen from "./screens/products/MedicineProductsScreen";
import SexualProducts from "./screens/products/SexualProducts";
import SurgicalProducts from "./screens/products/SurgicalProducts";

// PRODUCT DETAILS + CART
import ProductDetail from "./screens/products/ProductDetail";
import CartScreen from "./screens/products/CartScreen";
import CheckoutScreen from "./screens/products/CheckoutScreen";

// ADDRESS
import AddressEditScreen from "./screens/products/AddressEditScreen";

// CONTACT
import ContactUs from "./screens/ContactUs";
import ActionPolicy from "./screens/ActionPolicy";

// DEPARTMENTS
import AllDepartments from "./screens/Departments/AllDepartments";
import DepartmentDetails from "./screens/Departments/DepartmentDetails";

// ===============================
// AUTH GUARD
// ===============================
function RequireAuth({ user, children }) {
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// ===============================
// ROUTES
// ===============================
function AppRoutes({ user }) {
  return (
    <Routes>
      {/* LOGIN */}
      <Route
        path="/login"
        element={user ? <Navigate to="/home" replace /> : <Login />}
      />

      {/* PROFILE SETUP (MANDATORY) */}
      <Route
        path="/profile-setup"
        element={
          <RequireAuth user={user}>
            <ProfileSetupWeb />
          </RequireAuth>
        }
      />

      {/* STATIC PAGES */}
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/refund-policy" element={<RefundPolicyPage />} />
      <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
      <Route path="/support" element={<HelpSupportPage />} />

      {/* HOME */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      {/* EXPLORE */}
      <Route path="/explore" element={<Explore />} />

      {/* PROFILE */}
      <Route
        path="/profile"
        element={
          <RequireAuth user={user}>
            <Profile />
          </RequireAuth>
        }
      />
      <Route
        path="/bookings"
        element={
          <RequireAuth user={user}>
            <Bookings />
          </RequireAuth>
        }
      />
      <Route
        path="/consultations"
        element={
          <RequireAuth user={user}>
            <YourConsultations />
          </RequireAuth>
        }
      />
      <Route
        path="/orders"
        element={
          <RequireAuth user={user}>
            <OrdersScreen />
          </RequireAuth>
        }
      />

      {/* SERVICES */}
      <Route path="/home-care-services" element={<HomeCareServicesScreen />} />
      <Route path="/wellness-trainers" element={<WellnessTrainers />} />
      <Route path="/TransplantConnect" element={<TransplantConnect />} />
      <Route path="/video-consultation" element={<VideoConsultation />} />
      <Route path="/yoga" element={<Yoga />} />
      <Route path="/pilates" element={<Pilates />} />
      <Route path="/zumba" element={<Zumba user={user} />} />
      <Route path="/personal-training" element={<PersonalTraining />} />
      <Route path="/wellness" element={<WellnessPage />} />
      <Route path="/self-tests" element={<SelfTestsPage />} />

      {/* DEPARTMENTS */}
      <Route path="/departments" element={<AllDepartments />} />
      <Route path="/department-details" element={<DepartmentDetails />} />

      {/* PRODUCTS */}
      <Route path="/babycare" element={<BabyCareProductsScreen />} />
      <Route path="/beauty" element={<BeautyProductsScreen />} />
      <Route path="/gym" element={<GymProductsScreen />} />
      <Route path="/medicines" element={<MedicineProductsScreen />} />
      <Route path="/sexual" element={<SexualProducts />} />
      <Route path="/surgical" element={<SurgicalProducts />} />

      {/* PRODUCT DETAILS */}
      <Route path="/product-details/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<CartScreen />} />

      {/* ADDRESS */}
      <Route
        path="/address"
        element={
          <RequireAuth user={user}>
            <AddressEditScreen />
          </RequireAuth>
        }
      />

      {/* CHECKOUT */}
      <Route
        path="/checkout"
        element={
          <RequireAuth user={user}>
            <CheckoutScreen />
          </RequireAuth>
        }
      />

      {/* CONTACT */}
      <Route path="/contact" element={<ContactUs />} />

      {/* CANCEL ORDER */}
      <Route
        path="/cancel-order"
        element={
          <RequireAuth user={user}>
            <ActionPolicy />
          </RequireAuth>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

// ===============================
// MAIN APP
// ===============================
export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <Header />

          <div className="min-h-[70vh] pt-6 px-4">
            <AppRoutes user={user} />
          </div>

          <Footer />
        </Router>
      </CartProvider>
    </UserProvider>
  );
}
