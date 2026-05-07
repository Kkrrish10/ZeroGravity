import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

const sizeTable = [
  { label: 'XS', bust: '30-32"', waist: '24-26"', hips: '34-36"' },
  { label: 'S', bust: '32-34"', waist: '26-28"', hips: '36-38"' },
  { label: 'M', bust: '34-36"', waist: '28-30"', hips: '38-40"' },
  { label: 'L', bust: '36-38"', waist: '30-32"', hips: '40-42"' },
  { label: 'XL', bust: '38-40"', waist: '32-34"', hips: '42-44"' },
];

export default function SizeGuide() {
  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="mx-auto max-w-4xl rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm">
          <h1 className="font-display text-4xl font-bold text-neutral-900">Size Guide</h1>
          <p className="mt-4 text-neutral-600">Use this guide to find the right fit for our clothing collection.</p>

          <div className="mt-10 overflow-hidden rounded-3xl border border-neutral-100">
            <table className="w-full text-left text-sm text-neutral-700">
              <thead className="bg-neutral-50 text-neutral-900">
                <tr>
                  <th className="px-6 py-4">Size</th>
                  <th className="px-6 py-4">Bust</th>
                  <th className="px-6 py-4">Waist</th>
                  <th className="px-6 py-4">Hips</th>
                </tr>
              </thead>
              <tbody>
                {sizeTable.map((row) => (
                  <tr key={row.label} className="border-t border-neutral-100 hover:bg-neutral-50">
                    <td className="px-6 py-4 font-semibold text-neutral-900">{row.label}</td>
                    <td className="px-6 py-4">{row.bust}</td>
                    <td className="px-6 py-4">{row.waist}</td>
                    <td className="px-6 py-4">{row.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
