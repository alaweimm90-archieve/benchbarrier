import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, Calendar, TrendingUp, Activity, UserPlus, CreditCard, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { SEOHead } from '@/components/seo/SEOHead';

const revenueData = [
  { month: 'Jul', revenue: 45000, members: 180 },
  { month: 'Aug', revenue: 52000, members: 195 },
  { month: 'Sep', revenue: 48000, members: 190 },
  { month: 'Oct', revenue: 61000, members: 210 },
  { month: 'Nov', revenue: 58000, members: 205 },
  { month: 'Dec', revenue: 72000, members: 235 },
];

const membershipDistribution = [
  { name: 'Starter', value: 85, color: '#d4af37' },
  { name: 'Elite', value: 120, color: '#b76e79' },
  { name: 'Champion', value: 30, color: '#f4e4c1' },
];

const upcomingBookings = [
  { id: 1, client: 'John Smith', service: 'Personal Training', trainer: 'Marcus Johnson', time: '10:00 AM', status: 'confirmed' },
  { id: 2, client: 'Sarah Williams', service: 'Nutrition Consult', trainer: 'Dr. Emily Rodriguez', time: '11:30 AM', status: 'confirmed' },
  { id: 3, client: 'Mike Chen', service: 'Group HIIT', trainer: 'Sarah Chen', time: '2:00 PM', status: 'pending' },
  { id: 4, client: 'Emma Davis', service: 'Personal Training', trainer: 'Marcus Johnson', time: '4:00 PM', status: 'confirmed' },
];

const recentMembers = [
  { id: 1, name: 'Alex Thompson', plan: 'Elite', joined: '2 hours ago', status: 'active' },
  { id: 2, name: 'Jessica Lee', plan: 'Starter', joined: '5 hours ago', status: 'active' },
  { id: 3, name: 'David Brown', plan: 'Champion', joined: '1 day ago', status: 'active' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <SEOHead 
        title="Admin Dashboard - BenchBarrier"
        description="Manage your fitness business"
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-playfair text-4xl md:text-5xl text-white mb-2">
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-gray-400">Manage your fitness empire</p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Members', value: '235', change: '+12%', icon: Users, color: 'from-gold to-rose-gold' },
            { label: 'Monthly Revenue', value: '$72,000', change: '+24%', icon: DollarSign, color: 'from-rose-gold to-champagne' },
            { label: 'Active Sessions', value: '48', change: '+8%', icon: Activity, color: 'from-champagne to-gold' },
            { label: 'Avg. Retention', value: '94%', change: '+3%', icon: TrendingUp, color: 'from-gold to-rose-gold' },
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-charcoal border-gold/20 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-lg flex items-center justify-center`}>
                    <metric.icon className="w-6 h-6 text-black" />
                  </div>
                  <span className="text-green-400 text-sm font-semibold">{metric.change}</span>
                </div>
                <p className="text-3xl font-bold text-white mb-1">{metric.value}</p>
                <p className="text-sm text-gray-400">{metric.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-charcoal border border-gold/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Overview
            </TabsTrigger>
            <TabsTrigger value="members" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Members
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Bookings
            </TabsTrigger>
            <TabsTrigger value="revenue" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Revenue
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Revenue Trend */}
              <Card className="bg-charcoal border-gold/20 p-6">
                <h3 className="font-playfair text-2xl text-white mb-6">Revenue & Growth</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#d4af37" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#d4af37" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #d4af37' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#d4af37" fill="url(#revenueGradient)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              {/* Membership Distribution */}
              <Card className="bg-charcoal border-gold/20 p-6">
                <h3 className="font-playfair text-2xl text-white mb-6">Membership Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={membershipDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {membershipDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #d4af37' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {membershipDistribution.map((item, index) => (
                    <div key={index} className="text-center p-2 bg-black rounded">
                      <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ backgroundColor: item.color }} />
                      <p className="text-xs text-gray-400">{item.name}</p>
                      <p className="text-white font-bold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Members */}
              <Card className="bg-charcoal border-gold/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-playfair text-2xl text-white">Recent Members</h3>
                  <UserPlus className="w-5 h-5 text-gold" />
                </div>
                <div className="space-y-3">
                  {recentMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-black rounded-lg">
                      <div>
                        <p className="text-white font-semibold">{member.name}</p>
                        <p className="text-sm text-gray-400">{member.plan} • {member.joined}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                        {member.status}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Today's Bookings */}
              <Card className="bg-charcoal border-gold/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-playfair text-2xl text-white">Today's Schedule</h3>
                  <Calendar className="w-5 h-5 text-gold" />
                </div>
                <div className="space-y-3">
                  {upcomingBookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-start justify-between p-3 bg-black rounded-lg">
                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-gold mt-1" />
                        <div>
                          <p className="text-white font-semibold text-sm">{booking.time}</p>
                          <p className="text-sm text-gray-400">{booking.client}</p>
                          <p className="text-xs text-gray-500">{booking.service}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <Card className="bg-charcoal border-gold/20 p-6">
              <h3 className="font-playfair text-2xl text-white mb-6">Member Management</h3>
              <div className="space-y-2">
                {recentMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 bg-black rounded-lg hover:bg-black/80 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gold to-rose-gold rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{member.name}</p>
                        <p className="text-sm text-gray-400">{member.plan} Plan • Joined {member.joined}</p>
                      </div>
                    </div>
                    <span className="px-4 py-2 bg-green-500/20 text-green-400 text-sm rounded-full">
                      {member.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card className="bg-charcoal border-gold/20 p-6">
              <h3 className="font-playfair text-2xl text-white mb-6">All Bookings</h3>
              <div className="space-y-2">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-black rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-gold font-bold">{booking.time}</p>
                      </div>
                      <div>
                        <p className="text-white font-semibold">{booking.client}</p>
                        <p className="text-sm text-gray-400">{booking.service} with {booking.trainer}</p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 text-sm rounded-full ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <Card className="bg-charcoal border-gold/20 p-6">
              <h3 className="font-playfair text-2xl text-white mb-6">Revenue Analytics</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #d4af37' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#d4af37" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-black rounded-lg">
                  <CreditCard className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">$336K</p>
                </div>
                <div className="text-center p-4 bg-black rounded-lg">
                  <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm mb-1">Growth Rate</p>
                  <p className="text-2xl font-bold text-white">+24%</p>
                </div>
                <div className="text-center p-4 bg-black rounded-lg">
                  <DollarSign className="w-8 h-8 text-rose-gold mx-auto mb-2" />
                  <p className="text-gray-400 text-sm mb-1">Avg. Per Member</p>
                  <p className="text-2xl font-bold text-white">$306</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
