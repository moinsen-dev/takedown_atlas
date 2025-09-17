import type {
  AuthSession,
  BusinessProfile,
  Incident,
  IncidentLeaderboardEntry,
  MagicLinkRequest,
  ModerationQueueEntry,
} from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000/v1";

function buildQuery(params: Record<string, string | number | undefined>) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      search.append(key, String(value));
    }
  });
  const query = search.toString();
  return query ? `?${query}` : "";
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers ?? {}),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
}

export async function fetchIncidents(
  params: Record<string, string | number | undefined> = {},
): Promise<Incident[]> {
  const query = buildQuery(params);
  const res = await fetch(`${API_BASE}/incidents${query}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch incidents");
  }
  return res.json();
}

export async function fetchLeaderboard(): Promise<IncidentLeaderboardEntry[]> {
  const res = await fetch(`${API_BASE}/incidents/leaderboard`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch leaderboard");
  }
  return res.json();
}

export async function fetchBusinessProfile(
  id: string,
): Promise<BusinessProfile> {
  const res = await fetch(`${API_BASE}/businesses/${id}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch business");
  }
  return res.json();
}

export async function submitNotice(payload: Record<string, unknown>) {
  const res = await fetch(`${API_BASE}/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to submit notice");
  }
  return res.json() as Promise<{
    status_token: string;
    submission_id: string;
    status: string;
  }>;
}

export async function fetchModerationQueue(
  token: string,
): Promise<ModerationQueueEntry[]> {
  return apiFetch<ModerationQueueEntry[]>(
    `/moderation/queue`,
    { cache: "no-store", headers: {} },
    token,
  );
}

export async function publishSubmission(
  submissionId: string,
  body: Record<string, unknown>,
  token: string,
) {
  return apiFetch(
    `/moderation/submissions/${submissionId}/publish`,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
    token,
  );
}

export async function requestMagicLink(
  payload: MagicLinkRequest,
): Promise<{ message: string }> {
  return apiFetch<{ message: string }>(`/auth/magic-links`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function verifyMagicLink(token: string): Promise<AuthSession> {
  return apiFetch<AuthSession>(`/auth/magic-links/verify`, {
    method: "POST",
    body: JSON.stringify({ token }),
  });
}
