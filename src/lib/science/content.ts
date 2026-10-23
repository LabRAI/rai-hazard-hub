import rawHubs from "../../content/science/hubs.json";
import notes from "$lib/assets/portal/editorial-v4/research-notes-1536.webp";
import notesSmall from "$lib/assets/portal/editorial-v4/research-notes-480.webp";
import notesMedium from "$lib/assets/portal/editorial-v4/research-notes-960.webp";
import fireeye from "$lib/assets/portal/editorial-v5/fireeye-forecast-1536.webp";
import fireeyeSmall from "$lib/assets/portal/editorial-v5/fireeye-forecast-480.webp";
import fireeyeMedium from "$lib/assets/portal/editorial-v5/fireeye-forecast-960.webp";
import library from "$lib/assets/portal/editorial-v4/pyhazards-1536.webp";
import librarySmall from "$lib/assets/portal/editorial-v4/pyhazards-480.webp";
import libraryMedium from "$lib/assets/portal/editorial-v4/pyhazards-960.webp";
import health from "$lib/assets/science/health-1800.webp";
import healthSmall from "$lib/assets/science/health-480.webp";
import healthMedium from "$lib/assets/science/health-960.webp";
import hazardPoster from "$lib/assets/editorial/wildfire-1440.webp";

export const scienceTitle = "Super Intelligence for Science Research Hub";
export const scienceDescription =
  "Research, platforms, and open tools for AI-powered discovery across hazards and human health.";
export type Artwork = {
  src: string;
  srcset: string;
  alt: string;
  position: string;
};
const artwork = (
  src: string,
  small: string,
  medium: string,
  alt: string,
  position = "center",
  width = 1536,
): Artwork => ({
  src,
  srcset: `${small} 480w, ${medium} 960w, ${src} ${width}w`,
  alt,
  position,
});
export const art: Record<string, Artwork> = {
  notes: artwork(
    notes,
    notesSmall,
    notesMedium,
    "An illustrated research journal, open to wildfire imagery and a scientific study.",
    "70% center",
  ),
  fireeye: artwork(
    fireeye,
    fireeyeSmall,
    fireeyeMedium,
    "Illustration of FireEye wildfire forecast cells and a 12-to-48-hour timeline.",
    "center",
  ),
  library: artwork(
    library,
    librarySmall,
    libraryMedium,
    "The Python statement import pyhazards integrated into a landscape of fire, flood, and cyclone data.",
    "left center",
  ),
  health: artwork(
    health,
    healthSmall,
    healthMedium,
    "An anatomical model showing a cross section of the human brain.",
    "76% center",
    1800,
  ),
};
export type Product = {
  title: string;
  kind: string;
  description: string;
  href: string | null;
  image?: string;
  action: string;
};
export type Hub = {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  filmTitle: string;
  filmDescription: string;
  youtubeUrl: string | null;
  platformUrl: string | null;
  products: Product[];
};
export const hubs: Hub[] = rawHubs;
export const posters: Record<string, string> = { hazard: hazardPoster, health };

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  order: number;
  website?: string;
  bio?: string;
  active?: boolean;
  source: string;
  portrait?: string;
};
const profiles = import.meta.glob("../../content/team/*/profile.json", {
  eager: true,
  import: "default",
});
const portraits = import.meta.glob(
  "../../content/team/*/photo.{webp,jpg,jpeg,png}",
  { eager: true, query: "?url", import: "default" },
);
export const team: TeamMember[] = Object.entries(profiles)
  .map(([path, value]) => {
    const slug = path.split("/").at(-2)!;
    const profile = value as Omit<TeamMember, "slug" | "portrait">;
    const photo = Object.entries(portraits).find(([file]) =>
      file.startsWith(path.replace("profile.json", "photo.")),
    );
    return { ...profile, slug, portrait: photo?.[1] as string | undefined };
  })
  .filter((member) => member.active !== false)
  .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
export const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
