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
  const source = `/api/item-image?kind=${encodeURIComponent(kind)}&name=${encodeURIComponent(name)}`;
  const [failed, setFailed] = useState<string | null>(null);
  return (
    <span className={`item-image ${className}`}>
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
          style={{ objectFit: "contain" }}
        />
      )}
    </span>
  );
}
