# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
- No test framework is configured

## Architecture

Single-page marketing site for "Construct" (a digital products company) built with Next 16 + React 19 + TypeScript. Uses the App Router.

**Frontend:** All UI is in `src/components/` using CSS Modules (`.module.css`). The page (`src/app/page.tsx`) composes: Header, Hero, Services, Work, Contact, Footer. Only the Contact form is a client component (`"use client"`); everything else is server-rendered.

**Backend:** Two API routes under `src/app/api/`:
- `POST /api/contact` — contact form submission with rate limiting, Zod validation, honeypot spam check, and email via Resend
- `GET /api/health` — health check endpoint

**Shared libs** in `src/lib/`:
- `validation.ts` — Zod schema for contact form (includes control-char stripping)
- `rate-limit.ts` — in-memory sliding-window rate limiter (5 req/min per IP)
- `email.ts` — Resend integration; logs to console in dev when `RESEND_API_KEY` is unset

**Security layers:**
- `next.config.ts` — security headers (CSP, HSTS, X-Frame-Options, etc.)
- `src/proxy.ts` — middleware enforcing body size limits and JSON content-type on API routes

## Environment Variables

- `RESEND_API_KEY` — Resend API key (optional; dev mode logs emails to console)
- `NOTIFICATION_EMAIL` — recipient for contact form submissions
- `FROM_EMAIL` — sender address for outbound emails
