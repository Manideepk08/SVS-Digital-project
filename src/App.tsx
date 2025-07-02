import { Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ProductProvider } from './context/ProductContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Customers from './pages/admin/Customers';
import Orders from './pages/admin/Orders';
import Categories from './pages/admin/Categories';
import Settings from './pages/admin/Settings';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import AddProductForm from './components/AddProductForm';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <ProductProvider>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen bg-gray-50">
              {!isAdminRoute && <Header />}
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  {/* Admin routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route path="login" element={<AdminLoginPage />} />
                    <Route element={<ProtectedRoute />}>
                      <Route index element={<Dashboard />} />
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="dashboard/new-product" element={<AddProductForm />} />
                      <Route path="customers" element={<Customers />} />
                      <Route path="orders" element={<Orders />} />
                      <Route path="categories" element={<Categories />} />
                      <Route path="settings" element={<Settings />} />
                    </Route>
                  </Route>
                </Routes>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ProductProvider>
  );
}

export default App;