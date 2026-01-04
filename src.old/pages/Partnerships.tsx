import { motion } from 'framer-motion';
import { Building2, Users, TrendingUp, Heart, Calculator, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SEOHead } from '@/components/seo/SEOHead';
import { GlassmorphNav } from '@/components/navigation/GlassmorphNav';

export default function Partnerships() {
  const benefits = [
    { icon: Heart, title: 'Healthier Employees', description: 'Reduce sick days by up to 27%' },
    { icon: TrendingUp, title: 'Increased Productivity', description: 'Boost performance by 15%' },
    { icon: Users, title: 'Better Retention', description: 'Improve employee satisfaction' },
    { icon: Calculator, title: 'Cost Savings', description: 'Lower healthcare costs' },
  ];

  const packages = [
    {
      name: 'Starter',
      employees: '10-50',
      price: '$2,499',
      features: [
        'Group fitness classes',
        'Wellness workshops',
        'Health assessments',
        'Monthly progress reports',
        'Dedicated account manager',
      ],
    },
    {
      name: 'Professional',
      employees: '51-200',
      price: '$7,999',
      features: [
        'Everything in Starter',
        'Personal training sessions',
        'Nutrition consulting',
        'Custom wellness programs',
        'Quarterly executive reviews',
        'On-site fitness events',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      employees: '200+',
      price: 'Custom',
      features: [
        'Everything in Professional',
        'On-site gym setup consultation',
        'Executive coaching',
        'Mental health support',
        'Custom app integration',
        'Dedicated wellness team',
      ],
    },
  ];

  const clients = [
    { name: 'TechCorp', logo: '🚀', employees: 500 },
    { name: 'FinanceHub', logo: '💼', employees: 350 },
    { name: 'HealthPlus', logo: '🏥', employees: 800 },
    { name: 'StartupX', logo: '⚡', employees: 150 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-charcoal to-black">
      <SEOHead
        title="Corporate Wellness Programs | BenchBarrier for Business"
        description="Transform your workplace with BenchBarrier's corporate wellness programs. Improve employee health, productivity, and satisfaction."
        keywords="corporate wellness, employee fitness, workplace health, B2B fitness, corporate gym"
        canonicalUrl="/partnerships"
      />
      <GlassmorphNav />

      <div className="container mx-auto px-4 pt-32 pb-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6">
            <Building2 className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-semibold">CORPORATE WELLNESS</span>
          </div>

          <h1 className="font-playfair text-5xl lg:text-7xl font-bold text-white mb-6">
            Invest in Your Team's <span className="luxury-gradient">Wellness</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Elevate your company culture with elite fitness programs designed for modern workplaces.
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-charcoal/50 border border-gold/20 rounded-2xl p-6 text-center hover:border-gold/50 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </motion.div>

        {/* ROI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="bg-gradient-to-br from-gold/10 to-rose-gold/10 backdrop-blur-xl border border-gold/20 rounded-3xl p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-8">
              <Calculator className="w-8 h-8 text-gold" />
              <h2 className="font-playfair text-3xl font-bold text-white">ROI Calculator</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Label className="text-white mb-2 block">Number of Employees</Label>
                <Input
                  type="number"
                  placeholder="100"
                  className="bg-black/50 border-gold/30 text-white h-12"
                />
              </div>
              <div>
                <Label className="text-white mb-2 block">Average Salary</Label>
                <Input
                  type="number"
                  placeholder="75000"
                  className="bg-black/50 border-gold/30 text-white h-12"
                />
              </div>
            </div>

            <div className="mt-8 p-6 bg-black/30 rounded-xl border border-gold/20">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold luxury-gradient mb-2">$127K</div>
                  <div className="text-gray-400 text-sm">Annual Savings</div>
                </div>
                <div>
                  <div className="text-3xl font-bold luxury-gradient mb-2">15%</div>
                  <div className="text-gray-400 text-sm">Productivity Increase</div>
                </div>
                <div>
                  <div className="text-3xl font-bold luxury-gradient mb-2">27%</div>
                  <div className="text-gray-400 text-sm">Fewer Sick Days</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Packages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="font-playfair text-4xl font-bold text-white text-center mb-12">
            Corporate Packages
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-charcoal/50 backdrop-blur-xl border rounded-3xl p-8 ${
                  pkg.popular
                    ? 'border-gold shadow-2xl shadow-gold/20 scale-105'
                    : 'border-gold/20'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-gold to-rose-gold rounded-full">
                    <span className="text-black font-bold text-sm">MOST POPULAR</span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="text-gray-400 text-sm mb-4">{pkg.employees} employees</div>
                  <div className="text-4xl font-bold luxury-gradient">{pkg.price}</div>
                  <div className="text-gray-400 text-sm">per month</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-gold to-rose-gold text-black hover:shadow-xl hover:shadow-gold/50'
                      : 'bg-charcoal border border-gold/30 text-white hover:bg-gold/10'
                  }`}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trusted By */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-center text-gray-400 mb-8">Trusted by Leading Companies</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {clients.map((client, index) => (
              <div
                key={index}
                className="bg-charcoal/50 border border-gold/20 rounded-xl p-6 text-center"
              >
                <div className="text-4xl mb-2">{client.logo}</div>
                <div className="text-white font-semibold">{client.name}</div>
                <div className="text-gray-400 text-sm">{client.employees} employees</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-charcoal/80 backdrop-blur-xl border border-gold/20 rounded-3xl p-8 lg:p-12">
            <h2 className="font-playfair text-3xl font-bold text-white mb-6 text-center">
              Request Enterprise Consultation
            </h2>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-white mb-2 block">Company Name</Label>
                  <Input className="bg-black/50 border-gold/30 text-white h-12" />
                </div>
                <div>
                  <Label className="text-white mb-2 block">Your Name</Label>
                  <Input className="bg-black/50 border-gold/30 text-white h-12" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-white mb-2 block">Email</Label>
                  <Input type="email" className="bg-black/50 border-gold/30 text-white h-12" />
                </div>
                <div>
                  <Label className="text-white mb-2 block">Number of Employees</Label>
                  <Input type="number" className="bg-black/50 border-gold/30 text-white h-12" />
                </div>
              </div>

              <div>
                <Label className="text-white mb-2 block">Message</Label>
                <Textarea
                  className="bg-black/50 border-gold/30 text-white min-h-32"
                  placeholder="Tell us about your wellness goals..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-gold to-rose-gold text-black font-bold text-lg h-14 hover:shadow-2xl hover:shadow-gold/50 transition-all duration-300"
              >
                Request Consultation
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
