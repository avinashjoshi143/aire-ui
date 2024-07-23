// src/App.js
import React from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Login from './components/login/login.component.jsx';
import RegisterForm from './components/register/register.component.jsx';
import styled from 'styled-components';
import NavBar from './components/topnav/nav.component.jsx';
import Home from './components/home/home.component.jsx';
import Footer from './components/footer/footer.component.jsx';
import HomePage from './components/home-page/home-page.component.jsx';
import ForgotPasswordForm from './components/forgot-password-flow/forgotPasswordForm/forgotPassword.jsx';
import VerifyEmailForm from './components/forgot-password-flow/emailVerificationForm/verifyEmail.jsx';
import ResetPasswordForm from './components/forgot-password-flow/resetPasswordForm/resetPassword.jsx';

const AppContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
`;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/register',
    element: <RegisterForm />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/login/forgot-password',
    element: <ForgotPasswordForm />,
  },
  {
    path: '/login/verify-email/:email',
    element: <VerifyEmailForm />,
  },
  {
    path: '/login/reset-password/:email',
    element: <ResetPasswordForm />,
  }
]);

const App = () => {
  return (
    <AppContainer>
      <NavBar />
      <Outlet />
      <RouterProvider router={router} />
      <Footer />
    </AppContainer>
  );
};

export default App;
