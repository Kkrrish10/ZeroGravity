import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <Layout>
      <div className="container-custom flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <h1 className="font-display text-6xl font-bold text-neutral-900">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-neutral-700">Page not found</h2>
        <p className="mt-2 max-w-md text-neutral-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="mt-8">
          <Button size="lg">Back to Home</Button>
        </Link>
      </div>
    </Layout>
  );
}
