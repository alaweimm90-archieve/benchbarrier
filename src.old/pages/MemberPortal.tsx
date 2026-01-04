import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Award, Settings, LogOut, Dumbbell, Heart, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SEOHead } from '@/components/seo/SEOHead';

const workoutData = [
  { date: 'Mon', calories: 450, duration: 60 },
  { date: 'Tue', calories: 380, duration: 45 },
  { date: 'Wed', calories: 520, duration: 75 },
  { date: 'Thu', calories: 410, duration: 55 },
  { date: 'Fri', calories: 490, duration: 65 },
  { date: 'Sat', calories: 550, duration: 80 },
  { date: 'Sun', calories: 320, duration: 40 },
];

const progressData = [
  { month: 'Jan', weight: 185, bodyFat: 22 },
  { month: 'Feb', weight: 182, bodyFat: 21 },
  { month: 'Mar', weight: 179, bodyFat: 19.5 },
  { month: 'Apr', weight: 176, bodyFat: 18 },
];

export default function MemberPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const upcomingSessions = [
    { id: 1, type: 'Personal Training', trainer: 'Marcus Johnson', date: 'Jan 5, 2026', time: '10:00 AM' },
    { id: 2, type: 'Group HIIT', trainer: 'Sarah Chen', date: 'Jan 6, 2026', time: '6:00 PM' },
    { id: 3, type: 'Nutrition Consult', trainer: 'Dr. Emily Rodriguez', date: 'Jan 8, 2026', time: '2:00 PM' },
  ];

  const achievements = [
    { id: 1, title: '30-Day Streak', icon: '🔥', unlocked: true },
    { id: 2, title: '100 Workouts', icon: '💪', unlocked: true },
    { id: 3, title: 'Early Bird', icon: '🌅', unlocked: true },
    { id: 4, title: 'Weight Goal', icon: '🎯', unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <SEOHead 
        title="Member Portal - BenchBarrier"
        description="Access your personalized fitness dashboard"
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="font-playfair text-4xl md:text-5xl text-white mb-2">
                Welcome Back, <span className="gradient-text">Champion</span>
              </h1>
              <p className="text-gray-400">Elite Membership • Member since Jan 2026</p>
            </div>
            <Button variant="outline" className="border-gold/20 text-gold hover:bg-gold/10">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Workouts This Month', value: '18', icon: Dumbbell, color: 'from-gold to-rose-gold' },
              { label: 'Calories Burned', value: '8,450', icon: Zap, color: 'from-rose-gold to-champagne' },
              { label: 'Current Streak', value: '12 days', icon: Heart, color: 'from-champagne to-gold' },
              { label: 'Next Session', value: 'Tomorrow', icon: Calendar, color: 'from-gold to-rose-gold' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-charcoal border-gold/20 p-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                    <stat.icon className="w-6 h-6 text-black" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-charcoal border border-gold/20">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Schedule
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Progress
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Achievements
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Weekly Activity */}
              <Card className="bg-charcoal border-gold/20 p-6">
                <h3 className="font-playfair text-2xl text-white mb-6">Weekly Activity</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={workoutData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #d4af37' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="calories" fill="url(#goldGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#d4af37" />
                        <stop offset="100%" stopColor="#b76e79" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              {/* Upcoming Sessions */}
              <Card className="bg-charcoal border-gold/20 p-6">
                <h3 className="font-playfair text-2xl text-white mb-6">Upcoming Sessions</h3>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="flex items-start justify-between p-4 bg-black rounded-lg border border-gold/10">
                      <div>
                        <h4 className="text-white font-semibold mb-1">{session.type}</h4>
                        <p className="text-sm text-gray-400">{session.trainer}</p>
                        <p className="text-xs text-gold mt-1">{session.date} at {session.time}</p>
                      </div>
                      <Button size="sm" variant="outline" className="border-gold/20 text-gold hover:bg-gold/10">
                        Reschedule
                      </Button>
                    </div>
                  ))}
                  <Button className="w-full bg-gradient-to-r from-gold to-rose-gold text-black font-bold">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book New Session
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card className="bg-charcoal border-gold/20 p-6">
              <h3 className="font-playfair text-2xl text-white mb-6">Body Composition Progress</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #d4af37' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="weight" stroke="#d4af37" strokeWidth={3} dot={{ fill: '#d4af37', r: 6 }} />
                  <Line type="monotone" dataKey="bodyFat" stroke="#b76e79" strokeWidth={3} dot={{ fill: '#b76e79', r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-4 bg-black rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Weight Lost</p>
                  <p className="text-3xl font-bold text-gold">9 lbs</p>
                </div>
                <div className="text-center p-4 bg-black rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Body Fat Reduced</p>
                  <p className="text-3xl font-bold text-rose-gold">4%</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card className="bg-charcoal border-gold/20 p-6">
              <h3 className="font-playfair text-2xl text-white mb-6">Your Achievements</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    whileHover={{ scale: 1.05 }}
                    className={`p-6 rounded-lg text-center ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-br from-gold/20 to-rose-gold/20 border-2 border-gold' 
                        : 'bg-black border border-gray-700 opacity-50'
                    }`}
                  >
                    <div className="text-5xl mb-3">{achievement.icon}</div>
                    <p className="text-white font-semibold">{achievement.title}</p>
                    {achievement.unlocked && (
                      <p className="text-xs text-gold mt-1">Unlocked!</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-charcoal border-gold/20 p-6">
              <h3 className="font-playfair text-2xl text-white mb-6">Account Settings</h3>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start border-gold/20 text-white hover:bg-gold/10">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full justify-start border-gold/20 text-white hover:bg-gold/10">
                  <Award className="w-4 h-4 mr-2" />
                  Manage Membership
                </Button>
                <Button variant="outline" className="w-full justify-start border-gold/20 text-white hover:bg-gold/10">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Billing History
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
