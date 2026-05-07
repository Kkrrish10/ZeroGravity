import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

export default function Contact() {
  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm">
          <h1 className="font-display text-4xl font-bold text-neutral-900">Contact Us</h1>
          <p className="mt-4 text-neutral-600">
            Have a question or need assistance? Our team is here to help with orders, sizing,
            shipping, and account support.
          </p>

          <div className="mt-8 space-y-6 text-neutral-700">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">Customer Support</h2>
              <p className="mt-2 text-sm">
                Email us at <a href="mailto:support@zerogravity.com" className="text-neutral-900 underline">support@zerogravity.com</a> and we’ll respond within one business day.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">Order help</h2>
              <p className="mt-2 text-sm">
                Include your order number and a short description of the issue, and our team will
                follow up with next steps.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">General inquiries</h2>
              <p className="mt-2 text-sm">For collaboration, partnership, or press requests, please email hello@zerogravity.com.</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/support">
              <Button variant="secondary">Support Home</Button>
            </Link>
            <Link to="/faq">
              <Button>View FAQs</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
