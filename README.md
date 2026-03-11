# Pulso Backend

NestJS backend API for the Pulso platform.

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run start:dev

# Build for production
npm run build

# Run tests
npm run test
```

## Environment Variables

See `.env.example` in the root directory.

## API Documentation

Once running, the API is available at:
- Development: http://localhost:3001/api
- All routes are prefixed with `/api`

## Module Structure

- **Auth** - JWT authentication
- **Users** - User management
- **Analysis** - Analysis requests
- **News** - News articles
- **AI** - AI analysis integration
- **Scraping** - Python scraper orchestration
- **Payments** - Stripe integration
- **Plans** - Subscription plans
