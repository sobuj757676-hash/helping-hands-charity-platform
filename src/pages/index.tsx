import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Heart, 
  Users, 
  Globe, 
  TrendingUp, 
  ArrowRight,
  Play,
  CheckCircle,
  Star
} from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const HomePage: React.FC = () => {
  const stats = [
    {
      icon: Heart,
      value: '₹2.5M+',
      label: 'Total Donations',
      color: 'text-red-500'
    },
    {
      icon: Users,
      value: '50,000+',
      label: 'Lives Impacted',
      color: 'text-blue-500'
    },
    {
      icon: Globe,
      value: '25+',
      label: 'Communities Served',
      color: 'text-green-500'
    },
    {
      icon: TrendingUp,
      value: '500+',
      label: 'Active Volunteers',
      color: 'text-purple-500'
    }
  ];

  const programs = [
    {
      title: 'Education Support',
      description: 'Providing quality education and learning opportunities to underprivileged children.',
      image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=250&fit=crop',
      impact: '15,000+ students supported',
      category: 'Education'
    },
    {
      title: 'Healthcare Access',
      description: 'Free medical camps and healthcare services for communities in need.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
      impact: '25,000+ patients treated',
      category: 'Health'
    },
    {
      title: 'Emergency Relief',
      description: 'Rapid response to natural disasters and emergency situations.',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=250&fit=crop',
      impact: '10,000+ families helped',
      category: 'Emergency'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Ahmed',
      role: 'Volunteer Coordinator',
      content: 'Being part of Helping Hands has been incredibly fulfilling. The platform makes it easy to coordinate volunteers and track our impact.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Mohammad Rahman',
      role: 'Monthly Donor',
      content: 'I love how transparent Helping Hands is about where my donations go. I can see exactly how my contributions are making a difference.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Fatima Khatun',
      role: 'Beneficiary',
      content: 'Thanks to Helping Hands, my children now have access to quality education. This organization truly changed our lives.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-charity-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge variant="info" className="mb-6 bg-white/20 text-white border-white/30">
                ✨ Together We Make a Difference
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Empowering Communities Through
                <span className="block text-yellow-300">Compassionate Action</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto lg:mx-0">
                Join our mission to create lasting positive change through volunteer work, 
                donations, and community support across Bangladesh.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/donate">
                  <Button size="lg" variant="secondary" rightIcon={<Heart className="h-5 w-5" />}>
                    Donate Now
                  </Button>
                </Link>
                <Link href="/volunteer">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                    Become a Volunteer
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-16 aspect-h-12 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop"
                  alt="Community helping hands"
                  width={800}
                  height={600}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">50,000+</p>
                    <p className="text-sm text-gray-600">Lives Changed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`inline-flex p-4 rounded-full bg-gray-50 mb-4`}>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We focus on sustainable development through education, healthcare, 
              and emergency relief programs that create lasting change.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group" padding={false}>
                <div className="relative h-48">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="primary">{program.category}</Badge>
                  </div>
                </div>
                <Card.Body>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {program.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-primary-600">
                      {program.impact}
                    </span>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Stories from Our Community
            </h2>
            <p className="text-xl text-gray-600">
              Hear from the people whose lives have been touched by our work
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <Card.Body>
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center justify-center space-x-3">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of compassionate individuals who are changing lives every day. 
            Your contribution, no matter how small, creates ripples of positive change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate">
              <Button size="lg" variant="secondary" rightIcon={<Heart className="h-5 w-5" />}>
                Start Donating Today
              </Button>
            </Link>
            <Link href="/volunteer">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                Join as Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default HomePage;