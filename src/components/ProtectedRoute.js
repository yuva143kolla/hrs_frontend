import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getItemFromLocalStorage } from '../services/storageService';

const checkRole = (role, loginUser) => {
  if (role === 'ADMIN' && loginUser?.userRole.role === 'ADMIN') {
    return true;
  }
  if (role === 'USER') {
    return true;
  }
  return false;
};

const ProtectedRoute = ({ role, children }) => {
  const loginUser = getItemFromLocalStorage('user');

  const isValid = checkRole(role, loginUser);
  return isValid ? children : <Navigate to="/login" />;
};
ProtectedRoute.propTypes = {
  children: PropTypes.any,
  role: PropTypes.string,
};
export default ProtectedRoute;
