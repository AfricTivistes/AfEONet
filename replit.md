# AfEONet - African Election Observers Network

## Overview

AfEONet is a Next.js-based web platform designed to monitor and document the state of civic space for citizen election observers across Africa. The application serves as a comprehensive monitoring framework using an 8-dimension assessment system to track civic space conditions. It features an interactive dashboard with country-specific data visualization, news management, report publishing capabilities, and a data submission system for field observers.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The application uses **Next.js 15** with the App Router architecture, built on React with TypeScript for type safety. The UI is constructed using **shadcn/ui components** built on top of **Radix UI primitives** for accessibility, with **Tailwind CSS** for styling. The design system implements a custom color scheme based on AfEONet's branding (teal primary, yellow secondary) with comprehensive dark mode support.

**Key architectural decisions:**
- App Router for improved performance and developer experience over Pages Router
- Component-based architecture with reusable UI primitives
- Custom CSS variables for theming consistency across light/dark modes
- Responsive design with mobile-first approach

### Content Management

The platform implements a **hybrid content strategy** combining static MDX files with dynamic data structures. MDX integration is handled through `@next/mdx` with custom component mapping via `mdx-components.tsx`, enabling rich content authoring for news articles and documentation pages.

**Content structure:**
- Static pages: About sections, documentation (MDX)
- Dynamic content: News articles, reports (file-based with frontmatter)
- Data submissions: Form-based with validation using react-hook-form and Zod

### Data Architecture

The application uses a **file-based content management system** for simplicity and version control benefits. News articles and reports are stored as MDX files with YAML frontmatter containing metadata. The 8-dimension civic space monitoring framework is implemented through structured form data collection.

**Data models:**
- News articles with metadata (title, date, author, category, tags, featured status)
- Country-specific civic space assessments across 8 dimensions
- Reports with status classifications (open, narrowed, obstructed, repressed, closed)

### Interactive Features

The dashboard features an **interactive Africa map** component with hover states and tooltips showing country-specific civic space status. The status legend uses a 5-level classification system with distinct color coding for visual clarity.

**Key components:**
- Interactive SVG-based Africa map with country selection
- Multi-step data submission forms with progress tracking
- Real-time filtering and search functionality
- Responsive navigation with mobile menu support

### Styling and Theming

The design system uses **CSS custom properties** for theming with Tailwind CSS for utility classes. The color system supports both light and dark themes with specific colors for civic space status indicators.

**Design decisions:**
- Custom color palette reflecting AfEONet branding
- Consistent spacing and typography using Tailwind's design tokens
- Accessibility-first component design with proper ARIA labels
- Status-specific color coding for data visualization

## External Dependencies

### Core Framework
- **Next.js 15** - React framework with App Router and Turbopack for development
- **React 18** - UI library with hooks and modern patterns
- **TypeScript** - Type safety and developer experience

### UI and Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives (dialogs, dropdowns, forms)
- **shadcn/ui** - Pre-built component library with customizable design system
- **Lucide React** - Icon library for consistent iconography
- **Class Variance Authority** - Component variant management

### Content and Forms
- **@next/mdx** - MDX support for rich content authoring
- **gray-matter** - YAML frontmatter parsing for content metadata
- **React Hook Form** - Form state management and validation
- **Zod** - Schema validation for form data and type safety
- **@hookform/resolvers** - Integration between React Hook Form and Zod

### Development Tools
- **ESLint** - Code linting and style enforcement
- **next-themes** - Theme switching functionality with system preference detection
- **clsx & tailwind-merge** - Conditional CSS class management

### Date and Time
- **date-fns** - Date manipulation and formatting utilities

The application is designed for deployment on Vercel with support for static generation where appropriate and dynamic rendering for user-generated content.