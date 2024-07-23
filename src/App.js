// src/App.js
import React from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Login from './components/login/login.component';
import RegisterForm from './components/register/register.component';
import styled from 'styled-components';
import NavBar from './components/topnav/nav.component';
import Home from './components/home/home.component';
import Footer from './components/footer/footer.component';
import HomePage from './components/home-page/home-page.component';
import ForgotPasswordForm from './components/forgot-password-flow/forgotPasswordForm/forgotPassword';
import VerifyEmailForm from './components/forgot-password-flow/emailVerificationForm/verifyEmail';
import ResetPasswordForm from './components/forgot-password-flow/resetPasswordForm/resetPassword';

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
