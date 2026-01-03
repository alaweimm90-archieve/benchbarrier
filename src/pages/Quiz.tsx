import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { SEOHead } from '@/components/seo/SEOHead';
import { GlassmorphNav } from '@/components/navigation/GlassmorphNav';

interface Question {
  id: number;
  question: string;
  options: { value: string; label: string; personality: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What's your primary fitness goal?",
    options: [
      { value: 'strength', label: 'Build Muscle & Strength', personality: 'powerhouse' },
      { value: 'weight', label: 'Lose Weight & Tone', personality: 'transformer' },
      { value: 'endurance', label: 'Improve Endurance', personality: 'athlete' },
      { value: 'wellness', label: 'Overall Health & Wellness', personality: 'balanced' },
    ],
  },
  {
    id: 2,
    question: 'How would you describe your current fitness level?',
    options: [
      { value: 'beginner', label: 'Just Starting Out', personality: 'beginner' },
      { value: 'intermediate', label: 'Moderately Active', personality: 'intermediate' },
      { value: 'advanced', label: 'Very Active', personality: 'advanced' },
      { value: 'athlete', label: 'Competitive Athlete', personality: 'elite' },
    ],
  },
  {
    id: 3,
    question: 'What type of workout environment do you prefer?',
    options: [
      { value: 'group', label: 'Group Classes - I love the energy!', personality: 'social' },
      { value: 'personal', label: 'One-on-One Training', personality: 'focused' },
      { value: 'hybrid', label: 'Mix of Both', personality: 'flexible' },
      { value: 'solo', label: 'Solo Workouts', personality: 'independent' },
    ],
  },
  {
    id: 4,
    question: 'How many days per week can you commit to training?',
    options: [
      { value: '2-3', label: '2-3 Days', personality: 'starter' },
      { value: '4-5', label: '4-5 Days', personality: 'committed' },
      { value: '6-7', label: '6-7 Days', personality: 'dedicated' },
      { value: 'varies', label: 'It Varies', personality: 'flexible' },
    ],
  },
  {
    id: 5,
    question: 'What motivates you most?',
    options: [
      { value: 'results', label: 'Seeing Physical Results', personality: 'results-driven' },
      { value: 'competition', label: 'Competition & Challenges', personality: 'competitive' },
      { value: 'health', label: 'Feeling Healthy & Energized', personality: 'wellness' },
      { value: 'community', label: 'Community & Support', personality: 'social' },
    ],
  },
];

const personalities = {
  powerhouse: {
    title: 'The Powerhouse',
    description: 'You\'re driven by strength and power. You thrive on progressive overload and seeing your numbers climb.',
    recommendation: 'Personal Training + Strength Program',
    icon: '💪',
  },
  transformer: {
    title: 'The Transformer',
    description: 'You\'re focused on body transformation. You want results and you\'re ready to put in the work.',
    recommendation: 'Personal Training + Nutrition Consulting',
    icon: '🔥',
  },
  athlete: {
    title: 'The Athlete',
    description: 'You\'re all about performance. Endurance, speed, and athletic excellence drive you forward.',
    recommendation: 'Group Classes + Performance Training',
    icon: '⚡',
  },
  balanced: {
    title: 'The Balanced Warrior',
    description: 'You seek harmony between fitness, health, and lifestyle. Sustainable progress is your goal.',
    recommendation: 'Hybrid Training + Wellness Coaching',
    icon: '🧘',
  },
};

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    if (selectedOption) {
      const newAnswers = [...answers, selectedOption];
      setAnswers(newAnswers);
      setSelectedOption('');

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedOption('');
    }
  };

  const getPersonality = () => {
    // Simple logic: return first personality type (in real app, would analyze all answers)
    return personalities.powerhouse;
  };

  const personality = getPersonality();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-charcoal to-black">
      <SEOHead
        title="Fitness Personality Quiz | BenchBarrier"
        description="Discover your fitness personality and get personalized training recommendations from BenchBarrier's expert team."
        keywords="fitness quiz, personality test, workout recommendations, fitness assessment"
        canonicalUrl="/quiz"
      />
      <GlassmorphNav />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          {!showResults ? (
            <>
              {/* Progress Bar */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400 text-sm">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-gold font-semibold">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </motion.div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-white mb-12 text-center">
                    {questions[currentQuestion].question}
                  </h1>

                  <div className="space-y-4 mb-12">
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={option.value}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleAnswer(option.value)}
                        className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                          selectedOption === option.value
                            ? 'border-gold bg-gold/10 shadow-lg shadow-gold/20'
                            : 'border-gold/20 bg-charcoal/50 hover:border-gold/50 hover:bg-charcoal/80'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white text-lg">{option.label}</span>
                          {selectedOption === option.value && (
                            <CheckCircle className="w-6 h-6 text-gold" />
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center">
                    <Button
                      onClick={handleBack}
                      disabled={currentQuestion === 0}
                      variant="outline"
                      className="border-gold/30 text-white hover:bg-gold/10"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>

                    <Button
                      onClick={handleNext}
                      disabled={!selectedOption}
                      className="bg-gradient-to-r from-gold to-rose-gold text-black font-bold hover:shadow-xl hover:shadow-gold/50 transition-all duration-300"
                    >
                      {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="text-8xl mb-8">{personality.icon}</div>
              
              <h1 className="font-playfair text-5xl font-bold text-white mb-4">
                You're <span className="luxury-gradient">{personality.title}</span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                {personality.description}
              </p>

              <div className="bg-charcoal/80 backdrop-blur-xl border border-gold/20 rounded-3xl p-8 mb-8">
                <h3 className="text-gold font-semibold mb-2">Recommended Program</h3>
                <p className="text-2xl font-bold text-white">{personality.recommendation}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.location.href = '/pricing'}
                  className="bg-gradient-to-r from-gold to-rose-gold text-black font-bold text-lg px-8 py-6 hover:shadow-2xl hover:shadow-gold/50 transition-all duration-300"
                >
                  View Pricing Plans
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  className="border-gold/30 text-white hover:bg-gold/10 px-8 py-6"
                >
                  Back to Home
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
