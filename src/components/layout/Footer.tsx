import React from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Programs', href: '/programs' },
    { name: 'Get Involved', href: '/volunteer' },
    { name: 'Success Stories', href: '/stories' },
    { name: 'Annual Reports', href: '/reports' },
    { name: 'Career', href: '/career' }
  ];

  const supportLinks = [
    { name: 'Donate Now', href: '/donate' },
    { name: 'Monthly Giving', href: '/monthly-giving' },
    { name: 'Corporate Partnership', href: '/partnership' },
    { name: 'Volunteer', href: '/volunteer' },
    { name: 'Fundraise for Us', href: '/fundraise' },
    { name: 'Leave a Gift in Your Will', href: '/legacy-giving' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Accessibility', href: '/accessibility' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated with Our Impact
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest updates on our programs, 
              events, and the lives we're changing together.
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white"
              />
              <Button variant="secondary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Organization Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Helping Hands</h3>
                <p className="text-gray-400 text-sm">Together We Make a Difference</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              We are a dedicated non-profit organization committed to improving lives 
              through education, healthcare, emergency relief, and community development 
              programs across Bangladesh.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  123 Charity Street, Dhaka 1000, Bangladesh
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+880 1234 567890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@helpinghands.org</span>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a 
                href="#" 
                className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-primary-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-primary-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-primary-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-primary-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support Us</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Impact Stats */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Impact</h4>
            <div className="space-y-4">
              <div>
                <p className="text-2xl font-bold text-primary-400">50,000+</p>
                <p className="text-gray-400 text-sm">Lives Impacted</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary-400">₹2.5M+</p>
                <p className="text-gray-400 text-sm">Total Donations</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary-400">500+</p>
                <p className="text-gray-400 text-sm">Active Volunteers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary-400">25+</p>
                <p className="text-gray-400 text-sm">Partner Organizations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Helping Hands. All rights reserved. | Registered Charity No: 123456789
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              {legalLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Donation CTA Bar */}
      <div className="bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-white font-medium">
                Your donation can change lives. Every contribution matters.
              </p>
            </div>
            <Link href="/donate">
              <Button 
                variant="secondary" 
                size="sm"
                rightIcon={<Heart className="h-4 w-4" />}
              >
                Donate Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;