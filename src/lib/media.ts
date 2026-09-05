export function toSpotifyEmbed(link?: string | null) {
    if (!link) return null;

    const album = link.match(/open\.spotify\.com\/(?:embed\/)?album\/([A-Za-z0-9]+)/);
    if (album) {
        return `https://open.spotify.com/embed/album/${album[1]}?utm_source=generator&theme=0`;
    }

    const track = link.match(/open\.spotify\.com\/(?:embed\/)?track\/([A-Za-z0-9]+)/);
    if (track) {
        return `https://open.spotify.com/embed/track/${track[1]}?utm_source=generator&theme=0`;
    }

    return null;
}

export function slugify(value: string) {
    const slug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    return slug || `item-${Date.now()}`;
}

export function mediaSrc(value: unknown) {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (typeof value === "object" && value !== null && "src" in value) {
        return String((value as { src: string }).src);
    }
    return "";
}
