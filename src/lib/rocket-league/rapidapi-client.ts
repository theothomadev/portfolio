import type { Platform, TrnProfileResponse } from "./types";

export const DEFAULT_RAPIDAPI_HOST = "rocket-league10.p.rapidapi.com";

const STATS_PATH = "/stats";

const PLATFORM_ALIASES: Record<Platform, string> = {
  epic: "epic",
  steam: "steam",
  psn: "psn",
  xbl: "xbox",
};

export type RapidApiStatsPayload = TrnProfileResponse & {
  status?: string;
  success?: boolean;
  message?: string;
  error?: string;
  player?: {
    username?: string;
    displayName?: string;
    name?: string;
    platform?: string;
    avatarUrl?: string | null;
    avatar?: string | null;
  };
  profile?: {
    username?: string;
    displayName?: string;
    name?: string;
    avatarUrl?: string | null;
    avatar?: string | null;
  };
  lifetime?: Record<string, number | string | null>;
  lifetimeStats?: Record<string, number | string | null>;
  stats?: Record<string, number | string | null>;
  playlists?: RapidApiPlaylist[];
  ranked?: RapidApiPlaylist[];
  rankedStats?: RapidApiPlaylist[];
  metadata?: {
    season?: number;
    currentSeason?: number;
    lastUpdated?: string;
  };
  meta?: {
    season?: number;
    currentSeason?: number;
    lastUpdated?: string;
  };
  data?: TrnProfileResponse["data"] & {
    player?: RapidApiStatsPayload["player"];
    profile?: RapidApiStatsPayload["profile"];
    lifetime?: RapidApiStatsPayload["lifetime"];
    lifetimeStats?: RapidApiStatsPayload["lifetimeStats"];
    stats?: RapidApiStatsPayload["stats"];
    playlists?: RapidApiPlaylist[];
    ranked?: RapidApiPlaylist[];
    rankedStats?: RapidApiPlaylist[];
    metadata?: RapidApiStatsPayload["metadata"];
    meta?: RapidApiStatsPayload["meta"];
  };
};

export interface RapidApiPlaylist {
  name?: string;
  playlist?: string;
  playlistName?: string;
  mode?: string;
  tier?: string;
  rank?: string;
  rankName?: string;
  division?: string;
  divisionName?: string;
  mmr?: number | string | null;
  rating?: number | string | null;
  mmrDisplay?: string | null;
  rankIconUrl?: string | null;
  icon?: string | null;
  iconUrl?: string | null;
}

export function getRapidApiConfig(): { apiKey: string; host: string } | null {
  const apiKey = process.env.RAPIDAPI_KEY?.trim();

  if (!apiKey) {
    return null;
  }

  const host = process.env.RAPIDAPI_HOST?.trim() || DEFAULT_RAPIDAPI_HOST;

  return { apiKey, host };
}

export function toApiPlatform(platform: Platform): string {
  return PLATFORM_ALIASES[platform];
}

export async function fetchPlayerProfile(
  platform: Platform,
  username: string,
  cacheSeconds: number
): Promise<{ response: Response; payload: RapidApiStatsPayload }> {
  const config = getRapidApiConfig();

  if (!config) {
    throw new Error("MISSING_API_KEY");
  }

  const profileUrl = `https://${config.host}${STATS_PATH}/${toApiPlatform(platform)}/${encodeURIComponent(username)}`;

  const response = await fetch(profileUrl, {
    headers: {
      Accept: "application/json",
      "X-RapidAPI-Key": config.apiKey,
      "X-RapidAPI-Host": config.host,
    },
    next: { revalidate: cacheSeconds },
  });

  const payload = (await response.json()) as RapidApiStatsPayload;

  return { response, payload };
}

export function getRapidApiErrorMessage(
  payload: RapidApiStatsPayload
): string | undefined {
  return payload.errors?.[0]?.message ?? payload.message ?? payload.error;
}

export function isTrnProfilePayload(payload: RapidApiStatsPayload): boolean {
  return Boolean(payload.data?.segments?.length || payload.data?.platformInfo);
}
