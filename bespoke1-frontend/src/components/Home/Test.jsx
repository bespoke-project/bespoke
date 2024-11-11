import React from 'react';
import { useAuth } from '../../context/AuthProvider';

function Test() {
  const { userData } = useAuth();
  return <div>{userData.firstName}</div>;
}

export default Test;
