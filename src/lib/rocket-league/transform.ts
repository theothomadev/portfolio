import {
  PLATFORMS,
  type Platform,
  type PlayerStats,
  type TrnProfileResponse,
  type TrnSegment,
  type TrnStat,
} from "./types";

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

export function isValidPlatform(value: string | null): value is Platform {
  return PLATFORMS.some((platform) => platform.value === value);
}
