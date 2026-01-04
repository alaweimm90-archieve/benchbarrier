/**
 * Documentation Kernelization System
 * Converts monolithic docs into atomic, interconnected knowledge units
 */

export interface Kernel {
  id: string;
  title: string;
  type: KernelType;
  content: string;
  tags: string[];
  dependencies: string[]; // IDs of related kernels
  version: string;
  lastUpdated: Date;
  metadata: KernelMetadata;
}

export enum KernelType {
  CONCEPT = 'concept',
  HOWTO = 'howto',
  REFERENCE = 'reference',
  TROUBLESHOOTING = 'troubleshooting',
  ARCHITECTURE = 'architecture',
  API = 'api'
}

export interface KernelMetadata {
  author: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedReadTime: number; // minutes
  codeExamples: number;
  relatedFiles: string[];
}

export interface KernelGraph {
  kernels: Map<string, Kernel>;
  edges: Map<string, string[]>; // kernel ID -> related kernel IDs
}

export class KernelSystem {
  private graph: KernelGraph;
  private searchIndex: Map<string, Set<string>>; // term -> kernel IDs

  constructor() {
    this.graph = {
      kernels: new Map(),
      edges: new Map()
    };
    this.searchIndex = new Map();
  }

  /**
   * Add a new kernel to the system
   */
  addKernel(kernel: Kernel): void {
    this.graph.kernels.set(kernel.id, kernel);
    
    // Build edges
    this.graph.edges.set(kernel.id, kernel.dependencies);

    // Update search index
    this.indexKernel(kernel);
  }

  /**
   * Retrieve a kernel by ID
   */
  getKernel(id: string): Kernel | undefined {
    return this.graph.kernels.get(id);
  }

  /**
   * Get related kernels (dependencies and dependents)
   */
  getRelatedKernels(id: string): Kernel[] {
    const related = new Set<string>();

    // Add dependencies
    const dependencies = this.graph.edges.get(id) || [];
    dependencies.forEach(depId => related.add(depId));

    // Add dependents (kernels that depend on this one)
    this.graph.edges.forEach((deps, kernelId) => {
      if (deps.includes(id)) {
        related.add(kernelId);
      }
    });

    return Array.from(related)
      .map(relId => this.graph.kernels.get(relId))
      .filter((k): k is Kernel => k !== undefined);
  }

  /**
   * Semantic search across kernels
   */
  search(query: string): Kernel[] {
    const terms = query.toLowerCase().split(/\s+/);
    const matchingKernels = new Set<string>();

    for (const term of terms) {
      const kernelIds = this.searchIndex.get(term);
      if (kernelIds) {
        kernelIds.forEach(id => matchingKernels.add(id));
      }
    }

    return Array.from(matchingKernels)
      .map(id => this.graph.kernels.get(id))
      .filter((k): k is Kernel => k !== undefined)
      .sort((a, b) => this.calculateRelevance(b, terms) - this.calculateRelevance(a, terms));
  }

  /**
   * Get learning path (ordered kernels from beginner to advanced)
   */
  getLearningPath(topic: string): Kernel[] {
    const topicKernels = Array.from(this.graph.kernels.values())
      .filter(k => k.tags.includes(topic));

    // Sort by difficulty
    const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };
    return topicKernels.sort((a, b) => 
      difficultyOrder[a.metadata.difficulty] - difficultyOrder[b.metadata.difficulty]
    );
  }

  /**
   * Generate contextual tooltips for UI
   */
  getTooltip(conceptId: string): string {
    const kernel = this.getKernel(conceptId);
    if (!kernel) return '';

    // Extract first paragraph as tooltip
    const firstParagraph = kernel.content.split('\n\n')[0];
    return firstParagraph.substring(0, 200) + '...';
  }

  /**
   * Visualize kernel dependencies as graph
   */
  generateDependencyGraph(): DependencyGraph {
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];

    this.graph.kernels.forEach((kernel, id) => {
      nodes.push({
        id,
        label: kernel.title,
        type: kernel.type,
        difficulty: kernel.metadata.difficulty
      });

      const dependencies = this.graph.edges.get(id) || [];
      dependencies.forEach(depId => {
        links.push({
          source: id,
          target: depId,
          type: 'depends-on'
        });
      });
    });

    return { nodes, links };
  }

  /**
   * Check for orphaned kernels (no dependencies or dependents)
   */
  findOrphanedKernels(): Kernel[] {
    const orphaned: Kernel[] = [];

    this.graph.kernels.forEach((kernel, id) => {
      const hasDependencies = (this.graph.edges.get(id) || []).length > 0;
      const hasDependents = Array.from(this.graph.edges.values())
        .some(deps => deps.includes(id));

      if (!hasDependencies && !hasDependents) {
        orphaned.push(kernel);
      }
    });

    return orphaned;
  }

  /**
   * Suggest related kernels based on content similarity
   */
  suggestRelated(kernelId: string, limit: number = 5): Kernel[] {
    const kernel = this.getKernel(kernelId);
    if (!kernel) return [];

    const scores = new Map<string, number>();

    this.graph.kernels.forEach((otherKernel, otherId) => {
      if (otherId === kernelId) return;

      let score = 0;

      // Tag overlap
      const commonTags = kernel.tags.filter(tag => otherKernel.tags.includes(tag));
      score += commonTags.length * 2;

      // Type similarity
      if (kernel.type === otherKernel.type) score += 1;

      // Difficulty proximity
      const difficultyDiff = Math.abs(
        ['beginner', 'intermediate', 'advanced'].indexOf(kernel.metadata.difficulty) -
        ['beginner', 'intermediate', 'advanced'].indexOf(otherKernel.metadata.difficulty)
      );
      score += (2 - difficultyDiff);

      scores.set(otherId, score);
    });

    return Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([id]) => this.graph.kernels.get(id))
      .filter((k): k is Kernel => k !== undefined);
  }

  private indexKernel(kernel: Kernel): void {
    const terms = [
      ...kernel.title.toLowerCase().split(/\s+/),
      ...kernel.tags.map(t => t.toLowerCase()),
      ...kernel.content.toLowerCase().split(/\s+/)
    ];

    terms.forEach(term => {
      if (!this.searchIndex.has(term)) {
        this.searchIndex.set(term, new Set());
      }
      this.searchIndex.get(term)!.add(kernel.id);
    });
  }

  private calculateRelevance(kernel: Kernel, terms: string[]): number {
    let score = 0;

    terms.forEach(term => {
      if (kernel.title.toLowerCase().includes(term)) score += 3;
      if (kernel.tags.some(tag => tag.toLowerCase().includes(term))) score += 2;
      if (kernel.content.toLowerCase().includes(term)) score += 1;
    });

    return score;
  }
}

export interface DependencyGraph {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface GraphNode {
  id: string;
  label: string;
  type: KernelType;
  difficulty: string;
}

export interface GraphLink {
  source: string;
  target: string;
  type: string;
}
