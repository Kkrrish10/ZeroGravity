import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Search, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Shop', href: '/catalogue' },
    { name: 'New Arrivals', href: '/catalogue?sort=newest' },
    { name: 'Sale', href: '/catalogue?sale=true' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
      <nav className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900">
              <span className="text-sm font-bold text-white">ZG</span>
            </div>
            <span className="font-display text-xl font-semibold tracking-tight">Zero Gravity</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <button className="p-2 text-neutral-600 hover:text-neutral-900" aria-label="Search">
              <Search className="h-5 w-5" />
            </button>

            {isAuthenticated ? (
              <>
                <Link
                  to="/cart"
                  className="relative p-2 text-neutral-600 hover:text-neutral-900"
                  aria-label="Shopping cart"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-xs font-medium text-white">
                      {itemCount > 9 ? '9+' : itemCount}
                    </span>
                  )}
                </Link>

                <div className="relative group">
                  <button className="flex items-center space-x-1 p-2 text-neutral-600 hover:text-neutral-900">
                    <User className="h-5 w-5" />
                  </button>
                  <div className="invisible absolute right-0 top-full w-48 rounded-lg border border-neutral-100 bg-white py-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                    <div className="border-b border-neutral-100 px-4 py-2">
                      <p className="text-sm font-medium text-neutral-900">{user?.firstName}</p>
                      <p className="text-xs text-neutral-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/profile?tab=orders"
                      className="block px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-neutral-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="p-2 text-neutral-600 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-neutral-100 py-4 md:hidden">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block rounded-lg px-4 py-2.5 text-base font-medium text-neutral-600 hover:bg-neutral-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-4 border-t border-neutral-100 pt-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/cart"
                    className="flex items-center justify-between rounded-lg px-4 py-2.5 text-base font-medium text-neutral-600 hover:bg-neutral-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Cart</span>
                    {itemCount > 0 && (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-xs font-medium text-white">
                        {itemCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/profile"
                    className="block rounded-lg px-4 py-2.5 text-base font-medium text-neutral-600 hover:bg-neutral-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full rounded-lg px-4 py-2.5 text-left text-base font-medium text-red-600 hover:bg-neutral-50"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <div className="space-y-2 px-4">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="secondary" className="w-full">
                      Log in
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full">Sign up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
