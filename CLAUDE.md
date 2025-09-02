# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **百宝箱企业版服务市场** (Baibao Box Enterprise Service Market) project - an AI-native application development platform that provides a comprehensive service marketplace. The project is upgrading from a simple plugin market to support multiple service types.

### Service Types
- **插件 (Plugins)**: Reusable functional components that can be subscribed and referenced across AI agents
- **MCP (Model Context Protocol)**: Structured context interaction services following protocol standards  
- **服务流 (Service Flow)**: Complex service templates built with workflows that can be purchased and instantiated
- **代码服务 (Code Service)**: Custom service templates built with code that can be purchased and instantiated

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production with Turbopack  
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15.5.2 with App Router
- **Frontend**: React 19.1.0 with TypeScript
- **Styling**: Tailwind CSS v4 with PostCSS
- **Build Tool**: Turbopack (enabled for dev and build)
- **Fonts**: Geist Sans and Geist Mono

### Project Structure
- **Main App**: `/src/app/` - Primary Next.js application with App Router
- **Service Market Prototype**: `/service-market/` - Separate Next.js app for service market prototyping
- **App Builder**: `/app-builder/` - Additional application building utilities

### Key Business Requirements
1. **Service Discovery**: Multi-type service browsing with category filtering (search, video, image, news, data, communication, tools)
2. **Differentiated Usage Models**: 
   - Subscription for plugins/MCP (reference in agents)
   - Purchase for workflows/code services (instantiate to user space)
3. **Service Cards**: Plugin/MCP cards must display tool counts, no evaluation system implemented
4. **Permission Management**: Resource permission validation required for service publishing workflows/code services

## Application Architecture

### Dual App Structure
The project contains two distinct Next.js applications:

1. **Main App** (`/src/app/`): Simple application that imports and uses components from the service-market prototype
2. **Service Market Prototype** (`/service-market/`): Full-featured prototype with comprehensive UI components, state management, and business logic

### Service Market Features
- **UI Components**: Built with shadcn/ui, Radix UI, and Tailwind CSS
- **State Management**: Zustand for global state, React Hook Form for form state
- **Internationalization**: next-intl for multi-language support
- **Theming**: next-themes for dark/light mode support
- **Data Fetching**: SWR for API data management
- **Animations**: Framer Motion for smooth transitions

### Key Implementation Details
- Main app imports service-market components using relative paths: `../../service-market/src/components/...`
- Service cards display tool counts for plugins/MCP services: "🔧 包含X个工具"
- No rating/evaluation system implemented by design
- Workflow Editor available at `/service-market/src/app/workflow-editor/`

## Working with Multiple Apps

### Development Workflow
When making changes, consider which app needs modification:
- **Main App Changes**: Edit files in `/src/app/` - this is the primary application
- **Service Market Changes**: Edit files in `/service-market/src/` - this contains the full prototype implementation
- **Shared Dependencies**: Both apps share identical dependencies and must be kept in sync

### Running Applications
```bash
# Run main app (imports from service-market)
npm run dev

# Run service-market prototype independently  
cd service-market && npm run dev
```

## Component Architecture

### Service System
Core service types are defined in `/service-market/src/types/service.ts`:
- **ServiceType**: PLUGIN, MCP, SERVICE_FLOW, CODE_SERVICE
- **ServiceCategory**: search, video, image, news, data, communication, tools
- **UsageType**: subscribe (for plugins/MCP) vs purchase (for flows/code services)

### State Management
- **Zustand Store**: `/service-market/src/store/useServiceStore.ts` handles global service state
- **Service Hook**: `/service-market/src/hooks/useServices.ts` manages data fetching with SWR
- **Form State**: React Hook Form for complex forms like service publishing

### UI Component Structure
- **Layout Components**: Sidebar, AppHeader, Navigation in `/service-market/src/components/layout/`
- **Service Components**: ServiceCard, ServiceGrid, SearchAndFilters in `/service-market/src/components/services/`
- **UI Primitives**: shadcn/ui components in `/service-market/src/components/ui/`

### Important Business Logic
- Service cards show tool counts only for PLUGIN and MCP types
- Different interaction patterns: subscribe vs purchase based on service type
- No evaluation/rating system - this is intentional design decision