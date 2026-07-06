import { NextRequest, NextResponse } from "next/server";
import {
  fetchPlayerProfile,
  getRapidApiConfig,
  getRapidApiErrorMessage,
} from "@/lib/rocket-league/rapidapi-client";
import { isValidPlatform, transformTrnProfile } from "@/lib/rocket-league/transform";
import type { PlayerStats, StatsApiError } from "@/lib/rocket-league/types";

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

  if (!getRapidApiConfig()) {
    return jsonError(
      "RapidAPI key is not configured. Add RAPIDAPI_KEY to your environment variables.",
      "MISSING_API_KEY",
      503
    );
  }

  try {
    const { response, payload } = await fetchPlayerProfile(
      platform,
      username,
      CACHE_SECONDS
    );

    if (response.status === 404) {
      return jsonError("Player not found.", "NOT_FOUND", 404);
    }

    if (response.status === 401 || response.status === 403) {
      return jsonError(
        "RapidAPI rejected the request. Check that RAPIDAPI_KEY is set correctly and you are subscribed to the Rocket League Tracker API on RapidAPI.",
        "INVALID_API_KEY",
        503
      );
    }

    if (response.status === 429) {
      return jsonError(
        "RapidAPI rate limit reached. Try again later or upgrade your plan.",
        "API_ERROR",
        502
      );
    }

    if (!response.ok) {
      const message =
        getRapidApiErrorMessage(payload) ?? "Unable to fetch player stats.";
      return jsonError(message, "API_ERROR", 502);
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
  } catch (error) {
    if (error instanceof Error && error.message === "MISSING_API_KEY") {
      return jsonError(
        "RapidAPI key is not configured. Add RAPIDAPI_KEY to your environment variables.",
        "MISSING_API_KEY",
        503
      );
    }

    return jsonError(
      "Unable to reach RapidAPI. Please try again.",
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
