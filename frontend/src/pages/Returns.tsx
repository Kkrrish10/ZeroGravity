import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

export default function Returns() {
  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm">
          <h1 className="font-display text-4xl font-bold text-neutral-900">Returns</h1>
          <p className="mt-4 text-neutral-600">
            Our return policy is designed to be easy and stress-free for students.
          </p>

          <div className="mt-8 space-y-6 text-neutral-700">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">30-day returns</h2>
              <p className="mt-2 text-sm">Return items within 30 days of delivery for a full refund.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">Easy process</h2>
              <p className="mt-2 text-sm">Fill out the return form in your account and ship the items back in their original condition.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">Refund timing</h2>
              <p className="mt-2 text-sm">Refunds are issued within 5 business days after we receive the returned package.</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/support">
              <Button variant="secondary">Support Home</Button>
            </Link>
            <Link to="/shipping">
              <Button>Shipping</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
