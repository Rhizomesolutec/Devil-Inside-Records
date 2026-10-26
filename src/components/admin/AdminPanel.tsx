"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

type Tab = "catalogue" | "artists" | "events";

type CatalogueItem = {
    id: string;
    title: string;
    artist: string;
    type: string;
    tracks: string | number;
    date: string;
    duration: string;
    cover: string;
    accent: string;
    tag: string;
    description: string;
    link: string;
    youtubeLink?: string;
    appleMusicLink?: string;
    upcoming?: boolean;
};

type ArtistItem = {
    id: string;
    name: string;
    genre: string;
    description: string;
    fullDescription: string;
    image: string;
    modalImage: string;
    socials?: { instagram?: string; spotify?: string; youtube?: string };
};

type EventItem = {
    id: string;
    title: string;
    tag: string;
    date?: string;
    dates?: string[];
    venue?: string;
    image?: string;
    ticketUrl?: string;
    ticketLabel?: string;
    placement?: "featured" | "mhr-sub";
    over?: boolean;
};

const emptyCatalogue: CatalogueItem = {
    id: "",
    title: "",
    artist: "",
    type: "SINGLE",
    tracks: 1,
    date: "",
    duration: "",
    cover: "",
    accent: "#C81808",
    tag: "OUT NOW",
    description: "",
    link: "",
    youtubeLink: "",
    appleMusicLink: "",
    upcoming: false,
};

const emptyArtist: ArtistItem = {
    id: "",
    name: "",
    genre: "",
    description: "",
    fullDescription: "",
    image: "",
    modalImage: "",
    socials: { instagram: "", spotify: "", youtube: "" },
};

const emptyEvent: EventItem = {
    id: "",
    title: "",
    tag: "LIVE EVENT",
    dates: [],
    venue: "",
    image: "",
    ticketUrl: "",
    ticketLabel: "GET TICKETS",
    placement: "mhr-sub",
    over: false,
};

async function readJson(res: Response) {
    const text = await res.text();
    if (!text) {
        if (res.status === 401) {
            window.location.href = "/admin/login";
        }
        return { ok: false, items: [], error: `Empty response (${res.status})` };
    }
    try {
        return JSON.parse(text);
    } catch {
        return { ok: false, items: [], error: "Invalid server response" };
    }
}

async function fetchAdminJson(url: string) {
    const res = await fetch(url, { credentials: "same-origin" });
    return readJson(res);
}

async function uploadFile(file: File, folder: string) {
    const data = new FormData();
    data.append("file", file);
    data.append("folder", folder);
    const res = await fetch("/api/admin/upload", { method: "POST", body: data, credentials: "same-origin" });
    const json = await readJson(res);
    if (!res.ok) throw new Error(json.error || "Upload failed");
    return json.url as string;
}

export default function AdminPanel() {
    const [tab, setTab] = useState<Tab>("catalogue");
    const [catalogues, setCatalogues] = useState<CatalogueItem[]>([]);
    const [artists, setArtists] = useState<ArtistItem[]>([]);
    const [events, setEvents] = useState<EventItem[]>([]);
    const [editingCatalogue, setEditingCatalogue] = useState<CatalogueItem | null>(null);
    const [editingArtist, setEditingArtist] = useState<ArtistItem | null>(null);
    const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
    const [message, setMessage] = useState("");

    async function loadAll() {
        const [c, a, e] = await Promise.all([
            fetchAdminJson("/api/admin/catalogues"),
            fetchAdminJson("/api/admin/artists"),
            fetchAdminJson("/api/admin/events"),
        ]);
        setCatalogues(c.items || []);
        setArtists(a.items || []);
        setEvents(e.items || []);
        const error = [c, a, e].map((item) => item.error).find(Boolean);
        if (error) setMessage(error);
    }

    useEffect(() => {
        let active = true;
        Promise.all([
            fetchAdminJson("/api/admin/catalogues"),
            fetchAdminJson("/api/admin/artists"),
            fetchAdminJson("/api/admin/events"),
        ])
            .then(([c, a, e]) => {
                if (!active) return;
                setCatalogues(c.items || []);
                setArtists(a.items || []);
                setEvents(e.items || []);
                const error = [c, a, e].map((item) => item.error).find(Boolean);
                if (error) setMessage(error);
            })
            .catch(() => {
                if (active) setMessage("Failed to load admin data.");
            });
        return () => {
            active = false;
        };
    }, []);

    async function logout() {
        await fetch("/api/admin/logout", { method: "POST" });
        window.location.href = "/admin/login";
    }

    return (
        <div className="min-h-screen bg-black text-white px-6 md:px-12 py-10">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <p className="font-barlow text-[10px] tracking-[0.4em] uppercase text-[#780606] mb-2">Devil Inside Records</p>
                        <h1 className="font-cinzel text-4xl font-black">ADMIN</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            className="font-barlow text-[10px] tracking-[0.3em] uppercase border border-white/20 px-4 py-2 hover:border-white"
                        >
                            Home
                        </Link>
                        <button onClick={logout} className="font-barlow text-[10px] tracking-[0.3em] uppercase border border-white/20 px-4 py-2 hover:border-white">
                            Logout
                        </button>
                    </div>
                </div>

                <div className="flex gap-2 mb-8">
                    {(["catalogue", "artists", "events"] as Tab[]).map((item) => (
                        <button
                            key={item}
                            onClick={() => setTab(item)}
                            className={`font-barlow text-[10px] tracking-[0.3em] uppercase px-5 py-2 border ${
                                tab === item ? "border-[#780606] bg-[#780606]/20 text-white" : "border-white/10 text-gray-500"
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {message && <p className="mb-6 text-sm text-gray-300">{message}</p>}

                {tab === "catalogue" && (
                    <CatalogueTab
                        items={catalogues}
                        editing={editingCatalogue}
                        setEditing={setEditingCatalogue}
                        onSaved={async (text) => {
                            setMessage(text);
                            await loadAll();
                        }}
                    />
                )}
                {tab === "artists" && (
                    <ArtistTab
                        items={artists}
                        editing={editingArtist}
                        setEditing={setEditingArtist}
                        onSaved={async (text) => {
                            setMessage(text);
                            await loadAll();
                        }}
                    />
                )}
                {tab === "events" && (
                    <EventTab
                        items={events}
                        editing={editingEvent}
                        setEditing={setEditingEvent}
                        onSaved={async (text) => {
                            setMessage(text);
                            await loadAll();
                        }}
                    />
                )}
            </div>
        </div>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <label className="block">
            <span className="block font-barlow text-[9px] tracking-[0.3em] uppercase text-gray-500 mb-2">{label}</span>
            {children}
        </label>
    );
}

const inputClass = "w-full bg-transparent border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#780606]";

function ImageField({
    label,
    value,
    folder,
    required,
    onChange,
}: {
    label: string;
    value: string;
    folder: string;
    required?: boolean;
    onChange: (url: string) => void;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    async function onFile(file: File | undefined) {
        if (!file) return;
        setError("");
        setUploading(true);
        try {
            const url = await uploadFile(file, folder);
            onChange(url);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Upload failed");
        } finally {
            setUploading(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    }

    return (
        <div>
            <span className="block font-barlow text-[9px] tracking-[0.3em] uppercase text-gray-500 mb-2">{label}</span>
            {value ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={value} alt="" className="w-20 h-20 object-cover border border-white/10 mb-3" />
            ) : (
                <div className="w-20 h-20 border border-dashed border-white/15 mb-3" />
            )}
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onFile(e.target.files?.[0])}
            />
            <button
                type="button"
                disabled={uploading}
                onClick={() => inputRef.current?.click()}
                className="font-barlow text-[10px] tracking-[0.3em] uppercase border border-white/20 px-4 py-2 hover:border-white disabled:opacity-50"
            >
                {uploading ? "Uploading..." : "Upload from device"}
            </button>
            <input
                className={`${inputClass} mt-3`}
                value={value}
                required={required}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Or paste image URL (optional)"
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
    );
}

function ListActions({
    onEdit,
    onDelete,
}: {
    onEdit: () => void;
    onDelete: () => void;
}) {
    return (
        <div className="flex shrink-0 gap-2">
            <button
                type="button"
                onClick={onEdit}
                className="font-barlow text-[10px] tracking-[0.3em] uppercase border border-white/20 px-3 py-2 hover:border-white"
            >
                Edit
            </button>
            <button
                type="button"
                onClick={onDelete}
                className="font-barlow text-[10px] tracking-[0.3em] uppercase border border-red-500/60 text-red-500 px-3 py-2 hover:bg-red-500/10"
            >
                Delete
            </button>
        </div>
    );
}

async function deleteItem(url: string) {
    const res = await fetch(url, { method: "DELETE", credentials: "same-origin" });
    const data = await readJson(res);
    if (!res.ok) throw new Error(data.error || "Delete failed");
}

function CatalogueTab({
    items,
    editing,
    setEditing,
    onSaved,
}: {
    items: CatalogueItem[];
    editing: CatalogueItem | null;
    setEditing: (item: CatalogueItem | null) => void;
    onSaved: (message: string) => Promise<void>;
}) {
    const form = editing ?? emptyCatalogue;
    const isEdit = Boolean(editing?.id && items.some((item) => item.id === editing.id));

    async function save(event: FormEvent) {
        event.preventDefault();
        const url = isEdit ? `/api/admin/catalogues/${encodeURIComponent(form.id)}` : "/api/admin/catalogues";
        const res = await fetch(url, {
            method: isEdit ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin",
            body: JSON.stringify(form),
        });
        const data = await readJson(res);
        if (!res.ok) return onSaved(data.error || "Save failed");
        setEditing(null);
        await onSaved(isEdit ? "Catalogue updated." : "Catalogue added. Latest Drop now shows the 2 newest releases.");
    }

    return (
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8">
            <form onSubmit={save} className="border border-white/10 p-5 space-y-4">
                <h2 className="font-cinzel text-xl font-black">{isEdit ? "Edit catalogue" : "Add catalogue"}</h2>
                <Field label="Title"><input className={inputClass} value={form.title} onChange={(e) => setEditing({ ...form, title: e.target.value })} required /></Field>
                <Field label="Artist"><input className={inputClass} value={form.artist} onChange={(e) => setEditing({ ...form, artist: e.target.value })} required /></Field>
                <div className="grid grid-cols-2 gap-3">
                    <Field label="Type"><input className={inputClass} value={form.type} onChange={(e) => setEditing({ ...form, type: e.target.value })} /></Field>
                    <Field label="Date"><input className={inputClass} value={form.date} onChange={(e) => setEditing({ ...form, date: e.target.value })} /></Field>
                </div>
                <Field label="Spotify link"><input className={inputClass} value={form.link} onChange={(e) => setEditing({ ...form, link: e.target.value })} placeholder="https://open.spotify.com/album/..." /></Field>
                <Field label="Apple Music (optional)">
                    <input
                        className={inputClass}
                        value={form.appleMusicLink || ""}
                        onChange={(e) => setEditing({ ...form, appleMusicLink: e.target.value })}
                        placeholder="https://music.apple.com/..."
                    />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                    <Field label="Tracks"><input className={inputClass} value={form.tracks} onChange={(e) => setEditing({ ...form, tracks: e.target.value })} /></Field>
                    <Field label="Duration"><input className={inputClass} value={form.duration} onChange={(e) => setEditing({ ...form, duration: e.target.value })} placeholder="03:12" /></Field>
                </div>
                <label className="flex items-center gap-3 text-sm text-gray-300">
                    <input
                        type="checkbox"
                        checked={Boolean(form.upcoming)}
                        onChange={(e) => setEditing({ ...form, upcoming: e.target.checked })}
                    />
                    Upcoming / coming soon
                </label>
                <ImageField
                    label="Cover image"
                    value={form.cover}
                    folder="catalogues"
                    required
                    onChange={(url) => setEditing({ ...form, cover: url })}
                />
                <Field label="Description"><textarea className={inputClass} rows={3} value={form.description} onChange={(e) => setEditing({ ...form, description: e.target.value })} /></Field>
                <div className="flex gap-3">
                    <button type="submit" className="font-barlow bg-[#780606] px-5 py-2 text-[10px] tracking-[0.3em] uppercase">Save</button>
                    {editing && <button type="button" onClick={() => setEditing(null)} className="font-barlow border border-white/20 px-5 py-2 text-[10px] tracking-[0.3em] uppercase">Cancel</button>}
                </div>
            </form>
            <div className="space-y-3">
                <h2 className="font-cinzel text-xl font-black">Existing catalogues</h2>
                {items.length === 0 && (
                    <p className="text-sm text-gray-500">No catalogues yet. Add one on the left.</p>
                )}
                {items.map((item) => (
                    <div key={item.id} className="border border-white/10 p-4 flex flex-col sm:flex-row gap-4 sm:items-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.cover} alt="" className="w-14 h-14 object-cover" />
                        <div className="min-w-0 flex-1">
                            <p className="font-cinzel font-black truncate">{item.title}</p>
                            <p className="text-gray-500 text-xs truncate">{item.artist}</p>
                        </div>
                        <ListActions
                            onEdit={() => setEditing(item)}
                            onDelete={async () => {
                                if (!confirm(`Delete ${item.title}?`)) return;
                                try {
                                    await deleteItem(`/api/admin/catalogues/${encodeURIComponent(item.id)}`);
                                    await onSaved("Catalogue deleted.");
                                } catch (error) {
                                    await onSaved(error instanceof Error ? error.message : "Delete failed");
                                }
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

function ArtistTab({
    items,
    editing,
    setEditing,
    onSaved,
}: {
    items: ArtistItem[];
    editing: ArtistItem | null;
    setEditing: (item: ArtistItem | null) => void;
    onSaved: (message: string) => Promise<void>;
}) {
    const form = editing ?? emptyArtist;
    const isEdit = Boolean(editing?.id && items.some((item) => item.id === editing.id));

    async function save(event: FormEvent) {
        event.preventDefault();
        const payload = {
            ...form,
            instagram: form.socials?.instagram || "",
            spotify: form.socials?.spotify || "",
            youtube: form.socials?.youtube || "",
        };
        const url = isEdit ? `/api/admin/artists/${encodeURIComponent(form.id)}` : "/api/admin/artists";
        const res = await fetch(url, {
            method: isEdit ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin",
            body: JSON.stringify(payload),
        });
        const data = await readJson(res);
        if (!res.ok) return onSaved(data.error || "Save failed");
        setEditing(null);
        await onSaved(isEdit ? "Artist updated." : "Artist added.");
    }

    return (
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8">
            <form onSubmit={save} className="border border-white/10 p-5 space-y-4">
                <h2 className="font-cinzel text-xl font-black">{isEdit ? "Edit artist" : "Add artist"}</h2>
                <Field label="Name"><input className={inputClass} value={form.name} onChange={(e) => setEditing({ ...form, name: e.target.value })} required /></Field>
                <Field label="Genre"><input className={inputClass} value={form.genre} onChange={(e) => setEditing({ ...form, genre: e.target.value })} /></Field>
                <Field label="Short bio"><textarea className={inputClass} rows={2} value={form.description} onChange={(e) => setEditing({ ...form, description: e.target.value })} /></Field>
                <Field label="Full bio"><textarea className={inputClass} rows={4} value={form.fullDescription} onChange={(e) => setEditing({ ...form, fullDescription: e.target.value })} /></Field>
                <ImageField
                    label="Image"
                    value={form.image}
                    folder="artists"
                    required
                    onChange={(url) => setEditing({ ...form, image: url, modalImage: form.modalImage || url })}
                />
                <ImageField
                    label="Modal image (optional)"
                    value={form.modalImage}
                    folder="artists"
                    onChange={(url) => setEditing({ ...form, modalImage: url })}
                />
                <Field label="Instagram"><input className={inputClass} value={form.socials?.instagram || ""} onChange={(e) => setEditing({ ...form, socials: { ...form.socials, instagram: e.target.value } })} /></Field>
                <Field label="Spotify"><input className={inputClass} value={form.socials?.spotify || ""} onChange={(e) => setEditing({ ...form, socials: { ...form.socials, spotify: e.target.value } })} /></Field>
                <Field label="YouTube"><input className={inputClass} value={form.socials?.youtube || ""} onChange={(e) => setEditing({ ...form, socials: { ...form.socials, youtube: e.target.value } })} /></Field>
                <div className="flex gap-3">
                    <button type="submit" className="font-barlow bg-[#780606] px-5 py-2 text-[10px] tracking-[0.3em] uppercase">Save</button>
                    {editing && <button type="button" onClick={() => setEditing(null)} className="font-barlow border border-white/20 px-5 py-2 text-[10px] tracking-[0.3em] uppercase">Cancel</button>}
                </div>
            </form>
            <div className="space-y-3">
                <h2 className="font-cinzel text-xl font-black">Existing artists</h2>
                {items.length === 0 && (
                    <p className="text-sm text-gray-500">No artists yet. Add one on the left.</p>
                )}
                {items.map((item) => (
                    <div key={item.id} className="border border-white/10 p-4 flex flex-col sm:flex-row gap-4 sm:items-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt="" className="w-14 h-14 object-cover grayscale" />
                        <div className="min-w-0 flex-1">
                            <p className="font-cinzel font-black truncate">{item.name}</p>
                            <p className="text-gray-500 text-xs truncate">{item.genre}</p>
                        </div>
                        <ListActions
                            onEdit={() => setEditing(item)}
                            onDelete={async () => {
                                if (!confirm(`Delete ${item.name}?`)) return;
                                try {
                                    await deleteItem(`/api/admin/artists/${encodeURIComponent(item.id)}`);
                                    await onSaved("Artist deleted.");
                                } catch (error) {
                                    await onSaved(error instanceof Error ? error.message : "Delete failed");
                                }
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

function EventTab({
    items,
    editing,
    setEditing,
    onSaved,
}: {
    items: EventItem[];
    editing: EventItem | null;
    setEditing: (item: EventItem | null) => void;
    onSaved: (message: string) => Promise<void>;
}) {
    const form = editing ?? emptyEvent;
    const isEdit = Boolean(editing?.id && items.some((item) => item.id === editing.id));

    async function save(event: FormEvent) {
        event.preventDefault();
        const url = isEdit ? `/api/admin/events/${encodeURIComponent(form.id)}` : "/api/admin/events";
        const res = await fetch(url, {
            method: isEdit ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin",
            body: JSON.stringify({
                ...form,
                dates: Array.isArray(form.dates) ? form.dates.join("\n") : form.dates,
            }),
        });
        const data = await readJson(res);
        if (!res.ok) return onSaved(data.error || "Save failed");
        setEditing(null);
        await onSaved(isEdit ? "Event updated." : "Event added.");
    }

    return (
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8">
            <form onSubmit={save} className="border border-white/10 p-5 space-y-4">
                <h2 className="font-cinzel text-xl font-black">{isEdit ? "Edit event ticket" : "Add event ticket"}</h2>
                <Field label="Title"><input className={inputClass} value={form.title} onChange={(e) => setEditing({ ...form, title: e.target.value })} required /></Field>
                <Field label="Tag"><input className={inputClass} value={form.tag} onChange={(e) => setEditing({ ...form, tag: e.target.value })} /></Field>
                <Field label="Dates (one per line)">
                    <textarea
                        className={inputClass}
                        rows={4}
                        value={(form.dates || []).join("\n")}
                        onChange={(e) => setEditing({ ...form, dates: e.target.value.split("\n") })}
                    />
                </Field>
                <Field label="Venue"><input className={inputClass} value={form.venue || ""} onChange={(e) => setEditing({ ...form, venue: e.target.value })} /></Field>
                <Field label="Ticket URL"><input className={inputClass} value={form.ticketUrl || ""} onChange={(e) => setEditing({ ...form, ticketUrl: e.target.value })} /></Field>
                <Field label="Ticket label"><input className={inputClass} value={form.ticketLabel || "GET TICKETS"} onChange={(e) => setEditing({ ...form, ticketLabel: e.target.value })} /></Field>
                <label className="flex items-center gap-3 text-sm text-gray-300">
                    <input
                        type="checkbox"
                        checked={Boolean(form.over)}
                        onChange={(e) => setEditing({ ...form, over: e.target.checked })}
                    />
                    Event is over
                </label>
                <Field label="Placement">
                    <select
                        className={inputClass}
                        value={form.placement || "mhr-sub"}
                        onChange={(e) => setEditing({ ...form, placement: e.target.value as EventItem["placement"] })}
                    >
                        <option value="featured">Featured (top row)</option>
                        <option value="mhr-sub">MHR & Friends sub-ticket</option>
                    </select>
                </Field>
                <ImageField
                    label="Poster"
                    value={form.image || ""}
                    folder="events"
                    onChange={(url) => setEditing({ ...form, image: url })}
                />
                <div className="flex gap-3">
                    <button type="submit" className="font-barlow bg-[#780606] px-5 py-2 text-[10px] tracking-[0.3em] uppercase">Save</button>
                    {editing && <button type="button" onClick={() => setEditing(null)} className="font-barlow border border-white/20 px-5 py-2 text-[10px] tracking-[0.3em] uppercase">Cancel</button>}
                </div>
            </form>
            <div className="space-y-3">
                <h2 className="font-cinzel text-xl font-black">Existing events</h2>
                {items.length === 0 && (
                    <p className="text-sm text-gray-500">No events yet. Add one on the left.</p>
                )}
                {items.map((item) => (
                    <div key={item.id} className="border border-white/10 p-4 flex flex-col sm:flex-row gap-4 sm:items-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {item.image ? <img src={item.image} alt="" className="w-14 h-16 object-cover" /> : <div className="w-14 h-16 bg-white/5" />}
                        <div className="min-w-0 flex-1">
                            <p className="font-cinzel font-black truncate">{item.title}</p>
                            <p className="text-gray-500 text-xs truncate">{item.over ? "over" : item.placement}</p>
                        </div>
                        <ListActions
                            onEdit={() => setEditing(item)}
                            onDelete={async () => {
                                if (!confirm(`Delete ${item.title}?`)) return;
                                try {
                                    await deleteItem(`/api/admin/events/${encodeURIComponent(item.id)}`);
                                    await onSaved("Event deleted.");
                                } catch (error) {
                                    await onSaved(error instanceof Error ? error.message : "Delete failed");
                                }
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
