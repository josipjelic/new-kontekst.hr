# syntax=docker/dockerfile:1

FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --chown=node:node . .

USER node
EXPOSE 3000
ENV NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD sh -c 'wget -qO- "http://127.0.0.1:$${PORT:-3000}/health" > /dev/null || exit 1'

CMD ["node", "src/server.js"]
