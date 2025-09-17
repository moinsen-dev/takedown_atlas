export type Incident = {
  id: string;
  summary: string | null;
  incident_score: number;
  country: string | null;
  incident_date: string;
  latitude: number | null;
  longitude: number | null;
  reason_code: string | null;
};

export type IncidentLeaderboardEntry = {
  business_id: string;
  business_name: string;
  incident_count: number;
  incident_score_avg: number;
  country: string | null;
};

export type BusinessProfile = {
  id: string;
  name: string;
  slug: string;
  place_id: string | null;
  website: string | null;
  country: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  incident_count: number;
  last_incident_at: string | null;
};

export type SubmissionSummary = {
  id: string;
  status: string;
  channel: string;
  platform: string;
  locale: string | null;
  subject: string | null;
  received_at: string;
  evidence_count: number;
  ai_summary: string | null;
  verification?: {
    authenticity_score: number;
    dkim_pass: boolean;
    dmarc_pass: boolean;
    spf_pass: boolean;
    processed_at: string;
  } | null;
};

export type ModerationQueueEntry = {
  submission: SubmissionSummary;
  authenticity_score: number | null;
  queue_received_at: string;
};

export type AccountRole = "verifier" | "admin" | "researcher";

export type MagicLinkRequest = {
  email: string;
};

export type AuthSession = {
  access_token: string;
  token_type: string;
  account_id: string;
  role: AccountRole;
  expires_at: string;
  display_name?: string | null;
};
