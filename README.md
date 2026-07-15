# FieldDesk - Role-Based Ticket Management System

A modern, responsive ticket management system built with React, TypeScript, and Vite. Features comprehensive role-based access control with organization-level permissions and a clean, intuitive interface.

## Features

- **Role-Based Access Control (RBAC)** - 5 distinct user roles with granular permissions
- **Organization Management** - Multi-tenant architecture with organization isolation
- **Ticket Management** - Create, assign, track, and resolve tickets with priority levels
- **Dashboard Analytics** - KPI tracking and visual analytics with charts
- **Responsive Design** - Modern UI built with Tailwind CSS and shadcn/ui components
- **Permission Guards** - Route and component-level access control

## Installation and Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd fielddesk
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to access the application.

### Build for Production

```bash
npm run build
npm run preview
```

## Testing Different Users and Organizations

The application includes comprehensive mock data for testing different user roles and scenarios.

### Available Test Users

| User          | Email                    | Role        | Organization | Access Level                     |
| ------------- | ------------------------ | ----------- | ------------ | -------------------------------- |
| Sameer Sharma | superadmin@fielddesk.com | SUPER_ADMIN | Platform     | Full system access               |
| Sarah Auditor | auditor@fielddesk.com    | AUDITOR     | Platform     | Read-only access across all orgs |
| Hari Admin    | hari@hgn.com             | ORG_ADMIN   | HGN          | Full org management              |
| Ram Lead      | ram@hgn.com              | TEAM_LEAD   | HGN          | Team and ticket management       |
| Sita Agent    | sita@hgn.com             | AGENT       | HGN          | Basic ticket operations          |
| Krishna Agent | krishna@hgn.com          | AGENT       | HGN          | Basic ticket operations          |
| Nabin Admin   | nabin@ebl.com            | ORG_ADMIN   | Everest Bank | Full org management              |
| Anita Lead    | anita@ebl.com            | TEAM_LEAD   | Everest Bank | Team and ticket management       |
| Ramesh Agent  | ramesh@ebl.com           | AGENT       | Everest Bank | Basic ticket operations          |
| Dipesh Admin  | dipesh@abc.com           | ORG_ADMIN   | ABC School   | Full org management              |
| Mina Lead     | mina@abc.com             | TEAM_LEAD   | ABC School   | Team and ticket management       |
| Aashish Agent | aashish@abc.com          | AGENT       | ABC School   | Basic ticket operations          |

### Test Organizations

1. **Himalayan Guardian Nepal (HGN)** - Kathmandu
2. **Everest Bank (EBL)** - Lalitpur
3. **ABC School (ABC)** - Pokhara

### How to Test

1. **Login Process**: Click on any user card on the login page to assume their identity
2. **Role Testing**:
   - Login as different roles to see varying dashboard layouts and permissions
   - Try accessing restricted features (they'll be hidden or show permission errors)
3. **Organization Switching**:
   - SUPER_ADMIN and AUDITOR can switch between organizations
   - Other roles are restricted to their assigned organization
4. **Ticket Access**:
   - AGENTS can only see tickets assigned to them
   - TEAM_LEADs and above see all org tickets
   - Platform users see all tickets across organizations

## Permissions System

### Architecture Overview

The permission system is built on a Role-Based Access Control (RBAC) model with the following components:

- **Roles**: 5 hierarchical roles (SUPER_ADMIN → AUDITOR → ORG_ADMIN → TEAM_LEAD → AGENT)
- **Resources**: 4 main resources (ticket, staff, organization, analytics)
- **Actions**: 6 possible actions (view, create, edit, delete, assign, manage)

### Permission Storage

Permissions are stored in `/src/mock/permissions.ts` as a structured array:

```typescript
interface IPermission {
  id: string;
  role: Role;
  resource: TResource;
  action: TActions;
  allowed: boolean;
}
```

### Permission Updates

1. **Runtime Updates**: Permissions can be modified through the Permission Summary component
2. **Immediate Effect**: Changes trigger a custom event (`permissionsChanged`) for instant UI updates
3. **Persistent Storage**: In a real application, this would sync with a backend API

### Permission Checking

The system uses utility functions in `/src/lib/permission.ts`:

```typescript
// Check if user can perform action
can(user, "ticket", "create"); // returns boolean

// Check if user cannot perform action
cannot(user, "ticket", "delete"); // returns boolean

// Special ticket access logic
canAccessTicket(user, ticket); // handles org isolation + assignment
```

### Permission Guards

- **Route Guards**: `AuthGuard` and `PermissionGuard` protect routes
- **Component Guards**: `PermissionButton` conditionally renders UI elements
- **Context Provider**: `PermissionContext` provides reactive permission checking

## Technical Decisions

### Architecture Choices

1. **React + TypeScript**: Type safety and modern React patterns with hooks
2. **Vite**: Fast development server and optimized builds
3. **Zustand**: Lightweight state management for session and user state
4. **React Router v7**: Modern routing with nested layouts
5. **Tailwind CSS + shadcn/ui**: Utility-first CSS with high-quality components

### State Management Strategy

- **Session Store**: User authentication and organization context
- **Permission Context**: Reactive permission checking across components
- **Form State**: React Hook Form for efficient form handling
- **Mock API**: Promise-based mock services simulating real API calls

### Component Architecture

- **Layout System**: Nested layouts (DashboardLayout) with conditional rendering
- **Permission Wrapper**: Higher-order components for access control
- **Reusable Components**: Consistent UI components from shadcn/ui
- **Feature Components**: Domain-specific components (PermissionButton, TicketForm)

### Data Flow

1. **Login**: User selects identity → Session store updated → Permission context refreshed
2. **Navigation**: Route guards check permissions → Render appropriate layout
3. **Actions**: Permission checks before API calls → UI updates → Context refresh
4. **Real-time**: Custom events for immediate permission updates

## Known Limitations & Omitted Features

### Authentication System

- **Limitation**: No real authentication (mock login system)
- **Production Need**: JWT tokens, password hashing, session management
- **Security**: No CSRF protection or secure session handling

### Backend Integration

- **Limitation**: All data is mock/client-side
- **Production Need**: REST/GraphQL APIs, database integration
- **Real-time**: No WebSocket support for live updates

### Permission System Limitations

- **Granularity**: Limited to resource-action pairs (no field-level permissions)
- **Dynamic Permissions**: No conditional permissions based on data context
- **Audit Trail**: No permission change logging or history

### Data Validation

- **Client-only**: Form validation happens only in the browser
- **Production Need**: Server-side validation and sanitization
- **File Uploads**: No file attachment system for tickets

### Features Omitted Due to Time

1. **Email Notifications**: No email system for ticket updates
2. **File Attachments**: No document/image upload for tickets
3. **Advanced Search**: No full-text search or complex filtering
4. **Reporting**: No PDF/Excel export capabilities
5. **Mobile App**: Responsive web only, no native mobile apps
6. **Multi-language**: English only, no i18n support
7. **Advanced Analytics**: Basic charts only, no custom dashboard builder
8. **Integration APIs**: No third-party service integrations
9. **Bulk Operations**: No bulk ticket assignment or updates
10. **Custom Fields**: Fixed ticket schema, no dynamic field configuration

### Performance Considerations

- **Client-side Rendering**: No SSR/SSG for SEO
- **Large Datasets**: No pagination or virtualization for large lists
- **Caching**: No sophisticated caching strategy

### Browser Compatibility

- **Modern Browsers**: Requires ES6+ support
- **IE Support**: Not compatible with Internet Explorer

## Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Testing
# Note: No test suite included - would recommend Jest + React Testing Library
```

## Project Structure

```
src/
├── components/ui/          # Reusable UI components (shadcn/ui)
├── contexts/              # React contexts (Permission, etc.)
├── features/              # Feature-specific components (guards, etc.)
├── hooks/                 # Custom React hooks
├── layouts/               # Layout components (DashboardLayout)
├── lib/                   # Utility functions (permissions, etc.)
├── mock/                  # Mock data and API functions
├── pages/                 # Page components
├── router/                # Routing configuration
├── services/              # API service functions
├── stores/                # Zustand state stores
└── types/                 # TypeScript type definitions
```
