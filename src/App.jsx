import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Pages/Home';
import ServicePage from './components/Pages/ServicePage';
import AboutPage from './components/Pages/AboutPage';
import BlogPage from './components/Pages/BlogPage';
import BlogListPage from './components/Pages/BlogListPage';
import BlogDetailsPage from './components/Pages/BlogDetailsPage';
import PortfolioPage from './components/Pages/PortfolioPage';
import PortfolioDetailsPage from './components/Pages/PortfolioDetailsPage';
import CaseStudyDetailsPage from './components/Pages/CaseStudyDetailsPage';
import TeamPage from './components/Pages/TeamPage';
import TeamDetailsPage from './components/Pages/TeamDetailsPage';
import ContactPage from './components/Pages/ContactPage';
import Layout2 from './components/Layout/Layout2';
import ServiceDetailsPage from './components/Pages/ServiceDetailsPage';
import Shop from './components/Pages/Shop';
import ProductDetails from './components/Pages/Shop/ProductDetails';
import Cart from './components/Pages/Shop/Cart';
import Checkout from './components/Pages/Shop/Checkout';
import Success from './components/Pages/Shop/Success';
import Wishlist from './components/Pages/Shop/Wishlist';
import Layout3 from './components/Layout/Layout3';
import ErrorPage from './components/Pages/ErrorPage';

// Admin imports
import ProtectedRoute from './components/Admin/ProtectedRoute';
import AuthRoute from './components/Admin/AuthRoute';
import Login from './pages/Admin/Auth/Login';
import ResetPassword from './pages/Admin/Auth/ResetPassword';
import Dashboard from './pages/Admin/Dashboard';
import PagesList from './pages/Admin/Pages/PagesList';
import BlogList from './pages/Admin/Blog/BlogList';
import PortfolioList from './pages/Admin/Portfolio/PortfolioList';
import ServicesList from './pages/Admin/Services/ServicesList';
import TeamList from './pages/Admin/Team/TeamList';
import FaqsList from './pages/Admin/Faqs/FaqsList';
import MediaLibrary from './pages/Admin/Media/MediaLibrary';
import NavigationManager from './pages/Admin/Navigation/NavigationManager';
import Settings from './pages/Admin/Settings/Settings';
import FormsInbox from './pages/Admin/Forms/FormsInbox';
import UsersList from './pages/Admin/Users/UsersList';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="about" element={<AboutPage />} />
        <Route path="service" element={<ServicePage />} />
        <Route
          path="service/:serviceDetailsId"
          element={<ServiceDetailsPage />}
        />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog-list" element={<BlogListPage />} />
        <Route path="blog/:blogDetailsId" element={<BlogDetailsPage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route
          path="portfolio/:portfolioDetailsId"
          element={<PortfolioDetailsPage />}
        />
        <Route path="case-study-details" element={<CaseStudyDetailsPage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="team/:teamDetailsId" element={<TeamDetailsPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
      <Route path="/" element={<Layout2 />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/" element={<Layout3 />}>
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:productId" element={<ProductDetails />} />
        <Route path="shop/cart" element={<Cart />} />
        <Route path="shop/checkout" element={<Checkout />} />
        <Route path="shop/success" element={<Success />} />
      <Route path="shop/wishlist" element={<Wishlist />} />
      </Route>

      {/* Admin Auth Routes */}
      <Route path="/admin/auth" element={<AuthRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="pages" element={<PagesList />} />
        <Route path="blog" element={<BlogList />} />
        <Route path="portfolio" element={<PortfolioList />} />
        <Route path="services" element={<ServicesList />} />
        <Route path="team" element={<TeamList />} />
        <Route path="faqs" element={<FaqsList />} />
        <Route path="media" element={<MediaLibrary />} />
        <Route path="navigation" element={<NavigationManager />} />
        <Route path="settings" element={<Settings />} />
        <Route path="forms" element={<FormsInbox />} />
        <Route path="users" element={<UsersList />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
