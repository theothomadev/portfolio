export const PLATFORMS = [
  { value: "epic", label: "Epic Games" },
  { value: "steam", label: "Steam" },
  { value: "psn", label: "PlayStation" },
  { value: "xbl", label: "Xbox" },
] as const;

export type Platform = (typeof PLATFORMS)[number]["value"];

export interface TrnStat {
  displayValue?: string;
  value?: number | string | null;
  metadata?: {
    name?: string;
    iconUrl?: string;
  };
}

export interface TrnSegment {
  type: string;
  metadata?: {
    name?: string;
  };
  attributes?: {
    playlistId?: number;
    season?: number;
  };
  stats?: Record<string, TrnStat>;
}

export interface TrnProfileResponse {
  data?: {
    platformInfo?: {
      platformSlug?: string;
      platformUserHandle?: string;
      platformUserIdentifier?: string;
      avatarUrl?: string | null;
    };
    metadata?: {
      currentSeason?: number;
      lastUpdated?: {
        displayValue?: string;
        value?: string;
      };
    };
    segments?: TrnSegment[];
  };
  errors?: Array<{
    code?: string;
    message?: string;
  }>;
}

export interface PlaylistStats {
  name: string;
  tier: string | null;
  division: string | null;
  mmr: number | null;
  mmrDisplay: string | null;
  rankIconUrl: string | null;
}

export interface PlayerStats {
  player: {
    username: string;
    platform: Platform;
    platformLabel: string;
    avatarUrl: string | null;
  };
  lifetime: {
    wins: string | null;
    goals: string | null;
    assists: string | null;
    saves: string | null;
    shots: string | null;
  };
  playlists: PlaylistStats[];
  lastUpdated: string | null;
  currentSeason: number | null;
}

export type StatsApiErrorCode =
  | "VALIDATION_ERROR"
  | "NOT_FOUND"
  | "API_ERROR"
  | "MISSING_API_KEY"
  | "INVALID_API_KEY";

export interface StatsApiError {
  error: string;
  code: StatsApiErrorCode;
}
