import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { membershipPlans, processPayment } from '@/lib/stripe';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SEOHead } from '@/components/seo/SEOHead';

export default function Payment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const planId = searchParams.get('plan') || 'elite';
  
  const selectedPlan = membershipPlans.find(p => p.id === planId) || membershipPlans[1];
  
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    email: '',
  });
  
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    const result = await processPayment(planId, 'pm_demo');
    
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/member-portal');
      }, 3000);
    }
    
    setProcessing(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <SEOHead 
          title="Payment Successful - BenchBarrier"
          description="Your payment has been processed successfully"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-gradient-to-br from-gold via-rose-gold to-champagne rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-12 h-12 text-black" />
          </motion.div>
          <h1 className="font-playfair text-4xl text-white mb-4">Payment Successful!</h1>
          <p className="text-gray-400 mb-2">Welcome to BenchBarrier {selectedPlan.name}</p>
          <p className="text-sm text-gray-500">Redirecting to your member portal...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <SEOHead 
        title="Secure Payment - BenchBarrier"
        description="Complete your membership purchase securely"
      />
      
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/pricing')}
          className="mb-8 text-gold hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Pricing
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="bg-charcoal border-gold/20 p-8">
              <h2 className="font-playfair text-2xl text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-white font-semibold">{selectedPlan.name} Membership</h3>
                    <p className="text-sm text-gray-400">Billed {selectedPlan.interval}ly</p>
                  </div>
                  <p className="text-gold font-bold">${selectedPlan.price}</p>
                </div>
                
                <div className="border-t border-gold/20 pt-4">
                  <h4 className="text-white text-sm mb-3">Included Features:</h4>
                  <ul className="space-y-2">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-400">
                        <Check className="w-4 h-4 text-gold mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gold/20 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">${selectedPlan.price}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Tax</span>
                  <span className="text-white">$0</span>
                </div>
                <div className="flex justify-between items-center text-xl">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-gold font-bold">${selectedPlan.price}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gold/10 rounded-lg border border-gold/20">
                <p className="text-sm text-gray-300">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Secure payment powered by Stripe. Your information is encrypted and secure.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="bg-charcoal border-gold/20 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-gold to-rose-gold rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h2 className="font-playfair text-2xl text-white">Payment Details</h2>
                  <p className="text-sm text-gray-400">Enter your card information</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-white">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-black border-gold/20 text-white"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="cardName" className="text-white">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    type="text"
                    required
                    value={formData.cardName}
                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                    className="bg-black border-gold/20 text-white"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <Label htmlFor="cardNumber" className="text-white">Card Number</Label>
                  <Input
                    id="cardNumber"
                    type="text"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="bg-black border-gold/20 text-white"
                    placeholder="4242 4242 4242 4242"
                    maxLength={19}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry" className="text-white">Expiry Date</Label>
                    <Input
                      id="expiry"
                      type="text"
                      required
                      value={formData.expiry}
                      onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                      className="bg-black border-gold/20 text-white"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-white">CVV</Label>
                    <Input
                      id="cvv"
                      type="text"
                      required
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                      className="bg-black border-gold/20 text-white"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-gradient-to-r from-gold via-rose-gold to-champagne text-black font-bold py-6 text-lg hover:shadow-luxury"
                >
                  {processing ? (
                    <span className="flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full mr-2"
                      />
                      Processing...
                    </span>
                  ) : (
                    `Pay $${selectedPlan.price}`
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By confirming your subscription, you allow BenchBarrier to charge your card for this payment and future payments in accordance with their terms.
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
