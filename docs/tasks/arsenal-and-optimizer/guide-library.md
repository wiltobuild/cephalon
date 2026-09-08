# Complete build guide library

Imported `docs/guides/build-guides.md` from upstream main (content commit 117e49f). The importer `python scripts/import-build-guides.py` produces 394 guides: 193 Warframes, 61 primary, 45 secondary, 72 melee, 3 Archwing weapons and 20 companions. It retains complete authored configurations and prose, including nonstandard multi-form instructions. It does not infer missing numerical effects.

Warframes remain under `/warframe-builds`. Equipment uses `/equipment-builds/{weapons,primary,secondary,melee,archwing,companions}` with individual pages at `{category}/{slug}`. Weapons aggregates primary, secondary and melee. Sidebar links, category navigation and equipment search make each directory accessible. Arsenal weapon inspection links to matching weapon guides.

The original 35 Warframe sample guides have the revised authored titles. Their 33 changed slugs permanently redirect to the new titles; two titles did not change. Guide selection filters use each build's role and subtitle rather than assigning every build for a frame the same playstyle.

Warframe configurations are validated before exposing live customization. Guides outside the current calculator catalog retain their full authored configuration, stat chart and instructions as read-only content. These guides do not silently drop unknown mods. The initial sample shard choices are preserved; additional prose shard recommendations remain in their guide and flexible choices remain available in supported editors. No damage formulas or bulk game datasets were changed.

Equipment pages use existing mod cards for known catalog mods, source rank and polarization notes, actual item artwork, arcanes and stance/Exilus recommendations. Unknown artwork uses the existing fallback. Equipment guides are read-only; this import does not claim to implement new companion or Archwing calculators.

Verification: production build and TypeScript, web and services unit tests, all 394 individual page HTTP checks, redirect and 404 checks, searchable category navigation, mobile width checks, original Warframe editor/shard regressions, and weapon-builder regression suite.
