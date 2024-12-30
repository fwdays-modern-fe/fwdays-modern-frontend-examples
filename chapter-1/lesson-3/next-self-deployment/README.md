# Next.js Self-Hosted Deployment

This repository contains configuration for deploying a Next.js application using Docker and Kamal.

## Configuration Files

### Next.js Configuration
`next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
};

module.exports = nextConfig;
```

### Docker Configuration
`Dockerfile` for multi-stage build process:
```dockerfile
# Builder image
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk update && apk upgrade
RUN apk add curl
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app
RUN addgroup -S nonroot && adduser -S nonroot -G nonroot
USER nonroot
COPY --from=builder --chown=nonroot:nonroot /app/.next/standalone ./
COPY --from=builder --chown=nonroot:nonroot /app/public ./public
COPY --from=builder --chown=nonroot:nonroot /app/.next/static ./.next/static
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
EXPOSE 3000
CMD ["node", "server.js"]
```

### Kamal Deployment Configuration
`config/deploy.yml`:
```yaml
service: example
image: fwd-next-app-w-ssr

env:
  secret:
    - EXAMPLE_SECRET

servers:
  - 5.22.220.154

proxy:
  app_port: 3000
  ssl: true
  host: example.com
  healthcheck:
    path: /
    interval: 5

registry:
  username:
    - DOCKER_USERNAME
  password:
    - DOCKER_PASSWORD

builder:
  arch: amd64
  remote: ssh://5.22.220.154
  cache:
    type: registry
    options: mode=max
    image: your-repo/example-build-cache

asset_path: /app/.next
```

## Prerequisites

- Docker
- Node.js (v20+)
- Kamal CLI
- SSH access to deployment server
- Docker Hub account

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Create .env file with required secrets
DOCKER_USERNAME=your_username
DOCKER_PASSWORD=your_token
```

3. Configure SSH access



## Deployment Commands

### First-time setup:
```bash
kamal setup
```

### Regular deployment:
```bash
kamal deploy
```

### Check deployment status:
```bash
kamal lock status
```

### Release deployment lock:
```bash
kamal lock release
```

## Troubleshooting

1. If deployment lock is stuck:
```bash
kamal lock release
```

2. For SSH authentication issues:
```bash
# Verify SSH connection
ssh root@your_server_ip

# Check SSH key permissions
chmod 600 ~/.ssh/your_key
chmod 644 ~/.ssh/your_key.pub
```

3. For Docker registry issues:
```bash
# Test Docker login
docker login
```

## Security Notes

- Never commit `.env` files or sensitive credentials
- Use non-root user in Docker (configured in Dockerfile)
- Keep Docker images and dependencies updated
- Regularly update SSL certificates
- Monitor server health checks
