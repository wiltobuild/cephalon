import { Suspense } from "react";
import { WeaponBuilder } from "./_components/weapon-builder";
export default function WeaponBuilderPage() {
  return (
    <Suspense fallback={<div className="page">Loading your arsenal…</div>}>
      <WeaponBuilder />
    </Suspense>
  );
}
