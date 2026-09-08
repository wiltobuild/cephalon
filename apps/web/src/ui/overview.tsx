import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Crosshair,
  BookOpen,
  Layers3,
} from "lucide-react";
import { overviewCampaign as campaign } from "@/content/overview-campaign";
import { guides } from "@/server/warframe-guides";
import { categoryGuides } from "@/server/equipment-guides";
import { ItemImage } from "./item-image";
import { UpcomingUpdate, RecentOverviewBuilds } from "./overview-live";
import "./overview.css";

export function Overview() {
  const collections = [
    {
      name: "Warframes",
      count: guides.length,
      href: "/warframe-builds",
      art: "Mesa Prime",
      kind: "warframe",
      description: "Find your playstyle.",
      tag: "POWER & POSSIBILITY",
    },
    {
      name: "Weapons",
      count: categoryGuides("weapons").length,
      href: "/equipment-builds/weapons",
      art: "Phenmor",
      kind: "weapon",
      description: "Make every shot count.",
      tag: "PRECISION & POWER",
    },
    {
      name: "Companions",
      count: categoryGuides("companions").length,
      href: "/equipment-builds/companions",
      art: "Dethcube Prime",
      kind: "companion",
      description: "Bring the right backup.",
      tag: "LOYALTY & UTILITY",
    },
    {
      name: "Archwing",
      count: categoryGuides("archwing").length,
      href: "/equipment-builds/archwing",
      art: "Mausolon",
      kind: "weapon",
      description: "Take heavy firepower further.",
      tag: "HEAVY ORDNANCE",
    },
  ];
  const total = collections.reduce((sum, c) => sum + c.count, 0);
  return (
    <div className="ov-page">
      <section className="ov-hero" aria-labelledby="overview-heading">
        <Image
          className="ov-hero-art"
          src={campaign.current.artwork}
          alt={`Digital Extremes’ ${campaign.current.title} key art`}
          fill
          priority
          sizes="(max-width: 760px) 100vw, 85vw"
        />
        <div className="ov-hero-shade" />
        <div className="ov-hero-content">
          <p className="ov-eyebrow">CEPHALON / YOUR WARFRAME COMPANION</p>
          <h1 id="overview-heading">
            Ready for
            <br />
            what comes <em>next.</em>
          </h1>
          <p className="ov-intro">
            Find your next build. Understand your arsenal.
            <br />
            Take on the Origin System, your way.
          </p>
          <div className="ov-hero-actions">
            <Link className="ov-button" href="#build-library">
              Explore the builds <ArrowRight size={18} />
            </Link>
            <Link className="ov-text-link" href="/arsenal">
              Open arsenal <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <a
          className="ov-update-caption"
          href={campaign.current.source}
          target="_blank"
          rel="noreferrer"
        >
          <span className="ov-live-dot" /> CURRENT UPDATE{" "}
          <strong>{campaign.current.title}</strong>
          <ArrowUpRight size={16} />
        </a>
      </section>
      <nav className="ov-collection-strip" aria-label="Build library shortcuts">
        <div>
          <span className="ov-diamond">✧</span>
          <strong>{total}</strong>
          <span>CEPHALON APPROVED BUILDS</span>
        </div>
        {collections.map((c) => (
          <Link key={c.name} href={c.href}>
            {c.name}
            <span>{c.count}</span>
            <ArrowUpRight size={14} />
          </Link>
        ))}
      </nav>
      <div className="ov-body">
        <section className="ov-spotlights" aria-label="In the Origin System">
          <Link
            className="ov-featured"
            href={campaign.featured.buildHref}
            aria-label={`Explore ${campaign.featured.name}’s build`}
          >
            <Image
              src={campaign.featured.artwork}
              alt={`${campaign.featured.name}, the newest Warframe`}
              fill
              sizes="(max-width: 760px) 100vw, 800px"
            />
            <div className="ov-featured-shade" />
            <div className="ov-featured-copy">
              <p className="ov-eyebrow">NEWEST WARFRAME</p>
              <h2>{campaign.featured.name}</h2>
              <p>{campaign.featured.description}</p>
              <span className="ov-text-link">
                Explore their build <ArrowUpRight size={18} />
              </span>
            </div>
            <span className="ov-featured-seal">✧ CEPHALON APPROVED</span>
          </Link>
          <UpcomingUpdate initialNow={Date.now()} />
        </section>
        <section id="build-library" className="ov-library">
          <div className="ov-section-heading">
            <div>
              <p className="ov-eyebrow">THE BUILD LIBRARY</p>
              <h2>A loadout for every journey.</h2>
            </div>
            <p>
              From your first mission to the Steel Path.
              <br />
              Complete setups. Clear guides. Your next possibility.
            </p>
          </div>
          <div className="ov-collections">
            {collections.map((c, i) => (
              <Link className="ov-collection" href={c.href} key={c.name}>
                <div className="ov-card-top">
                  <span>
                    0{i + 1} / {c.tag}
                  </span>
                  <ArrowUpRight size={18} />
                </div>
                <ItemImage name={c.art} kind={c.kind} />
                <div className="ov-collection-copy">
                  <span>{c.count} APPROVED BUILDS</span>
                  <h3>{c.name}</h3>
                  <p>{c.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="ov-tools" aria-label="Arsenal tools">
          <Link href="/arsenal">
            <Layers3 size={25} />
            <div>
              <h3>Explore the arsenal</h3>
              <p>Warframes, weapons, mods and Archon Shards.</p>
            </div>
            <ArrowUpRight size={18} />
          </Link>
          <Link href="/tools/weapon-builder">
            <Crosshair size={25} />
            <div>
              <h3>Build. Tune. Test.</h3>
              <p>Shape your weapon loadout and compare its performance.</p>
            </div>
            <ArrowUpRight size={18} />
          </Link>
          <Link href="/codex">
            <BookOpen size={25} />
            <div>
              <h3>Know your gear</h3>
              <p>Understand the mechanics behind your next build.</p>
            </div>
            <ArrowUpRight size={18} />
          </Link>
        </section>
        <RecentOverviewBuilds />
        <footer className="ov-footer">
          <span>
            CEPHALON <i>✧</i> YOUR ARSENAL, UNDERSTOOD
          </span>
          <p>Community-built. Official game artwork © Digital Extremes.</p>
        </footer>
      </div>
    </div>
  );
}
