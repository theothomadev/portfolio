import {
  PLATFORMS,
  type Platform,
  type PlayerStats,
  type TrnProfileResponse,
  type TrnSegment,
  type TrnStat,
} from "./types";
import type {
  RapidApiPlaylist,
  RapidApiStatsPayload,
} from "./rapidapi-client";
import { isTrnProfilePayload } from "./rapidapi-client";

function getPlatformLabel(platform: Platform): string {
  return PLATFORMS.find((item) => item.value === platform)?.label ?? platform;
}

function getStatDisplay(
  stats: Record<string, TrnStat> | undefined,
  key: string
): string | null {
  const value = stats?.[key]?.displayValue;
  return value ?? null;
}

function getStatMetadataName(
  stats: Record<string, TrnStat> | undefined,
  key: string
): string | null {
  return stats?.[key]?.metadata?.name ?? null;
}

function getStatMetadataIcon(
  stats: Record<string, TrnStat> | undefined,
  key: string
): string | null {
  return stats?.[key]?.metadata?.iconUrl ?? null;
}

function getStatNumber(
  stats: Record<string, TrnStat> | undefined,
  key: string
): number | null {
  const value = stats?.[key]?.value;
  return typeof value === "number" ? value : null;
}

function isCompetitivePlaylist(segment: TrnSegment): boolean {
  const name = segment.metadata?.name ?? "";
  return segment.type === "playlist" && name.startsWith("Ranked");
}

function transformPlaylist(segment: TrnSegment): PlayerStats["playlists"][number] {
  const stats = segment.stats;

  return {
    name: segment.metadata?.name ?? "Unknown playlist",
    tier: getStatMetadataName(stats, "tier"),
    division: getStatMetadataName(stats, "division"),
    mmr: getStatNumber(stats, "rating"),
    mmrDisplay: getStatDisplay(stats, "rating"),
    rankIconUrl: getStatMetadataIcon(stats, "tier"),
  };
}

export function transformTrnProfile(
  payload: TrnProfileResponse,
  platform: Platform,
  username: string
): PlayerStats {
  const data = payload.data;
  const platformInfo = data?.platformInfo;
  const currentSeason = data?.metadata?.currentSeason ?? null;
  const segments = data?.segments ?? [];

  const overview = segments.find((segment) => segment.type === "overview");
  const overviewStats = overview?.stats;

  const playlists = segments
    .filter(isCompetitivePlaylist)
    .filter(
      (segment) =>
        currentSeason === null ||
        segment.attributes?.season === undefined ||
        segment.attributes.season === currentSeason
    )
    .map(transformPlaylist);

  return {
    player: {
      username:
        platformInfo?.platformUserHandle ??
        platformInfo?.platformUserIdentifier ??
        username,
      platform,
      platformLabel: getPlatformLabel(platform),
      avatarUrl: platformInfo?.avatarUrl ?? null,
    },
    lifetime: {
      wins: getStatDisplay(overviewStats, "wins"),
      goals: getStatDisplay(overviewStats, "goals"),
      assists: getStatDisplay(overviewStats, "assists"),
      saves: getStatDisplay(overviewStats, "saves"),
      shots: getStatDisplay(overviewStats, "shots"),
    },
    playlists,
    lastUpdated:
      data?.metadata?.lastUpdated?.displayValue ??
      data?.metadata?.lastUpdated?.value ??
      null,
    currentSeason,
  };
}

function formatStatValue(value: number | string | null | undefined): string | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return value.toLocaleString("en-US");
  }

  const normalized = String(value).trim();

  if (!normalized) {
    return null;
  }

  const numeric = Number(normalized.replace(/,/g, ""));

  if (Number.isFinite(numeric)) {
    return numeric.toLocaleString("en-US");
  }

  return normalized;
}

function getLifetimeStat(
  stats: Record<string, number | string | null> | undefined,
  key: string
): string | null {
  return formatStatValue(stats?.[key]);
}

function getPlaylistName(playlist: RapidApiPlaylist): string {
  return (
    playlist.name ??
    playlist.playlist ??
    playlist.playlistName ??
    playlist.mode ??
    "Unknown playlist"
  );
}

function getPlaylistTier(playlist: RapidApiPlaylist): string | null {
  return playlist.tier ?? playlist.rank ?? playlist.rankName ?? null;
}

function getPlaylistMmr(playlist: RapidApiPlaylist): number | null {
  const value = playlist.mmr ?? playlist.rating;

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value.replace(/,/g, ""));

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

function transformRapidApiPlaylist(
  playlist: RapidApiPlaylist
): PlayerStats["playlists"][number] {
  const mmr = getPlaylistMmr(playlist);

  return {
    name: getPlaylistName(playlist),
    tier: getPlaylistTier(playlist),
    division: playlist.division ?? playlist.divisionName ?? null,
    mmr,
    mmrDisplay:
      playlist.mmrDisplay ?? (mmr !== null ? mmr.toLocaleString("en-US") : null),
    rankIconUrl: playlist.rankIconUrl ?? playlist.icon ?? playlist.iconUrl ?? null,
  };
}

function getNestedPayload(payload: RapidApiStatsPayload): RapidApiStatsPayload {
  if (!payload.data || isTrnProfilePayload(payload)) {
    return payload;
  }

  return {
    ...payload,
    ...payload.data,
    player: payload.player ?? payload.data.player ?? payload.data.profile,
    profile: payload.profile ?? payload.data.profile,
    lifetime:
      payload.lifetime ?? payload.lifetimeStats ?? payload.data.lifetime ?? payload.data.lifetimeStats,
    lifetimeStats:
      payload.lifetimeStats ?? payload.data.lifetimeStats ?? payload.data.lifetime,
    stats: payload.stats ?? payload.data.stats,
    playlists:
      payload.playlists ??
      payload.ranked ??
      payload.rankedStats ??
      payload.data.playlists ??
      payload.data.ranked ??
      payload.data.rankedStats,
    metadata: payload.metadata ?? payload.data.metadata ?? payload.meta ?? payload.data.meta,
    meta: payload.meta ?? payload.data.meta ?? payload.metadata ?? payload.data.metadata,
  };
}

export function transformRapidApiProfile(
  payload: RapidApiStatsPayload,
  platform: Platform,
  username: string
): PlayerStats {
  if (isTrnProfilePayload(payload)) {
    return transformTrnProfile(payload as TrnProfileResponse, platform, username);
  }

  const normalized = getNestedPayload(payload);
  const player = normalized.player ?? normalized.profile;
  const lifetime =
    normalized.lifetime ??
    normalized.lifetimeStats ??
    normalized.stats ??
    undefined;
  const playlists =
    normalized.playlists ??
    normalized.ranked ??
    normalized.rankedStats ??
    [];
  const metadata = normalized.metadata ?? normalized.meta;

  return {
    player: {
      username:
        player?.username ??
        player?.displayName ??
        player?.name ??
        username,
      platform,
      platformLabel: getPlatformLabel(platform),
      avatarUrl: player?.avatarUrl ?? player?.avatar ?? null,
    },
    lifetime: {
      wins: getLifetimeStat(lifetime, "wins"),
      goals: getLifetimeStat(lifetime, "goals"),
      assists: getLifetimeStat(lifetime, "assists"),
      saves: getLifetimeStat(lifetime, "saves"),
      shots: getLifetimeStat(lifetime, "shots"),
    },
    playlists: playlists.map(transformRapidApiPlaylist),
    lastUpdated: metadata?.lastUpdated ?? null,
    currentSeason: metadata?.currentSeason ?? metadata?.season ?? null,
  };
}

export function isValidPlatform(value: string | null): value is Platform {
  return PLATFORMS.some((platform) => platform.value === value);
}

export function hasPlayerStats(payload: RapidApiStatsPayload): boolean {
  if (isTrnProfilePayload(payload)) {
    return Boolean(payload.data?.platformInfo);
  }

  const normalized = getNestedPayload(payload);

  return Boolean(
    normalized.player ??
      normalized.profile ??
      normalized.lifetime ??
      normalized.lifetimeStats ??
      normalized.stats ??
      normalized.playlists?.length ??
      normalized.ranked?.length ??
      normalized.rankedStats?.length
  );
}
