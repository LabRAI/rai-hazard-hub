/**
 * Accept only real YouTube URL shapes, never arbitrary iframe origins.
 * @param {string | null | undefined} value
 */
export function youtubeId(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port)
      return null;
    let id;
    if (url.hostname === "youtu.be") {
      id = url.pathname.slice(1);
    } else if (
      [
        "youtube.com",
        "www.youtube.com",
        "m.youtube.com",
        "www.youtube-nocookie.com",
      ].includes(url.hostname)
    ) {
      if (url.pathname === "/watch") id = url.searchParams.get("v");
      else {
        const parts = url.pathname.split("/");
        if (
          parts.length === 3 &&
          ["embed", "shorts", "live"].includes(parts[1])
        )
          id = parts[2];
      }
    }
    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}
