import { NextRequest, NextResponse } from "next/server";
import { isValidPlatform, transformTrnProfile } from "@/lib/rocket-league/transform";
import type {
  PlayerStats,
  StatsApiError,
  TrnProfileResponse,
} from "@/lib/rocket-league/types";

const TRN_BASE_URL =
  "https://public-api.tracker.gg/v2/rocket-league/standard/profile";
const CACHE_SECONDS = 300;

export const revalidate = 300;

export async function GET(request: NextRequest) {
  const platform = request.nextUrl.searchParams.get("platform");
  const username = request.nextUrl.searchParams.get("username")?.trim();

  if (!username) {
    return jsonError("Username is required.", "VALIDATION_ERROR", 400);
  }

  if (!isValidPlatform(platform)) {
    return jsonError(
      "Platform must be one of: epic, steam, psn, xbl.",
      "VALIDATION_ERROR",
      400
    );
  }

  const apiKey = process.env.TRN_API_KEY;

  if (!apiKey) {
    return jsonError(
      "Tracker Network API key is not configured.",
      "MISSING_API_KEY",
      500
    );
  }

  const profileUrl = `${TRN_BASE_URL}/${platform}/${encodeURIComponent(username)}`;

  try {
    const response = await fetch(profileUrl, {
      headers: {
        Accept: "application/json",
        "TRN-Api-Key": apiKey,
      },
      next: { revalidate: CACHE_SECONDS },
    });

    const payload = (await response.json()) as TrnProfileResponse;

    if (response.status === 404) {
      return jsonError("Player not found.", "NOT_FOUND", 404);
    }

    if (!response.ok) {
      const message =
        payload.errors?.[0]?.message ?? "Unable to fetch player stats.";
      return jsonError(message, "API_ERROR", response.status);
    }

    if (!payload.data?.platformInfo) {
      return jsonError("Player not found.", "NOT_FOUND", 404);
    }

    const stats: PlayerStats = transformTrnProfile(payload, platform, username);

    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=60`,
      },
    });
  } catch {
    return jsonError(
      "Unable to reach Tracker Network. Please try again.",
      "API_ERROR",
      502
    );
  }
}

function jsonError(
  error: string,
  code: StatsApiError["code"],
  status: number
) {
  return NextResponse.json({ error, code } satisfies StatsApiError, { status });
}
