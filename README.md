# Tool-Library

## Project Overview
A comprehensive library of reusable tools and utilities designed to streamline development workflows and enhance productivity.

## Setup and Run Instructions

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation
1. Clone the repository:
```

## Build Process

### Webpack Configuration
- Entry point: `src/index.ts`
- Output: `dist/`
- Development mode with source maps enabled
- Production mode with minification and optimization

### TypeScript Configuration
- Strict mode enabled
- Target: ES6
- Module: CommonJS
- Source maps enabled for debugging

### Sass Processing
- Global styles in `src/styles/`
- Modular component styles
- Autoprefixer for cross-browser compatibility

### Linting and Formatting
- ESLint for JavaScript/TypeScript
- Stylelint for SCSS
- Prettier for code formatting
- Husky for pre-commit hooks

## Available NPM Scripts

- `npm start`: Start development server
- `npm run build`: Build for production
- `npm run dev`: Start development build with watch mode
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Fix linting issues automatically
- `npm run format`: Format code with Prettier
- `npm run test`: Run test suite
- `npm run test:watch`: Run tests in watch mode
- `npm run test:coverage`: Generate test coverage report

## Testing

### Running Tests