# SSO Client Application

A modern Single Sign-On (SSO) client application built with React Router v7, providing secure authentication and user management capabilities.

## 🌟 Overview

This SSO Client application serves as a centralized authentication portal that allows users to sign in once and access multiple applications and services. Built with modern web technologies, it offers a seamless and secure authentication experience.

## ✨ Features

### Authentication Features
- � **Secure User Login** - Email/password authentication with form validation
- 📝 **User Registration** - New user account creation with validation
- 🔄 **Password Reset** - Secure password reset functionality
- 🛡️ **Form Validation** - Client-side validation using React Hook Form + Zod
- 🎨 **Responsive Design** - Mobile-first responsive authentication forms

### Technical Features
- 🚀 **Server-Side Rendering (SSR)** - Built with React Router v7
- ⚡️ **Hot Module Replacement (HMR)** - Fast development experience
- 📦 **Asset Bundling** - Optimized build process with Vite
- 🎯 **TypeScript** - Full TypeScript support for type safety
- � **TailwindCSS** - Modern utility-first CSS framework
- 🌙 **Theme Switching** - Light/dark mode support
- 📱 **SEO Optimized** - Meta tags and SEO implementation
- � **Loading States** - Comprehensive loading system
- 🎭 **Framer Motion** - Smooth animations and transitions

### UI Components
- 🧩 **Radix UI** - Accessible component primitives
- 🎨 **Shadcn/ui** - Beautiful, reusable components
- 📋 **Form Controls** - Custom input, button, and select components
- 🔍 **Lucide Icons** - Modern icon system

## 🚀 Getting Started

### Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 20 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd "Single Sign On/Client"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Development

Start the development server with Hot Module Replacement:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Available Scripts

- **`npm run dev`** - Start development server with HMR
- **`npm run build`** - Create production build
- **`npm run start`** - Start production server
- **`npm run typecheck`** - Run TypeScript type checking

### Environment Configuration

Create a `.env` file in the root directory and configure your environment variables:

```env
# Add your SSO server endpoints and configuration here
VITE_API_BASE_URL=your_api_base_url
VITE_SSO_SERVER_URL=your_sso_server_url
```

## 🏗️ Building for Production

Create a production build:

```bash
npm run build
```

The build creates optimized files in the `build/` directory:
```
build/
├── client/    # Static assets (CSS, JS, images)
└── server/    # Server-side rendered code
```

## 📁 Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── features/       # Feature-specific components
│   │   └── auth/       # Authentication components
│   ├── layout/         # Layout components
│   └── ui/             # Base UI components
├── config/             # Application configuration
├── contexts/           # React contexts (Theme, Loading)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and helpers
├── routes/             # Application routes
├── schema/             # Zod validation schemas
├── stores/             # State management
└── types/              # TypeScript type definitions
```

## 🔐 Authentication Flow

The SSO Client provides three main authentication routes:

1. **Login (`/auth/login`)** - User authentication with email/password
2. **Register (`/auth/register`)** - New user registration
3. **Reset (`/auth/reset`)** - Password reset functionality

Each route includes:
- Form validation using Zod schemas
- Responsive design with Tailwind CSS
- Loading states and error handling
- SEO optimization with meta tags

## 🚢 Deployment

### Docker Deployment

The application includes a multi-stage Dockerfile for efficient containerization:

```bash
# Build the Docker image
docker build -t sso-client .

# Run the container
docker run -p 3000:3000 sso-client
```

The Docker setup includes:
- Multi-stage build for optimized image size
- Production dependencies separation
- Alpine Linux for minimal footprint

### Supported Platforms

The containerized application can be deployed to:

- **AWS ECS** - Amazon Elastic Container Service
- **Google Cloud Run** - Serverless container platform
- **Azure Container Apps** - Serverless container service
- **Digital Ocean App Platform** - Platform-as-a-Service
- **Fly.io** - Global application deployment
- **Railway** - Infrastructure platform
- **Vercel/Netlify** - Static site deployment (with adapter)

### Manual Deployment

For traditional server deployment:

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the following files:
   ```
   ├── package.json
   ├── package-lock.json
   └── build/
       ├── client/    # Static assets
       └── server/    # Server code
   ```

3. Start the production server:
   ```bash
   npm run start
   ```

## 🛠️ Technology Stack

### Core Technologies
- **React 19** - User interface library
- **React Router v7** - Routing and SSR framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server

### Styling & UI
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **Lucide React** - Icon system

### Form Management
- **React Hook Form** - Performant form library
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Form validation integration

### Development Tools
- **@react-router/dev** - Development tools
- **@tailwindcss/vite** - Tailwind CSS Vite plugin
- **vite-tsconfig-paths** - TypeScript path mapping

## 🎨 Styling and Theming

This application uses **Tailwind CSS v4** for styling with:

- **Responsive Design** - Mobile-first approach
- **Dark/Light Theme** - Built-in theme switching
- **Custom Components** - Reusable UI components with Radix UI
- **Animation Support** - Smooth transitions with Framer Motion

### Theme Configuration

The application supports theme switching through the `ThemeContext`. Users can toggle between light and dark modes using the theme switcher component.

## 📖 Documentation

- **[React Router v7 Docs](https://reactrouter.com/)** - Official React Router documentation
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Low-level UI primitives
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with easy validation
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add some feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright © 2025 Aditya Choudhury. All rights reserved.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [React Router documentation](https://reactrouter.com/)
2. Review the project's issue tracker
3. Create a new issue with detailed information

---

**Built with ❤️ using React Router v7 and modern web technologies.**
