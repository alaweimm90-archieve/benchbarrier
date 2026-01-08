# Contributing to BenchBarrier

Thank you for your interest in contributing to BenchBarrier! This guide will help you understand our development process, coding standards, and best practices.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Architecture Principles](#architecture-principles)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Documentation](#documentation)

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming environment for all contributors.

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/benchbarrier.git
   cd benchbarrier
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase and Stripe credentials in `.env.local`

5. Run the development server:
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Naming Convention

Follow these patterns for branch names:

- `feature/short-description` - New features
- `fix/short-description` - Bug fixes
- `docs/short-description` - Documentation updates
- `refactor/short-description` - Code refactoring
- `test/short-description` - Test additions or modifications
- `chore/short-description` - Maintenance tasks

Examples:
- `feature/social-media-scheduler`
- `fix/cart-total-calculation`
- `docs/api-documentation`

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no code change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes
- `build`: Build system changes

**Examples:**
```
feat(cart): add quantity validation before checkout

fix(stripe): handle webhook signature verification errors

docs(api): add social media API documentation

refactor(components): extract common button styles

test(payment): add integration tests for payment workflow
```

## Coding Standards

### TypeScript

- **Strict Mode**: Always use TypeScript strict mode
- **Types**: Prefer explicit types over `any`
- **Interfaces**: Use interfaces for object shapes
- **Enums**: Use enums for fixed sets of values

```typescript
// ✅ Good
interface Product {
  id: string;
  name: string;
  price: number;
}

const getProduct = (id: string): Promise<Product> => {
  // implementation
};

// ❌ Bad
const getProduct = (id: any): any => {
  // implementation
};
```

### Naming Conventions

#### Files and Folders
- **Components**: PascalCase (e.g., `ProductCard.tsx`, `NavBar.tsx`)
- **Utilities**: camelCase (e.g., `formatPrice.ts`, `validateEmail.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)
- **Hooks**: camelCase with `use` prefix (e.g., `useCart.ts`, `useAuth.ts`)
- **Types**: PascalCase (e.g., `Product.ts`, `UserProfile.ts`)

#### Variables and Functions
- **Variables**: camelCase (e.g., `productList`, `totalPrice`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_QUANTITY`, `API_BASE_URL`)
- **Functions**: camelCase, use verbs (e.g., `getProducts`, `validateInput`, `handleSubmit`)
- **Boolean variables**: Use is/has/should prefix (e.g., `isLoading`, `hasError`, `shouldRender`)
- **Event handlers**: Use handle prefix (e.g., `handleClick`, `handleSubmit`)

```typescript
// ✅ Good
const MAX_ITEMS_IN_CART = 10;
const isAuthenticated = true;
const handleAddToCart = () => { /* ... */ };

// ❌ Bad
const max = 10;
const auth = true;
const addCart = () => { /* ... */ };
```

#### Components
- **React Components**: PascalCase
- **Component files**: PascalCase matching component name
- **Props interfaces**: ComponentNameProps

```typescript
// ProductCard.tsx
interface ProductCardProps {
  product: Product;
  onAddToCart: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  // implementation
};
```

### Code Style

#### Formatting
- **Indentation**: 2 spaces (no tabs)
- **Line Length**: Maximum 100 characters
- **Semicolons**: Always use semicolons
- **Quotes**: Single quotes for strings (except JSX attributes)
- **Trailing Commas**: Always use in multi-line objects/arrays

```typescript
// ✅ Good
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
};

// ❌ Bad
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
}
```

#### React/Next.js Specific

**Component Structure:**
```typescript
// 1. Imports
import React from 'react';
import { useCart } from '@/lib/cart-context';

// 2. Types/Interfaces
interface Props {
  // ...
}

// 3. Component
export const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  // 4. Hooks
  const { cart } = useCart();
  const [state, setState] = useState<string>('');

  // 5. Effects
  useEffect(() => {
    // ...
  }, []);

  // 6. Event Handlers
  const handleClick = () => {
    // ...
  };

  // 7. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

**Styling:**
- Use Tailwind CSS utility classes
- Follow brutalist design system (see `app/globals.css`)
- **NO rounded corners**: Always use `rounded-none`
- Use design tokens from `tailwind.config.js`

```tsx
// ✅ Good - Brutalist design
<button className="bg-blue-500 text-stone-950 px-6 py-3 border-2 border-blue-500 uppercase font-mono tracking-tight hover:bg-blue-400 transition-colors duration-200 rounded-none">
  Add to Cart
</button>

// ❌ Bad - Rounded corners
<button className="bg-blue-500 rounded-lg">
  Add to Cart
</button>
```

### File Organization

```
app/
├── (routes)/           # Route groups
│   ├── page.tsx       # Page component
│   └── layout.tsx     # Layout component
├── actions/           # Server actions
├── api/               # API routes
└── globals.css        # Global styles

components/
├── ui/                # shadcn/ui components (customized)
├── navbar.tsx         # Layout components
└── product-card.tsx   # Feature components

lib/
├── utils.ts           # Utility functions
├── cart-context.tsx   # State management
└── products.ts        # Data/constants
```

## Architecture Principles

### Clean Architecture

Follow the layered architecture defined in `ARCHITECTURE.md`:

1. **Core Layer**: Business logic (no external dependencies)
2. **Adapters Layer**: Third-party integrations (Stripe, Supabase)
3. **Infrastructure Layer**: Cross-cutting concerns (monitoring, security)
4. **Interfaces Layer**: UI components, API routes

### SOLID Principles

1. **Single Responsibility**: Each module/function has one reason to change
2. **Open/Closed**: Open for extension, closed for modification
3. **Liskov Substitution**: Subtypes must be substitutable for base types
4. **Interface Segregation**: Many specific interfaces over one general
5. **Dependency Inversion**: Depend on abstractions, not concretions

### Best Practices

- **DRY (Don't Repeat Yourself)**: Extract common logic into utilities
- **KISS (Keep It Simple, Stupid)**: Prefer simplicity over complexity
- **YAGNI (You Aren't Gonna Need It)**: Don't add functionality until needed
- **Composition over Inheritance**: Use composition for code reuse
- **Immutability**: Prefer immutable data structures

```typescript
// ✅ Good - Immutable update
const updatedCart = cart.map(item => 
  item.id === productId 
    ? { ...item, quantity: item.quantity + 1 }
    : item
);

// ❌ Bad - Mutation
cart.find(item => item.id === productId).quantity += 1;
```

## Testing Requirements

### Test Coverage

- **Minimum Coverage**: 70% for new code
- **Critical Paths**: 90%+ coverage (checkout, payments)
- **Utilities**: 100% coverage

### Test Types

1. **Unit Tests**: Test individual functions/components
   ```typescript
   // __tests__/lib/formatPrice.test.ts
   import { formatPrice } from '@/lib/utils';

   describe('formatPrice', () => {
     it('should format price with currency symbol', () => {
       expect(formatPrice(4999)).toBe('$49.99');
     });
   });
   ```

2. **Integration Tests**: Test component interactions
   ```typescript
   // __tests__/components/ProductCard.test.tsx
   import { render, screen, fireEvent } from '@testing-library/react';
   import { ProductCard } from '@/components/product-card';

   describe('ProductCard', () => {
     it('should add product to cart on button click', () => {
       const mockAddToCart = jest.fn();
       render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);
       
       fireEvent.click(screen.getByText('Add to Cart'));
       expect(mockAddToCart).toHaveBeenCalledWith(mockProduct.id);
     });
   });
   ```

3. **E2E Tests**: Test complete user flows (if applicable)

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Type checking
npm run type-check

# Linting
npm run lint
```

## Pull Request Process

### Before Submitting

1. **Run all checks**:
   ```bash
   npm run type-check
   npm run lint
   npm test
   npm run build
   ```

2. **Update documentation** if needed
3. **Add tests** for new features
4. **Update CHANGELOG.md** (if applicable)

### PR Title Format

Follow conventional commit format:
```
<type>(<scope>): <description>
```

Examples:
- `feat(dashboard): add social media post scheduler`
- `fix(cart): resolve quantity update race condition`
- `docs(api): add authentication endpoints documentation`

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Changes Made
- Change 1
- Change 2

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] All tests passing

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code sections
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Tests added/updated
- [ ] All tests passing
```

### Review Process

1. **Automated Checks**: CI/CD must pass
2. **Code Review**: At least one approval required
3. **Testing**: Reviewer tests the changes
4. **Merge**: Squash and merge (maintain clean history)

## Documentation

### Code Comments

- **When to comment**: Complex logic, non-obvious decisions, workarounds
- **What to comment**: Why, not what (code shows what)
- **Style**: Clear, concise, professional

```typescript
// ✅ Good - Explains why
// Use exponential backoff to avoid rate limiting from Stripe API
const retryDelay = Math.pow(2, attempt) * 1000;

// ❌ Bad - Explains what (obvious from code)
// Set retry delay to 2 raised to the power of attempt times 1000
const retryDelay = Math.pow(2, attempt) * 1000;
```

### Documentation Files

When adding features, update relevant documentation:
- `README.md`: User-facing features
- `ARCHITECTURE.md`: System design changes
- `CONFIGURATION_GUIDE.md`: Configuration changes
- `DEPLOYMENT_GUIDE.md`: Deployment process changes

### API Documentation

Document all API endpoints:
```typescript
/**
 * Creates a new post schedule
 * 
 * @param {PostScheduleInput} input - The post schedule configuration
 * @param {string} input.content - Post content
 * @param {Date} input.scheduledFor - Scheduled publish time
 * @param {Platform[]} input.platforms - Target platforms
 * @returns {Promise<PostSchedule>} The created post schedule
 * @throws {ValidationError} If input validation fails
 * @throws {DatabaseError} If database operation fails
 * 
 * @example
 * const schedule = await createPostSchedule({
 *   content: "Check out our new product!",
 *   scheduledFor: new Date('2026-01-15T10:00:00Z'),
 *   platforms: ['instagram', 'facebook']
 * });
 */
```

## Security Considerations

### Secrets Management

- **Never commit secrets** to version control
- Use `.env.local` for local secrets
- Use environment variables in production
- Document required environment variables in `.env.example`

### Input Validation

- Validate all user inputs
- Sanitize data before database operations
- Use Zod schemas for validation

```typescript
import { z } from 'zod';

const ProductSchema = z.object({
  name: z.string().min(1).max(100),
  price: z.number().positive(),
  quantity: z.number().int().min(1).max(10),
});

// Validate input
const result = ProductSchema.safeParse(input);
if (!result.success) {
  throw new ValidationError(result.error);
}
```

### Security Best Practices

- Use HTTPS in production
- Implement rate limiting on API endpoints
- Use parameterized queries (prevent SQL injection)
- Escape user content (prevent XSS)
- Validate file uploads
- Keep dependencies updated

## Performance Guidelines

### Optimization Strategies

1. **Code Splitting**: Use dynamic imports for large components
2. **Lazy Loading**: Load images and components on demand
3. **Memoization**: Use `useMemo` and `useCallback` appropriately
4. **Bundle Size**: Monitor and minimize bundle size

```typescript
// ✅ Good - Lazy loading
const DashboardPage = dynamic(() => import('@/app/dashboard/page'), {
  loading: () => <LoadingSpinner />,
});

// ✅ Good - Memoization
const expensiveCalculation = useMemo(() => {
  return computeComplexValue(data);
}, [data]);
```

### Performance Budgets

- **Initial JS**: < 200 KB
- **CSS**: < 50 KB
- **Images**: < 100 KB each
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

## Questions or Issues?

- **Documentation**: Check existing documentation in `/docs`
- **Issues**: Search [GitHub Issues](https://github.com/alaweimm90-archieve/benchbarrier/issues)
- **Discussions**: Start a [GitHub Discussion](https://github.com/alaweimm90-archieve/benchbarrier/discussions)

Thank you for contributing to BenchBarrier! 🚀
