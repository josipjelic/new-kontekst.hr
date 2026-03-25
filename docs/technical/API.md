<!--
DOCUMENT METADATA
Owner: @backend-developer
Update trigger: Any API endpoint is added, modified, or removed
Update scope: Full document
Read by: @frontend-developer (to know what endpoints to call and their contracts),
          @qa-engineer (for API contract testing)
-->

# API Reference

> **Base URL (Kontekst backend)**: `http://localhost:3000` (local API root; JSON routes under `/api` where noted)
> **Authentication**: Public endpoints for v1 marketing contact flow — no auth until explicitly added per PRD
> **Content-Type**: `application/json` for JSON bodies
> **Last updated**: 2026-03-25
>
> **Note**: User-facing JSON messages from the live API are in **Croatian** (site locale). This document describes behaviour in English and shows the actual response bodies where relevant.

---

## Authentication

### How to Authenticate

[Describe the authentication mechanism — e.g.:]

Include the session token in every request:
```
Authorization: Bearer <token>
```

Tokens are obtained via the login endpoint and expire after [30 days / X hours].

### Obtaining a Token

See `POST /auth/login` below.

---

## Standard Error Format

All error responses follow this structure:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable description",
    "details": [
      { "field": "email", "message": "Invalid email format" }
    ]
  }
}
```

**Common error codes**:
| HTTP Status | Code | Meaning |
|-------------|------|---------|
| 400 | `VALIDATION_ERROR` | Request body or params failed validation |
| 401 | `UNAUTHENTICATED` | No valid auth token provided |
| 403 | `UNAUTHORIZED` | Authenticated but insufficient permissions |
| 404 | `NOT_FOUND` | Resource does not exist |
| 409 | `CONFLICT` | Duplicate resource or state conflict |
| 422 | `UNPROCESSABLE` | Request understood but cannot be processed |
| 429 | `RATE_LIMITED` | Too many requests |
| 500 | `INTERNAL_ERROR` | Server-side error |

---

## Rate Limiting

- **Global (`/api/*`)**: 100 requests per IP per 15-minute window (`express-rate-limit`, standard `RateLimit-*` headers).
- **`POST /api/contact`**: additionally 5 requests per IP per 15-minute window (counts every POST to contact, including failed validation).
- **429 response** (contact endpoint): body is localized — `{ "error": "Previše zahtjeva. Pokušajte ponovo za nekoliko minuta." }` (“Too many requests. Try again in a few minutes.”)

---

## Endpoints

### Kontekst.hr — health & contact (scaffold)

#### GET /health

**Auth required**: No  
**Description**: Health/liveness probe (Docker `HEALTHCHECK`, DigitalOcean App Platform).

**Response 200**:
```json
{
  "status": "ok",
  "timestamp": "string — ISO 8601"
}
```

---

#### POST /api/contact

**Auth required**: No  
**Description**: Contact form — accepts JSON, validates fields, sends email to `info@kontekst.hr` via SMTP (nodemailer). In `NODE_ENV=test`, email sending is skipped; response is still `201`.

**CORS**: allowed origin from `CORS_ORIGIN` (default: `http://localhost:5173`).

**Request body**:
```json
{
  "name": "string — 2–100 characters after trim",
  "email": "string — valid email, max 254 characters",
  "message": "string — 10–2000 characters after trim"
}
```

**Response 201** (message is Croatian on the live API):
```json
{
  "message": "Poruka je poslana."
}
```
*(Translation: “Message sent.”)*

**Response 422** (validation):
```json
{
  "errors": [
    { "field": "name", "message": "…" },
    { "field": "email", "message": "…" },
    { "field": "message", "message": "…" }
  ]
}
```
Validation `message` values are Croatian (e.g. “Ime je obavezno.”).

**Response 429**: contact rate limit exceeded — see Rate Limiting.

**Response 500**: SMTP failure or missing SMTP variables in production — `{ "error": "Greška pri slanju poruke. Pokušajte ponovo." }` (localized; no provider details leaked).

**Note**: Unknown routes return `404` with body `{ "error": "Not found" }`. The global error handler returns `{ "error": "<message>" }` with the appropriate status code.

---

### Auth

#### POST /auth/register

**Auth required**: No
**Description**: Create a new user account.

**Request body**:
```json
{
  "email": "string — valid email address",
  "password": "string — minimum 8 characters",
  "name": "string — display name"
}
```

**Response 201**:
```json
{
  "user": {
    "id": "uuid",
    "email": "string",
    "name": "string",
    "createdAt": "ISO 8601 datetime"
  }
}
```

**Error codes**: `400` (validation), `409` (email already registered)

---

#### POST /auth/login

**Auth required**: No
**Description**: Authenticate with email and password. Returns a session token.

**Request body**:
```json
{
  "email": "string",
  "password": "string"
}
```

**Response 200**:
```json
{
  "token": "string — JWT or session token",
  "expiresAt": "ISO 8601 datetime",
  "user": {
    "id": "uuid",
    "email": "string",
    "name": "string"
  }
}
```

**Error codes**: `400` (validation), `401` (invalid credentials)

---

#### POST /auth/logout

**Auth required**: Yes
**Description**: Invalidate the current session token.

**Request body**: None

**Response 204**: No content

---

#### POST /auth/password-reset/request

**Auth required**: No
**Description**: Send a password reset email to the specified address.

**Request body**:
```json
{
  "email": "string"
}
```

**Response 200**: Always returns 200 to prevent email enumeration.
```json
{
  "message": "If an account exists, a reset email has been sent."
}
```

---

### [Resource: e.g., Users]

#### GET /users/me

**Auth required**: Yes
**Description**: Return the authenticated user's profile.

**Response 200**:
```json
{
  "id": "uuid",
  "email": "string",
  "name": "string",
  "role": "string",
  "createdAt": "ISO 8601 datetime",
  "updatedAt": "ISO 8601 datetime"
}
```

---

#### PATCH /users/me

**Auth required**: Yes
**Description**: Update the authenticated user's profile fields.

**Request body** (all fields optional):
```json
{
  "name": "string"
}
```

**Response 200**: Returns updated user object (same shape as GET /users/me)

**Error codes**: `400` (validation)

---

### [Resource 2: add sections below as endpoints are built]

---

## Changelog

| Date | Change |
|------|--------|
| 2026-03-25 | `POST /api/contact`: implementation (validation, rate limit, SMTP, tests) |
| 2026-03-25 | Backend scaffold: documented `GET /health`, stub `POST /api/contact` |
| [YYYY-MM-DD] | Initial API definition — auth endpoints |
