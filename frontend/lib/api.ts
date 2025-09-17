import type {
  BusinessProfile,
  Incident,
  IncidentLeaderboardEntry,
  ModerationQueueEntry
} from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:8000/v1';

export async function fetchIncidents(params: Record<string, string | number | undefined> = {}): Promise<Incident[]> {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      search.append(key, String(value));
    }
  });
  const query = search.toString();
  const url = query ? `${API_BASE}/incidents?${query}` : `${API_BASE}/incidents`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error('Failed to fetch incidents');
  }
  return res.json();
}

export async function fetchLeaderboard(): Promise<IncidentLeaderboardEntry[]> {
  const res = await fetch(`${API_BASE}/incidents/leaderboard`, { next: { revalidate: 300 } });
  if (!res.ok) {
    throw new Error('Failed to fetch leaderboard');
  }
  return res.json();
}

export async function fetchBusinessProfile(id: string): Promise<BusinessProfile> {
  const res = await fetch(`${API_BASE}/businesses/${id}`, { next: { revalidate: 300 } });
  if (!res.ok) {
    throw new Error('Failed to fetch business');
  }
  return res.json();
}

export async function submitNotice(payload: Record<string, unknown>) {
  const res = await fetch(`${API_BASE}/submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    throw new Error('Failed to submit notice');
  }
  return res.json() as Promise<{ status_token: string; submission_id: string; status: string }>;
}

export async function fetchModerationQueue(): Promise<ModerationQueueEntry[]> {
  const res = await fetch(`${API_BASE}/moderation/queue`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch moderation queue');
  }
  return res.json();
}
