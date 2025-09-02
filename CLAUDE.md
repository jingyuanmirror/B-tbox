# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **百宝箱企业版服务市场** (Baibao Box Enterprise Service Market) project - an AI-native application development platform that provides a comprehensive service marketplace with a unified, modern architecture.

### Service Types
- **插件 (Plugins)**: Reusable functional components that can be subscribed and referenced across AI agents
- **MCP (Model Context Protocol)**: Structured context interaction services following protocol standards  
- **服务流 (Service Flow)**: Complex service templates built with workflows that can be purchased and instantiated
- **代码服务 (Code Service)**: Custom service templates built with code that can be purchased and instantiated

### Architecture Highlights
- **Unified Structure**: All code organized under `/src/` directory with clear module separation
- **Modern Import System**: Uses `@/` path aliases for clean, maintainable imports
- **Component-Based**: Modular UI components with shadcn/ui foundation
- **Chinese-First**: Pure Chinese interface without i18n complexity

## Development Commands

```bash
# Start development server with Turbopack
pnpm dev

# Build for production with Turbopack  
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15.5.2 with App Router
- **Frontend**: React 19.1.0 with TypeScript
- **Styling**: Tailwind CSS v4 with PostCSS
- **Build Tool**: Turbopack (enabled for dev and build)
- **Fonts**: Geist Sans and Geist Mono

### Project Structure  
```
/src/
  /app/                    # Next.js App Router pages
  /components/             # All UI components
    /ui/                   # Basic UI components (shadcn/ui)
    /layout/               # Layout components (Sidebar, Header)
    /service-market/       # Service marketplace components
    /app-builder/          # Application building components
    /pages/                # Page-level components
  /lib/                    # Utility functions
  /hooks/                  # Custom React hooks
  /store/                  # Zustand state management
  /types/                  # TypeScript type definitions
  /constants/              # App constants and configuration
  /providers/              # React context providers
```

### Key Business Requirements
1. **Service Discovery**: Multi-type service browsing with category filtering (search, video, image, news, data, communication, tools)
2. **Differentiated Usage Models**: 
   - Subscription for plugins/MCP (reference in agents)
   - Purchase for workflows/code services (instantiate to user space)
3. **Service Cards**: Plugin/MCP cards must display tool counts, no evaluation system implemented
4. **Permission Management**: Resource permission validation required for service publishing workflows/code services

## Application Architecture

### Unified Modern Structure
This is a single Next.js application with a clean, organized codebase:

- **Single App**: All functionality unified under `/src/` directory
- **Clean Imports**: Uses `@/` path aliases for maintainable imports
- **Modular Components**: Well-organized component hierarchy
- **Modern Stack**: Latest Next.js 15.5 with Turbopack, React 19, TypeScript

### Key Features
- **UI Components**: Built with shadcn/ui, Radix UI, and Tailwind CSS
- **State Management**: Zustand for global state, React Hook Form for form state
- **Theming**: next-themes for dark/light mode support
- **Data Fetching**: SWR for API data management
- **Animations**: Framer Motion for smooth transitions
- **Chinese-First**: No internationalization complexity - pure Chinese interface

### Key Implementation Details
- All imports use clean `@/` aliases (e.g., `@/components/ui/button`)
- Service cards display tool counts for plugins/MCP services: "🔧 包含X个工具"
- No rating/evaluation system implemented by design
- Workflow Editor available at `/src/app/workflow-editor/`

## Component Architecture

### Service System
Core service types are defined in `/src/types/service.ts`:
- **ServiceType**: PLUGIN, MCP, SERVICE_FLOW, CODE_SERVICE
- **ServiceCategory**: search, video, image, news, data, communication, tools
- **UsageType**: subscribe (for plugins/MCP) vs purchase (for flows/code services)

### State Management
- **Zustand Store**: `/src/store/useServiceStore.ts` handles global service state
- **Service Hook**: `/src/hooks/useServices.ts` manages data fetching with SWR
- **Form State**: React Hook Form for complex forms like service publishing

### UI Component Structure
- **Layout Components**: Sidebar, AppHeader, Navigation in `/src/components/layout/`
- **Service Components**: ServiceCard, ServiceGrid, SearchAndFilters in `/src/components/service-market/`
- **App Builder Components**: CreateApp modals and orchestration in `/src/components/app-builder/`
- **UI Primitives**: shadcn/ui components in `/src/components/ui/`

### Important Business Logic
- Service cards show tool counts only for PLUGIN and MCP types
- Different interaction patterns: subscribe vs purchase based on service type
- No evaluation/rating system - this is intentional design decision
- All imports use `@/` path aliases for clean, maintainable code
