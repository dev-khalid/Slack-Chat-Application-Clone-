import './Firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';

export default function PrivateRoute({ children }) {
  //useAuth hook.
  const [currentUser, setCurrentUser] = useState(true);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
    setLoading(false);
  });
  return loading ? (
    <Spin size="large" tip='Loading...'/>
  ) : currentUser ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}
