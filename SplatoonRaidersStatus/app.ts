import { pathToFileURL } from "node:url";

export const gameStatus = {
  title: "Splatoon Raiders",
  releaseDate: "2026-07-23",
  publisher: "Nintendo",
  platforms: ["Nintendo Switch 2"],
  pcAnnounced: false,
  estimatedSizeGb: 20,
  onlinePlayers: "2-4",
  localWirelessPlayers: "2-4",
} as const;

export const nintendoLinks = {
  product:
    "https://www.nintendo.com/us/store/products/splatoon-raiders-switch-2/",
  overview: "https://www.nintendo.com/sg/games/switch2/aadla/",
  directRecap:
    "https://www.nintendo.com/sg/news/article/MI8h1DnYCiIPs7r4BNa7Y",
} as const;

export function platformMessage(): string {
  return gameStatus.pcAnnounced
    ? "A PC version has been announced."
    : "PC version not announced; Nintendo Switch 2 is the listed platform.";
}

export function daysUntilRelease(today = new Date()): number {
  const release = new Date(`${gameStatus.releaseDate}T00:00:00Z`);
  const normalizedToday = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
  );
  return Math.round((release.getTime() - normalizedToday) / 86_400_000);
}

export function countdownMessage(today = new Date()): string {
  const days = daysUntilRelease(today);
  if (days > 1) return `${days} days until release`;
  if (days === 1) return "1 day until release";
  if (days === 0) return "release day";
  return `released ${-days} days ago`;
}

function usage(): string {
  return [
    "Splatoon Raiders Status",
    "Usage:",
    "  app.ts status",
    "  app.ts countdown",
    "  app.ts links",
  ].join("\n");
}

export function main(args: string[]): number {
  const command = args[0];
  if (command === "status") {
    console.log(
      JSON.stringify({ ...gameStatus, platformMessage: platformMessage() }, null, 2),
    );
    return 0;
  }
  if (command === "countdown") {
    console.log(countdownMessage());
    return 0;
  }
  if (command === "links") {
    console.log(JSON.stringify(nintendoLinks, null, 2));
    return 0;
  }
  console.error(usage());
  return 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = main(process.argv.slice(2));
}
