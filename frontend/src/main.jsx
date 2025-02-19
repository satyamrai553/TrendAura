
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Home, Contact, About, PageNotFound, Login, Signup, Cart, ProductPage, ProductsByCategory } from './pages/index.js';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider
import store  from './store/store.js';  // Import the store


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} /> 
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path=":tag" element={<ProductsByCategory />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="cart" element={<Cart />} />
      <Route path="product/:_id" element={<ProductPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
