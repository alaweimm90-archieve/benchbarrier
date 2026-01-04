import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SEOHead } from '@/components/seo/SEOHead';

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
];

const services = [
  { id: 'consultation', name: 'Free Consultation', duration: '30 min', price: 'Free' },
  { id: 'assessment', name: 'Fitness Assessment', duration: '60 min', price: '$99' },
  { id: 'training', name: 'Personal Training Session', duration: '60 min', price: '$149' },
  { id: 'nutrition', name: 'Nutrition Consultation', duration: '45 min', price: '$79' }
];

export default function Booking() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goals: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', { selectedDate, selectedTime, selectedService, formData });
    setSubmitted(true);
  };

  const isStepComplete = (stepNum: number) => {
    if (stepNum === 1) return selectedService !== '';
    if (stepNum === 2) return selectedDate !== undefined;
    if (stepNum === 3) return selectedTime !== '';
    return false;
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16">
        <SEOHead
          title="Booking Confirmed - BenchBarrier"
          description="Your consultation has been confirmed"
        />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-gradient-to-br from-charcoal via-black to-charcoal border border-gold/20 rounded-3xl p-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-24 h-24 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-12 h-12 text-gold" />
              </motion.div>

              <h1 className="text-4xl font-playfair font-bold text-white mb-4">
                Booking Confirmed!
              </h1>

              <p className="text-xl text-white/70 mb-8">
                Your consultation has been scheduled for
              </p>

              <div className="bg-black/40 border border-gold/10 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-center gap-4 text-gold mb-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-lg font-semibold">
                    {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-4 text-gold">
                  <Clock className="w-5 h-5" />
                  <span className="text-lg font-semibold">{selectedTime}</span>
                </div>
              </div>

              <p className="text-white/60 mb-8">
                A confirmation email has been sent to <span className="text-gold">{formData.email}</span>
              </p>

              <Button
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-gold via-champagne to-gold text-black font-semibold px-8 py-6 text-lg"
              >
                Return to Home
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <SEOHead
        title="Book Your Consultation - BenchBarrier"
        description="Schedule your free consultation with BenchBarrier's elite fitness coaches"
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-4">
            Book Your <span className="text-gradient">Consultation</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Take the first step towards your transformation. Schedule a session with our expert coaches.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      step >= stepNum
                        ? 'bg-gold border-gold text-black'
                        : 'bg-charcoal border-white/20 text-white/40'
                    }`}
                  >
                    {stepNum}
                  </div>
                  <span className="text-xs text-white/60 mt-2">
                    {stepNum === 1 && 'Service'}
                    {stepNum === 2 && 'Date'}
                    {stepNum === 3 && 'Time'}
                    {stepNum === 4 && 'Details'}
                  </span>
                </div>
                {stepNum < 4 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-all ${
                      step > stepNum ? 'bg-gold' : 'bg-white/20'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-charcoal via-black to-charcoal border border-gold/20 rounded-3xl p-8 md:p-12">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Select Service */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-playfair font-bold text-white mb-6">
                    Select a Service
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setSelectedService(service.id)}
                        className={`text-left p-6 rounded-xl border-2 transition-all ${
                          selectedService === service.id
                            ? 'border-gold bg-gold/10'
                            : 'border-white/10 bg-black/40 hover:border-gold/50'
                        }`}
                      >
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {service.name}
                        </h3>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/60">{service.duration}</span>
                          <span className="text-gold font-semibold">{service.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Select Date */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-playfair font-bold text-white mb-6">
                    Choose a Date
                  </h2>
                  <div className="flex justify-center">
                    <div className="booking-calendar">
                      <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={{ before: new Date() }}
                        className="text-white"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Select Time */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-playfair font-bold text-white mb-6">
                    Select a Time
                  </h2>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedTime === time
                            ? 'border-gold bg-gold/10 text-gold'
                            : 'border-white/10 bg-black/40 text-white hover:border-gold/50'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Contact Details */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-playfair font-bold text-white mb-6">
                    Your Details
                  </h2>

                  <div>
                    <label className="flex items-center gap-2 text-white/70 mb-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-black/40 border-white/10 text-white"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-white/70 mb-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-black/40 border-white/10 text-white"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-white/70 mb-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="bg-black/40 border-white/10 text-white"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-white/70 mb-2">
                      <MessageSquare className="w-4 h-4" />
                      Fitness Goals (Optional)
                    </label>
                    <Textarea
                      value={formData.goals}
                      onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                      rows={4}
                      className="bg-black/40 border-white/10 text-white"
                      placeholder="Tell us about your fitness goals..."
                    />
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/10">
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    variant="outline"
                    className="border-gold/20 text-gold hover:bg-gold/10"
                  >
                    Back
                  </Button>
                )}

                {step < 4 ? (
                  <Button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    disabled={!isStepComplete(step)}
                    className="ml-auto bg-gradient-to-r from-gold via-champagne to-gold text-black font-semibold"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="ml-auto bg-gradient-to-r from-gold via-champagne to-gold text-black font-semibold"
                  >
                    Confirm Booking
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .booking-calendar {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(212, 175, 55, 0.1);
          border-radius: 1rem;
          padding: 1.5rem;
        }
        .booking-calendar .rdp-day_selected {
          background-color: #D4AF37;
          color: #000;
        }
        .booking-calendar .rdp-day:hover:not(.rdp-day_selected) {
          background-color: rgba(212, 175, 55, 0.2);
        }
        .booking-calendar .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
          background-color: rgba(212, 175, 55, 0.2);
        }
      `}</style>
    </div>
  );
}
