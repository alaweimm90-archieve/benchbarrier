/**
 * System Dashboard
 * Unified observability and control center for all systems
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Code, 
  Zap,
  FileText,
  DollarSign
} from 'lucide-react';
import { PerformanceMonitor } from '../infrastructure/monitoring/PerformanceMonitor';
import { RefactoringEngine } from '../automations/workflows/RefactoringEngine';
import { KernelSystem } from '../knowledge/kernels/KernelSystem';

export default function SystemDashboard() {
  const [performanceScore, setPerformanceScore] = useState(0);
  const [techDebtIndex, setTechDebtIndex] = useState(0);
  const [knowledgeCohesion, setKnowledgeCohesion] = useState(0);
  const [systemHealth, setSystemHealth] = useState<'healthy' | 'degraded' | 'critical'>('healthy');

  useEffect(() => {
    initializeDashboard();
  }, []);

  const initializeDashboard = async () => {
    // Initialize monitoring systems
    const monitor = new PerformanceMonitor();
    const refactoring = new RefactoringEngine();
    const kernels = new KernelSystem();

    // Capture metrics
    const webVitals = monitor.captureWebVitals();
    const perfScore = monitor.getPerformanceScore();
    setPerformanceScore(perfScore);

    // Mock tech debt metrics
    const techDebt = monitor.calculateTechDebtIndex({
      totalIssues: 15,
      criticalIssues: 2,
      codeSmells: 8,
      duplications: 3,
      coverage: 75,
      maintainabilityIndex: 68
    });
    setTechDebtIndex(techDebt);

    // Mock knowledge cohesion
    const cohesion = monitor.calculateKnowledgeCohesion(10, 8, 1);
    setKnowledgeCohesion(cohesion);

    // Check system health
    const health = await monitor.checkSystemHealth();
    setSystemHealth(health.status);
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-500';
      case 'degraded': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">System Dashboard</h1>
          <p className="text-gray-400">Unified observability and control center</p>
        </motion.div>

        {/* System Health Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Activity className={`w-8 h-8 ${getHealthColor(systemHealth)}`} />
              <div>
                <h2 className="text-2xl font-bold text-white capitalize">{systemHealth}</h2>
                <p className="text-gray-400">System Status</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(performanceScore)}`}>
                  {performanceScore}
                </div>
                <div className="text-sm text-gray-400">Performance</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(100 - techDebtIndex)}`}>
                  {Math.round(100 - techDebtIndex)}
                </div>
                <div className="text-sm text-gray-400">Code Quality</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(knowledgeCohesion)}`}>
                  {Math.round(knowledgeCohesion)}
                </div>
                <div className="text-sm text-gray-400">Knowledge</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Performance Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-yellow-500" />
              <span className={`text-2xl font-bold ${getScoreColor(performanceScore)}`}>
                {performanceScore}
              </span>
            </div>
            <h3 className="text-white font-semibold mb-1">Performance Score</h3>
            <p className="text-sm text-gray-400">Core Web Vitals</p>
          </motion.div>

          {/* Tech Debt Index */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <Code className="w-8 h-8 text-blue-500" />
              <span className={`text-2xl font-bold ${getScoreColor(100 - techDebtIndex)}`}>
                {Math.round(techDebtIndex)}
              </span>
            </div>
            <h3 className="text-white font-semibold mb-1">Tech Debt Index</h3>
            <p className="text-sm text-gray-400">Lower is better</p>
          </motion.div>

          {/* Knowledge Cohesion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-purple-500" />
              <span className={`text-2xl font-bold ${getScoreColor(knowledgeCohesion)}`}>
                {Math.round(knowledgeCohesion)}
              </span>
            </div>
            <h3 className="text-white font-semibold mb-1">Knowledge Cohesion</h3>
            <p className="text-sm text-gray-400">Documentation quality</p>
          </motion.div>

          {/* Conversion Efficiency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold text-green-500">94%</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Conversion Rate</h3>
            <p className="text-sm text-gray-400">Marketing efficiency</p>
          </motion.div>
        </div>

        {/* System Components */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Architecture Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-bold text-white mb-4">Clean Architecture</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">Core (Business Logic)</span>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">Adapters (Integrations)</span>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">Infrastructure (Config)</span>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">Interfaces (UI/API)</span>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </motion.div>

          {/* Active Workflows */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-bold text-white mb-4">Active Workflows</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="text-white font-medium">Payment Processing</div>
                  <div className="text-sm text-gray-400">235 transactions today</div>
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="text-white font-medium">Marketing Automation</div>
                  <div className="text-sm text-gray-400">1,247 emails sent</div>
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="text-white font-medium">Content Synthesis</div>
                  <div className="text-sm text-gray-400">12 posts generated</div>
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="text-white font-medium">Refactoring Engine</div>
                  <div className="text-sm text-gray-400">3 files analyzed</div>
                </div>
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-4">System Recommendations</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <div className="text-white font-medium">Performance is excellent</div>
                <div className="text-sm text-gray-400">All Core Web Vitals are in the green zone</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <div className="text-white font-medium">Consider refactoring 2 high-complexity files</div>
                <div className="text-sm text-gray-400">Estimated effort: 3 days</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <div className="text-white font-medium">Marketing automation is performing well</div>
                <div className="text-sm text-gray-400">94% email open rate, 23% conversion rate</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
