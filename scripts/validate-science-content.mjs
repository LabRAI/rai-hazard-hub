import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import { youtubeId } from "../src/lib/science/youtube.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const text = (value) => typeof value === "string" && value.trim().length > 0;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export function safeUrl(value, internal = false) {
  if (!text(value)) return false;
  if (
    internal &&
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.includes(String.fromCharCode(92))
  )
    return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch {
    return false;
  }
}

export function validateHubs(hubs) {
  const errors = [];
  if (!Array.isArray(hubs) || !hubs.length)
    return ["At least one hub is required."];
  const ids = new Set();
  for (const hub of hubs) {
    if (!hub || typeof hub !== "object") {
      errors.push("Hub must be an object.");
      continue;
    }
    const label = hub.id || "(unnamed hub)";
    if (!text(hub.id) || !slugPattern.test(hub.id) || ids.has(hub.id))
      errors.push(`${label}: unique lowercase id required.`);
    ids.add(hub.id);
    for (const field of [
      "name",
      "eyebrow",
      "description",
      "filmTitle",
      "filmDescription",
    ]) {
      if (!text(hub[field])) errors.push(`${label}: ${field} is required.`);
    }
    if (hub.youtubeUrl !== null && !youtubeId(hub.youtubeUrl))
      errors.push(
        `${label}: youtubeUrl must be a valid HTTPS YouTube link or null.`,
      );
    if (hub.platformUrl !== null && !safeUrl(hub.platformUrl, true))
      errors.push(`${label}: invalid platformUrl.`);
    if (!Array.isArray(hub.products) || !hub.products.length) {
      errors.push(`${label}: products are required.`);
      continue;
    }
    if (hub.products[0]?.title !== "Research Notes")
      errors.push(`${label}: Research Notes must be first.`);
    for (const product of hub.products) {
      if (!product || typeof product !== "object") {
        errors.push(`${label}: product must be an object.`);
        continue;
      }
      for (const field of ["title", "kind", "description", "action"]) {
        if (!text(product[field]))
          errors.push(`${label}: product ${field} is required.`);
      }
      if (product.href !== null && !safeUrl(product.href, true))
        errors.push(`${label}/${product.title}: invalid destination.`);
      if (
        product.image &&
        !["notes", "fireeye", "library", "health"].includes(product.image)
      )
        errors.push(`${label}: unknown image key ${product.image}.`);
    }
  }
  return errors;
}

export function validateMember(member, slug, files = []) {
  const errors = [];
  if (!member || typeof member !== "object")
    return [`${slug}: profile must be an object.`];
  if (!slugPattern.test(slug))
    errors.push(`${slug}: folder must use lowercase-name format.`);
  for (const field of ["name", "role"])
    if (!text(member[field])) errors.push(`${slug}: ${field} is required.`);
  if (!Number.isFinite(member.order))
    errors.push(`${slug}: numeric order required.`);
  if (member.active !== undefined && typeof member.active !== "boolean")
    errors.push(`${slug}: active must be boolean.`);
  if (member.website !== undefined && !safeUrl(member.website))
    errors.push(`${slug}: website must be HTTPS.`);
  if (!safeUrl(member.source))
    errors.push(`${slug}: verified source URL required.`);
  if (member.bio !== undefined && !text(member.bio))
    errors.push(`${slug}: bio must be text.`);
  const photos = files.filter((file) =>
    ["photo.webp", "photo.png", "photo.jpg", "photo.jpeg"].includes(file),
  );
  if (photos.length > 1) errors.push(`${slug}: keep only one photo file.`);
  const otherImages = files.filter(
    (file) =>
      [".webp", ".png", ".jpg", ".jpeg"].includes(
        path.extname(file).toLowerCase(),
      ) && !photos.includes(file),
  );
  if (otherImages.length)
    errors.push(
      `${slug}: name the portrait photo.webp, photo.jpg, photo.jpeg, or photo.png.`,
    );
  return errors;
}

export async function validateContent() {
  const hubs = JSON.parse(
    await readFile(path.join(root, "src/content/science/hubs.json"), "utf8"),
  );
  const errors = validateHubs(hubs);
  const directory = path.join(root, "src/content/team");
  const folders = (await readdir(directory, { withFileTypes: true })).filter(
    (item) => item.isDirectory(),
  );
  const names = new Set();
  for (const folder of folders) {
    const location = path.join(directory, folder.name);
    const files = await readdir(location);
    if (!files.includes("profile.json")) {
      errors.push(`${folder.name}: profile.json is missing.`);
      continue;
    }
    const member = JSON.parse(
      await readFile(path.join(location, "profile.json"), "utf8"),
    );
    errors.push(...validateMember(member, folder.name, files));
    const name = member.name?.trim().toLowerCase();
    if (names.has(name)) errors.push(`${folder.name}: duplicate member name.`);
    names.add(name);
  }
  return { errors, hubCount: hubs.length, memberCount: folders.length };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const result = await validateContent();
  if (result.errors.length) {
    console.error(result.errors.join(String.fromCharCode(10)));
    process.exitCode = 1;
  } else
    console.log(
      `Science content valid: ${result.hubCount} hubs, ${result.memberCount} team profiles.`,
    );
}
