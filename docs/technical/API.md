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

### AI Readiness Questionnaire

#### POST /api/questionnaire

**Auth required**: No
**Description**: Accepts 5 multiple-choice answers about a business's AI readiness, sends them to Claude Haiku via OpenRouter, and returns a personalised assessment with tier classification, numeric score, and narrative paragraph. See ADR-003 for rationale.

**CORS**: Allowed origin from `CORS_ORIGIN` (same as other endpoints).

**Rate limiting**:
- Global API limiter applies (100 req / 15 min / IP)
- **Additional endpoint-specific limiter**: 3 requests per IP per 15-minute window
- 429 response body (Croatian default): `{ "error": "Previše pokušaja. Pokušajte za nekoliko minuta." }`

**Request body**:
```json
{
  "answers": [
    { "questionId": "q1", "value": "a" },
    { "questionId": "q2", "value": "b" },
    { "questionId": "q3", "value": "c" },
    { "questionId": "q4", "value": "a" },
    { "questionId": "q5", "value": "b" }
  ],
  "locale": "hr"
}
```

**Field validation**:
| Field | Type | Rules |
|-------|------|-------|
| `answers` | array | Required. Exactly 5 elements. |
| `answers[].questionId` | string | Required. Must be one of `"q1"`, `"q2"`, `"q3"`, `"q4"`, `"q5"`. Each ID must appear exactly once. |
| `answers[].value` | string | Required. Must be one of `"a"`, `"b"`, `"c"`. |
| `locale` | string | Required. Must be `"hr"` or `"en"`. |

**Response 200** (Croatian locale):
```json
{
  "tier": "srednji",
  "score": 52,
  "assessment": "Vaša tvrtka pokazuje solidne temelje za digitalnu transformaciju..."
}
```

**Response 200** (English locale):
```json
{
  "tier": "intermediate",
  "score": 52,
  "assessment": "Your company shows solid foundations for digital transformation..."
}
```

**Tier values by locale**:
| Score Range | Croatian (`locale: "hr"`) | English (`locale: "en"`) |
|-------------|---------------------------|--------------------------|
| 0-33 | `"pocetnik"` | `"beginner"` |
| 34-66 | `"srednji"` | `"intermediate"` |
| 67-100 | `"spreman"` | `"ready"` |

Note: Tier values use ASCII-safe strings (no diacritics) for reliable JSON handling.

**Response fields**:
| Field | Type | Description |
|-------|------|-------------|
| `tier` | string | AI readiness classification (see table above) |
| `score` | integer | Numeric score from 0 to 100 |
| `assessment` | string | 150-300 word personalised assessment in the requested locale |

**Response 422** (validation errors):
```json
{
  "errors": [
    { "field": "answers", "message": "Odgovori moraju sadržavati točno 5 stavki." },
    { "field": "locale", "message": "Jezik mora biti 'hr' ili 'en'." }
  ]
}
```

**Response 429** (rate limit exceeded):
```json
{
  "error": "Previše pokušaja. Pokušajte za nekoliko minuta."
}
```

**Response 500** (OpenRouter error, missing API key, unparseable AI response):
```json
{
  "error": "Greška pri generiranju procjene. Pokušajte ponovo."
}
```
*(English locale: `"Error generating assessment. Please try again."`)*

**Response 504** (AI timeout -- 10 second limit exceeded):
```json
{
  "error": "Procjena traje predugo. Pokušajte ponovo."
}
```
*(English locale: `"Assessment is taking too long. Please try again."`)*

**Implementation notes for backend developer**:
- Use Node 20 built-in `fetch` -- no new HTTP client dependency
- Use `AbortController` with 10-second timeout for the OpenRouter call
- OpenRouter request: `POST https://openrouter.ai/api/v1/chat/completions` with headers `Authorization: Bearer ${OPENROUTER_API_KEY}`, `Content-Type: application/json`, `HTTP-Referer: https://kontekst.hr`, `X-Title: Kontekst.hr Questionnaire`
- Model from `process.env.OPENROUTER_MODEL || 'anthropic/claude-haiku-4-5'`
- Request `response_format: { "type": "json_object" }` and `max_tokens: 800`, `temperature: 0.7`
- Parse `response.choices[0].message.content` as JSON; validate `tier`, `score`, `assessment` fields
- Constrained answer values (`"a"`, `"b"`, `"c"`) prevent prompt injection -- no free text reaches the LLM
- In `NODE_ENV=test`, skip the OpenRouter call and return a mock response (same pattern as contact route skipping email)
- Follow the existing route pattern in `backend/src/routes/contact.js`
- Register in `backend/src/app.js` on the existing `/api` router: `apiRouter.use(questionnaireRouter)`

**Environment variables** (add to `backend/.env.example`):
```env
# OpenRouter — AI questionnaire (ADR-003)
OPENROUTER_API_KEY=sk-or-v1-your-key-here
OPENROUTER_MODEL=anthropic/claude-haiku-4-5
```

---

### [Resource 2: add sections below as endpoints are built]

---

## Changelog

| Date | Change |
|------|--------|
| 2026-03-26 | `POST /api/questionnaire`: AI readiness assessment endpoint — full contract (ADR-003, #024) |
| 2026-03-25 | `POST /api/contact`: implementation (validation, rate limit, SMTP, tests) |
| 2026-03-25 | Backend scaffold: documented `GET /health`, stub `POST /api/contact` |
| [YYYY-MM-DD] | Initial API definition — auth endpoints |
