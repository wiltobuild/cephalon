# Warframe and Weapon Build Guides

A working set of Steel Path and endurance builds, each written up in full: what the
build does, how the pieces hold together, how to actually pilot it, what you can
move around, and where it stops working.

## Reading the build lists

Every build lists its mods by slot with the polarity the slot is forma'd to:

- **Madurai** — attack slot (`V`)
- **Vazarin** — defense slot (`D`)
- **Naramon** — tactic slot (`–`)
- **Zenurik** — power slot (`=`)
- **Unairu** — ward slot
- **Umbral** and **Aura** slots as marked
- **unpolarised** — the slot carries no forma

Slot polarity is a forma choice on the frame and is separate from your Operator
Focus school. A slot forma'd to Zenurik does not mean the build runs Zenurik
Focus.

Stat figures (Strength, Duration, Range, Efficiency, and the health/shield/armor/
energy pool) are the arsenal-screen values for the build as listed. Where a guide
gives a breakpoint or a one-shot threshold, that number comes from the source
write-up for that build. Treat those as the build author's figures, not values
re-derived against the live game. Each guide marks its calculation confidence
where it matters.

Guides are grouped by category: Warframes first, then primary, secondary, and
melee weapons.

---

## Warframes

### The Enthralled Sovereign
**Revenant Prime. Mesmer Skin immortality and one-shot Reave.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Tank and single-target deleter |
| Difficulty | Beginner as a tank, Intermediate to hit the Reave thresholds |
| Investment | High. 5 forma, two arcanes, cast-speed and strength shards |
| Weapon reliance | Low to stay alive. Moderate if you lean on a viral primer or Danse Macabre for damage |

> Tenno. Revenant does not mitigate damage, he refuses it. Mesmer Skin carries a
> stack of charges and each hit an enemy lands spends one charge and stuns them
> instead of hurting you. Build enough Strength and that pool is deep enough to
> never run dry. Reave is your delete button: dash through an enthralled or
> viral-primed target and it dies outright. Cap your thralls at seven, keep
> Mesmer Skin refreshed before it empties, and the mission cannot kill you.

**The build**

- Mesmer Shield, rank 3, Zenurik polarity — augment. Adds 50% Strength toward Mesmer Skin only, and lets you hand allies five charges
- Thrall Pact, rank 3, unpolarised — augment. Enthralled enemies feed a large additive primary-damage buff
- Transient Fortitude, rank 10, Madurai polarity
- Blind Rage, rank 10, Madurai polarity
- Equilibrium, rank 10, Naramon polarity
- Primed Flow, rank 10, Naramon polarity
- Primed Continuity, rank 10, Madurai polarity
- Umbral Intensify, rank 10, unpolarised
- Aura: Corrosive Projection, Naramon polarity
- Exilus: Ice Spring, Vazarin polarity — placeholder mobility, fully flexible
- Arcanes: Molt Vigor, Molt Augmented

Arsenal figures land at roughly 298% Strength, 128% Duration, 100% Range, 45%
Efficiency, with 925 shield, 370 health, 135 armor and a 641 energy pool.

**How it works.** Mesmer Skin's charge count scales off Strength and rounds up.
More Strength means more charges per cast, and because every incoming hit only
ever removes one charge regardless of how hard it hits, a deep pool is flat
immunity for its duration. You also gain a short invulnerability window each time
a charge breaks, which bridges refreshes. Reave removes a percentage of an
enemy's current health that ignores level scaling, then multiplies that against
enthralled targets, viral stacks, and Roar if you subsume it. The build's job is
to push Strength high, keep casts cheap enough to spam Reave, and feed energy
back through Equilibrium.

**Ability priority.**

1. Cast Mesmer Skin at mission start. Refresh it just before the last charge goes.
2. Tap Enthrall on a target and let it spread. Keep thralls capped near seven. You can enthrall acolytes if you have free thrall space, which makes them Reave-killable in three or four passes.
3. Reave through enthralled enemies to delete them and claw back Mesmer Skin charges.
4. For non-enthralled enemies, apply viral first, then Reave.
5. Danse Macabre is optional room clear. It shines in very high endurance where enemy damage has outscaled their effective health.

**Strength and the Mesmer Skin charge breakpoints.** Charges step up at every
multiple of 16.67% Strength, with exactly three charges per 50%. From the source
write-up, above 300%:

- 301% to 316%: 19 charges
- 317% to 333%: 20 charges
- 334% to 350%: 21 charges
- 351% to 366%: 22 charges
- 367% to 383%: 23 charges

The listed arsenal sits at 298%, one band short of 19. Molt Augmented adds up to
60% Strength after 250 kills and Molt Vigor snapshots up to 45% more after an
Operator cast, which lands you in the 373% region for 23 charges. Madurai's Power
Transfer adds a further 40% on top while it is active. In a real mission you are
running well above the listed number within the first minute. *Confidence:
Approximation. Breakpoints are the author's; in-mission Strength depends on your
arcane and Focus uptime.*

**Reave one-shot thresholds.** From the source, base Reave strips 8% of current
health at any level and does not work on acolytes, demolysts, liches or archons
due to their innate damage reduction. On top of that:

- Enthralled target: about 250% Strength to one-shot (enthrall multiplies Reave damage fivefold).
- No enthrall, 10 viral stacks: about 295% Strength.
- With Roar and one viral stack: about 320% Strength.
- With Roar, no viral, no enthrall: exactly 500% Strength, reachable with four Tauforged strength shards plus Madurai.
- No enthrall, no viral, no Roar: about 1250% Strength, which is why you always bring one of the three.

*Confidence: Approximation, per the author's Reave spreadsheet.*

**Duration, Range, Efficiency.** Duration helps Reave travel, the Enthrall and
Mesmer Skin stuns, and any subsumed buff. Range only matters for Enthrall and
Reave radius, and neutral is enough; add Stretch over a Strength mod if you want
wider Reave. Efficiency is negative here because Mesmer Skin only needs recasting
every 30 seconds or so, and Enthrall is nearly free on a stunned enemy.

**The mods.** *Transient Fortitude, Blind Rage, Umbral Intensify* are the Strength
core that drives the charge count. *Primed Continuity* buys back the duration
Transient Fortitude costs and lengthens Reave. *Primed Flow* is a large energy
pool, and it is also what makes violet crit-damage shards worth double on any
weapon build you pair with this. *Equilibrium* is the energy engine, converting
the health orbs your kills produce. *Mesmer Shield* is the reason Strength scales
so hard into survival. *Thrall Pact* is pure weapon damage and is the first slot
to drop if you do not shoot much.

**Flexible slots.** The exilus is free: Power Drift for one more charge,
Preparation for speed missions, Primed Sure Footed if knockdowns bother you.
Natural Talent over Thrall Pact is strong quality of life for casting Mesmer Skin
inside a shield-gate window, though cast-speed shards cover most of that now.

**Helminth.** Pick one. Subsume over Enthrall or Danse Macabre.

- **Roar** is the default. It lifts weapon and thrall damage and drops the viral requirement for a non-enthralled Reave one-shot to one or two stacks.
- **Sentient Wrath** adds crowd control and a damage vulnerability that also lets Reave one-shot at a single viral stack around 313%.
- **Xata's Whisper** for raw-damage weapons and overguard.
- **Silence** for endurance, mainly to stop Acolyte Violence from stripping your Mesmer Skin in one hit.
- **A grouping ability** (Larva, Ensnare, Airburst) if you want to Reave several enemies per dash; this needs a range increase, so swap toward Overextended and Primed Continuity.
- No subsume: leave Enthrall on and accept a slightly slower thrall setup.

**Archon Shards.** Two regular or one Tauforged Amber cast-speed shard for Mesmer
Skin refreshes and Reave spam. Fill the rest with Crimson strength: four Tauforged
lets you reach 500% Strength alongside Madurai, which unlocks the no-viral Roar
one-shot. Five shards total.

**Arcanes.** Molt Augmented and Molt Vigor are both Strength, chosen because
charges are the whole game. Swap either for Arcane Energize or Arcane Steadfast if
energy feels tight, or Molt Efficiency for more Reave and Roar uptime.

**Focus.** Madurai. Power Transfer gives 50% cast speed and 40% Strength for up to
20 seconds, which is close to ideal for a frame that lives on fast Mesmer Skin
refreshes and Reave casts. If you would rather run Vazarin for the Protective
Sling i-frames, you keep almost all of the tank and lose only the Strength swing.

**Priming weapon.** A consistent area viral primer is what lets Reave one-shot
crowds without enthrall. Bubonico alt-fire, Epitaph, Kuva Nukor, or a Panzer
Vulpaphyla companion all apply viral fast enough.

**Staying alive.** Mesmer Skin is the whole defense. It fails in three ways:
letting the charge pool hit zero with enemies in range, an Acolyte or Thrax
ability that dispels the whole pool at once (bring Silence), and toxin damage in
the gaps if you also lean on shield gating. Refresh early, not on empty.

**Energy.** Equilibrium plus Primed Flow. Negative Efficiency is fine because your
casts are infrequent. If you run Zenurik Focus instead of Madurai, Equilibrium
alone will not carry the energy, so add Arcane Energize and accept fewer charges
and slower casts.

**Where it struggles.** Bosses and special units shrug off Reave, so single-target
boss damage comes from your weapon, not the frame. Danse Macabre energy drain is
real if you spam it at midrange levels. Nullifiers strip Mesmer Skin on contact.

**Variants.** A Danse Macabre nuke build trades tank mods for range and duration.
A marked-for-death Reave build pushes the one-shot further into crowds.

**Strengths and weaknesses.** Strong: near-unconditional survival, a true
single-target delete, low weapon dependence for staying alive, forgiving to
pilot. Weak: does nothing to bosses on its own, thrall cap limits Reave throughput
in the open, needs a primer to threaten crowds.

**Who runs this.** Anyone who wants to stop dying and start deleting. It is one of
the most beginner-safe endurance tanks in the game, and the skill ceiling is
entirely in how well you keep thralls capped and how high you push the Reave
threshold.

---

### The Collector's Thunderdome
**Khora Prime. A caged room, a Whipclaw nuke, and loot pulled off the corpses.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Looting |
| Role | Endurance survival, area denial, resource and Steel Essence farm |
| Difficulty | Intermediate. The shield-gate rhythm takes practice |
| Investment | Medium to high. 3 forma, two augment mods, cast-speed and crit-damage shards |
| Weapon reliance | Low. Whipclaw is an exalted now and does the killing; your guns exist for arcanes and status |

> Tenno. Pick your chokepoints and cage them. Strangledome holds a room's worth of
> enemies in the air while Whipclaw detonates across all of them at once, and the
> Pilfering augment means every kill inside the dome drops extra loot. You are not
> chasing enemies, you are letting them walk into the trap and collecting what
> falls out. Survival is shield gating: each Whipclaw cast tops your shields back
> up and hands you another gate.

**The build**

- Overextended, rank 5, unpolarised
- Streamline, rank 5, unpolarised
- Equilibrium, rank 10, Naramon polarity
- Catalyzing Shields, rank 3, Vazarin polarity
- Primed Continuity, rank 10, Madurai polarity
- Primed Flow, rank 10, Naramon polarity
- Accumulating Whipclaw, rank 3, Zenurik polarity — augment. Whipclaw damage stacks up to a capped +350% as you keep casting
- Pilfering Strangledome, rank 3, unpolarised — augment. Enemies killed while held by the dome drop bonus loot
- Aura: Brief Respite, aura slot
- Exilus: Cunning Drift, Naramon polarity
- Arcanes: Arcane Aegis, Arcane Fury

Arsenal figures land at roughly 40% Strength, 155% Duration, 205% Range, 130%
Efficiency, with 465 health, 465 shield, 345 armor and a 641 energy pool.

**How it works.** Khora builds for Range, not Strength. Range scales Whipclaw's
cast range and explosion radius (capped at 200%), Ensnare's pull, and the size and
pull of Strangledome. Strength is dumped to minimum because Accumulating Whipclaw
provides a flat, additive +350% that does not care about Strength, so the negative
Strength costs you almost nothing on damage. Since the March 2025 change Whipclaw
is a modate-able exalted with its own arcane, so it scales on acolyte and
galvanized mods and the melee influence arcane rather than a statstick.

**Ability priority.**

1. Cast one or two Strangledomes at chokepoints: doorways, the mouth of a room. Rotate kills between them so fresh spawns have time to run in and be caught.
2. Spam Whipclaw at the held enemies or directly onto the dome to hit everything inside.
3. Cast Ensnare on priority targets like acolytes. Ensnare raises the damage they take from Whipclaw.
4. Keep Venari on heal mode if you want the team topped up.

**Shield gating.** At neutral Efficiency with Brief Respite and one Augur mod,
every Whipclaw cast generates about 47.5 shield, roughly a 0.6s gate. Two casts
cap max shields at 93 with Catalyzing Shields on and give the full 1.33s gate.
Add two more Augur mods on your secondary and a single cast generates around 67
shield for roughly a 1s gate on its own. *Confidence: Approximation, per the
author.*

**Range, Duration, Efficiency, Strength.** Range is the priority stat and the
reason the whole build exists. Duration is only there to keep Strangledome up so
you are not recasting it. Efficiency sits neutral-to-positive because Equilibrium
plus a Synth Deconstruct companion on a dense map produces more energy than you
spend. Strength is deliberately floored.

**The mods.** *Overextended and Stretch* (via the augment slots and Cunning Drift)
push Range to the cap. *Streamline* holds Efficiency positive. *Equilibrium* plus
*Primed Flow* is the energy engine, and Primed Flow also doubles the value of
violet crit-damage shards on Whipclaw. *Primed Continuity* keeps Strangledome
alive. *Catalyzing Shields* shrinks your shield pool so each cast refills a larger
fraction of it, buying more i-frames per Whipclaw. *Accumulating Whipclaw* is the
damage. *Pilfering Strangledome* is the loot, and the reason to run this over a
plain nuke Khora.

**Flexible slots.** For non-looting missions, drop Pilfering Strangledome for
efficiency (Fleeting Expertise), more Range (Stretch), or Rolling Guard.
Catalyzing Shields can become Augur Reach or Streamline if you do not want the
i-frame safety. The exilus is open: Primed Sure Footed against knockdowns,
Vigilante Pursuit for enemy radar.

**Aura.** Brief Respite for the shield-gate build. Corrosive Projection if you run
an Augur statstick setup and want raw armored-target damage. Swift Momentum if you
lack Dexterity arcanes and need combo duration. Steel Charge for mod capacity.

**Helminth.** Pick one. Subsume over Venari, which stays partly active even when
subsumed, or over Strangledome itself if you are not looting.

- **Lycath's Hunt** over Strangledome on a pure DPS build: Whipclaw kills count as melee kills, so each has a 50% chance to drop a health orb, which Equilibrium turns into 55 energy. Roughly 275 energy per ten kills, effectively infinite.
- **Dispensary** for energy that does not depend on spawn rate.
- **Nourish** for a viral damage buff on Whipclaw plus more orb energy, but it wants Strength, so this becomes a different build.
- **Roar** for damage and a triple-dip on melee influence, at the cost of no energy return and a Strength requirement.
- **Silence** to shut down Acolyte and Eximus abilities.

**Archon Shards.** Two Amber cast-speed to speed Whipclaw, Strangledome and
Ensnare. Three violet melee crit-damage to push Whipclaw. Five total.

**Arcanes.** Arcane Fury for Whipclaw damage, Arcane Aegis for lazy shield
sustain. Swap Aegis for Arcane Avenger (flat 45% crit to Whipclaw) or Molt
Efficiency (Strangledome duration) to taste.

**Focus.** Any school works; the build does not depend on one. Zenurik for a
backup energy trickle, Madurai for the cast speed and Strength swing, Naramon if
you are running the influence melee angle on Whipclaw.

**Companion.** Equip Primed Pack Leader so Whipclaw generates overguard for the
pet. A Panzer or Hound with Synth Deconstruct feeds Equilibrium.

**Staying alive.** Shield gating plus the crowd control of a full Strangledome.
Venari Bodyguard is an optional death-negate every 150 seconds, and the cooldown
clears fast from kills. It fails if you let the dome lapse and stand in the open
with your shield gate on cooldown, or against heavy toxin.

**Energy.** Equilibrium plus a Synth Deconstruct pet on a dense map. If it still
runs dry, add an energy subsume (Lycath's Hunt, Dispensary) or play higher-density
tiles.

**Where it struggles.** Open maps with no chokepoints blunt Strangledome. Very
fast-moving hosts of light enemies can outrun the dome's pull. Bosses ignore the
whole plan.

**Variants.** A melee-vortex subsume version is better for looting because
influence kills enemies outside the dome while vortex drags new spawns in. A melee
influence version leans on the arcane for map-wide clear.

**Strengths and weaknesses.** Strong: genuinely endless survival, best-in-class
loot multiplier, low weapon investment, comfortable to hold a point. Weak:
map-dependent, does nothing to bosses, the shield-gate rhythm is unforgiving until
it is muscle memory.

**Who runs this.** Steel Essence and resource farmers who want to sit in one spot
for an hour and come out with full pockets.

---

### The Silent Overture
**Octavia Prime. A Mallet that eats the room's damage and gives it back, under permanent invisibility.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap, AFK |
| Role | Nuke and camp. Objective defense, survival, affinity farm |
| Difficulty | Beginner to play, Intermediate to tune the Mandachord |
| Investment | High. 3 forma, plus the time to program the song |
| Weapon reliance | Low. Mallet does the damage; your weapon feeds Amp and crit arcanes |

> Tenno. Mallet is a lure and a mirror. Enemies shoot it, it multiplies what they
> deal, and it returns that as damage to everything nearby. Amp doubles its range
> and boosts your weapons. Metronome keeps you invisible for as long as you keep
> moving to the beat. Set the song once, drop the Mallet, and the room clears
> itself while nothing can see you. After the armor rework this kills level-cap
> enemies with no armor strip at all.

**The build**

- Rolling Guard, rank 10, Vazarin polarity
- Primed Flow, rank 10, Naramon polarity
- Equilibrium, rank 10, Naramon polarity
- Stretch, rank 5, unpolarised
- Overextended, rank 5, unpolarised
- Primed Continuity, rank 10, Madurai polarity
- Blind Rage, rank 10, Madurai polarity
- Narrow Minded, rank 10, Vazarin polarity
- Aura: Corrosive Projection, Naramon polarity
- Exilus: Cunning Drift, unpolarised
- Arcanes: Arcane Crepuscular, Arcane Concentration

Arsenal figures land at roughly 139% Strength, 254% Duration, 184% Range, 45%
Efficiency, with 370 health, 370 shield, 160 armor and a 755 energy pool.

**How it works.** Mallet takes the damage enemies deal to it, applies a Strength-
scaled multiplier of around 5x, and radiates it out. Amp roughly doubles Mallet's
radius toward a 40m sphere and adds a damage multiplier to your weapons and the
Mallet itself. Metronome grants invisibility, multishot, speed and melee buffs
based on which action you perform on the beat. High Duration means every buff
lasts near a minute, so upkeep is one cast each per rotation and Efficiency can be
floored.

**The Mandachord.** The song is the build. Percussion powers the Mallet, and the
current optimal setup (from community research the author cites) leans on a long
rest in the percussion track to charge a damage multiplier:

- 41 rest, 23 percussion: pushes the multiplier to roughly 480x to 800x, but leaves a long silent window with no damage and an odd-sounding song.
- 17 rest, 47 percussion: roughly 200x to 400x, about half as strong, but steady damage and a normal-sounding loop.

For Melody, three sixteenth notes followed by alternating 8 and 7 rests keeps
invisibility efficient; fill the track fully if you also want the multishot buff
on fast automatics. *Confidence: Approximation. These multipliers are community
figures quoted by the author, not re-derived.*

**Ability priority.**

1. Cast Metronome (3), then hold each buff by acting on the beat: crouch for invisibility, jump for speed, shoot for multishot, melee for the melee buff. Refresh before it lapses.
2. Cast Amp (4) for the weapon and Mallet damage and range boost.
3. Cast Mallet (1), let enemies shoot it, watch the room die.
4. Do not cast Resonator. It drags the Mallet around and pulls aggro off it.

**Duration, Range, Strength, Efficiency.** Duration is the priority: 200% to 250%+
makes every buff comfortable to hold. Range 145% to 200% scales Mallet, doubled
again by Amp. Strength 150% to 200%+ scales the Mallet multiplier, the Metronome
buffs and the Amp multiplier. Efficiency is dropped to minimum because roughly 300
energy per minute refreshes everything, and Octavia's passive plus Arcane Energize
covers it.

**The mods.** *Blind Rage and Primed Continuity* are the Strength-and-Duration
core, with Primed Continuity and *Narrow Minded* buying back Blind Rage's
Efficiency loss in Duration. *Overextended and Stretch* set the Range that Amp
then doubles. *Primed Flow* is the deep pool that lets you cast Tragedy-free for
long stretches. *Equilibrium* converts orbs to energy. *Rolling Guard* is the one
concession to danger: Eximus fire blasts, being caught visible, or a Violence
dispel all want an i-frame and status cleanse.

**Flexible slots.** Rolling Guard is personal preference; swap Stretch or an Augur
mod for it, or drop it for more Range, Duration or Strength. Partitioned Mallet if
you want to block two chokepoints at once, remembering two Mallets cannot overlap.

**Aura.** Corrosive Projection for a 1.8x damage lift against fully armored
enemies with no strip needed. Brief Respite for shield-gate backup. Enemy Radar to
place Mallets on density. Growing Power for Strength.

**Helminth.** Pick one. Subsume over Resonator for a camping style, or over Amp for
a mobile style.

- **Nourish** for free viral on weapons and more orb energy, potentially enough to drop Equilibrium.
- **Silence** for even longer AFK windows by disabling Eximus and Acolyte abilities.
- **Breach Surge** double-dips the Amp damage boost.
- **Pillage** for armor strip and shield-gate shields without a knockdown.
- **Xata's Whisper** (Amp only) as a mobile buff that double-dips the melee stealth multiplier.

**Archon Shards.** All preference. One cast-speed helps the recast feel. Two
parkour velocity for mobility. The rest in Duration. Five total.

**Arcanes.** Arcane Crepuscular for 30% Strength and a flat crit-multiplier add
while invisible, which is why you want crit weapons. Arcane Concentration for the
free Duration after casting. Swap for Molt Efficiency or a weapon arcane as
needed.

**Focus.** Any. Zenurik for an energy trickle if you skip Arcane Energize, Madurai
for the recast speed, Vazarin for the Protective Sling safety net.

**Weapon synergy.** Crit weapons pair with Crepuscular. Octavia's Metronome plays
eight notes per second with a full song, and a weapon with a fire rate at or near
8 builds the Opera multishot buff effortlessly. Amp's additive damage also
double-dips on all Glaives and Exodia Contagion.

**Staying alive.** Permanent invisibility plus Rolling Guard for the gaps. It
fails to Eximus area effects that ignore stealth, a Violence dispel, and standing
in a nullifier bubble.

**Energy.** Octavia's passive returns 30 energy over 30 seconds per cast, capped at
1/s. Primed Flow holds the buffer, Equilibrium and Arcane Energize refill it.

**Where it struggles.** Line-of-sight tiles limit Mallet's reach. Very mobile
enemy hosts spread out of the radius. Bosses ignore it. The Mandachord setup is a
real time cost for a new Octavia.

**Variants.** A one-cast full-strip Pillage version trades the AFK purity for
guaranteed armor removal.

**Strengths and weaknesses.** Strong: genuinely AFK-capable clear, permanent
invisibility, scales to level cap, strong team buffs. Weak: setup time, tile-
dependent, does nothing to bosses, feels passive to pilot.

**Who runs this.** Players who want a defense or survival mission to run itself,
and affinity farmers.

---

### Venomous Bloom
**Saryn Prime. Spores strip armor and spread the kill; a toxin weapon overbuff does the rest.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Hybrid: area nuke, armor strip, weapon platform, speedrun |
| Difficulty | Intermediate. Spore upkeep and shield gating at once |
| Investment | High. 4 forma, emerald and toxin shards for the strip |
| Weapon reliance | Medium to high. Toxic Lash and Venom Dose make the weapon the single-target answer |

> Tenno. Spores are a contagion. Tap one enemy to seed it, shoot that enemy while
> Toxic Lash is up to spread it, and the infection rolls across the room stripping
> armor and stacking viral as it goes. Venom Dose and Toxic Lash turn whatever you
> are holding into a monster. Miasma is your panic button and your spread booster.
> Molt draws fire, clears status, and doubles as a sprint. Stay behind cover and
> let the rot do the work.

**The build**

- Umbral Intensify, rank 10, unpolarised
- Primed Continuity, rank 10, Madurai polarity
- Venom Dose, rank 3, unpolarised — augment. Adds a toxin damage buff to allies' weapons
- Catalyzing Shields, rank 3, Vazarin polarity
- Equilibrium, rank 10, Naramon polarity
- Blind Rage, rank 10, Madurai polarity
- Overextended, rank 5, Vazarin polarity
- Stretch, rank 5, Naramon polarity
- Aura: Brief Respite, aura slot
- Exilus: Cunning Drift, unpolarised
- Arcanes: Arcane Sculptor, Molt Augmented

Arsenal figures land at roughly 183% Strength, 155% Duration, 250% Range, 45%
Efficiency, with 465 health, 370 shield, 315 armor and a 300 energy pool.

**How it works.** Spores apply a scaling damage-over-time and, with the right
shards, a corrosive stack that strips armor. Range makes them spread wide and
makes Miasma's radius large. Strength drives spore growth and decay, Miasma
damage, and the Venom Dose and Toxic Lash weapon buffs. After the armor rework a
single Tauforged Emerald shard gets you to about 98% armor strip through spore
corrosive stacks, which the author notes is within a rounding error of a two-shard
100% strip.

**Ability priority.**

1. Hold 1 for Venom Dose, press 3 for Toxic Lash to overbuff your weapon.
2. Tap 1 on an enemy to seed spores, then shoot it while Toxic Lash is up to spread them.
3. Use 4 occasionally when spore count is low to re-spread, quick-nuke, and stack viral.
4. If shields break, tap 2 for an instant shield refill, status cleanse and aggro reset.
5. Tap 2 also for the speed boost when speedrunning.

**Shield gating.** With Catalyzing Shields, a broken shield gives up to 1.33s of
i-frames. Inside that window, tap 2 (Molt) to regenerate 75 shield, which fully
resets the pool (74 with Catalyzing Shields) for another 1.33s next break. Arcane
Sculptor is what makes this work at 45% Efficiency with no Flow: spamming Molt
locks you at 175% Efficiency. *Confidence: Approximation, per the author.*

**Duration, Efficiency, Range, Strength.** Duration is flexible, neutral to 155%,
and mostly helps Venom Dose and Toxic Lash uptime. Efficiency is negative because
Spores is a one-time cast and the buffs are once a minute. Range is high for
spread and Miasma. Strength is high for the weapon buffs and spore scaling; add
Blind Rage or Transient Fortitude, or both, to push it.

**The mods.** *Umbral Intensify, Blind Rage* are the Strength core for the buffs.
*Overextended, Stretch* set the spread Range. *Primed Continuity* holds buff
uptime. *Equilibrium* is the energy engine. *Catalyzing Shields* shrinks the pool
for the Molt shield-gate loop. *Venom Dose* is the weapon toxin buff and a
flexible slot. *Brief Respite* aura feeds the gate without needing Augur mods on
your gear.

**Flexible slots.** Venom Dose and an Augur Reach slot are both open: Primed Flow
for a bigger pool, more Strength, more Range, or a different augment depending on
your subsume. The exilus is free: Primed Sure Footed, Handspring, or a parkour mod.

**Aura.** Brief Respite for the augment-free shield gate. Enemy Radar if you carry
multiple Augur mods elsewhere. Corrosive Projection for a global armor cut.

**Helminth.** Pick one. Subsume over Molt (better for endurance shield gating) or
Miasma (better for low-level nuking).

- **Shooting Gallery** with its augment for crowd control through walls plus a melee-stealth damage bonus on blinded enemies.
- **Resonator** for wide crowd control with no mod slot, though it skips acolytes and overguard.
- **Roar** to triple-dip Toxic Lash's toxin procs and lift spore damage.
- **Nourish** over 4 for viral, indirect Toxic Lash scaling, and more orb energy.
- **Terrify** for crowd control plus a full armor strip at 167% Strength if you are not running Emerald shards.

**Archon Shards.** Flexible. One Tauforged Amber cast-speed for Miasma feel. One
Tauforged Emerald max-corrosive-stack shard for the ~98% strip. Three or four
Tauforged Emerald toxin-damage shards multiply Toxic Lash procs. Five total.

**Arcanes.** Molt Augmented for a free 60% Strength after 250 kills, trivially
reached by spores. Arcane Sculptor for the Efficiency lock. Swap Sculptor for
Molt Efficiency or Arcane Aegis if you prefer a different energy or survival plan.

**Focus.** Any. Madurai for the Strength and cast speed on Miasma, Zenurik for
energy if you drop Arcane Sculptor, Vazarin for the Protective Sling.

**Weapon synergy.** Anything that spreads status, especially slash, pairs with
Toxic Lash. The source lists chaining setups: Acid Shells on Sobek, Nightwatch
Napalm on Kuva Ogris for map-wide lingering fields, and Ocucor for a hands-off
auto-aim option.

**Staying alive.** Cover discipline plus the Molt shield-gate loop plus Miasma's
brief radial stun. It fails if you stand in the open with your gate down, or if
you let spores lapse and lose the corrosive strip against an armored wall.

**Energy.** Arcane Sculptor plus Equilibrium. Saryn's high base energy also means
Primed Flow gives a huge pool if you would rather run it over Transient Fortitude.

**Where it struggles.** A cold start against a fresh armored group before spores
ramp. Bosses. Very open tiles where you cannot use cover.

**Variants.** A pure weapon-platform Saryn drops the nuke angle. A Gloom
persistence-tank version trades speed for raw survivability.

**Strengths and weaknesses.** Strong: map-wide clear once ramped, real armor
strip, strong weapon buffs, fast mover. Weak: slow to start, shield gating is
fiddly under pressure, boss damage is all on the weapon.

**Who runs this.** Players who want one Saryn build for survival, exterminate
speedruns and general Steel Path without swapping.

---

### Infernal Symphony
**Dante. Slash-status Tragedy nuke behind overguard that never lets go.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap, Support |
| Role | Nuke, DoT DPS, team buff and overguard support |
| Difficulty | Intermediate. The Final Verse combos are a lot of buttons |
| Investment | High. 5 forma, Noctua invocation mods, cast-speed shards |
| Weapon reliance | Low. Noctua and Tragedy carry; weapons are optional expedite fuel |

> Tenno. Dante writes the fight in verses. Two Light Verses into Final Verse gives
> Triumph and a wall of overguard that refills on kills. Light then Dark into Final
> Verse summons a Noctua that primes for you. Dark then Light into Final Verse
> sends out Paragrimm that draw fire and stack slash. Then Tragedy takes every
> slash tick in a 40m cone, compresses it, and multiplies it into one lethal
> instance. Keep the verses cycling and you are immortal while the room bleeds
> out.

**The build**

- Umbral Intensify, rank 10, unpolarised
- Equilibrium, rank 10, Naramon polarity
- Primed Continuity, rank 10, Madurai polarity
- Blind Rage, rank 10, Madurai polarity
- Constitution, rank 3, Naramon polarity
- Primed Flow, rank 10, Naramon polarity
- Augur Message, rank 5, Naramon polarity
- Archon Stretch, rank 10, Naramon polarity
- Aura: Corrosive Projection, aura slot
- Exilus: Preparation, unpolarised
- Arcanes: Arcane Concentration, Arcane Impetus

Arsenal figures land at roughly 243% Strength, 207% Duration, 145% Range, 45%
Efficiency, with 390 health, 240 shield, 145 armor and a 769 energy pool.

**How it works.** Every Final Verse combo costs 100 energy and produces one of
three buffs depending on the two verses you cast first. Triumph is overguard on
demand and on kills; Wordwarden summons a Noctua ally; Pageflight summons three
Paragrimm that draw aggro and boost status DPS. Tragedy forces four slash statuses
then compresses roughly 4 to 6 seconds of remaining slash into one multiplied hit.
Strength scales Noctua, Dark Verse, the overguard numbers, and the Tragedy
multiplier, making it the priority stat.

**Ability priority.**

1. Keep Triumph up at all times: 2, 2, 4.
2. Keep Wordwarden up: 2, 3, 4.
3. Keep Pageflight up: 3, 2, 4. This one matters most.
4. Activate Noctua (1) as your damage or primer depending on the fight.
5. Tragedy to nuke: 3, 3, 4.

**Efficiency and energy economy.** Dante is cast-heavy. Triumph, Wordwarden and
Pageflight each last about a minute, so keeping all three up costs roughly 300
energy per minute, plus 100 per Tragedy. The build sits at 45% Efficiency and
covers it with Equilibrium, Xata's Invocation on Noctua (10 energy/s), Arcane
Impetus stacks, and Archon Stretch passive energy when Noctua or Wordwarden is
modded viral-electric. A more cast-spam playstyle without Arcane Steadfast would
instead sit at 100% to 160% Efficiency. *Confidence: Approximation, per the
author.*

**Duration, Range, Strength.** Duration extends every buff so you refresh less;
Noctua's Ris Invocation adds a free 60%. Range feeds nuke coverage, though Dark
Verse and Tragedy are line-of-sight and will not reach past a normal room. Archon
Stretch is optional Range that mainly exists here for the passive energy.

**Umbral Intensify versus Precision Intensify.** Precision Intensify maxes
Triumph, Wordwarden and Pageflight but does nothing for Noctua or Dark Verse
damage. Run Umbral if you use Noctua and Dark Verse to deal damage, or if you
subsume Roar. Run Precision if you rely on your own weapons and use Tragedy
without leaning on Dark Verse procs.

**The mods.** *Umbral Intensify, Blind Rage* are the Strength core. *Primed
Continuity, Constitution* hold Duration against Blind Rage. *Primed Flow* is the
pool for frequent Tragedy. *Equilibrium* is the energy base. *Augur Message* adds
a little Duration and a shield-gate cushion for when overguard is down mid Dark
Verse spam. *Archon Stretch* is the passive energy trickle.

**Flexible slots.** Blind Rage to Transient Fortitude plus Streamline if negative
Efficiency makes you uncomfortable and you are not running Netra or Xata
Invocation or Arcane Steadfast. Augur Message to Constitution (more forma) or
Transient Fortitude (more Strength, less Duration).

**Aura.** Corrosive Projection for a 1.8x lift on armored targets, mostly for
Noctua since Tragedy ignores armor. Growing Power for Strength. Brief Respite for
shield-gate backup on top of overguard gating.

**Helminth.** Pick one. You can realistically only subsume over 1, since 2, 3 and 4
are all needed to cast Pageflight and Wordwarden.

- **Roar** is the default: it double-dips slash and every other DoT, and at 300% Strength a 90% Roar lifts final Tragedy damage by about 3.6x.
- **Shock** with Shock Trooper (over Augur Message) for a non-combining electric add, strong on melee influence weapons.
- **Thermal Sunder** with Thermal Transfer (over Augur Message) for a non-combining heat or blast add.

**Archon Shards.** Two to three Amber cast-speed. The rest flexible: Crimson
Duration or Amber parkour. Five total.

**Arcanes.** Arcane Concentration for a 60% Duration window after casting, which
lines up perfectly with the two-verse setup before Final Verse. Arcane Impetus for
up to 39% Efficiency and 78% Strength when Secondary Encumber on Noctua keeps it
stacked. Swap for Arcane Truculence (max viral on overguard gain) or Molt
Augmented as you like.

**Focus.** Madurai for 50% cast speed and 40% Strength. The frame's cast weight
makes the cast speed as valuable as the Strength.

**Weapon synergy.** Weapons that pump area slash, heat or toxin status pair with
Pageflight's status boost and Tragedy's expedite. Tragedy cannot expedite
electric.

**Staying alive.** Overguard gating: 0.5s of i-frames on losing overguard, roughly
1s on losing 240 shield, and Triumph regenerates overguard on every kill or
assist. Constant Tragedy casts also refresh shields through Augur mods. It fails
if you let all three buffs lapse at once, or against a hit that blows through
overguard and shield in one instance.

**Energy.** Equilibrium plus the invocation stack. Negative Efficiency is fine
here specifically because of how many free-energy sources the Noctua carries.

**Where it struggles.** Line-of-sight tiles cut Tragedy's reach. The button count
is genuinely high and unforgiving if you fumble a combo under pressure. Boss
single-target is on the weapon or a pure-Noctua setup.

**Variants.** A Roar non-Noctua weapon platform maxes Tragedy DPS. Pure-Noctua
heat or electric builds exist for specific factions and endless modes.

**Strengths and weaknesses.** Strong: room-clearing nuke, strong team support and
overguard, immortal when the rotation is up, low weapon dependence. Weak: cast-
heavy and fumble-prone, line-of-sight limited, boss damage needs a dedicated
setup.

**Who runs this.** Players who want one Dante for nuke, support and survival, and
who do not mind memorising three combos.

---

### Preacher of Pain
**Harrow Prime. A headshot energy engine feeding Covenant crit immortality.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Support |
| Role | Team energy and crit buff, self crit-DPS, shield-gate tank |
| Difficulty | Advanced. Everything keys off landing headshots under pressure |
| Investment | Low to medium. 2 forma, arcanes flexible |
| Weapon reliance | High. The whole loop is built around a headshot weapon |

> Tenno. Harrow trades headshots for power. Thurible channels your kills into a
> stream of energy for the whole squad. Condemn chains enemies, hands you
> overshields every cast, and lines them up for the head. Covenant eats incoming
> fire and converts it into a flat crit-chance buff, and while it is charging you
> are invulnerable. Land headshots, keep Condemn rolling, and you are an immortal
> battery that also red-crits.

**The build**

- Blind Rage, rank 10, Madurai polarity
- Augur Reach, rank 5, unpolarised
- Stretch, rank 5, unpolarised
- Primed Flow, rank 10, Naramon polarity
- Augur Message, rank 5, unpolarised
- Primed Continuity, rank 10, Madurai polarity
- Constitution, rank 3, unpolarised
- Rolling Guard, rank 10, Vazarin polarity
- Aura: Corrosive Projection, Naramon polarity
- Exilus: Ice Spring, Vazarin polarity
- Arcanes: Arcane Concentration, Molt Augmented

Arsenal figures land at roughly 199% Strength, 207% Duration, 175% Range, 45%
Efficiency, with 370 health, 740 shield, 185 armor and a 541 energy pool.

**How it works.** Thurible is channelled: build a pool, then release for an energy-
per-kill aura, aiming for at least 30 to 40 energy per kill so headshot kills
return around 100 energy each. Condemn generates overshields every cast, and
because overshields currently count toward the shield gate, hitting about 1150
overshield gives a 2.5s gate with no Redirection mod. Covenant absorbs roughly
2000 damage to hit its crit-chance cap and grants i-frames while absorbing.
Strength has no hard breakpoints on this frame; it just makes every number
smoother.

**Ability priority.**

1. Channel Thurible when your pool is high enough to hit a good release rate, keeping enough energy for one Condemn.
2. Spam Condemn for crowd control and overshields, which also makes headshots easier.
3. Cast Penance from high overshields while invulnerable, then immediately Condemn to refill, or Condemn first then Penance so the two overlap and you never hit zero shield.
4. Cast Covenant near enemies and let them shoot you to charge the crit buff.
5. Headshot everything. Headshots are energy and red crits.

**Duration, Efficiency, Range, Strength.** Duration benefits every ability and is
the main efficiency lever. Minimum Efficiency plus Primed Flow is fine because
Thurible refills you. Range feeds Condemn's chain and Thurible's team aura, and is
the most preference-driven stat; Narrow Minded over Augur Reach if you want far
longer Duration in lower content. Strength is a smooth-scaling nice-to-have.

**The mods.** *Blind Rage* is the Strength. *Primed Continuity, Constitution* hold
Duration. *Primed Flow* is the pool that lets minimum Efficiency work. *Augur Reach
and Stretch* set Condemn's range. *Augur Message* adds Duration and a small backup
shield gate when Condemn cannot reach anything. *Rolling Guard* is the status
cleanse and extra i-frames that pair with Covenant in Steel Path.

**Flexible slots.** Natural Talent is now optional if you slot two or more Amber
cast-speed shards; the freed slot can take Umbral Intensify (more forma),
Streamline, the Lasting Covenant augment for permanent crit at the cost of the
i-frames, Narrow Minded (counterbalanced with Overextended), or the Tribunal
augment for a full support role. Rolling Guard can become Adaptation in lower
content or Narrow Minded.

**Aura.** Enemy Radar is ideal for reading density before you commit Covenant and
Thurible. Corrosive Projection for a small additive strip. Combat Discipline to
self-proc Arcane Avenger, with the health loss healed by Penance.

**Focus.** Vazarin. Protective Sling stacks i-frames between Covenant casts and
over the Rolling Guard cooldown for near-constant invulnerability, and Vazarin's
affinity-range passive widens Penance and Covenant sharing. Madurai is the
alternative for amp damage and 40% Strength.

**Helminth.** Harrow's kit is full and synergistic, so no subsume is the honest
default. If you do:

- **Thermal Sunder** over 1 or 2 for a nuke Harrow in low-level speedruns and Onslaught, sustained by Thurible.
- **Xata's Whisper** over 2: its void damage double-dips headshot multipliers and can bullet-attract follow-up shots to the head.
- **Petrify** with Ore Gaze over 1 or 2 for a loot Harrow.
- **Silence** for a 2s refreshable stun and Acolyte ability lockout.

**Archon Shards.** Two or more Amber cast-speed to free the Natural Talent slot.
The rest are preference. Five total.

**Arcanes.** Arcanes that proc on headshots fit the frame. Arcane Concentration
for Duration, Molt Augmented for Strength. Arcane Pistoleer for secondary ammo,
Arcane Consequence for parkour, all viable.

**Weapon synergy.** Weapons with headshot bonuses or extreme crit multipliers:
Kuva Chakkhurr, Sporothrix, Zymos, Knell Prime, Dual Toxocyst Incarnon, Kuva
Nukor. Covenant's flat crit chance makes low-base-crit, high-multiplier weapons
suddenly viable.

**Staying alive.** Condemn overshield gating plus Covenant i-frames plus Rolling
Guard plus Vazarin Sling. It fails if you cannot land headshots to sustain
Thurible and run dry, or if you get caught between Covenant casts with no
overshield and Rolling Guard on cooldown.

**Energy.** Thurible is the engine; everything else is backup. Do not release
Thurible so aggressively that you cannot afford a safety Condemn.

**Where it struggles.** Enemies you cannot headshot (chaff swarms at bad angles)
choke the whole loop. Bosses. It is the least beginner-friendly frame here because
the energy economy depends on your aim.

**Variants.** An Evade plus Lasting Covenant build gives permanent invisibility and
crit for speedruns. A Pillage full-strip version trades Condemn's crowd control.

**Strengths and weaknesses.** Strong: best team energy in the game, huge crit
buff, immortal with good aim, cheap on forma. Weak: aim-dependent to the point of
fragility without it, does nothing to bosses, kit leaves little room for a
subsume.

**Who runs this.** Confident shooters who want to hard-carry a squad's energy and
crit while never dying.

---

### Ravenous Wraith
**Wisp Prime. Mote buffs and a Breach Surge radiation nuke, under shield-gate invisibility.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap, Support |
| Role | Self and team buff, crowd control, spark nuke, invisible survivor |
| Difficulty | Intermediate |
| Investment | High. 5 forma, cast-speed shard, invocation-modded companion helps |
| Weapon reliance | Medium. Breach Surge sparks scale off your weapon hits |

> Tenno. Wisp plants Reservoirs that never expire. Run through them to pick up
> Haste for fire rate and speed, Shock for crowd control, Vitality for health.
> Breach Surge blinds a room, and every shot into a blinded enemy spits out a
> spark that multiplies your weapon's hit by five or six and throws it back as
> radiation. Nourish paints that spark viral and refills your energy. Stay
> airborne or hold Wil-o-Wisp and nothing can see you.

**The build**

- Augur Message, rank 5, unpolarised
- Umbral Intensify, rank 10, unpolarised
- Augur Secrets, rank 5, unpolarised
- Equilibrium, rank 10, Naramon polarity
- Blind Rage, rank 10, Madurai polarity
- Constitution, rank 3, Naramon polarity
- Archon Stretch, rank 10, Naramon polarity
- Primed Continuity, rank 10, Madurai polarity
- Aura: Worthy Comradery, aura slot
- Exilus: Ice Spring, Vazarin polarity
- Arcanes: Arcane Concentration, Arcane Crepuscular

Arsenal figures land at roughly 267% Strength, 207% Duration, 145% Range, 45%
Efficiency, with 370 health, 370 shield, 210 armor and a 300 energy pool.

**How it works.** Reservoirs have infinite duration, so on a static point you drop
up to six and never cast them again. Breach Surge sparks trigger 10% on hit and
100% on death, take the damage of the weapon hit that caused them, multiply by
around 5 to 6x, and deal radiation with headshot potential. Nourish adds viral to
the sparks and the energy multiplier that keeps you casting at 45% Efficiency.
Worthy Comradery in the aura raises the sparks' crit chance to around 175% on
headshots, letting them orange crit.

**Ability priority.**

1. Cycle Reservoirs with tap 1, plant one of each with hold 1. Haste and Shock matter most.
2. Stay invisible: jump repeatedly, or tap Wil-o-Wisp (2). Every shield break, tap 2 once to go invisible, drop a decoy, and fully reset the gate. Double-tap 2 for 3s of i-frames against a damaging status.
3. Cast Breach Surge (3) to blind, then shoot blinded enemies to generate sparks. Casting 3 on a mote teleports you there and doubles the Surge radius.
4. Keep Nourish (or Eclipse or Roar) active.

**Shield gating.** With three Augur mods on the frame and two on a secondary or
sentinel weapon, one Wil-o-Wisp cast generates 108 shield at 45% Efficiency, about
a 0.8s gate without Catalyzing Shields; Breach Surge gives about 0.92s. Add
Catalyzing Shields over an Augur mod and either 2 or 3 gives the full 1.33s with
no pistol requirement. *Confidence: Approximation, per the author.*

**Duration, Efficiency, Range, Strength.** Duration 150%+ for longer Wil-o-Wisp
invisibility and mote uptime. Efficiency negative because everything except Sol
Gate is cheap. Range 145% to 235% for Breach Surge stun radius and Shock mote
reach. Strength 250% to 350% for the Haste buff, the Breach Surge multiplier, and
the subsumed ability.

**The mods.** *Blind Rage, Umbral Intensify* are the Strength core. *Primed
Continuity, Constitution* hold Duration. *Augur Message, Augur Secrets* are two of
the Augur mods feeding the shield gate, with Augur Secrets also adding Strength.
*Archon Stretch* is Range plus a passive energy trickle when a pet or Wordwarden
carries viral-electric. *Equilibrium* converts orbs.

**Flexible slots.** Catalyzing Shields for the guaranteed 1.33s gate. Vigorous Swap
for 2.65x Breach Surge damage. Natural Talent for cast speed if you skip cast-
speed shards. Primed Flow for a bigger pool. Critical Surge for up to 250% crit
chance based on teleport distance.

**Aura.** Worthy Comradery for the spark crit chance. Corrosive Projection for
armored targets. Combat Discipline to self-proc Arcane Avenger and Nourish's AoE.
Brief Respite if you run no Augur mods.

**Helminth.** Pick one. Subsume over Sol Gate.

- **Nourish** is the default: free viral on weapons and sparks, a viral retaliation proc when hit, and the energy multiplier that makes negative Efficiency work.
- **Eclipse** if you specifically run Glaives or Exodia Contagion, which it double-dips; at 300% Strength that is a 3.6x weapon multiplier and about 6.85x on the resulting sparks.
- **Roar** for a consistent multiplier that also buffs allies and triple-dips melee influence, at lower ceiling than Eclipse.
- **Pillage** for a one-cast armor strip at 400% Strength, or 328% with Corrosive Projection.

**Archon Shards.** One Tauforged Amber cast-speed. The rest preference: the author
runs two parkour and two Duration. Five total.

**Arcanes.** Arcane Crepuscular for 30% Strength and a flat crit-damage multiplier
while invisible, which requires you keep 2 active or jump-melee. Arcane
Concentration for Duration. Arcane Arachne (2.5x sparks) or Molt Augmented are
strong swaps.

**Focus.** Madurai for the Strength and cast speed. Zenurik if you drop the
energy-return subsume. Vazarin for the safety net.

**Weapon synergy.** Wisp's airborne invisibility survives melee attacks but not
gunfire, so ranged melee (Glaives, Exodia Contagion) pairs perfectly with the
passive. For Contagion, subsume Eclipse.

**Staying alive.** Invisibility plus the Wil-o-Wisp shield-gate reset plus optional
Rolling Guard. It fails to sustained toxin ticks in the gap between casts, and to
standing still, visible, with the gate on cooldown.

**Energy.** Nourish's multiplier plus Equilibrium plus Archon Stretch. Arcane
Energize if you drop Nourish.

**Where it struggles.** Bosses. Very open tiles dilute Breach Surge. The spark
loop needs you to actually be shooting blinded enemies, so a pure melee build
gets less from it.

**Variants.** A Sol Gate nuke with Roar. A red-crit weapon platform with Energized
Munitions. A pure mote support build with Roar.

**Strengths and weaknesses.** Strong: strong self and team buffs, invisible
survival that scales into endurance, a real nuke through sparks, flexible subsume.
Weak: setup-heavy, boss-blind, wants a specific weapon style to get full spark
value.

**Who runs this.** Players who want a buff-support frame that also survives and
clears without relying on a nuke ability alone.

---

### Total Malevolence
**Mirage Prime. A dual-augment hologram weapon platform.**

| | |
|--|--|
| Content | Steel Path, Level cap, Weapon platform |
| Role | Extreme weapon DPS multiplier, solo clear |
| Difficulty | Intermediate. The tap/hold Eclipse inversion trips people up |
| Investment | Low. 2 forma, arcanes flexible |
| Weapon reliance | Total. Mirage multiplies a weapon; she is nothing without one |

> Tenno. Hall of Mirrors makes four copies of you that all fire your weapon.
> Everyone builds the damage augment; the trick here is stacking it with Total
> Eclipse, which also buffs the holograms and multiplies against the first
> augment. Tap Eclipse for the damage side, keep Hall of Mirrors fed with kills,
> and each hologram can throw out over a thousand percent of your weapon's damage.
> Survival is passive shield recharge, so you never stop shooting to stay alive.

**The build**

- Hall of Malevolence, rank 3, unpolarised — augment. Hologram damage stacks with kills
- Total Eclipse, rank 3, unpolarised — augment. Extends Eclipse to allies and, notably, buffs the holograms multiplicatively with Hall of Malevolence
- Vigilante Vigor, rank 5, unpolarised
- Fast Deflection, rank 5, unpolarised
- Rolling Guard, rank 10, Vazarin polarity
- Catalyzing Shields, rank 3, Vazarin polarity
- Blind Rage, rank 10, Madurai polarity
- Narrow Minded, rank 10, Vazarin polarity
- Aura: Corrosive Projection, Naramon polarity
- Exilus: Ice Spring, Vazarin polarity
- Arcanes: Arcane Aegis, Molt Augmented

Arsenal figures land at roughly 199% Strength, 199% Duration, 34% Range, 45%
Efficiency, with 300 health, 410 shield, 185 armor and a 225 energy pool.

**How it works.** Hall of Mirrors makes holograms that fire your weapon at a
fraction of its damage. Hall of Malevolence raises that fraction with kills. Total
Eclipse also raises hologram damage, and its multiplier is multiplicative with the
first augment, so at high Strength each hologram can reach around 9x. The author's
math: four clones at ~60% weapon damage each is 240% total, redistributed over two
holograms with guns for 120% each, times 9 for a ceiling near 1080% weapon damage
per hologram. *Confidence: Approximation, per the author's breakdown.*

**Playstyle.**

1. Tap 3 for Eclipse's damage buff. You must invert the tap/hold setting for Mirage so tap is the light/damage side. Keep it up always.
2. Tap 1 for Hall of Mirrors and get kills to build Hall of Malevolence stacks. Clones draw aggro so enemies sometimes miss you.
3. Optional: tap 2 near objects to booby-trap them, and near enemies while 1 is up for minor blind crowd control.

**Strength, Duration, Range, Efficiency.** Strength wants at least 250% so clones
match your weapon's crit and status; the build sits at 199% and leans on Molt
Augmented to close the gap. Narrow Minded plus shards give a near-minute upkeep on
both 1 and 3. Range is slashed to 34%, which shrinks Total Eclipse's ally radius to
about 5m: enough for the holograms, not enough for real co-op support. Add
Overextended or Stretch if you want to buff a squad. Efficiency is low but fine
because 1 and 3 are once a minute.

**Survivability: passive shield recharge.** Catalyzing Shields currently gives the
full 1.33s gate for any shield gained. Fast Deflection plus Vigilante Vigor drop
the recharge delay to about 1s. Any hit during the gate resets that delay to 1s,
so after a gate you have 0 to 1s before shields restart. Avoid being hit in that
window and you are effectively immortal to non-toxin damage, and Hall of Mirrors
making enemies miss is what buys that window. Arcane Aegis, Omamori, a Guardian
sentinel or Rolling Guard are extra layers. *Confidence: Approximation, and the
author flags the Catalyzing Shields interaction as likely a bug.*

**The mods.** *Blind Rage* is the Strength. *Narrow Minded* is the Duration, and
the Range cost is acceptable because you only need to cover the holograms.
*Catalyzing Shields, Fast Deflection, Vigilante Vigor* are the passive-gate
package. *Rolling Guard* is the manual bail-out. *Hall of Malevolence and Total
Eclipse* are the damage, and both are optional depending on weapon (see below).

**Augments as flex.** If you use single-target weapons, melee slam, Glaive
explosions or Exodia Contagion, the holograms do not benefit, so drop both
augments for Primed Continuity, Umbral Intensify, Equilibrium, Nira's Hatred
(slam) or Vigorous Swap (Contagion/Glaives). Eclipse still double-dips Glaives and
Contagion for roughly 16x at 300%, so a Glaive Mirage keeps Eclipse and drops only
the clone augments.

**Aura.** Corrosive Projection for armored targets. Growing Power for Strength.
Brief Respite is unnecessary here.

**Helminth.** Pick one. Subsume over 2 or 4.

- **Nourish** is the default: solves energy and adds free viral to weapons.
- **Omamori** for a lazier survival layer; if you run it, drop Catalyzing Shields for Primed Continuity.
- **Pillage** for shield recovery plus a full armor and shield strip in one cast, ideal for a glass-cannon Mirage.
- **Breach Surge** for crowd control plus sparks that Eclipse double-dips.
- **Wrathful Advance** to red-crit a Glaive or Contagion melee.

**Archon Shards.** Two Amber cast-speed, three Crimson Duration for 1 and 3
uptime. Five total.

**Arcanes.** Arcane Aegis for a survival layer, Molt Augmented for the Strength the
build is short on. Swap Aegis for a weapon DPS arcane (Precision, Velocity,
Pistoleer, Fury, Arachne) once you trust the passive gate.

**Focus.** Any. Zenurik for energy without Arcane Energize, Vazarin for the Sling,
Madurai for the Strength swing.

**Weapon synergy.** Area weapons are the top pick because holograms fire slightly
offset from your reticle, so overlapping AoE ensures all instances land on one
target. Clones ignore galvanized mods and arcanes, so favour weapons that do not
depend on Galvanized Aptitude or Merciless, and always run Serration or Hornet
Strike rather than offloading all damage onto an arcane.

**Staying alive.** The passive gate, backed by Rolling Guard and Arcane Aegis. It
fails to toxin, and to a burst of fire landing in the sub-1s window before shields
restart. The narrow Range means no team protection from Total Eclipse.

**Energy.** Nourish plus the low cast frequency. 225 base pool is small, so do not
over-cast.

**Where it struggles.** Toxin damage. Single-target weapons waste the whole
gimmick. Bosses, unless your weapon alone handles them. No co-op support at this
Range.

**Variants.** A Prism nuke build. An ESO Legerdemain nuke. A Breach Surge triple-
augment build with more balanced stats.

**Strengths and weaknesses.** Strong: the highest weapon-damage multiplier on any
frame, cheap on forma, shoots without pausing to survive. Weak: fully weapon-
dependent, toxin-vulnerable, selfish, punishing tap/hold quirk for new players.

**Who runs this.** Players who have a favourite gun and want to see numbers that do
not fit on screen.

---

### The Electromagnetic Accelerator
**Gauss Prime. A battery-gated weapon platform with a Thermal Sunder strip-nuke bolted on.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap, Weapon platform |
| Role | Weapon platform, armor strip, crowd control, fast traversal |
| Difficulty | Advanced. The battery-versus-Redline distinction and the strip combo take real learning |
| Investment | Very low. 0 forma on the listed build |
| Weapon reliance | High for damage. Thermal Sunder covers strip, crowd control and a nuke option |

> Tenno. Gauss runs on a battery. Keep it above the red line with Mach Rush and
> Cold Sunder and Kinetic Plating gives up to 100% damage reduction to most
> physical and elemental types, Thermal Sunder gets a full armor strip, and
> Redline stacks fire rate, reload and holster speed onto whatever you are
> holding. Learn the heat-then-cold combo: it strips a group, drags them in, and
> compresses your stacked heat procs into one blast that deletes them.

**The build**

- Stretch, rank 5, unpolarised
- Streamline, rank 5, unpolarised
- Thermal Transfer, rank 3, unpolarised — augment. Adds blast status to weapons after a heat-then-cold Sunder
- Archon Vitality, rank 0, Vazarin polarity — doubles heat procs, which is what scales the Sunder blast
- Equilibrium, rank 10, unpolarised
- Primed Flow, rank 10, Naramon polarity
- Augur Reach, rank 5, unpolarised
- Primed Continuity, rank 10, Madurai polarity
- Aura: Sprint Boost, Naramon polarity
- Exilus: Rush, Naramon polarity
- Arcanes: Arcane Ice Storm, Arcane Concentration

Arsenal figures land at roughly 100% Strength, 155% Duration, 175% Range, 130%
Efficiency, with about 404 health, 650 shield, 185 armor and a 641 energy pool.
Sprint speed is 2.175.

**How it works.** Two separate meters: the **battery** (blue bar, bottom right, no
number) and **Redline** (the percentage to its left). Your job is to keep the
battery above the red mark, ideally at 100%, which grows Redline toward 100%. At
100% battery, Kinetic Plating gives 100% damage reduction to impact, puncture,
slash, cold, heat and blast, and Thermal Sunder can full-strip armor. At max
Redline the battery stops draining entirely and you can spam heat Sunders freely.
Archon Vitality doubling heat procs is what makes the Sunder blast scale, because
the fused blast damage rises with the heat-proc count.

**Playstyle.**

1. Activate Kinetic Plating (2) and Redline (4) immediately and keep them refreshed, recasting early in a safe spot rather than letting them lapse in a crowd.
2. Build battery fast: five Cold Sunders and five Mach Rushes maxes it. Each cast adds about 10%.
3. Below max Redline, run the strip combo: one Heat Sunder (−10% battery), one quick Mach Rush (+10% back to 100%), one Cold Sunder to full-strip and group. Corrosive Projection lowers the battery threshold for a full strip so this is near-guaranteed.
4. At max Redline, stack 2 to 3 Heat Sunders (each doubles current heat procs), then one Cold Sunder to strip, pull, and convert the heat into a blast nuke.

**Blast expedite.** Stack heat procs from a dedicated heat weapon (Kuva Nukor,
Phage, Phantasma, Furis Incarnon), then detonate with Cold Sunder. All that heat-
proc damage compresses into one blast instance after the strip, easily 100k to
over a million, or the damage cap. This is the way to kill demolysts and Thrax
units. *Confidence: Approximation, per the author.*

**Duration, Efficiency, Range, Strength.** Duration is the priority: it holds
Kinetic Plating and Redline, slows Mach Rush drain, and extends Thermal Sunder's
heat-proc duration, which is direct Sunder damage. Efficiency sits neutral to 130%
because 2 and 4 are recast every 90 seconds or so and Mach Rush is cheap; Sunder
spam is the only real drain and Kinetic Plating regenerates energy from absorbed
hits. Range feeds Sunder's crowd-control and strip radius; 145% to 235% depending
on tileset. Strength stays at or above 100% so Kinetic Plating holds 100% DR at
max Redline; Thermal Sunder scales well enough at 100% that pushing higher is not
needed.

**The mods.** *Primed Continuity* is the Duration core with Constitution and Molt
Efficiency behind it. *Streamline* nudges Efficiency positive and is the first
flex slot. *Primed Flow* is the pool for Sunder spam. *Equilibrium* is a backup
energy source. *Augur Reach* is Range plus a small shield-gate contribution.
*Archon Vitality* is the heat-proc doubler. *Thermal Transfer* adds weapon blast
after the combo. *Stretch* is more Range.

**Survivability.** The endurance option is shield gating: Brief Respite plus Augur
mods let each Thermal Sunder generate up to 108 shield for roughly a 1.2s gate
with Catalyzing Shields, backed by 100% DR at full battery, cold-Sunder crowd
control, and Redline's passive shield recharge. Alternatives are a Quick Thinking
plus Kinetic Plating energy-tank meme for base Steel Path, and a Fast Deflection
plus Arcane Aegis loop that the author flags as probably a bug.

**Aura.** Corrosive Projection lowers the battery threshold for a one-cast full
strip, making strips consistent even below max Redline. Brief Respite for shield
gating. Sprint Boost stacks with Rush for faster Mach Rush. Enemy Radar for spawn
tracking.

**Helminth.** Pick one.

- **Roar** over 1 for general weapon and ability damage, double-dipping heat and triple-dipping into Thermal Sunder.
- **Energized Munitions** over 3 for weapon spam in Redline without constant reloads (see the dedicated weapon-platform variant).

**Archon Shards.** Five Tauforged Duration shards, which lift every ability. One
cast-speed shard is optional to smooth recasts at low battery. Five total.

**Arcanes.** Arcane Ice Storm for 40% Duration and 40% Strength, triggered by Cold
Sunder and by heat-cold detonations. Arcane Concentration for another 60% Duration
window. Molt Efficiency, Arcane Hotshot or Arcane Pistoleer are situational swaps.

**Focus.** Flexible. Vazarin Protective Sling for a 5s on-demand i-frame in
endurance. Zenurik for energy without Arcane Energize. Naramon for a melee
loadout. Unairu is the weakest pick because Kinetic Plating already covers
knockdown and Sunder covers strip.

**Weapon synergy.** Redline's fire-rate and reload buffs favour normally slow
weapons: Tenet Envoy, Kuva Zarr, Felarx, Acceltra. Full-auto pistols with Arcane
Pistoleer get effectively infinite ammo. Melee attacks build battery, so any
strong melee fits, with corpus-themed electric influence melee being a natural
pairing alongside the armor strip.

**Staying alive.** 100% DR at full battery plus shield gating plus cold crowd
control. It fails if the battery drops in a fight and Kinetic Plating's DR falls
off, and to toxin, which routes around the shield gate.

**Energy.** Kinetic Plating's absorb-to-energy plus Equilibrium plus Arcane
Energize. Seismic Bond on a companion adds free Efficiency because Mach Rush,
Kinetic Plating and Redline all count as channelled.

**Where it struggles.** The learning curve is the real cost: mistaking Redline for
battery, or letting the battery sag, breaks both the defense and the strip. Bosses
need the blast-expedite setup or your weapon.

**Variants.** Pure Thermal Sunder spam to level cap. Pure weapon spam with
Energized Munitions. A max-speed molt meme, or a Roar high-damage platform.

**Strengths and weaknesses.** Strong: zero forma to start, 100% DR, a full strip
and a genuine nuke option, the fastest frame in the game. Weak: steep learning
curve, battery management is constant, toxin-vulnerable, boss damage needs setup.

**Who runs this.** Players who want one frame that traverses fast, strips armor,
survives, and makes any favourite weapon perform.

---

### The Aegis Gale
**Hildryn Prime. A shield-fuelled Balefire nuke with a spammable armor strip.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Exalted-weapon nuke, armor and shield strip, shield tank |
| Difficulty | Beginner to survive, Intermediate for endurance shield-gate timing |
| Investment | Medium. 3 forma, cast-speed and strength shards |
| Weapon reliance | Low. Balefire under Aegis Gale is the damage; equipped weapons are optional |

> Tenno. Hildryn has no energy bar, she spends shields. Aegis Gale turns Balefire
> into a spammable alt-fire that nukes with real area, and exalted weapons take
> arcanes now, so Secondary Enervate makes it crit. Pillage refills your shields,
> cleanses status, and strips armor every cast. You float, you spam alt-fire, and
> the only resource you manage is the same shield pool that keeps you alive.

**The build**

- Augur Reach, rank 5, unpolarised
- Aegis Gale, rank 3, unpolarised — augment. Gives Balefire a spammable, area alt-fire
- Primed Continuity, rank 10, Madurai polarity
- Stretch, rank 5, Naramon polarity
- Transient Fortitude, rank 10, Madurai polarity
- Umbral Intensify, rank 10, unpolarised
- Primed Redirection, rank 10, Vazarin polarity
- Overextended, rank 5, Vazarin polarity
- Aura: Corrosive Projection, Naramon polarity
- Exilus: Cunning Drift, Madurai polarity
- Arcanes: Arcane Expertise, Arcane Velocity

Arsenal figures land at roughly 139% Strength, 128% Duration, 280% Range, 100%
Efficiency, with 370 health, a 5263 shield pool, 315 armor and no energy bar.

**How it works.** Everything costs shields. Aegis Gale's alt-fire is the nuke, and
it scales on Range for radius and Strength for damage; Arcane Expertise converts
Strength into extra shield capacity, which feeds back into Aegis Gale damage.
Pillage is the engine: it returns shields from stripped enemies, so casting it in a
crowd both strips armor and refuels you. Notably you do not always want a one-cast
full strip, because a fully stripped enemy returns no shields on the next Pillage.

**Playstyle.**

1. Enter Aegis Gale and spam alt-fire across the room.
2. Spam Pillage whenever enemies are near to refill shields, cleanse status and strip armor.

**Survivability.** Two modes. For base Steel Path, casual tanking on the huge
shield pool plus Adaptation (over 50,000 effective shield HP) is enough, and
armor mods do nothing for shields so none are used. For endurance, lean on
Hildryn's passive: 3s of i-frames on a shield break, a 1s recharge delay, and
about 300 shield/s regen, meaning you can recast Pillage by the third second and
reset the gate. Rolling Guard near the end of the i-frame window extends it, and
Vazarin Protective Sling stacks a further 5s on demand with no cooldown.
*Confidence: Approximation, per the author.*

**Duration, Efficiency, Range, Strength.** Duration scales Pillage's spread to
roughly 60m effective. Efficiency should be neutral to positive because Aegis
Storm drains hard; Seismic Bond and Mystic Bond on a companion give free
Efficiency and free Pillage casts. Range scales Balefire radius, Pillage cast
radius, Haven, and Aegis Storm's crowd control; 145% to 280% to taste. Strength
drives Balefire damage, Pillage strip amount, and Haven's damage and shield bonus,
with the caveat about not over-stripping.

**The mods.** *Transient Fortitude, Umbral Intensify* are the Strength core.
*Primed Continuity* holds Duration against Transient Fortitude. *Overextended,
Stretch* set the wide Range. *Primed Redirection* deepens the shield pool, which is
both survival and Aegis Gale damage through Arcane Expertise. *Augur Reach* is
more Range and a shield-gate contribution. *Aegis Gale* is the damage.

**Flexible slots.** Blazing Pillage for enemies with no armor or shields.
Streamline for Efficiency. Adaptation for passive casual-SP tankiness. Rolling
Guard for extra i-frames. The exilus is fully open.

**Aura.** Corrosive Projection to strip in two Pillage casts at 183% Strength,
which also preserves the shield return from a partial strip. Enemy Radar for
tracking. Growing Power for Strength.

**Helminth.** Pick one. Subsume over 3.

- **Xata's Whisper** for overguard damage and a headshot multiplier on Balefire.
- **Roar** for straight Balefire damage.
- **Elemental Ward (electric)** for more shield capacity plus damage redirection.
- **Molt** to move faster inside Aegis Gale.

**Archon Shards.** One Amber cast-speed, four Crimson strength. Five total.

**Arcanes.** Arcane Velocity for Balefire fire rate, Arcane Expertise for the
Strength-to-shield conversion that also feeds Aegis Gale damage. Swap Expertise
for Arcane Aegis or Arcane Barrier in endurance for a stronger shield-regen
safety net.

**Focus.** Vazarin Protective Sling for the on-demand 5s i-frame, and Vazarin's
Guardian Break for faster shield regen on a broken shell. Madurai for cast speed
and 40% Strength.

**Companion.** Taxon with Molecular Conversion and Guardian, or a Raksa Kubrow
with Protect, both feed shields directly. Pillage affects Kubrows and Moas but not
sentinels, so a Raksa stays topped up just from your casts.

**Staying alive.** The shield pool plus the passive i-frames plus Pillage refuel.
It fails to a single hit that exceeds the whole pool in deep endurance, and to
toxin, which bypasses shields entirely.

**Energy.** There is none. Shields are the resource, and Pillage plus companion
support keeps them full.

**Where it struggles.** Toxin. Very deep endurance where one hit deletes the pool
faster than the passive can respond. Aegis Storm's drain if you build low
Efficiency without companion support.

**Variants.** A Molt-mobility Hildryn for speed.

**Strengths and weaknesses.** Strong: no energy management, a spammable area nuke,
a strip that also heals, very tanky in most content. Weak: toxin-vulnerable, drain-
heavy without companion mods, falls off in the deepest endurance.

**Who runs this.** Players who want a low-maintenance nuke-and-tank that never
thinks about energy.

---

### Capacitance Bulwark
**Volt Prime. Discharge crowd control that refills your shields, plus an electric weapon overbuff.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance |
| Role | Crowd control, trash nuke, electric weapon buff, shield-gate survivor |
| Difficulty | Beginner to intermediate |
| Investment | Medium. 3 forma, cast-speed shards optional |
| Weapon reliance | Medium. Shock Trooper and Shield make the weapon the scaling damage; Discharge falls off |

> Tenno. Discharge is a net. It stuns a room and, with the Capacitance augment,
> converts that crowd control into shields that reset your gate. Keep one
> Discharge live on at least one enemy at all times and you are effectively
> immortal. Speed buffs your fire rate and reload, Shield stacks an electric
> damage bonus and a crit multiplier, and Shock Trooper turns your weapon into an
> electric monster.

**The build**

- Archon Stretch, rank 10, Naramon polarity
- Primed Flow, rank 10, Naramon polarity
- Transient Fortitude, rank 10, Madurai polarity
- Primed Continuity, rank 10, Madurai polarity
- Shock Trooper, rank 3, unpolarised — augment. Adds an additive electric damage bonus to weapons
- Capacitance, rank 3, unpolarised — augment. Discharge converts damage dealt into shields
- Rolling Guard, rank 10, Vazarin polarity
- Equilibrium, rank 10, Naramon polarity
- Aura: Growing Power, Madurai polarity
- Exilus: Power Drift, unpolarised
- Arcanes: Arcane Concentration, Molt Augmented

Arsenal figures land at roughly 170% Strength, 128% Duration, 145% Range, 100%
Efficiency, with 370 health, 555 shield, 135 armor and an 855 energy pool.

**How it works.** Discharge has a 20m base radius; 145% Range gives about 29m,
enough to lock down a room without pulling in neighbouring areas and choking your
spawn flow. Capacitance turns the damage Discharge deals into shields, so a live
Discharge is a continuous shield-gate refill. Shield stacks up to six times when
stationary for a +300% additive electric damage instance, separate from Shock
Trooper's additive electric bonus. Strength scales the weapon buffs and Discharge
damage but not Shield.

**Ability priority.**

1. Keep Shock Trooper up (hold 1), depending on your weapon.
2. Keep Speed up (tap 2) for mobility, reload and melee speed.
3. Keep Shield up (tap 3) and walk through it for protection, the electric bonus and the crit multiplier. Stack six while camping.
4. Cast Discharge (4) whenever it lapses. Always have one active on at least one enemy for the shield refill and the crowd control.

**Duration, Efficiency, Range, Strength.** Positive Duration for buff uptime; swap
Transient Fortitude for Umbral Intensify plus Duration shards if you want to
recast less. Efficiency stays neutral because Archon Stretch plus Equilibrium
covers it. Range is tuned to lock one room, not the map; add Overextended over
Primed Flow for open tiles. Strength is for the weapon buffs, since Discharge
damage does not scale into high levels.

**The mods.** *Transient Fortitude* is the Strength for the buffs, with *Primed
Continuity* buying back its Duration. *Archon Stretch* is Range plus passive energy
when it procs off 1 or 4. *Primed Flow* is the pool, and it is a flex slot for
Range or Duration. *Equilibrium* converts orbs. *Shock Trooper* is the weapon
electric bonus. *Capacitance* is the shield engine. *Rolling Guard* is the status
cleanse for the moments Discharge is down.

**Flexible slots.** Rolling Guard becomes Range or Strength if you are content
casting 4 to gate. Natural Talent for cast speed if you skip cast-speed shards.
The aura and exilus are both open: Growing Power for Strength, Primed Sure Footed
for knockdowns.

**Helminth.** Pick one. Subsume over 1 (keep Discharge for nuke and crowd control,
replace Shock Trooper) or over 4 (keep Shock Trooper for weapon DPS).

- **Nourish** for viral and an energy multiplier.
- **Roar** for weapon DPS and a Discharge boost.
- **Pillage** for armor strip plus shields plus status cleanse.
- **Ensnare** for grouping to enable electric DoT chaining and headshots.

**Archon Shards.** One to two Amber cast-speed. The rest flexible: parkour,
Crimson strength or duration, violet melee crit for a melee loadout, violet
primary electric for a gun loadout. Five total.

**Arcanes.** Arcane Concentration for Duration, Molt Augmented for the Strength
the weapon buffs want. Swap either for Molt Efficiency, Arcane Steadfast or Arcane
Aegis.

**Focus.** Madurai for cast speed and Strength. Vazarin for endurance i-frames.
Zenurik for energy without Energize. Unairu for a shield and armor strip that
works on acolytes and demolysts.

**Weapon synergy.** Electric or viral-electric crit weapons that also want reload
speed: Phantasma, Strun, Fulmin Prime, Bubonico alt-fire. For melee, only certain
projectile melees benefit from all three of Shock Trooper influence, Speed's
attack speed and Shield's crit multiplier: Innodem, Ceramic Dagger Incarnon, Syam,
Hate Incarnon.

**Staying alive.** The Capacitance shield loop plus Rolling Guard. It fails
against Eximus that ignore the stun, in the gap if you let every Discharge lapse
at once, and to toxin.

**Energy.** Archon Stretch plus Equilibrium at neutral Efficiency. Add Arcane
Steadfast or a Grimoire Xata Invocation if it runs thin.

**Where it struggles.** Discharge damage is a low-level nuke only; past a point it
is pure crowd control and the weapon does the killing. Open maps dilute the
radius. Bosses ignore it.

**Variants.** A pure weapon platform with Roar or Nourish. A pure Discharge nuke
with Terrify. A speed meme with Molt.

**Strengths and weaknesses.** Strong: reliable room lockdown, self-sustaining
shields, strong electric weapon buffs, cheap and forgiving. Weak: ability damage
does not scale, weapon-dependent at high levels, radius is tile-sensitive.

**Who runs this.** Players who want a crowd-control frame that also survives
forever and turns an electric weapon into a nuke.

---

### Wrathful Blades
**Ash Prime. A red-crit Bladestorm that one-shots to level cap, plus a melee platform.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Single-target and multi-mark assassin, melee platform |
| Difficulty | Intermediate |
| Investment | Medium to high. 3 forma, an energy-max shard, melee crit-damage shards |
| Weapon reliance | Medium. Bladestorm carries clears; a melee mops up and covers bosses |

> Tenno. Wrathful Advance is a flat crit-chance number equal to your Strength, and
> it lands on both your melee and Bladestorm. At high Strength that pushes
> Bladestorm to tier-four red crits, tens of millions per hit, no priming needed.
> Mark a room with 4, send the clones, and everything below level 500 is already
> dead. Smoke Screen keeps you invisible while it happens.

**The build**

- Umbral Intensify, rank 10, unpolarised
- Teleport Rush, rank 3, unpolarised — augment. Teleport grants a parkour buff and sets up finishers
- Stretch, rank 5, Naramon polarity
- Transient Fortitude, rank 10, Madurai polarity
- Equilibrium, rank 10, Naramon polarity
- Primed Flow, rank 10, Naramon polarity
- Narrow Minded, rank 10, Vazarin polarity
- Primed Continuity, rank 10, Madurai polarity
- Aura: Steel Charge, Madurai polarity
- Exilus: Preparation, unpolarised
- Arcanes: Arcane Crepuscular, Arcane Fury

Arsenal figures land at roughly 199% Strength, 227% Duration, 79% Range, 100%
Efficiency, with 555 health, 465 shield, 185 armor and a 427 energy pool.

**How it works.** Since the 2025 rework Bladestorm is an exalted: the Shadow Clones
weapon takes melee mods and scales on melee crit, and Wrathful Advance's flat
crit-chance boost (equal to final Strength) is what turns its low base crit into
guaranteed red crits. The author's figure: at 388% final Strength, Bladestorm sits
near 399% crit chance for tier-four crits and 20 to 30 million per initial hit
with no priming, enough to one-shot every non-boss attenuated enemy to level cap.
The listed build sits lower at 199% arsenal Strength and leans on Molt Augmented,
Crepuscular and Madurai to climb. *Confidence: Approximation, per the author's
Bladestorm spreadsheet.*

**Ability priority.**

1. Tap 1 for Wrathful Advance, keep it up. It doubles as mobility.
2. Cast 2 for invisibility, recast as needed.
3. Cast 3 (Teleport Rush) to finisher enemies and refresh invisibility. Casting 3 during Bladestorm makes you join in and finish faster.
4. Optional: prime with viral and multiple statuses for the level-cap variant.
5. Tap 4, sweep the cursor over enemies to mark them, tap 4 again to send the clones. Mop up with melee or gun.

**Efficiency and energy.** Negative Efficiency is sustainable because Smoke Screen
lasts long and refreshes off Teleport, and Bladestorm costs about 9.3 energy per
mark while invisible for a guaranteed one-shot. Equilibrium is the main engine; a
Synth Deconstruct companion feeds it, and Eximus kills drop two health orbs for
110 energy. *Confidence: Approximation, per the author.*

**Duration, Range, Strength.** High Duration for Smoke Screen and Wrathful Advance
uptime. Range is dumped to 79% because Bladestorm's 50m base already covers a big
room; go wide only for open-world (Overextended over Narrow Minded). Strength is
the damage and the crit-chance boost, so it is the stat you push.

**The mods.** *Umbral Intensify, Transient Fortitude* are the Strength core.
*Narrow Minded, Primed Continuity* are the Duration, with Narrow Minded's Range
cost being free here. *Primed Flow* is the pool. *Equilibrium* is the energy.
*Teleport Rush* is a flex slot for finishers and parkour, swappable for Rolling
Guard or an Augur mod. *Steel Charge* aura adds mod capacity and a little melee
damage.

**Flexible slots.** Brief Respite over Steel Charge for shield-gate backup, with
Shuriken as an on-demand shield refill. Rolling Guard for the random AoE status
procs that get through invisibility. Seeking Shuriken for boss and Disruption
armor strip. The exilus is open.

**Arcanes.** Arcane Crepuscular for 30% Strength and a flat crit-damage add while
invisible, which is a large Bladestorm buff given its low base crit damage. Arcane
Fury for melee damage. Arcane Trickery is a strong swap: at this kill rate it
keeps near-permanent, undispellable invisibility. Arcane Blade Charger instead of
Fury for a gun-leaning Ash.

**Focus.** Madurai for 40% Strength and 50% cast speed, and it is the Cascade
meta. Naramon to hold Bladestorm combo without Melee Crescendo. Vazarin for
endurance i-frames. Unairu for free knockdown resist and a full strip.

**Archon Shards.** One Tauforged Azure energy-max shard to reach 500 energy, which
doubles the value of violet melee crit-damage shards. Two to four violet melee
crit-damage. The rest in Crimson Duration. Five total.

**Weapon synergy.** Finisher weapons benefit from Teleport finishers: hammers and
rapiers at 32x back-finisher, scythes at 14x. Slash heavy-attack melees pair with
Ash's slash passive; x12 heavy setups (Glaive Prime, Syam, Sepfahn) are strong. A
primer is optional for the level-cap variant.

**Staying alive.** Near-permanent invisibility plus Rolling Guard or Vazarin
Sling. It fails to AoE and environmental status procs while cloaked, and to
nullifiers stripping Smoke Screen (Arcane Trickery does not have that problem).

**Energy.** Equilibrium plus a Synth Deconstruct pet. Backups: Grimoire Xata
Invocation, Energy Nexus, Zenurik.

**Where it struggles.** Bosses and Demolysts resist the Bladestorm one-shot
without heavy priming, so single-target boss damage is on your melee. Open worlds
need a Range rebuild.

**Variants.** A min-maxed one-shot-level-cap Bladestorm build. A gas Bladestorm
for dense survival. A Savage Silence variant. A pure gun platform with Eclipse or
Roar.

**Strengths and weaknesses.** Strong: genuine level-cap one-shot clear, permanent
stealth, low priming needs, flexible melee platform. Weak: boss damage needs the
melee, Range rebuild for open maps, exalted now means Shadow Clones needs its own
mods and forma.

**Who runs this.** Players who want to point at a room and have it already be
dead, while invisible.

---

### Critical Infestation
**Nidus Prime. A Virulence crit engine, Larva grouping, and a parasitic tank that cannot be status-locked.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Primary-weapon crit buff, grouping, bruiser tank |
| Difficulty | Intermediate. Stack management is constant |
| Investment | Low to medium. 4 forma, one armour shard is mandatory for the arcane |
| Weapon reliance | High. Teeming Virulence and Parasitic Link exist to make your primary hit harder |

> Tenno. Nidus feeds. Larva balls a crowd, Virulence stabs through it for
> Mutation stacks and energy, and Teeming Virulence turns those stacks into flat
> primary crit chance. Parasitic Link chains you to your companion for status
> immunity and a multiplicative damage buff. Parasitic Vitality turns stacks into
> tens of thousands of health, and Arcane Persistence caps incoming damage while
> your armour is high. Keep the stacks, keep a link, and you do not die.

**The build**

- Teeming Virulence, rank 3, unpolarised — augment. Mutation stacks grant flat primary crit chance
- Parasitic Vitality, rank 3, unpolarised — augment. Replaces Vitality; stacks grant large health
- Larva Burst, rank 3, unpolarised — augment. Larva deals scaling damage
- Stretch, rank 5, unpolarised
- Hunter Adrenaline, rank 5, Madurai polarity
- Archon Continuity, rank 10, Madurai polarity
- Overextended, rank 5, Vazarin polarity
- Blind Rage, rank 10, Madurai polarity
- Aura: Corrosive Projection, aura slot
- Exilus: Toxic Flight, Naramon polarity
- Arcanes: Arcane Persistence, Arcane Bellicose

Arsenal figures land at roughly 154% Strength, 155% Duration, 235% Range, 45%
Efficiency, with 925 health, 525 armor, no shields and a 190 energy pool.

**How it works.** Virulence returns 15.5 energy per enemy hit, so hitting five
enemies in a Larva refunds 78 energy against its cost. Stacks drive everything:
Virulence and Larva Burst damage, the Teeming Virulence crit chance on your
primary, and the Parasitic Vitality health pool. Arcane Persistence caps damage
taken at 500/s while armour is above 700, which Nidus reaches with one Tauforged
Azure shard on top of his 525 base. Parasitic Link gives status immunity and a
multiplicative damage buff to you and the linked ally.

**Ability priority.**

1. Cast Larva (2) to group, catching at least five enemies.
2. Cast Virulence (1) into the ball for kills, stacks and energy.
3. Hold Link (3) onto your companion once you have a stack, for the Strength and damage buff plus status immunity.
4. Cast Ravenous (4) for crowd control, healing and AoE.
5. Repeat 2 and 1 to max stacks, then Virulence every 10 to 15 seconds to refresh Teeming Virulence and recover lost stacks.

**Duration, Efficiency, Range, Strength.** Duration is only for Link and Ravenous
uptime. Minimum Efficiency is fine because Virulence refunds energy and 4 is free.
Range is essential for Larva's pull and Link distance, and is pushed hard. Strength
scales Virulence, Larva Burst, the crit chance and the health pool.

**The mods.** *Blind Rage* is the Strength. *Overextended, Stretch* are the Range
for Larva. *Archon Continuity* is Duration plus a corrosive spread. *Hunter
Adrenaline* is optional insurance energy if you fumble a Virulence. *Teeming
Virulence, Parasitic Vitality, Larva Burst* are the three augments and the flex
zone: none is mandatory. *Corrosive Projection* aura for a 1.8x lift on armored
targets.

**Flexible slots.** The augment slots are all swappable. Drop Teeming Virulence if
your primary has near-zero base crit, and reduce Strength to just clear the 180%
DR threshold. Abundant Mutation for a 500-stack health meme. Stretch becomes
Archon Intensify (more Strength via Ravenous) if you do not need max Range. The
exilus and aura are open.

**Helminth.** Nidus has a synergistic kit and is best with no subsume. If you must,
subsume over 4:

- **Roar** to boost Virulence, Larva Burst (double-dips toxin), and your weapon.
- **Nourish** for viral and energy.
- **Gloom** for crowd control and healing, sustained by Virulence energy.
- **Tharros Strike** for a full shield and armor strip at 200% Strength, hitting the whole Larva in a cone.

**Archon Shards.** One Amber cast-speed, one Tauforged Azure armour (mandatory for
Arcane Persistence). The rest flexible: parkour, violet primary electric for a gun
platform, or Emerald toxin for Larva Burst. Five total.

**Arcanes.** Arcane Persistence for the 500/s damage cap, Arcane Bellicose for 72%
Strength. Arcane Grace is a strong swap if your max health clears about 8,334,
since it then out-heals most incoming damage.

**Focus.** Any. Madurai for Strength and cast speed, Vazarin for i-frames, Zenurik
for energy.

**Weapon synergy.** Primaries benefit most from Teeming Virulence's crit chance and
optional violet electric shards. Parasitic Link's multiplier ignores Condition
Overload, so favour weapons that do not lean on Galvanized Aptitude. Coda Hema
(headshot lifesteal, multiplicative Galvanized Aptitude) is a standout. Zymos on a
linked, stunned target spams homing spores.

**Staying alive.** The Parasitic Vitality health pool plus Arcane Persistence's
damage cap plus Link status immunity. It fails if you let stacks decay below the
health threshold, or if you have no link active and eat a status you cannot
cleanse.

**Energy.** Virulence into a five-plus Larva refills you. Hunter Adrenaline is the
backstop.

**Where it struggles.** Mobile, low-density content where you cannot ball enough
enemies to feed stacks. Bosses. The frame wants a static, dense mission to be at
its best.

**Variants.** A max-Strength Roar variant. A Viral Reave meme that one-shots
inside Larva.

**Strengths and weaknesses.** Strong: large primary crit buff, strong grouping,
very hard to kill, status-immune, cheap on forma. Weak: density-dependent, boss-
blind, energy and stacks both punish sloppy play early.

**Who runs this.** Players who solo endurance survival and want a bruiser that
also makes their primary weapon crit.

---

### Fire and Brimstone
**Uriel. Three demon passives that feed a Brimstone nuke and a heat weapon platform.**

| | |
|--|--|
| Content | Steel Path, Level cap, Weapon platform |
| Role | Hybrid caster nuke and mobile weapon platform |
| Difficulty | Advanced. Three passive demons and four active abilities to track |
| Investment | High. 5 forma, two cast-speed shards |
| Weapon reliance | Medium to high. Brimstone nukes; the Vythelas heat buff scales your weapon between casts |

> Tenno. Uriel fights with three demons. Catenach chains and slows a group so one
> kill spreads to all of them. Gulphagor marks a target that drops six health orbs
> on death, which Equilibrium turns into your whole energy bar every four seconds.
> Vythelas leaves runes that buff your fire rate and stack a permanent heat
> bonus. On top of that, Infernalis flies you around, Remedium makes you immortal
> and refills shields, Demonium stacks a damage vulnerability, and Brimstone
> carpets the floor in escalating heat.

**The build**

- Archon Vitality, rank 10, Vazarin polarity — doubles heat procs
- Archon Intensify, rank 10, Madurai polarity — Strength on healing, which is constant here
- Stretch, rank 5, unpolarised
- Equilibrium, rank 10, Naramon polarity
- Overextended, rank 5, unpolarised
- Primed Continuity, rank 10, Madurai polarity
- Primed Flow, rank 10, Naramon polarity
- Blind Rage, rank 10, Madurai polarity
- Aura: Corrosive Projection, aura slot
- Exilus: Power Drift, unpolarised
- Arcanes: Arcane Camisado, Arcane Hot Shot

Arsenal figures land at roughly 184% Strength, 155% Duration, 235% Range, 45%
Efficiency, with about 1332 health, 666 shield, 105 armor and a 427 energy pool.

**How it works.** The three demons stay active as long as they live, even if you
subsume their linked ability, so you cast 2 often to heal and revive them, which
also triggers Archon Intensify continuously. Gulphagor's marked kills are the
energy engine: six health orbs and two energy orbs every four seconds, about 430
energy through Equilibrium. Vythelas runes give a fire-rate buff and a heat buff
coded like Cyte's resupply, which currently appears to last indefinitely once it
sticks. Demonium (3) applies an AoE damage vulnerability and charges Brimstone
fastest. Brimstone (4) covers a large area in guaranteed-heat damage that
escalates over time. *Confidence: Approximation, per the author, and several
interactions are flagged as possible bugs.*

**Ability priority.**

1. Keep Infernalis (1) up and jump-dodge to fly.
2. Tap Remedium (2) on shield loss or when you need to be immortal, and often to heal demons. Restoring 1150+ shield for the full 2.5s gate needs Archon Vitality's 1332 health and about 173% Strength.
3. Tap Demonium (3) constantly for the vulnerability and Brimstone charge.
4. Tap Brimstone (4) over the enemy area.

**Duration, Efficiency, Range, Strength.** Duration wants 155% minimum, ideally
200%+, for Infernalis, Brimstone and the demon timers. Efficiency is negative
because Gulphagor refills the bar. Range feeds Brimstone coverage and Catenach's
chain; run negative Range only if you subsume Brimstone away. Strength is the
priority stat, scaling every demon effect, Brimstone, the vulnerability and the
shield restore.

**The mods.** *Blind Rage* is the Strength, with *Archon Intensify* adding more
through constant demon healing. *Primed Continuity* holds Duration. *Overextended,
Stretch* set Brimstone's Range. *Primed Flow* is the pool. *Equilibrium* is the
engine paired with Gulphagor. *Archon Vitality* doubles heat procs, which is
direct Brimstone and Vythelas-weapon scaling. *Corrosive Projection* strips armor
before heat does its partial strip.

**Flexible slots.** The exilus is fully open: Power Drift, Cunning Drift,
Firewalker, Primed Sure Footed. Arcane Concentration over Hot Shot for a pure
Brimstone build.

**Helminth.** Pick one, based on focus.

- Over 1 for a camping Brimstone build: **Bright Bonnet** for energy and Strength, or **Sickening Pulse** to double all heat statuses in a large area.
- Over 4 for a mobile weapon platform: **Thermal Sunder** with Thermal Transfer for a heat add that double-dips Vythelas, or **Nourish** for viral and more energy.

**Archon Shards.** At least two cast-speed for 2, 3 and 4. The rest flexible:
parkour to fly faster, Duration, Strength, or one or two violet Equilibrium shards
to lighten the Equilibrium dependence in general content. Five total.

**Arcanes.** Arcane Camisado for a fast 60% Strength stack from the demons, Arcane
Hot Shot for 300% weapon crit chance stacked by his abilities. Swap Hot Shot for
Arcane Concentration on a Brimstone-only build, or Molt Augmented for
unconditional Strength.

**Focus.** Madurai for Strength and cast speed fits the cast-heavy playstyle.

**Weapon synergy.** Vythelas's heat buff is the Cyte resupply family, so run
weapons that want it: heat mods are mandatory (they double-dip the heat DoT),
faction mods triple-dip. Kuva Sobek with Acid Shells, Ocucor viral-heat, Detron.
The author's caveat: Vythelas is inconsistent to keep up, so pair it with weapons
that are already strong (incarnons) so a dropped buff does not leave you helpless.
Uriel can fire alt-fire weapons like Bubonico while flying.

**Staying alive.** Remedium's on-cast immortality and shield refill, backed by the
1332 health pool. It fails if you cannot keep killing Gulphagor's marks and run
dry, since Remedium then has no energy.

**Energy.** Gulphagor plus Equilibrium. Everything depends on killing a marked
target every four seconds.

**Where it struggles.** The complexity is the cost: two subsystems (demons and
actives) to track, and a weapon buff you have to physically chase. Sparse content
starves the energy engine.

**Variants.** A pure Brimstone camping build. A pure weapon platform with Thermal
Transfer.

**Strengths and weaknesses.** Strong: huge energy economy, an area nuke, strong
weapon scaling, immortal on demand, very mobile. Weak: high tracking load, buff-
chasing, energy engine needs consistent kills, several load-bearing interactions
are unconfirmed bugs.

**Who runs this.** Players who want a busy, high-ceiling frame that nukes and
platforms at once.

---

### Glass Storm
**Gara Prime. A Shattered Lash influence nuke and a Splinter Storm damage field that follows you.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Melee-influence map nuke, passive damage aura, objective defense |
| Difficulty | Intermediate |
| Investment | Medium to high. 4 forma, cast-speed and duration shards |
| Weapon reliance | Low to medium. Shattered Lash is exalted; a primer or influence source helps it |

> Tenno. Gara turns the room to glass. Shattered Lash with melee influence sweeps
> a wide arc and nukes maps with a single button. Splinter Storm stacks with no
> ceiling into a moving field that kills what comes near you and cuts your damage
> taken by 90%. Mass Vitrify walls an objective, and smashing that wall with
> Shattered Lash feeds Splinter Storm and clears the area. Spectrorage covers
> crowd control and, with its augment, keeps the whole squad's energy topped up.

**The build**

- Shattered Storm, rank 3, unpolarised — augment. Spreads Splinter Storm and its damage vulnerability onto enemies
- Spectrosiphon, rank 3, unpolarised — augment. Spectrorage drops energy orbs for the squad
- Catalyzing Shields, rank 3, Vazarin polarity
- Primed Continuity, rank 10, Madurai polarity
- Primed Flow, rank 10, Naramon polarity
- Archon Stretch, rank 10, Naramon polarity
- Overextended, rank 5, Vazarin polarity
- Blind Rage, rank 10, Madurai polarity
- Aura: Brief Respite, aura slot
- Exilus: Ice Spring, unpolarised
- Arcanes: Arcane Sculptor, Molt Augmented

Arsenal figures land at roughly 139% Strength, 155% Duration, 235% Range, 45%
Efficiency, with 445 health, 370 shield, 200 armor and a 641 energy pool.

**How it works.** Range is the priority: it sets Shattered Lash reach (about 25m)
and Mass Vitrify's explosion radius (about 37.5m). Shattered Lash is an exalted
now, crit and status viable, and pairs with electric influence for map-wide
clear. Splinter Storm stacks indefinitely, moving with you, giving 90% damage
reduction at 134% Strength and a growing damage field. Arcane Sculptor locks you
to 175% Efficiency for 12 seconds after casting 3 or 4, which is what lets Blind
Rage run at 45% arsenal Efficiency with no energy problems.

**Playstyle.** Invert tap/hold for Gara so tap is the Sweeping Slash version.

1. Cast Splinter Storm (2) on yourself, your sentinel, allies and the objective.
2. Cast Spectrorage (3) nearby for crowd control and energy orbs.
3. Cast Mass Vitrify (4) and immediately press 4 again to end the expansion with enemies outside the wall.
4. Cast Shattered Lash (1) at the wall to shatter it, nuke the area and build Splinter Storm stacks.
5. Spam 1 at enemies to nuke; stand near heavy targets to let Splinter Storm grind them down.

**Survivability.** Shield gating with Brief Respite and Catalyzing Shields: casting
1 generates shields, and Catalyzing Shields locks the gate to 1.33s regardless of
pool size. Splinter Storm's 90% damage reduction is a second layer for non-
endurance. Rolling Guard, Arcane Aegis and Vazarin Sling are backups.
*Confidence: Approximation, per the author.*

**Duration, Efficiency, Range, Strength.** Duration gives leeway between Mass
Vitrify casts so you do not lose Splinter Storm stacks; Narrow Minded if you want
long uptime without recasting. Efficiency is solved by Arcane Sculptor. Range is
maxed. Strength boosts Shattered Lash damage (which feeds Splinter Storm) and the
damage vulnerabilities.

**The mods.** *Blind Rage* is the Strength, viable only because *Arcane Sculptor*
covers the Efficiency. *Overextended, Archon Stretch* set the Range, with Archon
Stretch also feeding passive energy off electric-modded Shattered Lash. *Primed
Continuity* holds Splinter Storm duration. *Primed Flow* is the pool.
*Catalyzing Shields* is the shield-gate lock. *Brief Respite* aura feeds the gate.
*Shattered Storm* and *Spectrosiphon* are both optional augments.

**Flexible slots.** Shattered Storm can become Narrow Minded for long Splinter
Storm uptime, or an Augur mod. Spectrosiphon becomes Equilibrium if you subsume
Spectrorage. Mending Splinters for a support role. Rolling Guard for high-level
status cleanse. The aura and exilus are open.

**Helminth.** Pick one. Subsume over Spectrorage, and swap Spectrosiphon for
Equilibrium.

- **Roar** boosts Shattered Lash raw damage for Splinter Storm, double-dips its status, triple-dips influence.
- **Nourish** adds viral to Shattered Lash and an energy multiplier.
- **Pillage** strips armor and shields and refills your shields.

**Archon Shards.** One to two Tauforged Amber cast-speed. Three to four Tauforged
Crimson Duration for Splinter Storm and buff uptime, or violet melee crit-damage
for Shattered Lash. Five total.

**Arcanes.** Arcane Sculptor for the Efficiency lock, Molt Augmented for 60%
Strength in longer missions. Arcane Blade Charger or Arcane Fury to boost the Mass
Vitrify explosion. Arcane Circumvent for a roll-strip.

**Focus.** Any. Vazarin Sling is the strongest survival option. Madurai for the
Strength and cast speed.

**Companion.** Use a sentinel, not a moving pet, so you can keep Splinter Storm on
it permanently for a second overlapping damage source. Diriga with Arc Coil for
priming, Helios Prime with Vicious Bond for passive armor strip, Nautilus for
grouping. Equip Seismic Bond for free Efficiency during Mass Vitrify.

**Staying alive.** Shield gating plus Splinter Storm's 90% DR. It fails in the gap
if you cannot generate shields (no enemies to hit with 1), and against toxin.

**Energy.** Arcane Sculptor's Efficiency lock plus Spectrosiphon or Equilibrium.

**Where it struggles.** A cold start before Splinter Storm has stacks. Very open
tiles where Mass Vitrify cannot corral enemies. Bosses.

**Variants.** A pure Shattered Lash spam build. A pure Splinter Storm build.

**Strengths and weaknesses.** Strong: one-button map nuke, a passive damage field
that also tanks, strong objective defense, squad energy support. Weak: ramp-up
time, tile-sensitive, boss-blind, exalted Shattered Lash needs its own mods.

**Who runs this.** Players who want a defense and survival frame that clears maps
by holding one button and stops taking damage.

---

### Shield of Iron
**Rhino Prime. Stacked-armour Iron Skin into the millions, with a usable Roar.**

| | |
|--|--|
| Content | Steel Path, Level cap, Min-max meme |
| Role | Set-and-forget tank, team damage buff |
| Difficulty | Intermediate. The setup combo has a strict order |
| Investment | High. 5 forma, as many strength shards as you own |
| Weapon reliance | Total. Rhino does nothing to enemies except buff your damage |

> Tenno. Iron Skin scales on armour, and armour here comes from four stacking
> sources at once: Parasitic Armor, Ironclad Charge, Health Conversion and the
> arcanes. Because Strength multiplies Iron Skin three separate times, the health
> bar you build is a cubic function of Strength: millions of effective hit points
> from one setup. Do the combo in order, then forget about dying and keep Roar up
> for the squad.

**The build**

- Ironclad Charge, rank 3, Zenurik polarity — augment. Charge grants a large temporary total-armour bonus per enemy hit
- Health Conversion, rank 5, Vazarin polarity
- Transient Fortitude, rank 10, Madurai polarity
- Primed Continuity, rank 10, Madurai polarity
- Iron Shrapnel, rank 0, unpolarised — augment. Lets you cancel Iron Skin to recast on your timing
- Umbral Intensify, rank 10, unpolarised
- Blind Rage, rank 10, Madurai polarity
- Primed Redirection, rank 10, Vazarin polarity
- Aura: Growing Power, Madurai polarity
- Exilus: Power Drift, Zenurik polarity
- Arcanes: Arcane Battery, Arcane Expertise

Arsenal figures land at roughly 313% Strength, 128% Duration, 100% Range, 45%
Efficiency, with 370 health, a 1554 shield pool, 290 armor and a 150 energy pool
(Arcane Battery raises the effective pool to around 1000 once armour is high).

**How it works.** Iron Skin's value is base armour times a stack of multipliers,
and Strength enters that product three times: Parasitic Armor scales on Strength
(about 6185 armour at 398%), Ironclad Charge scales on Strength (about 199% total-
armour increase per enemy hit), and Iron Skin itself takes Strength as a final
multiplier. Primed Redirection feeds Parasitic Armor through shield capacity, and
Arcane Expertise converts Strength into more shield on top. Arcane Battery gives up
to 1000 energy max at high armour, which frees the Primed Flow slot.

**The setup combo (order matters).**

1. At mission start, cast Parasitic Armor then Iron Skin for about 30k as a buffer, which also maxes Arcane Battery.
2. Refill energy (Zenurik, Grimoire Xata Invocation, Tenet Glaxion).
3. Optional extra armour: health orbs for Health Conversion, melee kills for Melee Fortification, and so on.
4. Group a crowd (Magus Anomaly, Exodia Hunt, Vazarin snare).
5. Cast Charge through the group for the Ironclad Charge bonus (12s).
6. Cast Iron Skin twice: once to dispel, once to recast while Ironclad Charge is still up, locking the inflated armour into the Iron Skin value.
7. Keep Roar up.

**Iron Skin numbers at 398% Strength (author's figures).**

- Direct cast: about 7,950
- After charging one enemy: about 14k
- After Parasitic Armor, no charge: about 74k
- Parasitic Armor plus charging 20 enemies plus Health Conversion: about 3.18 million
- All armour sources stacked: over 5 million

For reference, one million Iron Skin lasts roughly five minutes of standing still
under fire in base Steel Path Grineer survival. *Confidence: Approximation, per
the author.*

**Duration, Efficiency, Range, Strength.** Duration keeps Roar near 40s and gives
comfortable Ironclad Charge and Parasitic Armor timers for setup. Efficiency is
floored; the combo costs about 200 energy, so you need a start-of-mission energy
source. Range is untouched at 100% for a decent Charge line and Roar radius.
Strength is the entire build.

**The mods.** *Transient Fortitude, Blind Rage, Umbral Intensify* are the Strength
stack, with *Primed Continuity* holding Duration. *Ironclad Charge* is the
mandatory armour multiplier. *Health Conversion* is a stacking armour source.
*Primed Redirection* deepens the shield pool for Parasitic Armor. *Iron Shrapnel*
is optional recast control. *Growing Power* aura for another 25% Strength on proc.

**Flexible slots.** Iron Shrapnel becomes Augur Message (Roar uptime), Augur
Secrets (Strength) or Equilibrium (energy). Umbral Fiber and armor mods are
deliberately excluded: base armour is only 290, so they add almost nothing next to
the Strength sources.

**Helminth.** Parasitic Armor is the build. Alternatives if you cannot get it:
Elemental Ward (Cold) for about 1291 armour, then Defy, then Warcry. Empower works
but needs a recast before every ability.

**Archon Shards.** One or two Amber cast-speed. Every remaining slot is Crimson
strength, because Strength triple-dips Iron Skin. Five total.

**Focus.** Madurai for a 40% Strength Sling perk, which is the best choice for
maximising Iron Skin. Vazarin for a grouping ability. Zenurik for energy plus 20%
Strength on next cast.

**Weapon synergy.** None from the frame beyond Roar. A slam melee with Melee
Fortification adds more armour to the stack. Otherwise bring whatever kills.

**Staying alive.** Iron Skin, and only Iron Skin. It has no innate regen, so when
the pool is gone you redo the combo. Toxin bypasses it entirely, so bring a way to
cleanse or avoid toxin.

**Energy.** Arcane Battery plus a start-of-mission source. Once Iron Skin is in the
millions you only cast Roar every 30s.

**Where it struggles.** Toxin. Endurance past the point where a single hit exceeds
even a multi-million pool. The setup combo is a ritual you repeat every few
minutes, and a botched order gives a fraction of the value.

**Variants.** A non-helminth Iron Skin tank. A Roar buff build sharing polarities.
An endurance Nourish non-tank variant. A Mecha Pulse armour-meme variant.

**Strengths and weaknesses.** Strong: effectively unkillable in most content once
set up, strong team Roar, conceptually simple. Weak: does zero damage itself,
toxin-vulnerable, setup ritual, no regen so the pool is a countdown.

**Who runs this.** Players who want to not think about survival at all and just
carry a weapon, plus a Roar for the squad.

---

### Gloom Reaper
**Sevagoth Prime. A Sow-and-Reap current-health nuke, a near-total slow, and a spare frame in reserve.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Zero-effort nuke, crowd control, primary crit buff, panic button |
| Difficulty | Intermediate. The Sow-then-Reap order and the shield-gate rhythm |
| Investment | Medium. 4 forma, four Tauforged strength shards if you want the no-priming one-shot |
| Weapon reliance | Medium. Shadow Haze buffs your primary; a viral primer replaces heavy Strength investment |

> Tenno. Reap deals true damage equal to a quarter of an enemy's current health,
> and it does not care about their level or armour. Sow marks them so Reap also
> blasts the neighbours. Stack a debuff, a viral prime or a Roar on top and that
> quarter becomes a whole: everything in the room dies at once. Gloom slows the
> survivors almost to a standstill. If it all goes wrong, your Shadow steps out
> and fights while you recover.

**The build**

- Shadow Haze, rank 3, unpolarised — augment. Spawns multiple Reap shadows and grants a flat crit-chance debuff
- Dark Propagation, rank 3, Zenurik polarity — augment. Sow self-propagates and spreads the nuke
- Stretch, rank 5, Naramon polarity
- Umbral Intensify, rank 10, unpolarised
- Equilibrium, rank 10, Naramon polarity
- Primed Flow, rank 10, Naramon polarity
- Transient Fortitude, rank 10, Madurai polarity
- Catalyzing Shields, rank 3, Vazarin polarity
- Aura: Brief Respite, aura slot
- Exilus: Power Drift, unpolarised
- Arcanes: Molt Augmented, Arcane Concentration

Arsenal figures land at roughly 214% Strength, 72% Duration, 145% Range, 100%
Efficiency, with 370 health, 370 shield, 185 armor and a 641 energy pool.

**How it works.** Reap does 25% of current health as true damage to the direct
target plus 25% as radial blast to nearby enemies, none of it scaled by Strength.
It is amplified by Reap's own vulnerability debuff, viral (up to 4.25x at 10
stacks) and Roar. To one-shot a lone enemy you need to reach 100% of current
health through some combination of those. Packed crowds one-shot at lower numbers
because each nearby corpse adds its blast. Dark Propagation lets Sow spread the
mark itself; Shadow Haze spawns extra Reap shadows and adds the flat crit-chance
buff to your primary. *Confidence: Approximation, per the author's mechanics
notes.*

**Ability priority.**

1. Activate Gloom for the slow.
2. Cast Sow to mark enemies.
3. Cast Reap to kill the marked and debuff the survivors. With Roar active, the combo is 1-2-1 or 2-1-1.
4. Sow and Reap kills fill the Death Well. When full you can enter Shadow at any time.
5. Optional: enter Shadow to group with 1 and DPS with the claws. If Shadow dies you just Sow-Reap to recharge and re-enter.
6. If you die as Sevagoth, aim at enemies and spam 2 to consume five souls and revive.

**One-shot thresholds (author's figures).**

- With Roar and Reap's vulnerability, no viral: about 255% Strength.
- With Roar, no vulnerability: about 3 viral stacks at 255% Strength.
- Without Roar: 200% Strength on the vulnerability plus one viral stack.

Gloom's 95% slow cap is reached at 272% Strength. The listed 214% arsenal Strength
plus Molt Augmented, Madurai and shards climbs to both thresholds in a mission.

**Duration, Efficiency, Range, Strength.** Duration barely matters because Dark
Propagation carries Sow; keep it 80% to 130% so Gloom's drain stays sane. Neutral
Efficiency is fine with Equilibrium plus a Synth Deconstruct pet feeding Gloom.
Range 145% to 175% for Gloom, no higher or enemies get stuck slowed in the next
room draining your energy. Strength drives the vulnerability, the crit buff and
the Gloom slow.

**The mods.** *Transient Fortitude, Umbral Intensify* are the Strength, with Molt
Augmented and shards behind them. *Stretch* is Gloom range. *Primed Flow* is the
pool. *Equilibrium* is the energy. *Catalyzing Shields* shrinks the shield pool
for the Reap and Sow gate loop. *Brief Respite* aura feeds that gate. *Shadow
Haze, Dark Propagation* are the augments that make the nuke self-spreading.

**Flexible slots.** Transient Fortitude becomes Rolling Guard if you own four
Tauforged strength shards. The aura and exilus are open. Molt Vigor over an
arcane if you have no shards yet.

**Survivability.** Reap costs 25 energy and Brief Respite alone gives about 0.7s of
gate off it; Sow costs 50 and gives the full 1.33s. Just spamming Sow and Reap
keeps you alive. Secondary Fortifier on a primer steals overguard for status
immunity. Gloom near the slow cap stops enemies shooting at all. Shadow is a free
extra shield-gate and health bar with no energy cost. *Confidence: Approximation,
per the author.*

**Helminth.** Pick one.

- If you do not use Shadow, subsume over 4: **Roar** for the no-viral one-shot, **Silence** for a Gloom-extended 40s stun and Acolyte lockout, **Nourish** for viral and Gloom energy.
- If you do use Shadow, subsume over 3, and only passive-aura abilities work while Shadow is out: **Silence** with Savage Silence (700% stealth multiplier on the claws), or **Eclipse** with Total Eclipse (aura buff reaches Shadow).

**Archon Shards.** One Tauforged Amber cast-speed. Four Tauforged Crimson strength
to clear both the Gloom cap and the one-shot threshold with Roar, freeing the
Transient Fortitude slot. Five total.

**Arcanes.** Molt Augmented for Strength, Arcane Concentration for the Duration a
low-Duration build wants back. Arcane Energize is a strong swap for Gloom's drain.

**Focus.** Madurai for 40% Strength and cast speed, and it is the Cascade meta.
Vazarin for endurance i-frames.

**Weapon synergy.** Shadow Haze's flat crit chance suits low-crit, high-multiplier
weapons: Sporothrix, Kuva Nukor, Ocucor. Epitaph is the signature weapon and works
as a primer with Secondary Fortifier.

**Staying alive.** The Sow and Reap shield-gate loop, Gloom's slow, and Shadow as
the failsafe. It fails if you run out of energy with Gloom down and no Shadow
charge, and to Eximus and Thrax who ignore Gloom through overguard.

**Energy.** Equilibrium plus a Synth Deconstruct pet covers Gloom's ~240
energy/min drain. Arcane Energize is the backup.

**Where it struggles.** Bosses and single Eximus without priming. The nuke wants
density. Managing Gloom drain plus the gate plus the Sow-Reap order is a lot at
once for a new pilot.

**Variants.** A max-shard endurance pure-nuke build with Roar. A dedicated Shadow
claws build. A shield-tank Adaptation variant for sub-level-500.

**Strengths and weaknesses.** Strong: level-independent nuke, top-tier slow, a
free second health bar, buffs your primary. Weak: density-dependent, boss-blind,
Shadow interrupts the combo flow and costs extra forma to build.

**Who runs this.** Players who want a nuke that ignores enemy scaling entirely and
a built-in revive.

---

### The Broken Void
**Xaku Prime. Level-scaling stolen turrets, a passive armour strip, and a 75% dodge.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Hands-off turret DPS, armour strip, crowd control, durable caster |
| Difficulty | Beginner to intermediate |
| Investment | Low. 2 forma, cast-speed shards optional |
| Weapon reliance | Low. Grasp of Lohk scales with enemy level and does the killing |

> Tenno. Xaku steals the enemy's guns. Grasp of Lohk pulls up to sixteen turrets
> off nearby enemies and they fire back, and their damage scales with enemy level,
> so the deeper you go the harder they hit. Gaze lays down a passive armour-strip
> zone. Accuse turns a crowd into your allies. Vast Untime freezes all your ability
> timers and gives you a 75% dodge. You cast four things and the mission plays
> itself.

**The build**

- Primed Flow, rank 10, Naramon polarity
- Equilibrium, rank 10, unpolarised
- Blind Rage, rank 10, Madurai polarity
- Catalyzing Shields, rank 3, Vazarin polarity
- Augur Reach, rank 5, unpolarised
- Stretch, rank 5, unpolarised
- Primed Continuity, rank 10, Madurai polarity
- Overextended, rank 5, Vazarin polarity
- Aura: Corrosive Projection, Naramon polarity
- Exilus: Cunning Drift, unpolarised
- Arcanes: Molt Augmented, Arcane Concentration

Arsenal figures land at roughly 139% Strength, 155% Duration, 280% Range, 45%
Efficiency, with 359 health, 353 shield, 167 armor and a 715 energy pool.

**How it works.** Range is the priority stat: it sets the turret count (about 15
guns at 250%, 16 at 267%), Gaze's radius, and Vast Untime's radius. Each turret
deals roughly 50 times Strength times enemy level per second, so at high levels the
turrets alone clear crowds. Gaze full-strips at 200% Strength, or 164% with
Corrosive Projection. Vast Untime freezes every ability timer, so you cast 4 first,
then everything else, and only refresh 4 every 30 to 40 seconds. *Confidence:
Approximation, per the author.*

**Ability priority.**

1. Tap 4 (Vast Untime) first to freeze timers and apply the slow and void vulnerability.
2. Activate 1 (Xata's Whisper) to add void damage to your weapons, strong against Thrax and overguard.
3. Cast 2 (Grasp of Lohk) with enemies around to steal the turrets.
4. Invert tap/hold. Hold 3 to Accuse, tap 3 to convert a crowd to allies.
5. Hold 3 to Gaze, tap on one or two Accused enemies 15 to 20m apart for the strip zone.
6. On shield loss, tap 1 for a small gate or tap 4 for a bigger one.

**Survivability.** Innate 75% dodge while Vast Untime is up, plus shield gating:
Catalyzing Shields makes one Xata's Whisper cast give the full 1.33s with a single
Augur Reach mod. Accuse converting a crowd to allies means almost nothing shoots
at you. *Confidence: Approximation, per the author.*

**Duration, Efficiency, Range, Strength.** Duration reduces how often you recast 4.
Efficiency sits between 45% and 100% depending on how much you shield-gate; the
build lists 45% and covers it with Primed Flow plus Equilibrium. Range is maxed.
Strength is for Gaze's strip and the turret damage.

**The mods.** *Blind Rage* is the Strength, viable at 45% Efficiency thanks to
*Primed Flow* and *Equilibrium*. *Overextended, Stretch, Augur Reach* set the
Range, with Augur Reach also feeding the shield gate. *Primed Continuity* holds
Vast Untime's timer. *Catalyzing Shields* is the gate lock. *Corrosive Projection*
lowers the strip threshold to 164%.

**Flexible slots.** Blind Rage to Transient Fortitude if energy is tight.
Catalyzing Shields is optional or swappable for passive-regen mods with an Omamori
subsume. Natural Talent if you skip cast-speed shards. The exilus is open.

**Helminth.** Pick one.

- **Quiver** over 1 for an AFK camping style: Cloak Arrow makes a bubble that hides everything inside, even from Acolytes and Eximus.
- **Pillage** over 3 for a mobile strip on the move plus survival and status cleanse.
- **Nourish** over 1 or 3 for energy and a buff that reaches Accused allies.
- **Roar** (over 1 only) is the only buff that boosts Grasp of Lohk.
- **Omamori** for the laziest possible survival with passive-regen mods.

**Archon Shards.** Two Amber cast-speed for Vast Untime. Three Crimson strength for
turret damage, Accuse count and Xata's buff. Five total.

**Arcanes.** Molt Augmented for Strength, Arcane Concentration for Duration. Arcane
Aegis or Energize as survival or economy swaps.

**Focus.** Any. Vazarin Sling reduces how much you need to gate. Madurai for
Strength and cast speed on the slow Vast Untime animation.

**Weapon synergy.** Xata's Whisper's void bubbles suck bouncing or splitting
projectiles back into a target: Miter Incarnon, Latron Incarnon, Prisma Angstrum.
A viral-radiation primer (Kuva Nukor, Epitaph) primes for the turrets and converts
Accused allies back to targetable enemies.

**Staying alive.** The dodge, shield gating, and Accuse pulling aggro. It fails if
Vast Untime lapses (no dodge) while your gate is down, and to toxin.

**Energy.** Primed Flow plus Equilibrium, with a Synth Deconstruct pet. Archon
Stretch is an optional passive trickle.

**Where it struggles.** Turret damage is weak at low levels, so early Steel Path
feels slow until enemies scale up. Bosses. Open tiles can scatter enemies out of
Lohk range.

**Variants.** A Nourish or Quiver subsume version. A comfortable 100% Efficiency
version. A Pillage mobile version.

**Strengths and weaknesses.** Strong: damage that scales with the enemy so it
never falls off, passive strip, very durable, cheap on forma. Weak: slow start,
boss-blind, several abilities to set up before it comes online.

**Who runs this.** Players who want a frame that gets stronger the deeper the
endurance run goes, with almost no weapon investment.

---

### Surging Avalanche
**Frost Prime. A one-cast 100% armour strip and red-crit Breach Surge sparks.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Full armour strip, crowd control, spark nuke, overguard support |
| Difficulty | Intermediate |
| Investment | Medium to high. 4 forma, cast-speed shards |
| Weapon reliance | Medium. Biting Frost and the sparks scale off your weapon; a strong single hit matters |

> Tenno. Avalanche freezes a room and strips it to zero armour in one cast. Biting
> Frost then adds 200% crit chance to your weapon against frozen targets, which
> also pushes Breach Surge sparks into red crits. Icy Avalanche hands you and the
> squad overguard on top. Snow Globe throws everything away and eats all incoming
> fire for four seconds. Freeze the room, strip it, and shoot the sparks.

**The build**

- Biting Frost, rank 3, unpolarised — augment. Adds crit chance versus frozen enemies
- Icy Avalanche, rank 3, unpolarised — augment. Avalanche grants armour-scaled overguard
- Freeze Force, rank 3, unpolarised — augment. Adds cold damage to weapons
- Archon Flow, rank 10, Naramon polarity
- Overextended, rank 5, Vazarin polarity
- Blind Rage, rank 10, Madurai polarity
- Augur Reach, rank 5, unpolarised
- Equilibrium, rank 10, Naramon polarity
- Aura: Corrosive Projection, aura slot
- Exilus: Ice Spring, Vazarin polarity
- Arcanes: Arcane Truculence, Arcane Sculptor

Arsenal figures land at roughly 139% Strength, 100% Duration, 220% Range, 45%
Efficiency, with 370 health, 650 shield, 315 armor and a 427 energy pool.

**How it works.** Avalanche needs only 167% Strength for a permanent full strip, or
137% with Corrosive Projection. Arcane Sculptor triggers off Snow Globe and locks
you to 175% Efficiency for 12 seconds, which is what lets Blind Rage run at 45%
arsenal Efficiency and still clear the strip threshold without shards. Biting Frost
adds 200% crit chance and 3x crit multiplier versus frozen enemies, which on Breach
Surge's 100% base crit gives roughly an 11.5x damage multiplier on a spark, or far
more on a headshot. *Confidence: Approximation, per the author's spark math.*

**Playstyle.**

1. Cast Breach Surge to stun and prime line-of-sight enemies for sparks.
2. Cast Avalanche (4) to freeze, strip, and set up Biting Frost, and to gain the Icy Avalanche overguard.
3. Cast Snow Globe to push enemies away and block fire; it is invulnerable for four seconds. Break your own globes with 1.
4. Shoot frozen enemies to kill and generate red-crit sparks.
5. Optional: viral-prime and shove enemies into walls with Snow Globe for a true-damage one-shot.

**Duration, Efficiency, Range, Strength.** Duration is unimportant; Avalanche and
Breach Surge have long base timers and Snow Globe ignores Duration. Efficiency is
solved by Arcane Sculptor. Range spreads Avalanche and Breach Surge; Augur Reach
also feeds the gate. Strength only needs to clear the strip threshold.

**The mods.** *Blind Rage* is the Strength, covered by *Arcane Sculptor*.
*Overextended, Augur Reach* set the Range. *Archon Flow* is the energy pool with a
bonus large orb on cold-ability kills. *Equilibrium* converts orbs. *Corrosive
Projection* drops the strip threshold to 137%. The three augments are all flexible.

**Flexible slots.** Biting Frost drops if you use a self-sufficient crit weapon
like Phenmor or Laetum. Freeze Force is optional raw damage. Archon Flow swaps
freely with Primed Flow. Rolling Guard or Catalyzing Shields for more gate safety.
Natural Talent if you skip cast-speed shards.

**Helminth.** Pick one.

- **Breach Surge** is the default: the spark engine that Biting Frost multiplies.
- **Nourish** for viral and energy (see the dedicated variant).
- **Ensnare** to pull frozen enemies together.
- An energy option (**Spellbind** with Spellbound Harvest, **Spectrorage** with Spectrosiphon) if Avalanche's cost is a problem.

**Archon Shards.** At least two Amber cast-speed. Two to three Crimson strength to
free the Augur Secrets or Power Drift slot. The rest Azure energy-max. Five total.

**Arcanes.** Arcane Truculence for free area viral on overguard gain, Arcane
Sculptor for the Efficiency lock. Arcane Arachne (2.5x sparks, bypasses the cap) or
Arcane Ice Storm (Strength and Duration) as swaps.

**Focus.** Any. Madurai for cast speed on Avalanche. Vazarin for backup i-frames.

**Weapon synergy.** Breach Surge wants a weapon that lands one huge hit near the
5-million spark cap: Xoris, Coda Pathocyst, Exodia Contagion, slam Magistar,
Daikyu. Biting Frost wants decent crit stats, and the strip makes even weak weapons
work against armour.

**Staying alive.** Shield gating plus Avalanche's freeze plus the Icy Avalanche
overguard. It fails to Eximus that ignore the freeze (Breach Surge no longer works
on them through overguard), and to toxin.

**Energy.** Arcane Sculptor's lock plus Equilibrium plus Archon Flow's cold-kill
orbs.

**Where it struggles.** Eximus and Thrax resist the freeze and Breach Surge.
Strong single-hit weapons hit the spark cap and stop benefiting from the
multiplier, so the spark nuke is more a low-investment weapon booster than a
scaling tool. Bosses.

**Variants.** A Precision Intensify plus Arcane Ice Storm build that full-strips
from 40% Strength. A Health Conversion plus Arcane Battery armour-and-energy
variant. A Nourish variant.

**Strengths and weaknesses.** Strong: reliable one-cast full strip, strong crowd
control and overguard, turns weak weapons into armour-killers. Weak: does not touch
Eximus abilities, spark scaling caps out, boss-blind.

**Who runs this.** Players who want a defensive frame that also removes armour for
the whole squad and makes a mediocre weapon viable.

---

### Rip and Tear
**Valkyr Prime. Exalted Talons DPS with Ripline grouping and a 1000-armour tank underneath.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Melee exalted DPS, grouping, near-immortal bruiser |
| Difficulty | Beginner to intermediate |
| Investment | Medium. 3 forma, violet melee crit-damage shards |
| Weapon reliance | Low. Talons are the damage; a primer or companion adds status |

> Tenno. Hysteria arms the Talons and Valkyr does the rest with her body. 1000
> base armour, over a thousand health, and a death-gate passive that saves you at
> 150% Rage. Ripline yanks a crowd together and swings you across the map. Warcry
> speeds your attacks and doubles your armour. Paralysis slows and marks a group
> for extra damage. Slide attacks through the pile and everything shreds.

**The build**

- Gladiator Resolve, rank 5, unpolarised
- Blind Rage, rank 10, Madurai polarity
- Overextended, rank 5, Vazarin polarity
- Primed Continuity, rank 10, Madurai polarity
- Eternal War, rank 3, unpolarised — augment. Warcry duration extends on kills
- Archon Intensify, rank 10, Madurai polarity
- Stretch, rank 5, unpolarised
- Hunter Adrenaline, rank 5, Madurai polarity
- Aura: Corrosive Projection, aura slot
- Exilus: Hysterical Assault, unpolarised
- Arcanes: Arcane Battery, Arcane Persistence

Arsenal figures land at roughly 169% Strength, 155% Duration, 235% Range, 45%
Efficiency, with 1050 health, 1000 armor, 185 shield and a 225 energy pool (Arcane
Battery raises the effective pool past 1000 at high armour).

**How it works.** Hysteria no longer grants permanent invulnerability. Instead,
above 150% Rage a fatal hit is negated for 5s and drains your Rage, and Arcane
Persistence caps damage at 500/s while armour is above 700, which Valkyr clears at
base and doubles under Warcry. Talons lifesteal refills health instantly. Ripline
now groups on cast and auto-attacks, so Prolonged Paralysis grouping is redundant.
Arcane Battery converts the huge armour value into a large energy pool.
*Confidence: Approximation, per the author.*

**Ability priority.**

1. Activate Hysteria and use slide attacks (about 2250% per second across a group) or the neutral block combo. If running Archon Intensify, exit and re-enter Hysteria within 10s to snapshot the 30% Strength.
2. Tap 2 for Warcry, recast as needed. It is recastable now, so Eternal War is optional.
3. Tap 3 (Paralysis) for the slow and 50% damage vulnerability.
4. Tap 1 (Ripline) on enemies to group and auto-attack, or on a surface to swing across the map.

**Survivability.** Two routes. Invulnerability-frame abuse: stay above 150% Rage,
let the death gate catch fatal hits, kill a couple of enemies inside the 5s to
top Rage back up, with Arcane Persistence as the buffer if the window closes.
Or straight EHP tanking with Adaptation and Umbral Vitality, comfortable past
level 1000. *Confidence: Approximation, per the author.*

**Duration, Efficiency, Range, Strength.** Neutral to positive Duration reduces
Hysteria drain and holds Warcry. Efficiency at 45% is fine with high enemy density
or a Seismic Bond pet; go above 100% (Transient Fortitude over Blind Rage) if you
cast a lot. Max Range for Ripline grouping and Paralysis. Strength boosts Warcry
speed, Hysteria damage, and indirectly energy through armour and Arcane Battery.

**The mods.** *Blind Rage* is the Strength with *Archon Intensify* adding a
snapshot 30% and *Primed Continuity* holding Duration. *Overextended, Stretch* set
the grouping Range. *Hunter Adrenaline* is the Rage and energy engine.
*Gladiator Resolve* adds combo duration. *Eternal War* is an optional Warcry
extender.

**Flexible slots.** Eternal War drops now that Warcry is recastable. Adaptation and
Umbral Vitality for the tank route. Arcane Blessing or Arcane Reaper over Molt
Augmented. The aura and exilus are open.

**Helminth.** Pick one. Subsume over 3 (Ripline already groups).

- **Roar** for damage and a status double-dip, triple-dip on electric influence.
- **Nourish** for viral Talons and Hysteria energy.
- **Lycath's Hunt** for the most consistent energy via orbs and Equilibrium.
- **Silence** against Infested to block Ancient Disruptors draining your energy in Hysteria.
- **Tharros Strike** for a cheap one-cast full shield and armour strip that works on Acolytes and Demolysts.

**Archon Shards.** One Amber cast-speed. The rest Tauforged Violet melee
crit-damage. Parkour optional. Five total.

**Arcanes.** Arcane Battery for the energy pool from armour, Arcane Persistence for
the 500/s cap. Arcane Fury or Strike for melee output once survival is settled.

**Focus.** Any. Vazarin Sling for a 5s panic i-frame. Naramon for combo. Madurai
for Strength.

**Weapon synergy.** Talons benefit from an external status source. A primer (Cedo,
Kuva Nukor, Epitaph) or a Diriga with Seismic Bond stacks 5 to 9 elements for a
400% to 720% Condition Overload boost, plus Seismic Bond's free Efficiency.

**Staying alive.** The death gate plus Arcane Persistence plus Talons lifesteal, or
raw EHP. It fails to Ancient Disruptors in Hysteria (bring Silence), and to a hit
that exceeds your health inside a single Persistence tick in deep endurance.

**Energy.** Hunter Adrenaline from the damage you take, plus Arcane Battery's large
pool. Nourish or Lycath's Hunt if it still runs thin.

**Where it struggles.** Infested energy drain without Silence. Ranged single
targets, since Talons are melee range without a Ripline pull. Bosses take longer
than a nuke frame.

**Variants.** A low-range influence Talons build. A Prolonged Paralysis Crescendo
heavy-slam damage-cap build.

**Strengths and weaknesses.** Strong: very hard to kill, strong grouped melee DPS,
great mobility, low weapon dependence. Weak: melee range, Infested-vulnerable
without Silence, slower on bosses.

**Who runs this.** Players who want a melee frame that clears grouped rooms and
essentially cannot die.

---

### Surging Tempest
**Hydroid Prime. A stackable Tempest Barrage nuke that also strips armour and loots the corpses.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Looting |
| Role | Camp nuke, armour strip, loot multiplier, objective hold |
| Difficulty | Beginner to intermediate |
| Investment | Low. 2 forma |
| Weapon reliance | Low to medium. Tempest Barrage carries; a viral or corrosive weapon adds status |

> Tenno. Tempest Barrage rains on a fixed 10m circle and you can stack it on the
> same spot forever. Viral Tempest makes every drop apply viral. Plunder coats
> your barrage and your weapon in corrosive. Tentacle Swarm cages a chokepoint,
> and Pilfering Swarm means everything that dies in the tentacles drops extra loot
> and oxygen. Tidal Surge is your invulnerable, status-cleansing dash out.

**The build**

- Pilfering Swarm, rank 3, unpolarised — augment. Tentacle kills drop bonus loot
- Viral Tempest, rank 3, unpolarised — augment. Tempest Barrage applies viral
- Tidal Impunity, rank 3, unpolarised — augment. Tidal Surge grants status immunity and cheap cost
- Equilibrium, rank 10, Naramon polarity
- Transient Fortitude, rank 10, Madurai polarity
- Primed Flow, rank 10, Naramon polarity
- Catalyzing Shields, rank 3, Vazarin polarity
- Primed Continuity, rank 10, Madurai polarity
- Aura: Brief Respite, aura slot
- Exilus: Power Drift, unpolarised
- Arcanes: Arcane Aegis, Molt Augmented

Arsenal figures land at roughly 170% Strength, 128% Duration, 100% Range, 100%
Efficiency, with 370 health, 650 shield, 290 armor and a 641 energy pool.

**How it works.** Tempest Barrage's initial radius is fixed at 10m; only the
per-impact AoE scales with Range, so Range is far less important than it looks,
especially with enemies bunched in tentacles where the AoE already overlaps. You
stack Barrage infinitely on one chokepoint for escalating ability DPS plus viral
plus corrosive from Plunder. Pilfering Swarm is the reason to run this over a plain
nuke Hydroid. *Confidence: Approximation, per the author.*

**Playstyle.**

1. Pick a camp spot with one or two chokepoints and cast Tentacle Swarm.
2. Cast Plunder (3) with a decent crowd nearby, ideally caught in tentacles.
3. Spam Tempest Barrage (1) on the chokepoint. Stack it as high as you like.
4. Cast Tidal Surge (2) to reset the shield gate, go invulnerable, and reposition.

**Duration, Efficiency, Range, Strength.** A little Duration for Barrage, Plunder
and Tentacle Swarm. Neutral to positive Efficiency for Barrage spam, helped by
Pilfering Swarm's orb drops. Keep Range 100% to 130% for efficient looting, or
175%+ if you only want to kill and crowd-control (high Range makes tentacles grab
enemies outside your area and choke new spawns). Strength boosts Barrage damage and
Plunder's corrosive.

**The mods.** *Transient Fortitude* is the Strength with *Primed Continuity*
holding Duration. *Primed Flow* is the pool. *Equilibrium* converts orbs.
*Catalyzing Shields* locks the gate. *Brief Respite* aura feeds it. *Pilfering
Swarm, Viral Tempest, Tidal Impunity* are the three augments.

**Flexible slots.** Pilfering Swarm becomes Stretch for a non-looting build. Viral
Tempest becomes Stretch or Augur Message if your weapon already applies viral.
Catalyzing Shields drops if you accept smaller gates. Corrosive Projection in the
aura is not useful here, since it does not reduce the corrosive procs needed to
full-strip.

**Helminth.** Pick one. Subsume over 2 (stationary) or 4 (mobile).

- **Breach Surge** takes the Plunder corrosive bonus and double-dips it, strong on passive-stripped enemies.
- **Nourish** for Barrage-spam energy plus viral on your weapon, letting you drop all weapon elements alongside Plunder's corrosive.
- **Roar** for Viral Tempest and weapon damage.

**Archon Shards.** Two Amber cast-speed. Three Crimson corrosive-status ability
damage for Barrage (and Breach Surge if used). Five total.

**Arcanes.** Molt Augmented for Strength, Arcane Aegis for lazy shield sustain.

**Focus.** Any. Vazarin for i-frames. Zenurik for energy without Energize.

**Weapon synergy.** Pirate-themed and self-stripping weapons: Ocucor and Torid
both self-strip via Plunder's corrosive while dealing viral. Kuva Zarr pairs with
Tidal Impunity's self-knockdown immunity.

**Staying alive.** Shield gating off Barrage and Tidal Surge, plus Tentacle Swarm
crowd control, plus Tidal Surge invulnerability. It fails if you stop spamming
Barrage and lose the gate refresh, and to toxin.

**Energy.** Pilfering Swarm orbs plus Equilibrium at neutral Efficiency. Add
Zenurik or a Dethcube if it runs thin.

**Where it struggles.** Open tiles with no chokepoints. Very mobile content. Bosses.
The fixed 10m Barrage radius means it is a camp tool, not a roaming nuke.

**Variants.** A weapon platform with Roar or Nourish. An AFK looting build with
Quiver.

**Strengths and weaknesses.** Strong: strong loot multiplier, self-stripping nuke,
cheap on forma, easy to pilot. Weak: camp-only, boss-blind, Range tuning is
fiddly if you both loot and kill.

**Who runs this.** Farmers who want a looting frame that also clears the room it is
looting.

---

### Nourished Gunslinger
**Mesa Prime. Peacemaker DPS with a viral overbuff and a blind-stun survival loop.**

| | |
|--|--|
| Content | Steel Path, Level cap |
| Role | Automatic-aim single-target and clear DPS, self survival |
| Difficulty | Beginner to intermediate |
| Investment | Medium. 3 forma, Topaz secondary crit-chance shards |
| Weapon reliance | Low. Regulators are the damage; a pistol only needs one Augur mod for the gate |

> Tenno. Peacemaker auto-aims and deletes anything in the cone. Nourish paints the
> Regulators viral and multiplies your energy so you can hold the trigger longer.
> Muzzle Flash blinds a 20m sphere every few kills, which is most of your
> survival. Shatter Shield covers the rest. Point at the room and let go.

**The build**

- Primed Continuity, rank 10, Madurai polarity
- Umbral Intensify, rank 10, unpolarised
- Augur Reach, rank 5, unpolarised
- Stretch, rank 5, Naramon polarity
- Equilibrium, rank 10, Naramon polarity
- Muzzle Flash, rank 3, unpolarised — augment. Shooting Gallery blinds in a radius on kills
- Catalyzing Shields, rank 3, Vazarin polarity
- Primed Flow, rank 10, Naramon polarity
- Aura: Corrosive Projection, Naramon polarity
- Exilus: Ice Spring, Vazarin polarity
- Arcanes: Arcane Hot Shot, Arcane Velocity

Arsenal figures land at roughly 144% Strength, 155% Duration, 175% Range, 100%
Efficiency, with 500 health, 280 shield, 135 armor and a 541 energy pool.

**How it works.** Regulator damage is `1 + 1.5 x (1 + 1.5 x Strength + Peacemaker
damage mods + Shooting Gallery buff x Strength)`, so Strength is additive with
damage mods. Running Galvanized Shot (up to 600% at five statuses) is already like
carrying 400% Strength, which is why extra Strength mods on the frame add little
relative DPS and Precision Intensify (pure ability damage, no Efficiency cost) is
often the better pick. Nourish supplies viral plus the energy multiplier that
sustains Peacemaker drain. *Confidence: Approximation, per the author's DPS
formula.*

**Survivability.** Muzzle Flash's roughly 20m non-line-of-sight blind every few
kills is the main defense. Catalyzing Shields drops max shields to 56 and (via the
current any-shield-gained bug) gives the full 1.33s gate; going in and out of 4
keeps it refreshed. You must have an Augur mod on a pistol or Burst Laser for full
gating. Shatter Shield adds 95% damage reduction in lower content.

**Duration, Efficiency, Range, Strength.** Duration holds Nourish and Shatter
Shield and reduces Peacemaker drain. Efficiency covers the Peacemaker activation
and drain; Seismic Bond on a pet gives a free 30%. Range is for Muzzle Flash's
stun radius and Nourish retaliation; it does not affect how far Regulators shoot.
Strength scales Regulator damage but with sharp diminishing returns.

**The mods.** *Umbral Intensify* is the Strength, which also feeds Nourish
consistency. *Primed Continuity* holds Duration. *Augur Reach, Stretch* set Muzzle
Flash range, with Augur Reach also feeding the gate. *Primed Flow, Equilibrium*
are the energy base under Nourish. *Catalyzing Shields* is the gate lock.
*Muzzle Flash* is the blind.

**Flexible slots.** Umbral Intensify to Precision Intensify for more raw Peacemaker
DPS. Rolling Guard for extra gate safety. Mesa's Waltz in the exilus if you want to
move while firing. The exilus is otherwise open.

**Helminth.** Pick one. Subsume over 1 for casual content where Shatter Shield is
comfortable, or over 3 for level cap where casting 1 in Peacemaker lets you gate
without exiting.

- **Nourish** is the default: energy multiplier and viral Regulators.
- **Roar** or **Eclipse** for a similar flat damage bonus.
- **Xata's Whisper** for slightly less damage but overguard bonus and bullet-attract bubbles.
- **Pillage** for a full armour strip (10x versus armour) plus shield regen and status cleanse.

**Archon Shards.** Three to five Tauforged Topaz secondary crit-chance for the
highest DPS gain. One to two parkour. Five total.

**Arcanes.** Arcane Velocity for a large fire-rate DPS boost, Arcane Hot Shot for
300% crit chance at stacks. Arcane Avenger or Molt Augmented as smaller swaps.

**Focus.** Vazarin Protective Sling for a 5s window to stand still and fire without
dying.

**Weapon synergy.** Regulators want a Corrosive-Heat build since Nourish already
supplies viral. Grimoire with Xata Invocation for passive energy while not in
Peacemaker.

**Staying alive.** The Muzzle Flash blind loop plus the shield gate plus Shatter
Shield. It fails if the blind cannot keep up with incoming fire in a large open
room, and to toxin.

**Energy.** Nourish's multiplier plus Primed Flow plus Equilibrium. Seismic Bond
and Grimoire Xata Invocation are backups.

**Where it struggles.** Peacemaker roots you in place, so open arenas with fire
from all angles are dangerous without Vazarin. It has no grouping. Enemies behind
cover need you to reposition.

**Variants.** A low-range max-Strength variant. A low-range open-world tank
variant.

**Strengths and weaknesses.** Strong: effortless auto-aim DPS, strong energy
economy, good self survival, cheap forma. Weak: stationary while firing, no
grouping, toxin-vulnerable, open arenas are risky.

**Who runs this.** Players who want to hold one button and watch a cone of the
room disappear.

---

### Reaper of Shadows
**Nekros Prime. Desecrate looting and a one-cast full armour strip, on an active shield-gate frame.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Looting |
| Role | Loot doubler, armour strip, crowd control, shadow summoner |
| Difficulty | Beginner to intermediate |
| Investment | Medium. 4 forma, two Tauforged strength shards for the strip threshold |
| Weapon reliance | High. A slash-bias weapon does the killing and the body-splitting for loot |

> Tenno. Desecrate rips a second drop chance out of every corpse, and a
> body-splitting weapon gives Desecrate two corpses to work on per kill. Creeping
> Terrify slows a crowd to a walk and strips it to zero armour. Soul Punch
> executes low-health heavies and spawns Shadows. Keep Desecrate on, keep the
> shield gate fed with Terrify casts, and farm the room dry.

**The build**

- Blind Rage, rank 10, Madurai polarity
- Overextended, rank 5, unpolarised
- Stretch, rank 5, unpolarised
- Creeping Terrify, rank 3, unpolarised — augment. Terrified enemies are 80% slowed
- Primed Flow, rank 10, Naramon polarity
- Primed Continuity, rank 10, Madurai polarity
- Equilibrium, rank 10, Naramon polarity
- Rolling Guard, rank 10, Vazarin polarity
- Aura: Brief Respite, aura slot
- Exilus: Primed Sure Footed, Vazarin polarity
- Arcanes: Arcane Camisado, Arcane Aegis

Arsenal figures land at roughly 139% Strength, 155% Duration, 235% Range, 45%
Efficiency, with 370 health, 555 shield, 135 armor and a 541 energy pool.

**How it works.** Desecrate rolls an extra loot drop on each corpse, and a weapon
that splits enemies in two on kill gives it two rolls per enemy. Terrify only
needs 167% Strength for a full strip (137% with Corrosive Projection), and its
80% slow via Creeping Terrify keeps enemies in range instead of fleeing. Since
health orbs can be picked up at full health with Equilibrium equipped, and Eximus
now drop guaranteed orbs, Despoil is no longer mandatory. *Confidence:
Approximation, per the author.*

**Ability priority.**

1. Tap 3 (Desecrate) and keep it up. Kills feed health orbs into Equilibrium.
2. Cast 2 (Terrify) in a crowd for the slow, full strip, and shield-gate reset.
3. Cast 1 (Soul Punch) on heavies below about 25% health for an instant kill and a Shadow. A kill within 3s of a Soul Punch also spawns one.
4. Cast 4 to summon all seven Shadows at once, or to heal them when low.

**Duration, Efficiency, Range, Strength.** Duration only affects Shadow decay;
Terrify's base is long. Efficiency at 45% works with Desecrate orbs plus
Equilibrium; go to 130% for a cast-heavy style. Range 145% to 235% by tileset, no
higher or you slow enemies in the next room. Strength only needs to clear the
Terrify strip threshold.

**The mods.** *Blind Rage* is the Strength, backed by *Arcane Camisado* and shards.
*Overextended, Stretch* set Terrify's Range. *Primed Continuity* holds Duration.
*Primed Flow, Equilibrium* are the energy base. *Creeping Terrify* is the slow.
*Rolling Guard* is the status cleanse. *Brief Respite* aura feeds the gate.

**Flexible slots.** Creeping Terrify becomes a Strength mod if you do not want the
slow. Rolling Guard is optional. The exilus is open if you lack Primed Sure Footed.

**Helminth.** Pick one. Subsume over 1 or 4 (both make Shadows).

- **Nourish** for viral on weapons and Shadows plus more energy.
- **Pull** with Greedy Pull to group and vacuum loot straight to you.

**Archon Shards.** One to two Amber cast-speed. Two Tauforged Crimson strength to
hit the 167% Terrify threshold without conditional buffs. One to two parkour. Five
total.

**Arcanes.** Arcane Camisado for Strength toward the strip, Arcane Aegis for lazy
shield sustain. Arcane Eruption (Desecrate orbs knock down enemies) is a fun swap.

**Focus.** Any. Madurai for the Strength and cast speed on Terrify. Vazarin for
i-frames.

**Weapon synergy.** For double Desecrate rolls, use a weapon that bisects on kill:
either a raw or physical weapon with over 50% slash bias (Phenmor, Miter Incarnon,
Dread Incarnon, most slash melees modded raw viral), or any weapon at all with
Amalgam Ripkas True Steel, which forces the split from any kill source including
DoTs and abilities. Note slash-proc kills do not split, so avoid high-slash-status
weapons.

**Staying alive.** Shield gating off Terrify plus the Terrify slow plus Rolling
Guard. It fails in the gap if there is no crowd to cast Terrify on, and to toxin.

**Energy.** Desecrate orbs through Equilibrium. Nourish if you want a bigger
buffer.

**Where it struggles.** Bosses. Low-density content starves Desecrate. Terrify has
a target cap and does not work on Acolytes.

**Variants.** A traditional Shadow-tank build. A Tomb Raider Petrify loot build
sharing polarities.

**Strengths and weaknesses.** Strong: the best flat loot multiplier in the game, a
free full strip, cheap and easy. Weak: entirely weapon-carried for damage, boss-
blind, wants a specific weapon type for the loot mechanic.

**Who runs this.** Farmers who bring Nekros to any long survival for the drops and
want the strip and crowd control as a bonus.

---

### Archangel of Annihilation
**Jade. An exalted Glory heat nuke with a damage buff that triple-dips.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Fast area nuke, hybrid primary and alt-fire, mobile survivor |
| Difficulty | Intermediate. Two aura slots and a buff-cycling system to learn |
| Investment | High. 5 forma, strength and cast-speed shards |
| Weapon reliance | Low. Glory is an exalted secondary and does the damage |

> Tenno. Glory is an exalted secondary that carpets an area in heat. Primary fire
> costs no extra energy and seeds Judgements; alt-fire detonates them. Power of the
> Seven buffs your Strength, Deathbringer feeds Glory modded base damage, and
> Ophanim Eyes slows and strips. Because Strength scales Glory's base damage, the
> Deathbringer buff, and the Power of the Seven buff at once, it nearly triple-dips
> your DPS. Stay mobile, hold fire, and detonate.

**The build**

- Equilibrium, rank 10, Naramon polarity
- Primed Flow, rank 10, Naramon polarity
- Overextended, rank 5, unpolarised
- Umbral Intensify, rank 10, unpolarised
- Fast Deflection, rank 5, unpolarised
- Blind Rage, rank 10, Madurai polarity
- Transient Fortitude, rank 10, Madurai polarity
- Primed Continuity, rank 10, Madurai polarity
- Aura 1: Corrosive Projection, aura slot
- Aura 2: Growing Power, aura slot
- Exilus: Cunning Drift, unpolarised
- Arcanes: Arcane Aegis (rank 0), Arcane Velocity

Arsenal figures land at roughly 238% Strength, 128% Duration, 205% Range, 45%
Efficiency, with 465 health, 550 shield, 135 armor and a 570 energy pool.

**How it works.** Primary fire (150 heat, 1.67 fire rate, 2m) scales with
multishot, fire rate and base damage and can out-DPS alt-fire in lower density;
alt-fire (1500 heat, 1 fire rate locked, 4m) ignores those mods but detonates all
nearby Judgements at once for huge density damage. The author's figures at ~200%
Strength: primary fire around 14,600 per hit on a tight field, alt-fire around
3,000 per detonation but up to 60,000 total from 20 stacked Judgements.
*Confidence: Approximation, per the author's DPS breakdown.*

**Playstyle.** Invert tap/hold so tapping 2 casts a Symphony.

1. Hold 2 to Power of the Seven, tap 2 to cast the Strength buff, which snapshots onto Ophanim Eyes and Glory.
2. Activate Glory on High, hold primary fire to kill and seed Judgements, and detonate with alt-fire.
3. Stay in Spirit of Resilience for easy survival, or swap to Deathbringer for more Glory damage.
4. Cast up to 5 Light's Judgements around the map for guaranteed detonation fuel and healing.
5. To refresh Ophanim Eyes, cycle to Power of the Seven, cast Ophanim to snapshot, then swap back.

**Survivability.** Spirit of Resilience plus Arcane Aegis plus Fast Deflection makes
Jade effectively immortal while mobile: the recharge delay drops to about 1s, and
the buff plus Aegis bridge it. Jade also has innate 50% damage reduction in Glory,
%HP healing from 1, and shield regen from 2. *Confidence: Approximation, and the
Spirit of Resilience recharge stack is flagged as a bug.*

**Duration, Efficiency, Range, Strength.** Neutral Duration so Ophanim and Light's
Judgement do not need frequent recasts; it also cuts Glory channel drain but not
alt-fire cost. Efficiency to preference: 45% with Equilibrium in dense missions,
130%+ for alt-fire spam. Time-regen energy (Zenurik, Energy Nexus) does not work
in Glory. Range scales Glory's radius, Light's Judgement and Ophanim; about 200%
gives 4m primary and 8m alt-fire, 12m inside a Light's Judgement. Strength is the
near-triple-dip damage stat.

**The mods.** *Blind Rage, Transient Fortitude, Umbral Intensify* are the Strength
stack, with *Primed Continuity* holding Duration. *Overextended* is the Range.
*Primed Flow, Equilibrium* are the energy base. *Fast Deflection* is the passive-
gate enabler with *Arcane Aegis*.

**Flexible slots.** Streamline or Fleeting Expertise for more Efficiency. Archon
Vitality is not worth it (Glory's 20% status means heat DoT is only ~10% of DPS);
Augur Secrets gives more. The two aura slots are flexible: Brief Respite, Combat
Discipline (to self-proc Avenger and Archon Intensify), Growing Power, Corrosive
Projection.

**Helminth.** Pick one. Subsume over Light's Judgement (her 1).

- **Nourish** is the default: viral on Glory (build viral-corrosive-heat for Grineer, viral-toxin for Corpus, viral-radiation for Murmur without modding viral) plus an energy multiplier plus Combat Discipline viral retaliation.
- **Silence** for passive crowd control and Eximus and Acolyte ability lockout.
- **Airburst** for grouping, though its cast delay and an ability-lockout bug make it risky.
- **Molt** for movement speed and faster Glory flight.

**Archon Shards.** One to two Amber cast-speed. Three to four Crimson strength
(triple-dips Glory). Topaz secondary crit optional for alt-fire specifically. Five
total.

**Arcanes.** Arcane Velocity for fire rate (huge on primary fire), Arcane Aegis for
the passive gate. Secondary Enervate on Glory itself gives about 80% flat crit
chance.

**Focus.** Madurai for Strength and cast speed. Vazarin for the Sling if you skip
the passive-gate setup.

**Weapon synergy.** Deathbringer is a universal weapon buff that double-dips
Glaives and Exodia Contagion, and is multiplicative to Condition Overload on
Ceramic Dagger Incarnon heavies and Tenet Grigori.

**Staying alive.** The passive gate while mobile plus Glory's 50% DR plus the
Ophanim slow. It fails if you stand still and let fire land in the recharge
window, and to toxin.

**Energy.** Equilibrium plus a Panzer with Synth Deconstruct and Seismic Bond.
Streamline if 45% is too tight.

**Where it struggles.** Line-of-sight tiles cap Glory's reach. The buff-cycling
system is fiddly. Bosses need the weapon.

**Variants.** A pure alt-fire high-density camping build. An endurance primary-fire
build with lower Range and Strength. A non-Glory weapon platform.

**Strengths and weaknesses.** Strong: one of the fastest area nukes, very mobile,
near-immortal while moving, faction-flexible through Nourish. Weak: line-of-sight
limited, complex buff management, boss damage on the weapon.

**Who runs this.** Players who want a mobile nuke that clears at speed and almost
never dies.

---

### The Araneae Queen
**Oraxia. Wall-latch invisibility, a toxin gun overbuff, and Scuttler minions.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Weapon buff platform, crowd control, minion support, invisible survivor |
| Difficulty | Intermediate. Latch timing and snapshot mechanics |
| Investment | Medium to high. 4 forma, Emerald toxin shards |
| Weapon reliance | High. Silken Stride and Webbed Embrace exist to make your gun kill |

> Tenno. Oraxia latches to walls to vanish for 8 seconds at a time, and Silken
> Stride wraps your weapon in a scaling toxin buff. Webbed Embrace nets a
> chokepoint and stacks a damage vulnerability. Mercy's Kiss leaps onto low-health
> heavies for an execute that showers you in orbs. Widow's Brood marks enemies to
> spawn spiders that strip armour as they bite. Relatch every 8 seconds and the
> room never sees you.

**The build**

- Augur Secrets, rank 5, unpolarised
- Energy Conversion, rank 5, Madurai polarity
- Stretch, rank 5, Naramon polarity
- Precision Intensify, rank 5, unpolarised
- Transient Fortitude, rank 10, Madurai polarity
- Archon Continuity, rank 10, Madurai polarity
- Primed Flow, rank 10, Naramon polarity
- Equilibrium, rank 10, Naramon polarity
- Aura: Growing Power, Madurai polarity
- Exilus: Power Drift, unpolarised
- Arcanes: Arcane Arachne, Arcane Crepuscular

Arsenal figures land at roughly 194% Strength, 128% Duration, 145% Range, 100%
Efficiency, with 675 health, 225 shield, 125 armor and a 570 energy pool.

**How it works.** Precision Intensify and Energy Conversion now snapshot onto
Silken Stride rather than applying dynamically, so you cast 4 with buffs up to lock
in a high Strength (the author reaches 359% with everything active). Silken Stride
is a toxin weapon buff; Archon Continuity turns its toxin procs corrosive for a
passive strip. Mercy's Kiss on a sub-threshold enemy forces health and energy orbs
scaled by Strength, refilling your bar in one cast. Latching in 4 gives 8s
invisibility that no mod can extend. *Confidence: Approximation, per the author.*

**Playstyle.**

1. Tap 4 (Silken Stride), then dodge toward a wall to sling and latch for 8s invisibility. Relatch every 8s. Melee attacks cast 1 instead in this mode.
2. Tap 1 (Mercy's Kiss) on low-health enemies to leap, execute, and drop orbs. Impact procs from 3 raise the mercy threshold to 80%.
3. Tap 2 (Webbed Embrace) where enemies gather for crowd control and a damage vulnerability (up to 150% at 300% Strength). Up to 3 zones.
4. Tap 3 (Widow's Brood) to mark enemies; kill the marked to spawn Scuttlers.

**Survivability.** Latch invisibility every 8s is the core. Between latches, tap 2
for a small Augur-mod shield gate. Webbed Embrace crowd-controls and Widow's Brood
draws aggro. Arcane Escapist, stacked to 9 via Mercy Kills on heavies, gives 12s
of invulnerability per death for three stacks. *Confidence: Approximation, per the
author.*

**Duration, Efficiency, Range, Strength.** Duration scales 2 and 3 and Silken
Stride's drain. Efficiency at 100% is comfortable; 45% with Blind Rage if you
cast 1 constantly for orbs. Range boosts 2 and 3 radius. Strength is the priority:
orb drop chance on 1, the vulnerability on 2, the toxin buff on 4.

**The mods.** *Transient Fortitude* is the Strength with *Precision Intensify* and
*Energy Conversion* snapshotting more. *Archon Continuity* is Duration plus the
corrosive conversion. *Stretch* is Range. *Primed Flow, Equilibrium* are the
energy base fed by Mercy's Kiss orbs. *Augur Secrets* adds Strength and a gate
contribution. *Growing Power* aura for more Strength.

**Flexible slots.** Blind Rage over Transient Fortitude for 45% Efficiency. The
aura, exilus and one arcane are all open.

**Helminth.** Pick one.

- **Nourish** over 1 or 3 for viral on weapons and Scuttlers plus energy.
- **Thermal Sunder** with Thermal Transfer for a non-combining blast add.
- **Shock** with Shock Trooper for a non-combining electric add.
- **Silence** to block Eximus abilities that target you through invisibility and stop Violence dispelling Silken Stride.

**Archon Shards.** One to two Amber cast-speed. Three to four Emerald toxin-status
for Silken Stride's toxin. Five total.

**Arcanes.** Arcane Arachne for 150% damage on every wall-latch, Arcane Crepuscular
for Strength and crit damage while invisible. Arcane Camisado or Arcane Escapist as
swaps.

**Focus.** Madurai for Strength and cast speed. Any works given the invisibility.

**Weapon synergy.** Silken Stride's toxin DoT chains through Acid Shells on Sobek
for map-wide spread. Ocucor auto-aims and auto-reloads for a hands-off option.
Vermisplicer with Combustion Beam for a weaker chain.

**Staying alive.** Latch invisibility plus partial shield gating plus crowd
control plus optional Arcane Escapist. It fails in the visible windows if you take
a burst with the gate down, and to toxin.

**Energy.** Mercy's Kiss orbs through Equilibrium refill the bar per cast. Seismic
Bond on a pet gives free Efficiency in 4.

**Where it struggles.** The 8s relatch cadence is a constant chore. Bosses. Widow's
Brood Scuttlers do not currently scale, so they are a strip tool, not damage, in
endurance.

**Variants.** An Arcane Persistence tank variant.

**Strengths and weaknesses.** Strong: strong weapon buff, permanent invisibility,
passive strip, good orb-based energy. Weak: relatch chore, minion damage falls
off, boss-blind, weapon-carried.

**Who runs this.** Players who want an invisible weapon-platform frame with a strip
and some minion crowd control.

---

### Beguiling Butterfly
**Titania Prime. Razorwing flight and Dex Pixia DPS, with passive shield-gate survival.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Mobile exalted-pistol DPS, self-sufficient survivor |
| Difficulty | Beginner to intermediate |
| Investment | Low. 2 forma, strength and cast-speed shards |
| Weapon reliance | Low. Dex Pixia are the damage; ground weapons vanish in Razorwing |

> Tenno. Razorwing shrinks you, arms Dex Pixia, and lets you fly. Razorwing Blitz
> speeds the flight and the fire rate. Razorflies are immortal, draw aggro, and
> mark enemies for extra damage. Spellbind keeps you status-immune. Between the
> 50% evasion, the flies pulling aggro, and killing things before they fire, very
> little touches you. Fly, do not sprint, and shoot.

**The build**

- Vigilante Vigor, rank 5, unpolarised
- Archon Continuity, rank 10, Madurai polarity
- Fast Deflection, rank 5, unpolarised
- Equilibrium, rank 10, Naramon polarity
- Precision Intensify, rank 5, Madurai polarity
- Primed Flow, rank 10, Naramon polarity
- Narrow Minded, rank 10, Vazarin polarity
- Razorwing Blitz, rank 3, unpolarised — augment. Recasting abilities stacks flight speed and Dex Pixia fire rate
- Aura: Corrosive Projection, aura slot
- Exilus: Preparation, unpolarised
- Arcanes: Arcane Impetus, Arcane Pistoleer

Arsenal figures land at roughly 100% Strength, 254% Duration, 34% Range, 100%
Efficiency, with 465 health, 370 shield, 135 armor and a 755 energy pool.

**How it works.** Duration plus Efficiency minimise Razorwing's channel drain: at
254% Duration, exactly 136% Efficiency hits the 25% minimum cost, and Arcane
Impetus supplies the last 36%. Range is dumped to 34% because Tribute has fixed
aura range, Spellbind is self-cast, and Razorwing ignores Range. Razorwing Blitz
turns every ability recast into a flight-speed and fire-rate stack, so you tap
Spellbind constantly. *Confidence: Approximation, per the author.*

**Playstyle.**

1. Enter Razorwing (tap 4).
2. Cast Spellbind on yourself for status and knockdown immunity (invert tap/hold; tap 1). Keep tapping 1 to gate and hold Razorwing Blitz.
3. Cycle 2 to cast Tributes on enemies; Razorflies collect them.
4. Keep Xata's Whisper or Nourish active.
5. Shoot with Dex Pixia. Fly, do not sprint, or you will hit a wall.

**Survivability.** Passive shield gating: Fast Deflection plus Vigilante Vigor drop
the recharge delay to about 1s, and five things bridge that 1s: Razorwing's 50%
evasion, immortal aggro-drawing Razorflies, flight mobility, Dust's 50% enemy
accuracy debuff, and simply killing fast. Active gating via Spellbind plus Augur
Secrets on the frame (secondaries vanish in Razorwing) is the alternative.
*Confidence: Approximation, per the author.*

**Duration, Efficiency, Range, Strength.** Duration is the priority for drain and
Spellbind uptime. Efficiency pairs with it to hit minimum drain. Range is useless
here and dumped. Strength boosts Razorwing base damage and the Razorwing Blitz
buffs, and triple-dips Dex Pixia if you subsume Xata's Whisper, but too much makes
the flight uncontrollable.

**The mods.** *Precision Intensify* is the Strength. *Narrow Minded* is the
Duration, and its Range cost is free. *Fast Deflection, Vigilante Vigor* are the
passive-gate package. *Primed Flow, Equilibrium* are the energy base. *Archon
Continuity* gives corrosive procs if Dex Pixia is modded blast-toxin. *Razorwing
Blitz* is the speed and fire rate.

**Flexible slots.** Adaptation plus Aerodynamic plus Aviator for a 98%+ DR tank
route instead of passive gating. The aura and exilus are open.

**Helminth.** Pick one. Subsume over Lantern (her 3).

- **Xata's Whisper** is the default: raw damage, magnetic bubbles that suck in bullets, headshot double-dip.
- **Nourish** for viral Dex Pixia and an energy multiplier.
- **Pull** for the fastest cast animation to stack Razorwing Blitz, plus light crowd control.
- **Pillage** for a strip that scales with Duration and refills shields.

**Archon Shards.** Two Amber cast-speed for Spellbind and Blitz stacking. Three
Crimson strength. One optional corrosive shard if running a corrosive Dex Pixia
build. Five total.

**Arcanes.** Arcane Impetus (up to 7 to 12 status stacks for 42% to 72% Strength
and 21% to 36% Efficiency with the right elements), Arcane Pistoleer for 100% ammo
efficiency so you skip the reload. Molt Augmented or Arcane Precision as swaps.

**Focus.** Any. Vazarin for a panic i-frame. Madurai for Strength.

**Weapon synergy.** Dex Pixia want Blast-Toxin for universal trash clear with
Xata's Whisper. Diwata as a status statstick to feed Arcane Impetus. Duplex Bond
works in Razorwing for up to three immortal priming sentinel clones.

**Staying alive.** The passive gate plus evasion plus Razorfly aggro plus Dust. It
fails to toxin and to a heavy burst landing in the recharge window.

**Energy.** Duration and Efficiency keep drain minimal; Primed Flow plus
Equilibrium refill it.

**Where it struggles.** Bosses. Ground content where you leave Razorwing loses the
whole kit. Very high endurance where the passive gate window closes.

**Variants.** A high-Strength one-cast Pillage full-strip build.

**Strengths and weaknesses.** Strong: fast, self-sufficient survival, low weapon
and forma investment, strong sustained DPS. Weak: boss-blind, weak on the ground,
Dex Pixia reload without Pistoleer is annoying.

**Who runs this.** Players who want a fast, low-effort frame that flies over the
mission killing everything and barely takes damage.

---

### The Slow Bleed
**Garuda Prime. Gloom crowd control fed by Bloodletting, with Dread Mirror attenuation on top.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Near-total slow, frontal damage immunity, weapon and Talons platform |
| Difficulty | Intermediate. The Bloodletting energy loop under Gloom's drain |
| Investment | Medium to high. 4 forma, strength and energy-max shards |
| Weapon reliance | Medium. Talons, Glaives or a weapon carry damage; the frame is control and survival |

> Tenno. Garuda pays for her energy in blood. Bloodletting spends half your health
> for a huge energy return, Gloom heals it back while slowing everything around
> you almost to a standstill, and that healing refills Bloodletting. Dread Mirror
> gives you complete frontal damage attenuation and a chargeable nuke. Cast
> Bloodletting twice, turn on Gloom, and the loop sustains itself.

**The build**

- Primed Flow, rank 10, Naramon polarity
- Transient Fortitude, rank 10, Madurai polarity
- Stretch, rank 5, Naramon polarity
- Augur Reach, rank 5, Naramon polarity
- Primed Continuity, rank 10, Madurai polarity
- Umbral Intensify, rank 10, unpolarised
- Catalyzing Shields, rank 3, Vazarin polarity
- Blending Talons, rank 3, unpolarised — augment. Tap 4 for a radial Seeking Talons
- Aura: Corrosive Projection, Naramon polarity
- Exilus: Power Drift, unpolarised
- Arcanes: Molt Augmented, Arcane Arachne

Arsenal figures land at roughly 214% Strength, 128% Duration, 175% Range, 100%
Efficiency, with 370 health, 370 shield, 420 armor and a 912 energy pool.

**How it works.** Bloodletting returns more energy at higher Efficiency (about 364
energy per 50% health at 100%, versus 228 at 45%), so neutral Efficiency means
fewer, less-vulnerable casts. Gloom slows and heals; Corrosive Projection is in the
aura and Blending Talons gives a quick radial stun and full shield regen off two
Augur mods. Dread Mirror grants knockdown immunity and full frontal attenuation.
*Confidence: Approximation, per the author.*

**Ability priority.**

1. Cast Bloodletting (3) twice to near-max energy. Recast when energy drops below about 300.
2. Activate Gloom (2). Deal damage to heal, repeat Bloodletting as needed.
3. On shield break, tap Seeking Talons (4) for full shield regen and a Gloom-extended radial stun.
4. Keep Dread Mirror (tap 1) up at all times. Hold 1 to charge and release a nuke.

**Duration, Efficiency, Range, Strength.** Positive Duration for Dread Mirror, Gloom
drain and the Talons mark. Neutral Efficiency for the Bloodletting return.
Moderate Range for Gloom, Dread Heart and Blending Talons, no higher or you slow
enemies too far out. Strength only for the Gloom slow; the listed 199% base gives
about 70% slow, and a Nidus specter, shards or Focus push toward the 95% cap at
272%.

**The mods.** *Transient Fortitude, Umbral Intensify* are the Strength for Gloom,
with *Primed Continuity* holding Duration. *Stretch, Augur Reach* set the Range,
with Augur Reach also feeding the gate. *Primed Flow* is the large pool for
chaining combos. *Catalyzing Shields* is the gate lock. *Blending Talons* is the
radial quick-cast.

**Flexible slots.** The augments are all optional over a Natural Talent slot: Blood
Forge to reload slow weapons via Bloodletting, Dread Ward for an invulnerability
window, Blending Talons for the radial version. The aura and exilus are open.

**Helminth.** Pick one. Subsume over Blood Altar (her 3).

- **Gloom** is the default: crowd control plus healing that fuels the Bloodletting loop.
- **Breach Surge** or **Condemn** for crowd control without the healing synergy.

**Archon Shards.** Two Amber cast-speed to drop Natural Talent. One to two Crimson
strength toward the Gloom cap. The rest Azure energy-max. Five total.

**Arcanes.** Molt Augmented for Strength toward the Gloom cap, Arcane Arachne
(applies to Dread Mirror). Arcane Avenger with Combat Discipline, or Arcane Strike
on a Talons build, as swaps.

**Focus.** Any. Madurai or Zenurik help hit the Gloom cap. Vazarin Sling for a
panic i-frame.

**Weapon synergy.** Garuda's +100% damage passive applies twice to Glaives and
Exodia Contagion. Talons builds (light combo, heavy spam, hybrid x12) are the
signature option. Blood Forge pairs with slow-reload weapons like Kuva Zarr,
Felarx, Tenet Envoy.

**Staying alive.** Dread Mirror frontal attenuation plus the Gloom slow plus
shield gating off 4 plus Bloodletting's status cleanse. It fails to attacks from
behind (Dread Mirror is frontal only), and to toxin.

**Energy.** The Bloodletting-Gloom loop is self-sustaining once started. Primed
Flow holds the buffer.

**Where it struggles.** Attacks from behind bypass Dread Mirror. Bosses. Hitting
the Gloom cap needs external Strength sources.

**Variants.** A high-range non-helminth nuke build. A run-and-gun weapon platform
with Molt, Roar or Xata's.

**Strengths and weaknesses.** Strong: top-tier slow, near-immunity from the front,
self-sustaining energy, flexible damage. Weak: frontal only, boss-blind, Strength-
starved for the full slow without help.

**Who runs this.** Players who want a control-and-survival frame that slows the
whole room and shrugs off everything it is looking at.

---

### Day and Night
**Equinox Prime. Sleep a map in Night form, bank the damage, and release it as a Maim nuke in Day.**

| | |
|--|--|
| Content | Steel Path, Level cap |
| Role | Map nuke, map-wide crowd control, shield-gate survivor |
| Difficulty | Intermediate. Form switching and the Maim charge mechanic |
| Investment | Low. 2 forma |
| Weapon reliance | High. Your weapon banks the Maim charge; the frame just stores and releases it |

> Tenno. Equinox is two frames on one switch. In Night form, Rest sleeps a room
> through walls and your kills bank 75% of the health you strip as stored damage,
> while Mend refills your shields. Flip to Day with Energy Transfer holding the
> charge, drop Maim, and the whole room takes it at once. Sleep, bank, flip,
> nuke, flip back.

**The build**

- Fleeting Expertise, rank 5, unpolarised
- Equilibrium, rank 10, Naramon polarity
- Stretch, rank 5, unpolarised
- Augur Reach, rank 5, unpolarised
- Primed Flow, rank 10, Naramon polarity
- Energy Transfer, rank 3, unpolarised — augment. Preserves stored damage across a form switch
- Rolling Guard, rank 10, Vazarin polarity
- Overextended, rank 5, Vazarin polarity
- Aura: Corrosive Projection, Naramon polarity
- Exilus: Cunning Drift, unpolarised
- Arcanes: Arcane Aegis, Molt Augmented

Arsenal figures land at roughly 40% Strength, 40% Duration, 280% Range, 160%
Efficiency, with 465 health, 370 shield, 160 armor and a 712 energy pool.

**How it works.** Maim stores 75% of the health and shields an enemy loses, not
the damage number you see, so a huge overkill against an armoured target banks
little. Strength does not change the stored amount or the release, which is why
Strength is dumped to 40%. Range is maxed for Maim's 50m radius (with linear
falloff to 0 at 50m, about 20% at 40m) and Rest's radius. Max Efficiency (190%
with Fleeting plus Streamline or Seismic Bond) hits the channel drain floor so you
hold 3 and 4 permanently. *Confidence: Approximation, per the author's Maim
figures.*

**Playstyle.**

1. Start in Day form, activate 3 then 4, then switch to Night with 1 so the boosted-Strength Maim converts into a stronger Mend. Reactivate 3.
2. In Night form, crowd-control with Rest (2), castable through walls.
3. Kill with your weapon to regen shields and bank Maim damage.
4. Shield gate with Rolling Guard and kill-based shield regen.
5. When enough is banked and density is good, switch to Day (1) and deactivate 4 to nuke.
6. Reactivate 3 and 4, switch back to Night, reactivate 3.

**Maim damage (author's figures, level-500 corrupted heavy gunner at 40m).**

- Level 150 (~3.03M EHP): about 15 million banked.
- Level 500 (~10.3M EHP): about 52 million banked.
- Level 9999 (~55.7M EHP): about 278 million banked.

An armour strip via Terrify roughly halves those requirements.

**Duration, Efficiency, Range, Strength.** Low Duration is fine; you hit the drain
floor anyway and Rest's base is long. Max Efficiency for the channel floor.
Max Range for Maim and Rest. Strength is dumped because it does not touch the nuke;
Molt Augmented just keeps the Mend shield gain and form buffs reasonable.

**The mods.** *Fleeting Expertise* is the Efficiency toward the drain floor.
*Overextended, Stretch, Augur Reach* set the maxed Range, with Augur Reach feeding
the gate. *Primed Flow, Equilibrium* are the energy base. *Energy Transfer* is
mandatory for a switch build. *Rolling Guard* is the panic i-frame.

**Flexible slots.** Calm and Frenzy for spreading Rest on kills. The exilus is
open. Catalyzing Shields for a stronger kill-based gate.

**Survivability.** Rest crowd control plus shield gating: in Night form each kill
gives about 46 shield under Mend, roughly a 1s gate at four kills, or 1.33s at two
kills with Catalyzing Shields. Releasing the Maim charge in Night form also fully
restores shields. Arcane Aegis and Vazarin Sling are backups.

**Helminth.** Pick one. Subsume over Pacify and Provoke (her 3), which cancels on
every form swap anyway.

- **Terrify** is the standout: Maim damage is reduced by armour, so a full strip (137% Strength with Corrosive Projection) roughly doubles Maim's effective damage, and Terrify works through walls at near-Maim radius. This needs Umbral Intensify over Primed Flow or Augur Reach plus Molt Augmented.
- **Resonator** for turning off enemy AI in a 42m radius so you barely need to cast Rest at all.

**Archon Shards.** Two Amber cast-speed. Crimson strength only if running Terrify
for the strip threshold. The rest parkour. Five total.

**Arcanes.** Arcane Aegis for a lazy survival layer, Molt Augmented for the small
amount of Strength the form buffs and Mend want. Arcane Avenger as a swap.

**Focus.** Any. Vazarin Sling for a panic window.

**Weapon synergy.** Strong area weapons that strip health fast to bank Maim
quickly: slam melees (Magistar, Arca Titron), Incarnon primaries (Torid, Strun,
Boar), influence melees. Zenith and Sigma and Octantis fit the astronomy theme.

**Staying alive.** Rest map-sleep plus the Mend shield gate plus Rolling Guard. It
fails if you cannot sleep or kill fast enough to keep the gate fed, and to toxin.

**Energy.** Max Efficiency plus Primed Flow plus Equilibrium; you rarely spend
much.

**Where it struggles.** Maim's falloff means enemies at 40m+ take a fraction of
the charge, so you need to bank far more than the raw EHP suggests. Armoured
targets without a strip eat the charge. Bosses.

**Variants.** A pure Day-form nuke with Terrify. A Gloom time-freeze switch build.
A pure Night-form crowd-control build with Silence. A Rest XP-farm build.

**Strengths and weaknesses.** Strong: map-wide sleep, a map-wide nuke, cheap on
forma, strong crowd control. Weak: two-step nuke with a banking delay, falloff and
armour both cut the payload, boss-blind.

**Who runs this.** Players who want to lock down and then delete an entire tile at
once.

---
