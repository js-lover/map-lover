import React from 'react';
import { Slot, Redirect } from 'expo-router';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function PublicLayout() {
  const { isLoading, isLoggedIn } = useAuthContext();

  if (isLoading) return null;
  if (isLoggedIn) return <Redirect href="/private" />;
  return <Slot />;
}
