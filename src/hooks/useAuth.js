import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { getCurrentUser, setUser } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // For mock data, we'll simulate a logged-out state
    // In a real app, this would check for stored tokens and validate them
    const mockUser = localStorage.getItem('mockUser');
    if (mockUser) {
      dispatch(setUser(JSON.parse(mockUser)));
    }
  }, [dispatch]);

  return { user, loading, error };
};