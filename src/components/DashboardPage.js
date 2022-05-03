import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import ManageRooms from './ManageRooms.js';
import Auth from './Auth.js';
import ProtectedRoute from './ProtectedRoute.js';
import CustomAppBar from './CustomAppBar.js';
import Home from './Home';
import theme from '../Theme/Theme.js';
import Audit from './Audit.js';

function DashboardPage() {
  React.useEffect(() => {}, []);

  const handleLogin = () => {};
  return (
    <ThemeProvider theme={theme}>
      <Grid container gap={1}>
        <Grid item xs={12}>
          <Routes>
            <Route path="/login" element={<Auth handleLogin={handleLogin} />} />
            <Route path="/" element={<Auth handleLogin={handleLogin} />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute role="USER">
                  <CustomAppBar></CustomAppBar>
                  <Home></Home>
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage"
              element={
                <ProtectedRoute role="ADMIN">
                  <CustomAppBar></CustomAppBar>
                  <ManageRooms></ManageRooms>
                </ProtectedRoute>
              }
            />
            <Route
              path="/audit"
              element={
                <ProtectedRoute role="ADMIN">
                  <CustomAppBar></CustomAppBar>
                  <Audit></Audit>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default DashboardPage;
