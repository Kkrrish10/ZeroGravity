import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import SignupForm from '../components/auth/SignupForm';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <div className="container-custom flex min-h-[70vh] items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-neutral-900">Create an account</h1>
            <p className="mt-2 text-neutral-600">Join Zero Gravity for exclusive student deals</p>
          </div>

          <div className="mt-8">
            <SignupForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}
