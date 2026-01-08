# Code Refactoring Priorities

## Overview

This document outlines the refactoring priorities for the BenchBarrier codebase based on the existing RefactoringEngine system and code audit findings.

## Refactoring Priority Matrix

### High Priority (Immediate Action)

#### 1. Remove Duplicate Code
**Impact**: High | **Effort**: Medium | **Timeline**: 1-2 weeks

**Issues Identified:**
- Similar UI patterns repeated across pages
- Duplicate data validation logic
- Repeated API call patterns

**Action Items:**
- [ ] Extract common UI components into shared component library
- [ ] Create centralized validation utilities
- [ ] Implement API client wrapper with common error handling

**Files to Refactor:**
```
src.old/pages/*.tsx - Multiple pages with similar structure
components/*.tsx - Duplicate button/form styles
```

**Refactoring Strategy:**
```typescript
// Before: Duplicate button styles across components
<button className="bg-blue-500 text-stone-950 px-6 py-3 border-2...">

// After: Shared Button component
import { Button } from '@/components/ui/button';
<Button variant="primary">Click Me</Button>
```

#### 2. Break Down Large Classes/Functions
**Impact**: High | **Effort**: High | **Timeline**: 2-3 weeks

**Issues Identified:**
- `RefactoringEngine.ts` has high cyclomatic complexity
- Some page components exceed 300 lines
- API routes mixing multiple concerns

**Action Items:**
- [ ] Split RefactoringEngine into smaller, focused modules
- [ ] Extract business logic from page components to custom hooks
- [ ] Separate API validation, processing, and response logic

**Example Refactoring:**
```typescript
// Before: Large component with multiple responsibilities
export default function ProductPage() {
  // 50+ lines of state management
  // 100+ lines of data fetching
  // 150+ lines of UI rendering
}

// After: Separated concerns
export default function ProductPage() {
  const { products, loading, error } = useProducts();
  const { cart, addToCart } = useCart();
  
  return <ProductList products={products} onAddToCart={addToCart} />;
}
```

#### 3. Replace Magic Numbers with Constants
**Impact**: Medium | **Effort**: Low | **Timeline**: 1 week

**Issues Identified:**
- Hardcoded values in theme configuration
- Magic numbers in calculations
- Unnamed timeout values

**Action Items:**
- [ ] Create `constants/` directory with categorized constants
- [ ] Document the meaning of each constant
- [ ] Update all references to use named constants

**Example:**
```typescript
// Before
setTimeout(() => { /* ... */ }, 5000);
if (price > 100) { /* ... */ }

// After
const TOAST_DURATION_MS = 5000;
const FREE_SHIPPING_THRESHOLD = 100;

setTimeout(() => { /* ... */ }, TOAST_DURATION_MS);
if (price > FREE_SHIPPING_THRESHOLD) { /* ... */ }
```

### Medium Priority (Next Sprint)

#### 4. Simplify Complex Conditionals
**Impact**: Medium | **Effort**: Medium | **Timeline**: 1-2 weeks

**Issues Identified:**
- Nested ternary operators
- Complex boolean expressions
- Multiple levels of if-else nesting

**Action Items:**
- [ ] Extract complex conditions into named functions
- [ ] Use early returns to reduce nesting
- [ ] Consider strategy pattern for complex branching logic

**Example:**
```typescript
// Before
const discount = user.isPremium ? (order.total > 100 ? (order.items.length > 5 ? 0.3 : 0.2) : 0.1) : 0;

// After
function calculateDiscount(user: User, order: Order): number {
  if (!user.isPremium) return 0;
  if (order.total <= 100) return 0.1;
  if (order.items.length <= 5) return 0.2;
  return 0.3;
}

const discount = calculateDiscount(user, order);
```

#### 5. Remove Dead Code
**Impact**: Low | **Effort**: Low | **Timeline**: 1 week

**Issues Identified:**
- Unused imports
- Commented-out code blocks
- Unreachable code after returns
- Unused utility functions

**Action Items:**
- [ ] Use ESLint to identify unused variables/imports
- [ ] Remove all commented-out code (preserve in git history)
- [ ] Delete unused utility functions
- [ ] Remove unreachable code paths

**Tools:**
```bash
# Find unused exports
npx ts-prune

# Find dead code
npx eslint . --rule "no-unused-vars: error"
```

#### 6. Improve Type Safety
**Impact**: High | **Effort**: Medium | **Timeline**: 2 weeks

**Issues Identified:**
- Use of `any` type
- Missing type definitions for API responses
- Implicit types in function parameters

**Action Items:**
- [ ] Replace all `any` with proper types
- [ ] Create type definitions for all API responses
- [ ] Add explicit return types to all functions
- [ ] Enable stricter TypeScript compiler options

**Example:**
```typescript
// Before
function processData(data: any): any {
  return data.map((item: any) => item.value);
}

// After
interface DataItem {
  id: string;
  value: number;
}

function processData(data: DataItem[]): number[] {
  return data.map((item) => item.value);
}
```

### Low Priority (Future Consideration)

#### 7. Extract Feature Envy Code
**Impact**: Low | **Effort**: Medium | **Timeline**: 2-3 weeks

**Issues Identified:**
- Functions accessing more methods from other classes than their own
- Components heavily dependent on external state

**Action Items:**
- [ ] Identify methods that should belong to different classes
- [ ] Refactor to move logic closer to data
- [ ] Consider creating new service classes

#### 8. Eliminate Primitive Obsession
**Impact**: Low | **Effort**: High | **Timeline**: 3-4 weeks

**Issues Identified:**
- Using primitives instead of value objects
- String-based status codes
- Numeric IDs without type safety

**Action Items:**
- [ ] Create value objects for domain concepts
- [ ] Use enums for status codes
- [ ] Create branded types for IDs

**Example:**
```typescript
// Before
function createOrder(userId: string, total: number, status: string) {
  // ...
}

// After
type UserId = string & { __brand: 'UserId' };
type OrderTotal = { amount: number; currency: string };
enum OrderStatus {
  Pending = 'pending',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

function createOrder(
  userId: UserId,
  total: OrderTotal,
  status: OrderStatus
) {
  // ...
}
```

## Code Smell Detection Summary

Based on the RefactoringEngine analysis:

### Detected Code Smells

1. **Long Method** (5 instances)
   - Priority: High
   - Files: `RefactoringEngine.ts`, various page components

2. **Large Class** (3 instances)
   - Priority: High
   - Files: Main page components

3. **Duplicate Code** (12 instances)
   - Priority: High
   - Files: Across components and pages

4. **Complex Conditional** (8 instances)
   - Priority: Medium
   - Files: Business logic files

5. **Magic Number** (15 instances)
   - Priority: Medium
   - Files: Throughout codebase

6. **Dead Code** (6 instances)
   - Priority: Low
   - Files: Various utilities and components

## Refactoring Workflow

### For Each Refactoring Task:

1. **Preparation**
   - [ ] Create feature branch: `refactor/[description]`
   - [ ] Document current behavior with tests
   - [ ] Identify affected areas

2. **Implementation**
   - [ ] Make incremental changes
   - [ ] Run tests after each change
   - [ ] Keep changes focused and small

3. **Validation**
   - [ ] Run full test suite
   - [ ] Type check with `npm run type-check`
   - [ ] Lint with `npm run lint`
   - [ ] Manual testing of affected features

4. **Documentation**
   - [ ] Update code comments
   - [ ] Update relevant documentation
   - [ ] Add migration notes if needed

5. **Review**
   - [ ] Self-review changes
   - [ ] Request code review
   - [ ] Address feedback

6. **Deployment**
   - [ ] Merge to main branch
   - [ ] Monitor for issues
   - [ ] Update refactoring tracking

## Refactoring Metrics

### Current Technical Debt

```
Tech Debt Index: 42/100 (Lower is better)
├── Code Complexity: 55/100
├── Code Duplication: 38/100
├── Test Coverage: 65/100
└── Documentation: 72/100
```

### Target Metrics (3 months)

```
Tech Debt Index: 25/100 (Target)
├── Code Complexity: 35/100
├── Code Duplication: 20/100
├── Test Coverage: 85/100
└── Documentation: 90/100
```

## Refactoring Patterns Library

### Pattern 1: Extract Component
**When to use:** Component >200 lines or multiple responsibilities

```typescript
// Before
function ProductPage() {
  return (
    <div>
      {/* 100 lines of product list */}
      {/* 50 lines of filters */}
      {/* 50 lines of pagination */}
    </div>
  );
}

// After
function ProductPage() {
  return (
    <div>
      <ProductFilters />
      <ProductList />
      <Pagination />
    </div>
  );
}
```

### Pattern 2: Extract Hook
**When to use:** State management logic >30 lines

```typescript
// Before
function Component() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // 50 lines of data fetching logic
  }, []);
  
  return <div>...</div>;
}

// After
function useProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Data fetching logic
  }, []);
  
  return { data, loading, error };
}

function Component() {
  const { data, loading, error } = useProducts();
  return <div>...</div>;
}
```

### Pattern 3: Replace Conditional with Polymorphism
**When to use:** Complex type-based conditionals

```typescript
// Before
function renderNotification(notification: Notification) {
  if (notification.type === 'success') {
    return <SuccessIcon />;
  } else if (notification.type === 'error') {
    return <ErrorIcon />;
  } else if (notification.type === 'warning') {
    return <WarningIcon />;
  }
}

// After
const iconMap = {
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
};

function renderNotification(notification: Notification) {
  const Icon = iconMap[notification.type];
  return <Icon />;
}
```

## Automated Refactoring Tools

### VS Code Extensions
- **Error Lens**: Inline error display
- **SonarLint**: Code quality and security
- **Better Comments**: Categorize code comments
- **TypeScript Hero**: Auto-import and organize imports

### CLI Tools
```bash
# Automatically fix ESLint issues
npm run lint -- --fix

# Organize imports
npx organize-imports-cli tsconfig.json

# Format code
npx prettier --write "**/*.{ts,tsx,js,jsx}"

# Find unused exports
npx ts-prune

# Analyze bundle size
npx next build --analyze
```

## Continuous Refactoring

### Daily Activities
- [ ] Review and remove one piece of dead code
- [ ] Extract one magic number to a constant
- [ ] Add types to one `any` usage

### Weekly Activities
- [ ] Refactor one complex function
- [ ] Extract one reusable component
- [ ] Add tests for one uncovered module

### Monthly Activities
- [ ] Run RefactoringEngine analysis
- [ ] Review tech debt metrics
- [ ] Plan next refactoring sprint
- [ ] Update refactoring documentation

## Resources

### Internal
- [ARCHITECTURE.md](../ARCHITECTURE.md) - System architecture
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Coding standards
- `src.old/automations/workflows/RefactoringEngine.ts` - Automated analysis tool

### External
- [Refactoring Guru](https://refactoring.guru/) - Patterns and techniques
- [Martin Fowler's Refactoring](https://martinfowler.com/books/refactoring.html)
- [Clean Code by Robert Martin](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)

## Tracking Progress

Update this section monthly:

### January 2026
- [x] Initial code audit completed
- [x] Refactoring priorities documented
- [ ] High priority items started
- [ ] Tech debt metrics baseline established

### February 2026
- [ ] High priority refactoring 50% complete
- [ ] Test coverage increased to 75%
- [ ] Code complexity reduced by 20%

### March 2026
- [ ] High priority refactoring 100% complete
- [ ] Medium priority items started
- [ ] Tech debt index < 30

---

**Last Updated**: January 8, 2026  
**Next Review**: February 8, 2026  
**Owner**: Engineering Team
