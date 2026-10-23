import test from "node:test";
import assert from "node:assert/strict";
import { youtubeId } from "../src/lib/science/youtube.js";
import {
  validateHubs,
  validateMember,
  validateContent,
  safeUrl,
} from "../scripts/validate-science-content.mjs";

test("YouTube parsing supports share, watch, shorts, live and embed URLs", () => {
  const id = "abcdefghijk";
  for (const url of [
    `https://youtu.be/${id}?si=demo`,
    `https://www.youtube.com/watch?v=${id}&t=3`,
    `https://youtube.com/shorts/${id}`,
    `https://www.youtube.com/live/${id}`,
    `https://www.youtube-nocookie.com/embed/${id}`,
  ])
    assert.equal(youtubeId(url), id);
});
test("Missing videos stay empty and invalid URLs cannot become iframe sources", () => {
  for (const url of [
    null,
    "",
    undefined,
    "bad",
    "http://youtu.be/abcdefghijk",
    "https://youtube.com.evil.test/watch?v=abcdefghijk",
    "https://evil.test/watch?v=abcdefghijk",
    "https://youtube.com/watch?v=short",
    "https://youtube.com/embed/abcdefghijk/extra",
    "https://user:pass@youtube.com/watch?v=abcdefghijk",
    "https://youtube.com:8080/watch?v=abcdefghijk",
  ])
    assert.equal(youtubeId(url), null);
});
test("Only HTTPS or local destinations are accepted", () => {
  assert.ok(safeUrl("https://rai-fire.com/"));
  assert.ok(safeUrl("/research-notes/", true));
  for (const value of [
    "javascript:alert(1)",
    "//example.com",
    "/" + String.fromCharCode(92) + "example.com",
    "http://example.com",
  ])
    assert.equal(safeUrl(value, true), false);
});
test("Profiles support adding, ordering and hiding members without component edits", () => {
  const person = {
    name: "Example Person",
    role: "Researcher",
    order: 50,
    active: false,
    source: "https://example.com/profile",
  };
  assert.deepEqual(
    validateMember(person, "example-person", ["profile.json", "photo.webp"]),
    [],
  );
  assert.ok(
    validateMember(person, "example-person", ["photo.jpg", "photo.webp"])
      .length,
  );
  assert.ok(validateMember(person, "example-person", ["headshot.png"]).length);
  assert.ok(
    validateMember({ ...person, order: "first" }, "example-person").length,
  );
});
test("Research Notes must remain the first product in every hub", () => {
  const hub = {
    id: "example",
    name: "Example Intelligence Hub",
    eyebrow: "Research",
    description: "Description",
    filmTitle: "Title",
    filmDescription: "Description",
    youtubeUrl: null,
    platformUrl: null,
    products: [
      {
        title: "Research Notes",
        kind: "Research",
        description: "Description",
        href: null,
        action: "Forthcoming",
      },
    ],
  };
  assert.deepEqual(validateHubs([hub]), []);
  assert.ok(validateHubs([hub, hub]).length);
  assert.ok(
    validateHubs([
      {
        ...hub,
        products: [...hub.products].map((p) => ({ ...p, title: "Other" })),
      },
    ]).length,
  );
});
test("All checked-in hubs and profiles satisfy the content contract", async () => {
  const result = await validateContent();
  assert.deepEqual(result.errors, []);
  assert.ok(result.hubCount >= 1);
  assert.ok(result.memberCount >= 1);
});
