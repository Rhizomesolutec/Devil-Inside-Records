"use client";

import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function onSubmit(event: FormEvent) {
        event.preventDefault();
        setLoading(true);
        setError("");
        const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });
        const data = await res.json();
        setLoading(false);
        if (!res.ok) {
            setError(data.error || "Login failed");
            return;
        }
        window.location.href = "/admin";
    }

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
            <form onSubmit={onSubmit} className="w-full max-w-sm border border-white/10 p-8">
                <p className="font-barlow text-[10px] tracking-[0.4em] uppercase text-[#780606] mb-3">Devil Inside</p>
                <h1 className="font-cinzel text-3xl font-black mb-8">ADMIN</h1>
                <label className="block font-barlow text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-2">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border border-white/15 px-4 py-3 text-white mb-6 focus:outline-none focus:border-[#780606]"
                />
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full font-barlow bg-[#780606] text-white tracking-[0.3em] uppercase py-3 text-xs hover:bg-transparent hover:border hover:border-[#780606] transition-all"
                >
                    {loading ? "Signing in..." : "Enter"}
                </button>
            </form>
        </div>
    );
}
