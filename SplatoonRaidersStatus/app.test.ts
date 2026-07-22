import test from "node:test";
import assert from "node:assert/strict";
import {
  countdownMessage,
  daysUntilRelease,
  gameStatus,
  platformMessage,
} from "./app.ts";

test("PC is not listed as a supported platform", () => {
  assert.equal(gameStatus.pcAnnounced, false);
  assert.equal(gameStatus.platforms.includes("PC"), false);
  assert.match(platformMessage(), /PC version not announced/);
});

test("release countdown uses calendar days", () => {
  assert.equal(daysUntilRelease(new Date("2026-07-22T12:00:00Z")), 1);
  assert.equal(countdownMessage(new Date("2026-07-23T12:00:00Z")), "release day");
});
