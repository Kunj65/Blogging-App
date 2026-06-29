import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css'
import { login, logout } from "./store/authSlice"
import { Header, Footer } from "./components"
import authService from "./appwrite/auth"
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  
useEffect(() => {
  // Proper error handling and add arrow function appropriately
    authService.getCurrentUser()
        .then((userData) => {
            if (userData) {
                dispatch(login({ userData }));
            } else {
                dispatch(logout());
            }
        })
        .finally(() => setLoading(false));
}, [dispatch]);

  return !loading ? (
    // Without <Outlet/> component and with procted routes without authentication use 
    // should not be able to see posta and can not create post
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet /> 
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App;