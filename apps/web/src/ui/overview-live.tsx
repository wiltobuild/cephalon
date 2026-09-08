"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bookmark } from "lucide-react";
import {
  overviewCampaign,
  daysUntilRelease,
} from "@/content/overview-campaign";
import { buildFragment, readBuilds, type SavedBuild } from "./build-storage";

export function UpcomingUpdate({ initialNow }: { initialNow: number }) {
  const [now, setNow] = useState(initialNow);
  const upcoming = overviewCampaign.upcoming;
  const expires = Date.parse(upcoming.releaseDayStartsAt);
  const active = now < expires;
  useEffect(() => {
    if (!active) return;
    const refresh = () => setNow(Date.now());
    refresh();
    const timer = window.setInterval(refresh, 30_000);
    const deadline = expires - Date.now();
    const expiryTimer =
      deadline > 0 && deadline < 2_147_483_647
        ? window.setTimeout(refresh, deadline)
        : undefined;
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(expiryTimer);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [expires, active]);
  if (now >= expires) return null;
  const days = daysUntilRelease(now, upcoming.releaseDayStartsAt);
  return (
    <a
      className="ov-upcoming"
      href={upcoming.source}
      target="_blank"
      rel="noreferrer"
      aria-label={`${upcoming.title}: coming ${upcoming.releaseLabel}. Official update details`}
      data-upcoming-update
    >
      <div className="ov-upcoming-art">
        <Image
          src={upcoming.artwork}
          alt={`Digital Extremes’ ${upcoming.title} key art`}
          fill
          sizes="(max-width: 760px) 100vw, 420px"
        />
        <span className="ov-label">COMING SOON</span>
      </div>
      <div className="ov-upcoming-copy">
        <div>
          <p className="ov-eyebrow">THE NEXT CHAPTER</p>
          <h2>{upcoming.title}</h2>
          <p>{upcoming.releaseLabel} · All platforms</p>
        </div>
        <div
          className="ov-countdown"
          role="timer"
          aria-label={`${days} ${days === 1 ? "day" : "days"} until release day`}
        >
          <strong>{String(days).padStart(2, "0")}</strong>
          <span>{days === 1 ? "DAY" : "DAYS"} TO GO</span>
        </div>
      </div>
      <div className="ov-upcoming-footer">
        Discover the update <ArrowUpRight size={17} />
      </div>
    </a>
  );
}

export function RecentOverviewBuilds() {
  const [saved, setSaved] = useState<SavedBuild[]>([]);
  useEffect(() => {
    const refresh = () => setSaved(readBuilds());
    refresh();
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);
  return (
    <section className="ov-saved">
      <div className="ov-section-heading">
        <div>
          <p className="ov-eyebrow">YOUR WORKSPACE</p>
          <h2>Make it yours.</h2>
        </div>
        <Link href="/builds">
          My saved builds <ArrowUpRight size={16} />
        </Link>
      </div>
      {saved.length ? (
        <div className="ov-recent-grid">
          {saved.slice(0, 3).map((s) => (
            <Link
              key={s.id}
              href={`/tools/weapon-builder#build=${buildFragment(s.build)}`}
            >
              <Bookmark size={20} />
              <span>
                {s.name}
                <small>{s.weaponName} · Saved on this device</small>
              </span>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="ov-saved-empty">
          <Bookmark size={24} />
          <div>
            <h3>A place for your next great build.</h3>
            <p>
              Save your weapon configurations and return to them whenever
              inspiration strikes.
            </p>
          </div>
          <Link
            className="ov-button ov-button-outline"
            href="/tools/weapon-builder"
          >
            Start a build <ArrowUpRight size={16} />
          </Link>
        </div>
      )}
    </section>
  );
}
