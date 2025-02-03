// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Home, Contact, About, PageNotFound, Login, Signup, Cart, ProductsPage } from './pages/index.js';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider
import store  from './store/store.js';  // Import the store

// Define the router with routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Define child routes */}
      <Route index element={<Home />} /> {/* Default route */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="new" element={<ProductsPage />} />
      <Route path="women" element={<ProductsPage />} />
      <Route path="men" element={<ProductsPage />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="cart" element={<Cart />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

// Render the app with Redux Provider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  {/* Ensure Provider is here */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
