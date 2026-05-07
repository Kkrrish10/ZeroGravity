import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

const supportLinks = [
  { name: 'Contact Us', href: '/contact' },
  { name: 'FAQs', href: '/faq' },
  { name: 'Shipping', href: '/shipping' },
  { name: 'Returns', href: '/returns' },
  { name: 'Size Guide', href: '/size-guide' },
];

export default function Support() {
  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm">
          <h1 className="font-display text-4xl font-bold text-neutral-900">Support</h1>
          <p className="mt-4 text-neutral-600">
            Need help? Find answers to common questions, contact our team, and review shipping,
            returns, and size guidance.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {supportLinks.map((link) => (
              <Link key={link.name} to={link.href}>
                <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 transition hover:border-neutral-900 hover:bg-neutral-100">
                  <h2 className="text-lg font-semibold text-neutral-900">{link.name}</h2>
                  <p className="mt-2 text-sm text-neutral-600">
                    View {link.name.toLowerCase()} information and support resources.
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <Link to="/">
              <Button variant="secondary">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
