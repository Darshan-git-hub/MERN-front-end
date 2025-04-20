import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AutomobileForm from './components/AutomobileForm';
import AutomobileTable from './components/AutomobileTable';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/automobiles"
              element={
                <PrivateRoute>
                  <AutomobileTable />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-automobile"
              element={
                <PrivateRoute>
                  <AutomobileForm />
                </PrivateRoute>
              }
            />
          </Routes>
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;