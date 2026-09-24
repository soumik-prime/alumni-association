# CSE Alumni Association

The CSE Alumni Association is a web platform for the Department of Computer Science and Engineering at Netrokona University. It brings public alumni content and authenticated member tools into one Next.js application.

## What It Includes

- Public association website with directory, publications, statistics, blogs, and about pages.
- Authenticated member dashboard with profile, career and studies, settings, directory, publications, and system views.
- Email and password authentication powered by Better Auth.
- Password recovery through email reset links, without OTP-based recovery.
- Permission-aware dashboard navigation based on the authenticated user's assigned permissions.
- PostgreSQL data model managed through Prisma migrations.
- Profile records connected to academic history, higher studies, work experience, addresses, institutions, and publications.

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Better Auth
- Prisma 7
- PostgreSQL
- Lucide React
- pnpm

## Project Structure

```text
app/
├── (public)/                  Public association pages and site shell
├── (protected)/               Authenticated routes and dashboard workspace
│   ├── auth/                  Login, logout, and password reset pages
│   ├── dashboard/             Member dashboard and dashboard components
│   ├── profile/               Protected profile routes
│   └── system/                Protected system access view
├── api/auth/[...all]/         Better Auth request handler
└── globals.css                Global styles and design tokens

lib/
├── auth/                      Better Auth configuration
├── notices/                   Site notification queries
└── prisma/                    Prisma client setup

prisma/
├── schema/                    Split Prisma schema files
└── migrations/                Database migrations

generated/prisma/              Generated Prisma Client output
scripts/seed.ts                Development seed data
public/logo.png                University logo asset
```

## Getting Started

### Requirements

- Node.js
- pnpm
- PostgreSQL database

Install dependencies:

```bash
pnpm install
```

Create a local environment file such as `.env.local`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
BETTER_AUTH_SECRET="replace-with-a-long-random-secret"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional: used to send password-reset emails through Resend.
RESEND_API_KEY=""
RESEND_FROM_EMAIL="no-reply@example.com"
```

Generate the Prisma client and apply development migrations:

```bash
pnpm prisma generate
pnpm prisma migrate dev
```

Seed development data when needed:

```bash
pnpm prisma:seed
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful Commands

```bash
pnpm dev                    # Start the development server
pnpm build                  # Generate Prisma Client and create a production build
pnpm start                  # Start the production server
pnpm lint                   # Run ESLint
pnpm exec tsc --noEmit      # Run TypeScript validation

pnpm prisma:generate        # Generate Prisma Client
pnpm prisma:migrate         # Create/apply a development migration and regenerate client
pnpm prisma:migrate:deploy  # Apply migrations in a deployment environment
pnpm prisma:migrate:status  # Check migration status
pnpm prisma:validate        # Validate the Prisma schema
pnpm prisma:format          # Format the Prisma schema
```

## Routes

### Public

- `/` - Association home page
- `/directory` - Public student and alumni directory
- `/publications` - Publication content
- `/statistics` - Community and academic statistics
- `/blogs` - Blog content
- `/about` - Association information

### Authentication

- `/auth/login` - Email and password login
- `/auth/forget-password` - Request a password reset link
- `/auth/reset-password` - Set a new password from a reset link
- `/auth/logout` - Sign out and return to login

### Protected Dashboard

- `/dashboard` - Member overview
- `/dashboard/profile` - Profile view
- `/dashboard/career` - Career and higher-study view
- `/dashboard/directory` - Protected directory view
- `/dashboard/publications` - Publication workspace
- `/dashboard/settings` - Account settings view
- `/dashboard/permissions` - Permission view
- `/dashboard/users` - User management view when permitted
- `/profile/edit` - Protected profile editing entry point
- `/system` - Protected system access entry point

The dashboard sidebar is generated from a centralized navigation configuration. Items with a permission requirement are shown only when the authenticated user has that permission. This is a presentation aid; backend and API authorization remain the security boundary.

## Data Model

The Prisma schema is split by domain under `prisma/schema/`. Core models include:

- `Profile` - registration number, name, batch, session, graduation year, contact links, visibility, and profile relationships.
- `User`, `Account`, `Session`, and `Verification` - Better Auth account and session data.
- `WorkExperience` and `Company` - career records and employers.
- `HigherStudy` and `Institution` - postgraduate education records.
- `Address` and `Country` - present and permanent address data.
- `Publication` and `PublicationAuthor` - research and publication records.
- `SiteNotification` - notices displayed by the association.
- `Permission`, `UserPermission`, `PermissionGroup`, `PermissionGroupItem`, and `UserPermissionGroup` - permission-based access control.

## Authentication Notes

Better Auth is configured in `lib/auth/auth.ts` with the Prisma adapter and PostgreSQL. Password reset uses a tokenized email link. When `RESEND_API_KEY` is not configured, the reset URL is logged by the development sender instead of being delivered through email.

Keep authentication secrets and database credentials out of version control.

## Build Verification

The production build can be verified with:

```bash
pnpm build
```
