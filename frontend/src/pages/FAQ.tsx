import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

const faqs = [
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping typically arrives within 5–7 business days.'
  },
  {
    question: 'What is your returns policy?',
    answer: 'Items can be returned within 30 days of delivery for a full refund when returned in original condition.'
  },
  {
    question: 'Can I change my order after checkout?',
    answer: 'We can often update orders before they ship — email support as soon as possible.'
  },
  {
    question: 'Do you offer student discounts?',
    answer: 'Yes. Sign up for our newsletter to receive exclusive student offers and updates.'
  }
];

export default function FAQ() {
  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm">
          <h1 className="font-display text-4xl font-bold text-neutral-900">FAQs</h1>
          <p className="mt-4 text-neutral-600">Find answers to the most common questions about shipping, returns, and orders.</p>

          <div className="mt-10 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-3xl border border-neutral-100 bg-neutral-50 p-6">
                <h2 className="text-xl font-semibold text-neutral-900">{faq.question}</h2>
                <p className="mt-2 text-sm text-neutral-700">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/support">
              <Button variant="secondary">Support Home</Button>
            </Link>
            <Link to="/contact">
              <Button>Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
