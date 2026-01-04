/**
 * Refactoring Engine
 * Automated code quality monitoring and refactoring suggestions
 */

export interface CodeSmell {
  type: SmellType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  file: string;
  line: number;
  description: string;
  suggestion: string;
}

export enum SmellType {
  LONG_METHOD = 'long_method',
  LARGE_CLASS = 'large_class',
  DUPLICATE_CODE = 'duplicate_code',
  COMPLEX_CONDITIONAL = 'complex_conditional',
  MAGIC_NUMBER = 'magic_number',
  DEAD_CODE = 'dead_code',
  GOD_OBJECT = 'god_object',
  FEATURE_ENVY = 'feature_envy',
  PRIMITIVE_OBSESSION = 'primitive_obsession'
}

export interface RefactoringPattern {
  name: string;
  description: string;
  applicableSmells: SmellType[];
  steps: string[];
  example: {
    before: string;
    after: string;
  };
}

export interface CodeMetrics {
  file: string;
  linesOfCode: number;
  cyclomaticComplexity: number;
  cognitiveComplexity: number;
  maintainabilityIndex: number;
  dependencies: number;
  testCoverage: number;
}

export interface RefactoringPriority {
  file: string;
  score: number; // 0-100, higher = more urgent
  reasons: string[];
  estimatedEffort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
}

export class RefactoringEngine {
  private patterns: Map<SmellType, RefactoringPattern>;

  constructor() {
    this.patterns = this.initializePatterns();
  }

  /**
   * Detect code smells in a file
   */
  detectCodeSmells(code: string, file: string): CodeSmell[] {
    const smells: CodeSmell[] = [];

    // Detect long methods
    const longMethods = this.detectLongMethods(code, file);
    smells.push(...longMethods);

    // Detect duplicate code
    const duplicates = this.detectDuplicateCode(code, file);
    smells.push(...duplicates);

    // Detect complex conditionals
    const complexConditionals = this.detectComplexConditionals(code, file);
    smells.push(...complexConditionals);

    // Detect magic numbers
    const magicNumbers = this.detectMagicNumbers(code, file);
    smells.push(...magicNumbers);

    // Detect dead code
    const deadCode = this.detectDeadCode(code, file);
    smells.push(...deadCode);

    return smells;
  }

  /**
   * Calculate code metrics
   */
  calculateMetrics(code: string, file: string): CodeMetrics {
    const lines = code.split('\n');
    const linesOfCode = lines.filter(line => 
      line.trim() && !line.trim().startsWith('//')
    ).length;

    return {
      file,
      linesOfCode,
      cyclomaticComplexity: this.calculateCyclomaticComplexity(code),
      cognitiveComplexity: this.calculateCognitiveComplexity(code),
      maintainabilityIndex: this.calculateMaintainabilityIndex(code),
      dependencies: this.countDependencies(code),
      testCoverage: 0 // Would be calculated from test results
    };
  }

  /**
   * Prioritize refactoring tasks
   */
  prioritizeRefactoring(metrics: CodeMetrics[], smells: CodeSmell[]): RefactoringPriority[] {
    const priorities: RefactoringPriority[] = [];

    for (const metric of metrics) {
      const fileSmells = smells.filter(s => s.file === metric.file);
      const criticalSmells = fileSmells.filter(s => s.severity === 'critical').length;
      const highSmells = fileSmells.filter(s => s.severity === 'high').length;

      let score = 0;
      const reasons: string[] = [];

      // High complexity
      if (metric.cyclomaticComplexity > 10) {
        score += 20;
        reasons.push(`High cyclomatic complexity: ${metric.cyclomaticComplexity}`);
      }

      // Low maintainability
      if (metric.maintainabilityIndex < 50) {
        score += 25;
        reasons.push(`Low maintainability index: ${metric.maintainabilityIndex}`);
      }

      // Critical smells
      if (criticalSmells > 0) {
        score += criticalSmells * 15;
        reasons.push(`${criticalSmells} critical code smells`);
      }

      // High smells
      if (highSmells > 0) {
        score += highSmells * 10;
        reasons.push(`${highSmells} high-severity code smells`);
      }

      // Low test coverage
      if (metric.testCoverage < 70) {
        score += 15;
        reasons.push(`Low test coverage: ${metric.testCoverage}%`);
      }

      // Large file
      if (metric.linesOfCode > 300) {
        score += 10;
        reasons.push(`Large file: ${metric.linesOfCode} lines`);
      }

      if (score > 0) {
        priorities.push({
          file: metric.file,
          score: Math.min(100, score),
          reasons,
          estimatedEffort: this.estimateEffort(metric, fileSmells),
          impact: this.estimateImpact(metric, fileSmells)
        });
      }
    }

    return priorities.sort((a, b) => b.score - a.score);
  }

  /**
   * Get refactoring pattern for a code smell
   */
  getRefactoringPattern(smellType: SmellType): RefactoringPattern | undefined {
    return this.patterns.get(smellType);
  }

  /**
   * Generate refactoring report
   */
  generateReport(
    metrics: CodeMetrics[],
    smells: CodeSmell[],
    priorities: RefactoringPriority[]
  ): RefactoringReport {
    const totalFiles = metrics.length;
    const totalSmells = smells.length;
    const criticalSmells = smells.filter(s => s.severity === 'critical').length;
    const avgComplexity = metrics.reduce((sum, m) => sum + m.cyclomaticComplexity, 0) / totalFiles;
    const avgMaintainability = metrics.reduce((sum, m) => sum + m.maintainabilityIndex, 0) / totalFiles;

    return {
      summary: {
        totalFiles,
        totalSmells,
        criticalSmells,
        avgComplexity,
        avgMaintainability,
        healthScore: this.calculateHealthScore(metrics, smells)
      },
      priorities: priorities.slice(0, 10), // Top 10
      recommendations: this.generateRecommendations(metrics, smells, priorities),
      estimatedEffort: this.calculateTotalEffort(priorities)
    };
  }

  private detectLongMethods(code: string, file: string): CodeSmell[] {
    const smells: CodeSmell[] = [];
    const lines = code.split('\n');
    let inFunction = false;
    let functionStart = 0;
    let functionLines = 0;

    lines.forEach((line, index) => {
      if (line.includes('function') || line.includes('=>')) {
        inFunction = true;
        functionStart = index;
        functionLines = 0;
      }

      if (inFunction) {
        functionLines++;
        if (line.includes('}')) {
          if (functionLines > 50) {
            smells.push({
              type: SmellType.LONG_METHOD,
              severity: functionLines > 100 ? 'critical' : 'high',
              file,
              line: functionStart,
              description: `Method has ${functionLines} lines`,
              suggestion: 'Break down into smaller, focused functions'
            });
          }
          inFunction = false;
        }
      }
    });

    return smells;
  }

  private detectDuplicateCode(code: string, file: string): CodeSmell[] {
    // Simplified duplicate detection
    return [];
  }

  private detectComplexConditionals(code: string, file: string): CodeSmell[] {
    const smells: CodeSmell[] = [];
    const lines = code.split('\n');

    lines.forEach((line, index) => {
      const andCount = (line.match(/&&/g) || []).length;
      const orCount = (line.match(/\|\|/g) || []).length;
      const complexity = andCount + orCount;

      if (complexity > 3) {
        smells.push({
          type: SmellType.COMPLEX_CONDITIONAL,
          severity: complexity > 5 ? 'high' : 'medium',
          file,
          line: index,
          description: `Complex conditional with ${complexity} operators`,
          suggestion: 'Extract to well-named boolean variables or functions'
        });
      }
    });

    return smells;
  }

  private detectMagicNumbers(code: string, file: string): CodeSmell[] {
    const smells: CodeSmell[] = [];
    const lines = code.split('\n');
    const magicNumberRegex = /\b\d{2,}\b/g;

    lines.forEach((line, index) => {
      const matches = line.match(magicNumberRegex);
      if (matches && !line.includes('const') && !line.includes('let')) {
        matches.forEach(() => {
          smells.push({
            type: SmellType.MAGIC_NUMBER,
            severity: 'low',
            file,
            line: index,
            description: 'Magic number found',
            suggestion: 'Extract to named constant'
          });
        });
      }
    });

    return smells;
  }

  private detectDeadCode(code: string, file: string): CodeSmell[] {
    // Simplified dead code detection
    return [];
  }

  private calculateCyclomaticComplexity(code: string): number {
    // Count decision points
    const ifCount = (code.match(/\bif\b/g) || []).length;
    const forCount = (code.match(/\bfor\b/g) || []).length;
    const whileCount = (code.match(/\bwhile\b/g) || []).length;
    const caseCount = (code.match(/\bcase\b/g) || []).length;
    const catchCount = (code.match(/\bcatch\b/g) || []).length;
    const andCount = (code.match(/&&/g) || []).length;
    const orCount = (code.match(/\|\|/g) || []).length;

    return 1 + ifCount + forCount + whileCount + caseCount + catchCount + andCount + orCount;
  }

  private calculateCognitiveComplexity(code: string): number {
    // Simplified cognitive complexity
    return this.calculateCyclomaticComplexity(code) * 1.5;
  }

  private calculateMaintainabilityIndex(code: string): number {
    const lines = code.split('\n').length;
    const complexity = this.calculateCyclomaticComplexity(code);
    
    // Simplified maintainability index
    const volume = lines * Math.log2(complexity + 1);
    const index = 171 - 5.2 * Math.log(volume) - 0.23 * complexity - 16.2 * Math.log(lines);
    
    return Math.max(0, Math.min(100, index));
  }

  private countDependencies(code: string): number {
    const importCount = (code.match(/^import\s/gm) || []).length;
    const requireCount = (code.match(/require\(/g) || []).length;
    return importCount + requireCount;
  }

  private estimateEffort(
    metric: CodeMetrics,
    smells: CodeSmell[]
  ): 'low' | 'medium' | 'high' {
    const criticalCount = smells.filter(s => s.severity === 'critical').length;
    
    if (criticalCount > 3 || metric.linesOfCode > 500) return 'high';
    if (criticalCount > 1 || metric.linesOfCode > 200) return 'medium';
    return 'low';
  }

  private estimateImpact(
    metric: CodeMetrics,
    smells: CodeSmell[]
  ): 'low' | 'medium' | 'high' {
    const criticalCount = smells.filter(s => s.severity === 'critical').length;
    
    if (criticalCount > 2 || metric.maintainabilityIndex < 40) return 'high';
    if (criticalCount > 0 || metric.maintainabilityIndex < 60) return 'medium';
    return 'low';
  }

  private calculateHealthScore(metrics: CodeMetrics[], smells: CodeSmell[]): number {
    let score = 100;

    const avgMaintainability = metrics.reduce((sum, m) => sum + m.maintainabilityIndex, 0) / metrics.length;
    score -= (100 - avgMaintainability) * 0.5;

    const criticalSmells = smells.filter(s => s.severity === 'critical').length;
    score -= criticalSmells * 5;

    const highSmells = smells.filter(s => s.severity === 'high').length;
    score -= highSmells * 2;

    return Math.max(0, Math.min(100, score));
  }

  private generateRecommendations(
    metrics: CodeMetrics[],
    smells: CodeSmell[],
    priorities: RefactoringPriority[]
  ): string[] {
    const recommendations: string[] = [];

    if (priorities.length > 0) {
      recommendations.push(`Start with ${priorities[0].file} (highest priority)`);
    }

    const criticalSmells = smells.filter(s => s.severity === 'critical');
    if (criticalSmells.length > 0) {
      recommendations.push(`Address ${criticalSmells.length} critical code smells immediately`);
    }

    const avgComplexity = metrics.reduce((sum, m) => sum + m.cyclomaticComplexity, 0) / metrics.length;
    if (avgComplexity > 10) {
      recommendations.push('Reduce overall code complexity through extraction and simplification');
    }

    const lowCoverage = metrics.filter(m => m.testCoverage < 70);
    if (lowCoverage.length > 0) {
      recommendations.push(`Increase test coverage for ${lowCoverage.length} files`);
    }

    return recommendations;
  }

  private calculateTotalEffort(priorities: RefactoringPriority[]): string {
    const effortMap = { low: 1, medium: 3, high: 8 };
    const totalDays = priorities.reduce((sum, p) => sum + effortMap[p.estimatedEffort], 0);
    
    if (totalDays < 5) return `${totalDays} days`;
    if (totalDays < 20) return `${Math.ceil(totalDays / 5)} weeks`;
    return `${Math.ceil(totalDays / 20)} months`;
  }

  private initializePatterns(): Map<SmellType, RefactoringPattern> {
    const patterns = new Map<SmellType, RefactoringPattern>();

    patterns.set(SmellType.LONG_METHOD, {
      name: 'Extract Method',
      description: 'Break down long methods into smaller, focused functions',
      applicableSmells: [SmellType.LONG_METHOD],
      steps: [
        'Identify logical sections within the method',
        'Extract each section into a well-named function',
        'Replace original code with function calls',
        'Add tests for extracted functions'
      ],
      example: {
        before: 'function processOrder() { /* 100 lines */ }',
        after: 'function processOrder() { validateOrder(); calculateTotal(); sendConfirmation(); }'
      }
    });

    patterns.set(SmellType.COMPLEX_CONDITIONAL, {
      name: 'Decompose Conditional',
      description: 'Extract complex conditionals into well-named boolean functions',
      applicableSmells: [SmellType.COMPLEX_CONDITIONAL],
      steps: [
        'Identify the condition logic',
        'Extract to a function with descriptive name',
        'Replace conditional with function call',
        'Add tests for the extracted function'
      ],
      example: {
        before: 'if (user.age > 18 && user.verified && !user.banned) { }',
        after: 'if (isEligibleUser(user)) { }'
      }
    });

    return patterns;
  }
}

export interface RefactoringReport {
  summary: {
    totalFiles: number;
    totalSmells: number;
    criticalSmells: number;
    avgComplexity: number;
    avgMaintainability: number;
    healthScore: number;
  };
  priorities: RefactoringPriority[];
  recommendations: string[];
  estimatedEffort: string;
}
