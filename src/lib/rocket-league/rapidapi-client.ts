import type { Platform, TrnProfileResponse } from "./types";

export const DEFAULT_RAPIDAPI_HOST = "rocket-league-tracker.p.rapidapi.com";

const PROFILE_PATH = "/v2/rocket-league/standard/profile";

export type TrnProfilePayload = TrnProfileResponse & {
  message?: string;
};

export function getRapidApiConfig(): { apiKey: string; host: string } | null {
  const apiKey = process.env.RAPIDAPI_KEY?.trim();

  if (!apiKey) {
    return null;
  }

  const host = process.env.RAPIDAPI_HOST?.trim() || DEFAULT_RAPIDAPI_HOST;

  return { apiKey, host };
}

export async function fetchPlayerProfile(
  platform: Platform,
  username: string,
  cacheSeconds: number
): Promise<{ response: Response; payload: TrnProfilePayload }> {
  const config = getRapidApiConfig();

  if (!config) {
    throw new Error("MISSING_API_KEY");
  }

  const profileUrl = `https://${config.host}${PROFILE_PATH}/${platform}/${encodeURIComponent(username)}`;

  const response = await fetch(profileUrl, {
    headers: {
      Accept: "application/json",
      "X-RapidAPI-Key": config.apiKey,
      "X-RapidAPI-Host": config.host,
    },
    next: { revalidate: cacheSeconds },
  });

  const payload = (await response.json()) as TrnProfilePayload;

  return { response, payload };
}

export function getRapidApiErrorMessage(payload: TrnProfilePayload): string | undefined {
  return payload.errors?.[0]?.message ?? payload.message;
}
