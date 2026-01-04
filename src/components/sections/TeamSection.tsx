import { motion } from 'framer-motion';
import { Instagram, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const team = [
  {
    name: 'Alex Rivera',
    role: 'Head Trainer & Founder',
    certifications: ['NASM-CPT', 'Nutrition Specialist', 'Olympic Lifting'],
    instagram: '@alexrivera',
    bio: '15+ years transforming lives through science-based training',
  },
  {
    name: 'Maya Chen',
    role: 'Nutrition Director',
    certifications: ['RD', 'Sports Nutritionist', 'Wellness Coach'],
    instagram: '@mayachen',
    bio: 'Expert in performance nutrition and sustainable lifestyle changes',
  },
  {
    name: 'Marcus Thompson',
    role: 'Strength Coach',
    certifications: ['CSCS', 'Powerlifting Coach', 'Mobility Specialist'],
    instagram: '@marcusthompson',
    bio: 'Former athlete specializing in strength and conditioning',
  },
  {
    name: 'Sofia Martinez',
    role: 'Wellness Coach',
    certifications: ['Yoga Instructor', 'Mindfulness Coach', 'Recovery Specialist'],
    instagram: '@sofiamartinez',
    bio: 'Holistic approach to fitness, mind, and body connection',
  },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-24 px-4 bg-gradient-to-b from-deep-black via-charcoal to-deep-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass-card border border-primary/30 text-primary text-sm font-semibold mb-4">
            Our Team
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            <span className="text-white">Meet Your</span>
            <br />
            <span className="gold-gradient-text">Expert Coaches</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="glass-card border border-primary/20 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300">
                <div className="relative aspect-[3/4] bg-gradient-to-br from-charcoal to-slate-black flex items-center justify-center">
                  <Award className="w-16 h-16 text-primary/30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute bottom-4 right-4 rounded-full bg-primary/20 hover:bg-primary/30 text-primary"
                  >
                    <Instagram className="w-5 h-5" />
                  </Button>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-semibold mb-3">{member.role}</p>
                  <p className="text-text-muted text-sm mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
