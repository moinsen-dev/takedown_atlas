"use client";

import type { AuthSession } from "@/types";

const TOKEN_KEY = "takedown-atlas.token";
const ROLE_KEY = "takedown-atlas.role";
const EXPIRY_KEY = "takedown-atlas.expiry";
const NAME_KEY = "takedown-atlas.display-name";

export function saveSession(session: AuthSession): void {
  localStorage.setItem(TOKEN_KEY, session.access_token);
  localStorage.setItem(ROLE_KEY, session.role);
  localStorage.setItem(EXPIRY_KEY, session.expires_at);
  if (session.display_name) {
    localStorage.setItem(NAME_KEY, session.display_name);
  } else {
    localStorage.removeItem(NAME_KEY);
  }
}

export function clearSession(): void {
  [TOKEN_KEY, ROLE_KEY, EXPIRY_KEY, NAME_KEY].forEach((key) =>
    localStorage.removeItem(key),
  );
}

export function getSessionToken(): string | null {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(EXPIRY_KEY);
  if (!token || !expiry) {
    return null;
  }
  const expiresAt = new Date(expiry).getTime();
  if (Number.isNaN(expiresAt) || Date.now() > expiresAt) {
    clearSession();
    return null;
  }
  return token;
}

export function getSessionRole(): string | null {
  return localStorage.getItem(ROLE_KEY);
}
