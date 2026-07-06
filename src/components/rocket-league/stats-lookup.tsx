"use client";

import { FormEvent, useState } from "react";
import { AlertCircle, Loader2, Search, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  PLATFORMS,
  type Platform,
  type PlayerStats,
  type StatsApiError,
} from "@/lib/rocket-league/types";
import { cn } from "@/lib/utils";

type LookupState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: PlayerStats }
  | { status: "error"; message: string; code?: StatsApiError["code"] };

const DEFAULT_USERNAME = "SRN_Stormzy";
const DEFAULT_PLATFORM: Platform = "epic";

const lifetimeStats = [
  { key: "wins", label: "Wins" },
  { key: "goals", label: "Goals" },
  { key: "assists", label: "Assists" },
  { key: "saves", label: "Saves" },
  { key: "shots", label: "Shots" },
] as const;

export function StatsLookup() {
  const [username, setUsername] = useState(DEFAULT_USERNAME);
  const [platform, setPlatform] = useState<Platform>(DEFAULT_PLATFORM);
  const [state, setState] = useState<LookupState>({ status: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setState({
        status: "error",
        message: "Please enter a username.",
        code: "VALIDATION_ERROR",
      });
      return;
    }

    setState({ status: "loading" });

    const params = new URLSearchParams({
      platform,
      username: trimmedUsername,
    });

    try {
      const response = await fetch(`/api/rocket-league/stats?${params}`);
      const payload = (await response.json()) as PlayerStats | StatsApiError;

      if (!response.ok) {
        const errorPayload = payload as StatsApiError;
        setState({
          status: "error",
          message: errorPayload.error ?? "Something went wrong.",
          code: errorPayload.code,
        });
        return;
      }

      setState({ status: "success", data: payload as PlayerStats });
    } catch {
      setState({
        status: "error",
        message: "Unable to reach the stats service. Please try again.",
        code: "API_ERROR",
      });
    }
  }

  return (
    <div className="space-y-8">
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle>Player lookup</CardTitle>
          <CardDescription>
            Search Rocket League stats by username and platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-[1fr_180px_auto]">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="SRN_Stormzy"
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <select
                id="platform"
                name="platform"
                value={platform}
                onChange={(event) => setPlatform(event.target.value as Platform)}
                className={cn(
                  "flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm shadow-sm",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                {PLATFORMS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <Button type="submit" disabled={state.status === "loading"} className="w-full sm:w-auto">
                {state.status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {state.status === "loading" && (
        <Card className="border-border/50 bg-card/50">
          <CardContent className="flex items-center justify-center gap-3 py-16 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Fetching player stats...
          </CardContent>
        </Card>
      )}

      {state.status === "error" && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="flex items-start gap-3 py-6">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
            <div>
              <p className="font-medium text-destructive">
                {state.code === "NOT_FOUND"
                  ? "Player not found"
                  : "Unable to load stats"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{state.message}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {state.status === "success" && (
        <div className="space-y-6">
          <Card className="border-border/50 bg-card/50">
            <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted">
                {state.data.player.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={state.data.player.avatarUrl}
                    alt={`${state.data.player.username} avatar`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound className="h-10 w-10 text-muted-foreground" />
                )}
              </div>

              <div className="space-y-2">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {state.data.player.username}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {state.data.player.platformLabel}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  {state.data.currentSeason !== null && (
                    <span>Season {state.data.currentSeason}</span>
                  )}
                  {state.data.lastUpdated && (
                    <span>Updated {state.data.lastUpdated}</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Lifetime stats</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {lifetimeStats.map(({ key, label }) => (
                <Card key={key} className="border-border/50 bg-card/50">
                  <CardContent className="p-5">
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="mt-2 text-2xl font-semibold">
                      {state.data.lifetime[key] ?? "—"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Competitive playlists</h3>

            {state.data.playlists.length === 0 ? (
              <Card className="border-border/50 bg-card/50">
                <CardContent className="py-8 text-sm text-muted-foreground">
                  No competitive playlist data available for this player.
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {state.data.playlists.map((playlist) => (
                  <Card key={playlist.name} className="border-border/50 bg-card/50">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        {playlist.rankIconUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={playlist.rankIconUrl}
                            alt=""
                            className="h-10 w-10 object-contain"
                          />
                        ) : null}
                        <div>
                          <CardTitle className="text-base">{playlist.name}</CardTitle>
                          <CardDescription>
                            {[playlist.tier, playlist.division]
                              .filter(Boolean)
                              .join(" · ") || "Unranked"}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4 pt-0">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          MMR
                        </p>
                        <p className="mt-1 text-lg font-semibold">
                          {playlist.mmrDisplay ?? "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          Tier
                        </p>
                        <p className="mt-1 text-lg font-semibold">
                          {playlist.tier ?? "—"}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          Division
                        </p>
                        <p className="mt-1 font-medium">
                          {playlist.division ?? "—"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
