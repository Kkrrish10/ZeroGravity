import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

export default function Shipping() {
  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm">
          <h1 className="font-display text-4xl font-bold text-neutral-900">Shipping</h1>
          <p className="mt-4 text-neutral-600">
            We offer reliable shipping for students across the country with fast delivery on all orders.
          </p>

          <div className="mt-8 space-y-6 text-neutral-700">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">Standard shipping</h2>
              <p className="mt-2 text-sm">Most orders arrive within 5–7 business days after shipment.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">Free shipping</h2>
              <p className="mt-2 text-sm">Enjoy free standard shipping on orders over ₹1000.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">Order tracking</h2>
              <p className="mt-2 text-sm">You’ll receive tracking details by email as soon as your order ships.</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/support">
              <Button variant="secondary">Support Home</Button>
            </Link>
            <Link to="/returns">
              <Button>Returns</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
