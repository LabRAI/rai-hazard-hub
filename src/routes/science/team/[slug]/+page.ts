import { error } from "@sveltejs/kit";
import { team } from "$lib/science/content";
import type { PageLoad, EntryGenerator } from "./$types";

export const entries: EntryGenerator = () =>
  team.map((member) => ({ slug: member.slug }));
export const load: PageLoad = ({ params }) => {
  const member = team.find((person) => person.slug === params.slug);
  if (!member) error(404, "Team member not found");
  return { member };
};
