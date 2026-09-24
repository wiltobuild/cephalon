"use client";
import Image from "next/image";
import { useState } from "react";
import { Diamond } from "lucide-react";
export function ItemImage({
  name,
  kind = "weapon",
  className = "",
  priority = false,
}: {
  name: string;
  kind?: string;
  className?: string;
  priority?: boolean;
}) {
  const tauforged = kind == "shard" && /^Tauforged /i.test(name);
  const source = `/api/item-image?kind=${encodeURIComponent(kind)}&name=${encodeURIComponent(name)}${tauforged ? "&v=2" : ""}`;
  const [failed, setFailed] = useState<string | null>(null);
  return (
    <span
      className={`item-image ${tauforged ? "is-tauforged" : ""} ${className}`}
    >
      {failed === source ? (
        <span
          className="item-image-fallback"
          role="img"
          aria-label={`${name}: artwork unavailable`}
        >
          <Diamond size={32} />
        </span>
      ) : (
        <Image
          src={source}
          alt={name}
          fill
          unoptimized
          sizes="(max-width: 700px) 160px, 360px"
          priority={priority}
          onError={() => setFailed(source)}
          style={{
            objectFit: "contain",
          }}
        />
      )}
    </span>
  );
}
