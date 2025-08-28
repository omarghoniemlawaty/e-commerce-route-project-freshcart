import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import CartContextProvider from './Store/CartContextProvider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WishlistContextProvider from './Store/WishlistContextProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
          <CartContextProvider>
            <WishlistContextProvider> 
              <App />
            </WishlistContextProvider>
          </CartContextProvider>
);

