import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Truck, RefreshCw, Shield } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/ui/Button';
import { useFeaturedProducts } from '../hooks/useProducts';

export default function Home() {
  const { products, isLoading } = useFeaturedProducts();

  const features = [
    {
      icon: Sparkles,
      title: 'College-Approved',
      description: 'Every piece meets dress code standards',
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over ₹1000',
    },
    {
      icon: RefreshCw,
      title: 'Easy Returns',
      description: '30-day hassle-free returns',
    },
    {
      icon: Shield,
      title: 'Student Prices',
      description: 'Affordable style for every budget',
    },
  ];

  const categories = [
    {
      name: 'Tops',
      image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80',
      href: '/catalogue?category=tops',
    },
    {
      name: 'Bottoms',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',
      href: '/catalogue?category=bottoms',
    },
    {
      name: 'Outerwear',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
      href: '/catalogue?category=outerwear',
    },
    {
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?w=600&q=80',
      href: '/catalogue?category=accessories',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black" />
        <div className="container-custom relative py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              New Season Collection
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Dress Code Ready.
              <br />
              <span className="text-neutral-400">Campus Cool.</span>
            </h1>
            <p className="mt-6 text-lg text-neutral-300">
              Stylish, affordable clothing designed for students. Look your best while staying
              within dress code guidelines.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/catalogue">
                <Button size="lg" variant="secondary">
                  Shop Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/catalogue?category=tops">
                <Button
                  size="lg"
                  variant="ghost"
                  className="border border-white/20 text-white hover:bg-white/10"
                >
                  Explore Tops
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute -right-48 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary-500/20 to-purple-500/20 blur-3xl" />
      </section>

      {/* Features */}
      <section className="border-b border-neutral-100 bg-neutral-50">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center space-x-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-900">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900">{feature.title}</h3>
                  <p className="text-xs text-neutral-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-neutral-900 md:text-3xl">
                Shop by Category
              </h2>
              <p className="mt-2 text-neutral-600">Find exactly what you're looking for</p>
            </div>
            <Link
              to="/catalogue"
              className="hidden items-center text-sm font-medium text-neutral-900 hover:underline md:flex"
            >
              View all categories
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="font-display text-xl font-semibold text-white">{category.name}</h3>
                  <span className="mt-1 flex items-center text-sm text-white/80">
                    Shop now
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <div className="container-custom">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-neutral-900 md:text-3xl">
                Featured Picks
              </h2>
              <p className="mt-2 text-neutral-600">Our most-loved styles this season</p>
            </div>
            <Link
              to="/catalogue?featured=true"
              className="hidden items-center text-sm font-medium text-neutral-900 hover:underline md:flex"
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8">
            <ProductGrid products={products} isLoading={isLoading} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="overflow-hidden rounded-3xl bg-neutral-900 text-white">
            <div className="grid md:grid-cols-2">
              <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                <h2 className="font-display text-3xl font-bold md:text-4xl">
                  Get 15% off your first order
                </h2>
                <p className="mt-4 text-neutral-300">
                  Sign up for our newsletter and receive exclusive student discounts, early access
                  to sales, and style tips for campus life.
                </p>
                <form className="mt-8 flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-white placeholder:text-neutral-500 focus:border-white focus:outline-none"
                  />
                  <Button variant="secondary">
                    Subscribe
                  </Button>
                </form>
              </div>
              <div className="hidden md:block">
                <img
                  src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80"
                  alt="Students wearing Zero Gravity clothing"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
