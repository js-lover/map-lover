import React from 'react';
import { Redirect } from 'expo-router';
import { useAuthContext } from './hooks/useAuthContext';

export default function RootRedirect() {
  const { isLoading, isLoggedIn } = useAuthContext();

  if (isLoading) return null; // veya loading UI
  return <Redirect href={isLoggedIn ? '/private' : '/public'} />;
}