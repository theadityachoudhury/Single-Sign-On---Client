# GitHub Workflows Documentation

This directory contains GitHub Actions workflows for continuous integration, deployment, and maintenance of the SSO Client application.

## 📋 Workflows Overview

### 🔧 [CI Workflow](./ci.yml)
**Triggers:** Push to `main`/`develop`, Pull Requests

- **Type Check**: Validates TypeScript types using `npm run typecheck`
- **Build**: Compiles the application and uploads build artifacts
- **Test**: Runs tests and linting (when configured)
- **Matrix Testing**: Tests across multiple Node.js versions (18, 20, 22) and operating systems

### 🏗️ [Code Quality](./code-quality.yml)
**Triggers:** Push to `main`/`develop`, Pull Requests

- **Lint & Format Check**: Runs ESLint and Prettier (if configured)
- **Security Audit**: Scans for vulnerabilities with `npm audit`
- **Dependency Review**: Reviews dependency changes in PRs

### 🚀 [Deploy](./deploy.yml)
**Triggers:** Push to `main`, Releases, Manual dispatch

- **Build and Deploy**: Production builds with artifact upload
- **Docker Build**: Builds Docker images (configuration required)
- **Environment Support**: Staging and production deployments

### ⚡ [Performance & Bundle Analysis](./performance.yml)
**Triggers:** Pull Requests, Push to `main`, Weekly schedule

- **Bundle Analysis**: Monitors build size and warns about large bundles
- **Lighthouse Performance**: Runs Lighthouse audits on PRs
- **Dependency Analysis**: Checks for outdated and unused dependencies

### 🔄 [Auto Update Dependencies](./auto-update.yml)
**Triggers:** Weekly schedule (Mondays), Manual dispatch

- **Dependency Updates**: Automatically updates minor and patch versions
- **Security Updates**: Fixes security vulnerabilities automatically
- **Pull Request Creation**: Creates PRs for review

## 🛠️ Configuration

### Required Scripts in package.json
Make sure these scripts are available in your `package.json`:

```json
{
  "scripts": {
    "build": "react-router build",
    "typecheck": "react-router typegen && tsc",
    "dev": "react-router dev",
    "start": "react-router-serve ./build/server/index.js"
  }
}
```

### Optional Scripts for Enhanced Functionality
Add these scripts to enable additional features:

```json
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx,.js,.jsx",
    "lint:fix": "eslint . --ext .ts,.tsx,.js,.jsx --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

### Recommended Development Dependencies

```bash
# Linting and Formatting
npm install --save-dev eslint prettier
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install --save-dev eslint-config-prettier eslint-plugin-prettier

# Testing (choose one)
npm install --save-dev vitest @vitejs/plugin-react
# or
npm install --save-dev jest @types/jest ts-jest

# Bundle analysis
npm install --save-dev webpack-bundle-analyzer
```

## 🎯 Best Practices Implemented

### Security
- ✅ Minimal permissions for workflows
- ✅ Dependabot integration via dependency-review-action
- ✅ Automatic security vulnerability fixes
- ✅ Audit level configuration

### Performance
- ✅ Concurrency control to cancel redundant runs
- ✅ Appropriate timeouts for all jobs
- ✅ Efficient caching with `actions/setup-node`
- ✅ Matrix testing optimization
- ✅ Bundle size monitoring

### Reliability
- ✅ Continue-on-error for non-critical steps
- ✅ Fail-fast disabled for matrix builds
- ✅ Proper artifact retention policies
- ✅ Conditional execution based on file presence

### Developer Experience
- ✅ Clear job names and descriptions
- ✅ Informative build artifacts
- ✅ Automated dependency management
- ✅ Performance monitoring with Lighthouse

## 📊 Status Badges

Add these badges to your main README.md:

```markdown
![CI Status](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/CI/badge.svg)
![Code Quality](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/Code%20Quality/badge.svg)
![Performance](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/Performance%20%26%20Bundle%20Analysis/badge.svg)
```

## 🚦 Getting Started

1. **Push to trigger workflows**: The workflows will automatically run on your next push or PR
2. **Review workflow runs**: Check the "Actions" tab in your GitHub repository
3. **Configure secrets**: Add any required secrets in repository settings
4. **Customize as needed**: Adjust workflows based on your specific requirements

## 🔧 Customization

### Adding Tests
When you add tests to your project, uncomment the test steps in the CI workflow:

```yaml
- name: Run tests
  run: npm test
```

### Docker Deployment
To enable Docker builds, uncomment the Docker steps in the deploy workflow and configure:

1. Add Docker registry credentials to repository secrets
2. Update image names in the metadata step
3. Uncomment the build and push steps

### Environment-Specific Deployments
Configure environment-specific secrets and variables in your repository settings under:
- Settings → Environments → Create environment
- Add required secrets and variables for each environment

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [React Router Documentation](https://reactrouter.com/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## 🤝 Contributing

When contributing to this project:

1. All PRs must pass the CI workflow
2. Code quality checks must pass
3. Consider the impact on bundle size
4. Add tests for new features
5. Update documentation as needed

The automated workflows will help ensure code quality and catch issues early in the development process.