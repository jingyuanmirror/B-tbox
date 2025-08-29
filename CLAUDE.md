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
- **Documentation**: ` . result/service_market_prd.md` - Complete Product Requirement Document

### Key Business Requirements
1. **Service Discovery**: Multi-type service browsing with category filtering (search, video, image, news, data, communication, tools)
2. **Differentiated Usage Models**: 
   - Subscription for plugins/MCP (reference in agents)
   - Purchase for workflows/code services (instantiate to user space)
3. **Service Cards**: Plugin/MCP cards must display tool counts, no evaluation system implemented
4. **Permission Management**: Resource permission validation required for service publishing workflows/code services

## Service Market PRD

The complete PRD at ` . result/service_market_prd.md` contains:
- Detailed UI/UX specifications including service card designs
- Service publishing workflow with permission validation
- Technical implementation requirements and database schemas
- User experience guidelines and interaction patterns

The PRD specifies that plugin and MCP service cards should show "🔧 包含X个工具" (contains X tools) and no rating/evaluation system is currently implemented.