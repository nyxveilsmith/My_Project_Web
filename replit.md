# Megahand Website

## Overview

This is a full-stack web application for Megahand, a European clothing store chain operating in Azerbaijan. The application serves as the company's main website, providing information about stores, articles, and contact details. It features a modern React frontend with a Node.js/Express backend, using PostgreSQL for data storage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom theme configuration
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion for smooth animations and transitions

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Neon serverless database
- **ORM**: Drizzle ORM with type-safe queries
- **Authentication**: Express sessions with memory store
- **Email Service**: Nodemailer with Brevo SMTP for contact form emails
- **File Operations**: JSZip for creating downloadable project archives

## Key Components

### Database Schema
- **Users**: Admin authentication system with username/password
- **Articles**: Content management for blog posts and news
- **Locations**: Store location data with contact information and coordinates

### API Endpoints
- **Authentication**: `/api/login`, `/api/logout`, `/api/me`
- **Articles**: CRUD operations for blog content
- **Locations**: CRUD operations for store locations
- **Contact**: Email sending functionality
- **Download**: Project file download capability

### Frontend Features
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Multilingual Support**: Azerbaijani language content
- **Interactive Elements**: Carousels, discount popups, and animated components
- **Admin Panel**: Content management interface for authenticated users
- **Performance Optimizations**: Lazy loading, image optimization, and efficient animations

## Data Flow

1. **User Requests**: Browser requests are handled by the Vite dev server in development
2. **API Calls**: Frontend makes authenticated requests to Express API endpoints
3. **Database Operations**: Drizzle ORM queries PostgreSQL database
4. **Response Processing**: Data is returned through React Query for caching and state management
5. **UI Updates**: Components re-render based on server state changes

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **@radix-ui/react-***: Accessible UI component primitives
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Type-safe database ORM
- **express**: Web application framework
- **nodemailer**: Email sending functionality
- **zod**: Runtime type validation

### Development Tools
- **TypeScript**: Type safety and better developer experience
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing and optimization

## Recent Changes

### July 14, 2025
- **Fixed Asset Import Error**: Resolved missing asset import issue in AdminDashboard.tsx that was preventing the app from running
- **Added Day Rhythm Card**: Created a new real-time day progress component that shows:
  - Current time and date in Azerbaijani
  - Percentage of day completed based on current time
  - Percentage of year completed
  - Day of year counter
  - Visual rhythm pattern with animated progress bars
  - Dynamic color scheme based on time of day (morning/afternoon/evening/night)
  - Updates every second using real system clock
- **Implemented Flat File Download Solution**: Created a custom download feature that:
  - Maintains proper folder structure for the working system
  - Provides flat file structure download as requested by user
  - Automatically fixes import paths to work in flat structure
  - Handles duplicate file names by adding numbers
  - No build instructions needed - files work directly in flat structure

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React app to static files in `dist/public`
2. **Backend Build**: ESBuild bundles server code to `dist/index.js`
3. **Database Migration**: Drizzle kit handles schema migrations
4. **Asset Optimization**: Images and static assets are optimized

### Environment Configuration
- **Development**: Local development with hot module replacement
- **Production**: Optimized builds with compression and caching
- **Database**: Neon serverless PostgreSQL with connection pooling
- **Email**: Brevo SMTP configuration for contact form functionality

The application is designed to be deployed on platforms like Replit, Vercel, or similar services that support Node.js applications with PostgreSQL databases.