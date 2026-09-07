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

### Event Horizon
**Nova Prime. Molecular Prime slow or speed, self-priming Null Stars, and passive orb energy.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Squad-wide slow (or speed), armour softening, crowd control, damage amp |
| Difficulty | Beginner to intermediate |
| Investment | Medium. 4 forma, one strength shard for the 150% threshold |
| Weapon reliance | Medium. Molecular Prime's 2x damage and the Neutron Star strip make your weapon hit far harder |

> Tenno. Molecular Prime does one thing that matters: everything it touches takes
> double damage, and it either crawls to a stop or sprints, your call. The updated
> augments mean Null Stars seek out enemies and prime them for you, and Neutron
> Star stuns and part-strips armour in a radius. Nova's passive turns slowed kills
> into health orbs and sped kills into energy orbs, so the frame funds itself.

**The build**

- Blind Rage, rank 10, Madurai polarity
- Overextended, rank 5, Vazarin polarity
- Molecular Fission, rank 3, unpolarised — augment. Null Stars apply Molecular Prime on hit
- Primed Continuity, rank 10, Madurai polarity
- Equilibrium, rank 10, Naramon polarity
- Stretch, rank 5, unpolarised
- Neutron Star, rank 3, unpolarised — augment. Recasting 1 fires all stars; adds forced heat and a partial strip
- Primed Flow, rank 10, Naramon polarity
- Aura: Brief Respite, aura slot
- Exilus: Power Drift, unpolarised
- Arcanes: Arcane Concentration, Arcane Hot Shot

Arsenal figures land at roughly 154% Strength, 155% Duration, 235% Range, 45%
Efficiency, with 370 health, 370 shield, 135 armor and a 755 energy pool.

**How it works.** Molecular Prime's 75% slow or speed both cap at 150% Strength;
the listed 154% clears it. Molecular Fission lets Null Stars seek and prime enemies
in a 12 to 20m radius so you rarely recast Molecular Prime itself. Neutron Star
adds a forced heat proc that stuns (prolonged hugely by the slow) and strips up to
50% armour over 2s, about a 3.7x damage multiplier against armour. Nova's passive
plus Equilibrium keeps energy flowing at 45% Efficiency. *Confidence:
Approximation, per the author.*

**Playstyle.**

1. Tap 4 for the 75% slow, or hold 4 for the 75% speed.
2. Tap 1 for Null Stars; recast 1 periodically to fire all stars for heat procs and Molecular Prime.
3. Use 3 (Wormhole) for traversal and shield gating.
4. Use 2 (Antimatter Drop) for low-level nuking, or as a 25,000-in-200,000-out amplifier with a hard-hitting weapon.

**Survivability.** Shield gating: Brief Respite plus three Augur mods gives about
0.9s off 2, 1s off 3, 1.45s off 4; Catalyzing Shields makes every cast a full
1.33s. Null Star's 90% damage reduction (now on shields and health, near-100%
uptime with Molecular Fission) passively tanks base Steel Path to about level 500.
*Confidence: Approximation, per the author.*

**Duration, Efficiency, Range, Strength.** Duration scales Molecular Prime's spread
and the Null Star particle count (24 at ~200%). Efficiency is negative because the
passive funds it. Range 145% to 235% for Wormhole, Antimatter Drop, the star seek
radius and the Neutron Star and Molecular Prime radii. Strength only needs to
clear 150%.

**The mods.** *Blind Rage* is the Strength (past the threshold it does little).
*Overextended, Stretch* set the Range. *Primed Continuity* holds Duration.
*Primed Flow, Equilibrium* are the energy base. *Molecular Fission, Neutron Star*
are the augments that make priming passive. *Brief Respite* aura feeds the gate.

**Flexible slots.** Drop Equilibrium for violet Equilibrium shards and add Augur
Message, Augur Reach, Rolling Guard or Fast Deflection. Arcane Sculptor over
Concentration or Hot Shot for free Wormhole spam.

**Helminth.** Pick one. Subsume over 2 or 3.

- **Nourish** for viral Null Stars, a weapon viral buff, and an energy multiplier.
- **Roar** for ability and status damage (full ability-DPS builds exist).
- **Xata's Whisper** to trigger off Molecular Prime's blast procs and buff blast weapons.
- **Silence** for Eximus and Acolyte lockout, stun prolonged by the slow.
- **Pillage** for a strip and shield return.

**Archon Shards.** One Amber cast-speed. One Tauforged Crimson strength to hit
150% and free Power Drift. Two Tauforged Crimson Duration. One optional violet
Equilibrium. Five total.

**Arcanes.** Arcane Concentration for the Duration spread, Arcane Hot Shot for
300% crit chance (easy to keep with Neutron Star; skip it on Phenmor, Laetum,
Felarx). Arcane Sculptor or Molt Efficiency as swaps.

**Focus.** Any. Madurai for Strength and cast speed. Vazarin Sling as a backup.

**Weapon synergy.** Any crit weapon with Arcane Hot Shot. Molecular Prime's death
explosions inherit on-kill effects: Devouring Attrition on first-gen Incarnons
(Phenmor, Laetum, Felarx) for area nukes, Acid Shells on Sobek, Amalgam Argonak
strip, Okina spectral daggers.

**Staying alive.** Shield gating plus the slow plus Null Star DR. It fails in the
gap with no crowd to gate on, and to toxin.

**Energy.** The passive plus Equilibrium. Arcane Sculptor if you spam Wormhole.

**Where it struggles.** Molecular Prime's amp is a multiplier, not a nuke, so a
weak weapon stays weak. Bosses take the doubled damage but you still need to deal
it. Wormhole energy without Sculptor.

**Variants.** An endurance Nourish variant. A pure ability-DPS Roar build. A
Silence comfort build. A Pillage build. A full-EHP tank Slowva.

**Strengths and weaknesses.** Strong: a squad-wide 2x damage debuff, flexible
slow or speed, self-funding energy, part-strip and crowd control from one augment.
Weak: amplifier not a nuke, boss damage still on the weapon, needs a strength
source for the threshold cleanly.

**Who runs this.** Players who want to double the whole squad's damage and slow the
room to a crawl.

---

### Avenging Angel
**Trinity Prime. A full armour strip plus a stacking red-crit buff for whatever you are shooting.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap, Weapon platform |
| Role | Weapon damage enabler, team energy and immortality support |
| Difficulty | Intermediate. The ramp-up is slow and losing the buff hurts |
| Investment | Very low. 1 forma |
| Weapon reliance | Total. Trinity does nothing to enemies; she strips armour and makes your gun red-crit |

> Tenno. Trinity strips a target to zero armour with Abating Link and then feeds
> your weapon crit chance from Champion's Blessing, up to 350% additive based on
> how much health you heal. Add Arcane Avenger's flat 45% and a mid-crit weapon
> red-crits every other shot. Energy Vampire keeps you and the squad topped up,
> and Bless makes the team briefly immortal. Keep Link and Bless up, heal through
> Combat Discipline, and let the buff climb.

**The build**

- Vampire Leech, rank 3, unpolarised — augment. Energy Vampire also grants shields
- Primed Continuity, rank 10, Madurai polarity
- Primed Flow, rank 10, Naramon polarity
- Narrow Minded, rank 10, Vazarin polarity
- Abating Link, rank 3, unpolarised — augment. Link strips linked enemies' armour
- Overextended, rank 5, Vazarin polarity
- Blind Rage, rank 10, Madurai polarity
- Champion's Blessing, rank 3, unpolarised — augment. Bless grants a health-scaled crit-chance buff
- Aura: Combat Discipline, Vazarin polarity
- Exilus: Power Drift, unpolarised
- Arcanes: Arcane Concentration, Arcane Avenger

Arsenal figures land at roughly 154% Strength, 254% Duration, 124% Range, 45%
Efficiency, with 370 health, 555 shield, 135 armor and a 641 energy pool.

**How it works.** Abating Link only needs 167% Strength for a full strip.
Champion's Blessing gives up to 350% additive crit chance based on the percentage
of health healed; Arcane Avenger adds a flat 45%. Combat Discipline is the healing
trigger, and because Link and Bless give 75% damage reduction each (about 93%
total), Combat Discipline only costs about 1 health per kill instead of 10, which
Bless heals. The buff takes 2 to 5 minutes to cap solo, faster with a companion
that needs healing. *Confidence: Approximation, per the author's spreadsheet.*

**Ability priority.**

1. Cast Energy Vampire often to keep energy topped.
2. Keep Link and Bless up at all times.
3. Get kills for Combat Discipline and Arcane Avenger.
4. Cast Bless to heal and stack Champion's Blessing.
5. Once capped, always refresh Bless before the crit buff lapses.

**Duration, Efficiency, Range, Strength.** Very high Duration for Link, Bless and
the crit buff. Efficiency dumped because Primed Flow plus Energy Vampire covers it.
Some Range for Link and Well of Life. Strength only for the 167% strip threshold
(Energy Vampire's true-damage pulse also scales with Strength if you want the
one-shot at 236%).

**The mods.** *Blind Rage* is the Strength. *Narrow Minded, Primed Continuity* are
the Duration, with Narrow Minded's Range cost bought back by Overextended.
*Primed Flow* is the pool. *Abating Link* is the strip. *Champion's Blessing* is
the crit buff. *Combat Discipline* aura is the healing trigger for both the buff
and Avenger.

**Flexible slots.** Rolling Guard for i-frames and status cleanse. Adaptation plus
Arcane Guardian over Abating Link for a health-tank route. A Bleeding Dragon Key
plus Quick Thinking speeds the ramp.

**Helminth.** Pick one. Trinity's kit is full, so subsume for the missing piece:
crowd control or passive survival.

- **Silence** at neutral Range for a refreshable stun plus Eximus and Acolyte lockout.
- **Evade** for permanent invisibility so you barely gate.
- **Resonator** for cheat-mode crowd control.
- **Roar** or **Nourish** for weapon and Energy Vampire damage.

**Archon Shards.** One Tauforged Amber cast-speed. Then either four Tauforged
ability-damage-on-status shards for the Energy Vampire one-shot, or duration and
parkour to protect the crit buff. Five total.

**Arcanes.** Arcane Avenger is mandatory with Combat Discipline. Arcane
Concentration for Duration. Arcane Energize as a backup only.

**Focus.** Any. Madurai for cast speed. Vazarin for i-frames.

**Weapon synergy.** Any primary or secondary with decent base crit chance so the
buff pushes it into consistent red crits: Kuva Chakkhurr, Dread, Kuva Bramma,
Amprex, Dual Toxocyst Incarnon, Epitaph.

**Staying alive.** Link plus Bless damage reduction plus Well of Life immortality
(60s cooldown) plus optional Rolling Guard. It fails in deep endurance where the
DR is not enough, and to toxin.

**Energy.** Energy Vampire plus Primed Flow. It is a non-issue.

**Where it struggles.** The slow ramp, and losing the buff to a death or a missed
refresh sets you back minutes. No damage of its own. Bosses need the weapon.

**Variants.** A Bleeding Dragon Key fast-ramp build. A health-tank Adaptation
build.

**Strengths and weaknesses.** Strong: a full strip and a huge crit buff for one
forma, best-in-slot team energy, team immortality. Weak: entirely weapon-carried,
slow to come online, punishing to lose the buff.

**Who runs this.** Players who want to turn one weapon into a red-crit machine and
hard-support the squad's energy.

---

### The Blazing Lotus
**Protea Prime. Blaze Artillery turret damage, a Temporal Anchor strip and rewind, and shield-satellite gating.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Turret nuke, armour strip, grouping, a banked-damage nuke, shield-gate survivor |
| Difficulty | Advanced. A four-cast rotation, an inverted control, and the Anchor rewind |
| Investment | Low. 2 forma, duration and cast-speed shards |
| Weapon reliance | Medium. Blaze Artillery and Temporal Anchor's banked damage carry; a weapon feeds the bank |

> Tenno. Protea drops turrets. Blaze Artillery ramps up the longer it lives and
> the more it hits, so grouping matters. Temporal Anchor is the trick: enter it,
> strip armour with your other abilities via Temporal Erosion, bank 25% of every
> hit you land, then end it to dump all that damage in a 35m sphere and rewind
> your energy and ammo back to where you started. Shield Satellites give a long
> double gate. Every fourth cast, her passive doubles your Strength.

**The build**

- Equilibrium, rank 10, Naramon polarity
- Overextended, rank 5, unpolarised
- Temporal Erosion, rank 3, unpolarised — augment. Damage during Temporal Anchor strips armour
- Temporal Artillery, rank 3, unpolarised — augment. Blaze Artillery deals more damage
- Primed Flow, rank 10, Naramon polarity
- Archon Vitality, rank 0, unpolarised — doubles Blaze Artillery heat procs
- Blind Rage, rank 10, Madurai polarity
- Primed Continuity, rank 10, Madurai polarity
- Aura: Growing Power, aura slot
- Exilus: Ice Spring, Vazarin polarity
- Arcanes: Arcane Concentration, Arcane Sculptor

Arsenal figures land at roughly 139% Strength, 155% Duration, 190% Range, 45%
Efficiency, with about 404 health, 555 shield, 185 armor and a 712 energy pool.

**How it works.** Arcane Sculptor triggers off casting 1 and 2 and locks 175%
Efficiency for 12s, so it is always up and energy is a non-issue even at 45%
arsenal Efficiency. Temporal Anchor banks 25% of each damage instance with no cap
and releases it in a 35m+ line-of-sight sphere; Temporal Erosion makes casts of 1
and 2 strip armour during the Anchor, working on Acolytes and Demolysts with no
big Strength requirement. Protea's passive gives +100% Strength to every fourth
cast, which you want to land on the Anchor cast so it strips 20% per hit.
*Confidence: Approximation, per the author.*

**Playstyle.** Invert tap/hold so tapping 1 casts Shield Satellite.

1. Tap 3 (Dispensary) at mission start and keep one near you.
2. Tap 1 (Shield Satellite) onto the ground; approach one for shields and a ~5s double gate. Recast and grab one whenever shields break.
3. Hold 1 (Shrapnel Vortex) at chokepoints for crowd control and strip contribution.
4. Tap 2 (Blaze Artillery) toward enemies. Three at once, short duration, recast often.
5. Tap 4 (Temporal Anchor) on the 100% passive cast: strip with 2, 2, 2, then either let it expire, tap 4 again to group, or bank damage and tap 4 to nuke, then rewind.

**Duration, Efficiency, Range, Strength.** Duration lengthens Blaze Artillery so it
ramps higher; 200%+ with shards. Efficiency solved by Sculptor. Range for Shrapnel
Vortex, the implosion and nuke radius, and Blaze Artillery's already-long reach.
Strength is modest because the passive doubles it every fourth cast; Growing Power
plus Molt Augmented plus passive reaches about 225%.

**The mods.** *Blind Rage* is the Strength, covered by *Arcane Sculptor*.
*Overextended* is the Range. *Primed Continuity* is the Blaze Artillery Duration.
*Primed Flow, Equilibrium* are the energy base. *Temporal Erosion* is the strip.
*Temporal Artillery* is turret damage. *Rank 0 Archon Vitality* is a ~30% Blaze
Artillery DPS bump via doubled heat procs. Do not run Augur mods; they overwrite
the Shield Satellite gate.

**Flexible slots.** Blind Rage to Constitution or Nira's Hatred for Duration.
Archon Vitality to Umbral Intensify for Strength. The aura and exilus are open.

**Helminth.** Pick one. Subsume over Dispensary (if you run external energy) or
Temporal Anchor (if you dislike the rewind).

- A **grouping** ability (Larva ideal, then Coil Horizon, Airburst, Ensnare, Pull) to ramp Blaze Artillery faster.
- An **armour strip** (Terrify at 167%, or 137% with Corrosive Projection) if you subsume Temporal Anchor away.
- **Roar** or **Nourish** for turret damage or energy and weapon viral.
- **Gloom** or **Breach Surge** for crowd-control survival.

**Archon Shards.** One to two Tauforged Amber cast-speed for the Anchor animation.
Three to four Tauforged Crimson Duration for Blaze Artillery. Five total.

**Arcanes.** Arcane Sculptor for the Efficiency lock, Arcane Concentration for
Duration. Molt Augmented or Arcane Hot Shot as swaps.

**Focus.** Vazarin Sling for i-frames and Void Snare grouping. Madurai for cast
speed and Strength.

**Weapon synergy.** A heat-inherit primer (Epitaph, Bubonico, Proboscis Cernos)
raises Blaze Artillery DPS if you tag enemies before the turrets do. Latron
Incarnon primes viral and strips. Any strong weapon feeds the Temporal Anchor
bank.

**Staying alive.** The Shield Satellite double gate plus Temporal Anchor's 3s
i-frames and status cleanse plus its extra-life effect. It fails if you are caught
with no satellite down and the gate expired, and to toxin.

**Energy.** Arcane Sculptor's lock. A non-issue.

**Where it struggles.** The rotation is genuinely complex and the rewind is
disorienting. Blaze Artillery's short duration means constant recasting. Bosses
need the banked-damage nuke or the weapon.

**Variants.** A semi-AFK Mecha Roar build.

**Strengths and weaknesses.** Strong: strong ramping turret damage, a flexible
strip that hits everything, a scaling banked nuke, a long shield gate. Weak:
high complexity, constant turret upkeep, rewind nausea.

**Who runs this.** Players who want a busy, high-ceiling turret frame with a strip
and a panic-proof gate.

---

### Endless Fist
**Baruuk Prime. Exalted Desert Wind influence clear behind stacked, multiplying damage reduction.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Exalted-melee influence clear, near-immortal bruiser |
| Difficulty | Beginner to intermediate |
| Investment | Medium. 3 forma, violet melee crit-damage shards |
| Weapon reliance | Low. Desert Wind is the damage; a companion primes |

> Tenno. Baruuk does not want to fight, and that is his defense. Elude dodges
> every attack from any direction while you are not attacking. Desolate Hands
> throws daggers that disarm and stack 90% damage reduction. Serene Storm arms
> Desert Wind, a fist exalted that with Reactive Storm and Melee Influence clears
> rooms on light attacks. Elusive Retribution rewards dodging with crit damage and
> speed. Stand still to reset, then wade in.

**The build**

- Reactive Storm, rank 3, unpolarised — augment. Desert Wind gains status chance and matches enemy weakness
- Precision Intensify, rank 5, unpolarised
- Primed Flow, rank 10, Naramon polarity
- Overextended, rank 5, Vazarin polarity
- Elusive Retribution, rank 3, unpolarised — augment. Dodging grants attack speed and crit damage
- Blind Rage, rank 10, Madurai polarity
- Equilibrium, rank 10, Naramon polarity
- Primed Continuity, rank 10, Madurai polarity
- Aura: Brief Respite, aura slot
- Exilus: Cunning Drift, Naramon polarity
- Arcanes: Arcane Fury, Molt Augmented

Arsenal figures land at roughly 139% Strength, 155% Duration, 200% Range, 45%
Efficiency, with 280 health, 465 shield, 240 armor and an 855 energy pool.

**How it works.** Elude needs exactly 200% Range for a 360-degree dodge, which is
total damage immunity while not attacking; Overextended plus rank 3 Cunning Drift
hits it. Desolate Hands above 9 daggers is 90% damage reduction. Serene Storm adds
40%. Stacked, that is about 97% before Adaptation, 99.7% with it. Since the 2025
exalted rework Desert Wind takes acolyte mods and Melee Influence, so it clears
like a top-tier influence melee. *Confidence: Approximation, per the author's DR
math.*

**Ability priority.**

1. Activate Elude and Desolate Hands (3); keep daggers above 9.
2. Stand still and do not attack briefly to build Elusive Retribution.
3. Use Lull (2) periodically to erode Restraint and crowd-control.
4. Keep Serene Storm (4) active and spam light melee.
5. To gate, cast Lull or Desolate Hands, or stop attacking to let shields recover under Elude.

**Duration, Efficiency, Range, Strength.** Duration only reduces Elude's drain;
Desert Wind and Desolate Hands ignore it. Efficiency does not touch Desert Wind;
Equilibrium plus a Synth Deconstruct pet plus Seismic Bond covers Lull and the
daggers. Range is pinned at 200% for the full Elude dodge. Strength boosts Desert
Wind and Elusive Retribution.

**The mods.** *Blind Rage* is the Strength with *Precision Intensify* adding more.
*Overextended* is the Range half of the 200% Elude target, with *Cunning Drift*
finishing it. *Primed Continuity* cuts Elude drain. *Primed Flow* holds energy for
violet crit-damage shard value. *Equilibrium* is the engine. *Reactive Storm,
Elusive Retribution* are the augments. *Brief Respite* aura for active gating.

**Flexible slots.** Streamline, Primed Continuity, Umbral Intensify or Augur Reach
in the flex slot. Rolling Guard or Adaptation for lower content. Endless Lullaby
for auto-recast Lull. Archon Vitality for doubled Desert Wind heat procs.

**Helminth.** Pick one. Subsume over Lull (if you use Elude and Elusive
Retribution) or Elude (if you prefer Lull and constant attacking).

- **Nourish** for Elude-sustain energy and free viral on Desert Wind.
- **Pull** for grouping and manual combo building.
- **Wrathful Advance** for a flat crit-chance boost so you red-crit without maintaining combo.

**Archon Shards.** One Tauforged Amber cast-speed. Three to four Tauforged Violet
melee crit-damage (over 225%). Five total.

**Focus.** Naramon to slow combo decay. Vazarin for endurance. Madurai for Strength
and Cascade.

**Weapon synergy.** Desert Wind is the weapon. A Rauta or Praedos combo statstick
builds combo onto the exalted. A Panzer Vulpaphyla primes viral and buffs crit
damage; add Seismic Bond for Efficiency.

**Staying alive.** Elude's directional immunity plus stacked multiplicative DR plus
Lull and disarm crowd control. It fails only if you must attack while surrounded
and unshielded in deep endurance, and to toxin ticks.

**Energy.** Equilibrium plus Synth Deconstruct plus Seismic Bond. Desert Wind
drain is Efficiency-immune, so KPM is the real fuel.

**Where it struggles.** Ranged single targets need you to close. Bosses take
longer than a nuke. Elude does nothing while you are attacking, so you lean on
disarm and Lull then.

**Variants.** A Nourish Elusive Retribution build. A Pull grouping build.

**Strengths and weaknesses.** Strong: one of the tankiest frames in the game,
strong exalted clear, low weapon dependence, cheap forma. Weak: melee range,
boss-slow, the stand-still-to-reset rhythm is passive.

**Who runs this.** Players who want an exalted-melee frame that clears grouped
rooms and effectively cannot be killed.

---

### Celestial Monkey
**Wukong Prime. Iron Staff influence DPS, a level-scaling Defy nuke, and Cloudwalker resets.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Exalted-melee influence clear, scaling reflect nuke, mobile survivor |
| Difficulty | Beginner to intermediate |
| Investment | Medium. 3 forma, violet melee crit-damage shards |
| Weapon reliance | Low. Iron Staff is the damage; Defy scales on its own |

> Tenno. Wukong brings a twin, a cloud, and a staff. Celestial Twin fights
> alongside you and Celestial Stomp gives wide crowd control. Cloudwalker is a
> Rolling Guard on tap: travel, heal, cleanse status, reset the shield gate. Defy
> reflects enemy damage back at their current level, so it only gets stronger the
> deeper you go. Iron Staff, since the exalted rework, is one of the best standard
> influence melees in the game.

**The build**

- Celestial Stomp, rank 3, unpolarised — augment. Celestial Twin casts a radial stomp
- Augur Reach, rank 5, unpolarised
- Precision Intensify, rank 5, Madurai polarity
- Catalyzing Shields, rank 3, Vazarin polarity
- Stretch, rank 5, unpolarised
- Primed Flow, rank 10, Naramon polarity
- Primed Continuity, rank 10, Madurai polarity
- Equilibrium, rank 10, Naramon polarity
- Aura: Corrosive Projection, aura slot
- Exilus: Power Drift, unpolarised
- Arcanes: Molt Augmented, Arcane Strike

Arsenal figures land at roughly 115% Strength, 155% Duration, 175% Range, 100%
Efficiency, with 555 health, 445 shield, 290 armor and a 556 energy pool.

**How it works.** Iron Staff (12m at max combo with Primed Reach, 1 Follow Through)
takes Blood Rush, Weeping Wounds and Melee Influence since the rework, so it clears
crowds through influence procs. Defy reflects a portion of current enemy damage, so
it is an infinite-scaling nuke that eventually one-shots level cap. Strength is low
because only Iron Staff wants it, so Precision Intensify suffices. Cloudwalker is
the survival engine. *Confidence: Approximation, per the author.*

**Playstyle.**

1. Cast 1 for Celestial Twin; hold 1 to stomp for crowd control.
2. Tap 2 (Cloudwalker) often to travel, heal, cleanse and reset the gate.
3. Tap 3 (Defy) to clear surrounding enemies; it scales with their damage.
4. Enter 4 (Iron Staff) and clear.

**Duration, Efficiency, Range, Strength.** Positive Duration for Cloudwalker, the
Stomp stun and Primary Fury drain. Some Efficiency so Iron Staff drain is
reasonable, with Primed Flow plus Equilibrium behind it. Range for Defy and
Celestial Stomp radius (Narrow Minded instead if you skip both). Strength only for
Iron Staff.

**The mods.** *Precision Intensify* is the Strength. *Stretch, Augur Reach* set the
Defy and Stomp Range, with Augur Reach also feeding the gate. *Primed Continuity*
holds Duration. *Primed Flow, Equilibrium* are the energy base. *Catalyzing
Shields* makes one Cloudwalker cast a full 1.33s gate. *Celestial Stomp* is the
Twin's crowd control. *Corrosive Projection* maxes damage on unarmoured targets.

**Flexible slots.** Catalyzing Shields, Celestial Stomp, Enveloping Cloud (keeps
the Twin alive in endurance) and Primal Rage are all optional; swap for Duration,
Strength or Range. Brief Respite over Corrosive Projection for augment-free gating.

**Helminth.** Pick one. Subsume over 1 or 3.

- **Wrathful Advance** for a 400% flat crit boost, instant red crits on Iron Staff.
- **Roar** to triple-dip Melee Influence procs.
- **Nourish** for viral on you and the Twin plus energy.
- **Pillage** for a strip and shields.

**Archon Shards.** One optional Amber cast-speed. Four Violet melee crit-damage for
Iron Staff. Five total.

**Arcanes.** Arcane Strike to offload attack speed from Iron Staff, Molt Augmented
for Strength. Arcane Fury as a swap.

**Focus.** Any. Madurai for Strength and cast speed. Naramon for combo.

**Weapon synergy.** A movement-passive melee (Okina Prime Incarnon, Ruvox) speeds
Cloudwalker. A passive companion primer (Diriga, Nautilus with Tazicor, Panzer)
primes viral and corrosive and feeds Equilibrium and Seismic Bond.

**Staying alive.** Cloudwalker resets plus shield gating plus Wukong's passive
death-defy plus crowd control. It fails only if you spend the gap between
Cloudwalker casts surrounded with the gate down, and to toxin.

**Energy.** Primed Flow plus Equilibrium plus a Synth Deconstruct pet.

**Where it struggles.** Bosses take the Iron Staff, not a nuke. Defy needs enemies
that actually hit hard to scale. Twin AI can wander.

**Variants.** A low-range pure Iron Staff build. A lazy full-tank build.

**Strengths and weaknesses.** Strong: strong exalted clear, a nuke that scales
forever, forgiving survival, cheap forma. Weak: boss-slow, Strength-light so
Iron Staff wants shards, Twin is inconsistent.

**Who runs this.** Players who want a melee frame with a self-scaling panic nuke
and a one-button reset button.

---

### Hurricane Force
**Zephyr Prime. Tornadoes that multiply your weapon's hits, behind Turbulence bullet immunity.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Area nuke, grouping, objective defense, projectile immunity |
| Difficulty | Intermediate |
| Investment | Medium. 4 forma, duration and cast-speed shards |
| Weapon reliance | High. Tornadoes redistribute your weapon's damage; the gun does the killing |

> Tenno. Turbulence deflects every bullet aimed at you, so on defense you just
> stand next to the objective. Tornadoes are damage multipliers: shoot an
> electric or gas weapon into them and every enemy caught inside eats your hit
> three times, or eleven with Funnel Clouds. Airburst vacuums a crowd into the
> funnels from 40m out. Float with Tailwind for a crit bonus and to stay off the
> ground.

**The build**

- Overextended, rank 5, Vazarin polarity
- Equilibrium, rank 10, Naramon polarity
- Primed Flow, rank 10, Naramon polarity
- Archon Stretch, rank 10, Naramon polarity
- Narrow Minded, rank 10, Vazarin polarity
- Streamline, rank 5, unpolarised
- Augur Reach, rank 5, unpolarised
- Primed Continuity, rank 10, Madurai polarity
- Aura: Brief Respite, aura slot
- Exilus: Cunning Drift, unpolarised
- Arcanes: Arcane Concentration, Arcane Circumvent

Arsenal figures land at roughly 40% Strength, 254% Duration, 214% Range, 130%
Efficiency, with 555 health, 555 shield, 135 armor and a 641 energy pool.

**How it works.** Tornado's pull and damage radius is locked at 10m regardless of
Range; three stationary tornadoes make a ~20m overlapping cluster. Range instead
boosts Airburst to ~20m so you can pull enemies from 40m+ into the cluster, and
boosts Turbulence coverage. An AoE crit weapon hitting all three tornadoes and the
enemy inside is roughly a 19x multiplier, or up to 67x with the 11-tornado Funnel
Clouds augment. Strength is dumped because it only affects the frame's own tornado
damage, not the redistributed weapon damage. *Confidence: Approximation, per the
author.*

**Playstyle.**

1. Keep Turbulence up on cooldown; stand it over defense objects.
2. Hold 4 for three stationary tornadoes, tap 4 for three homing ones.
3. Jump and hold 1 to hover for a +150% additive crit bonus and to stay off the ground.
4. Tap 2 (Airburst) near a tornado's edge to vacuum enemies in.
5. Shoot the tornadoes with an electric or gas weapon.

**Duration, Efficiency, Range, Strength.** Duration for comfortable Turbulence
uptime and faster Tailwind; Tornado's base is long and Airburst ignores it.
Efficiency from Streamline plus Primed Flow plus Equilibrium plus Archon Stretch.
Range for Airburst and Turbulence, not Tornado. Strength is irrelevant and floored.

**The mods.** *Narrow Minded, Primed Continuity* are the Duration. *Overextended,
Archon Stretch, Augur Reach* set the Range, with Archon Stretch feeding passive
energy off electric weapons in the tornadoes and Augur Reach feeding the gate.
*Streamline* is Efficiency. *Primed Flow, Equilibrium* are the energy base.
*Brief Respite* aura is backup gating.

**Flexible slots.** Funnel Clouds over Augur Message for AoE and high-spread
weapons (11 tornadoes, up to 67x). Natural Talent if you skip cast-speed shards.
Rolling Guard for the vulnerable window between Turbulence recasts. Target Fixation
for a Tailwind-slam meme.

**Helminth.** Pick one. Subsume over Tailwind or Airburst.

- **Silence** to stop Violence dispelling Turbulence and to block Eximus abilities.
- **Tempest Barrage** for a corrosive-and-viral zone that tornadoes multiply up to ~34x.
- **Nourish** for low-Strength viral on weapons without overweighting status.
- **Spectrorage** with Spectrosiphon for squad energy if you lack Arcane Energize.

**Archon Shards.** Three or more Crimson Duration. Two Amber cast-speed to drop
Natural Talent. Parkour optional. Five total.

**Arcanes.** Arcane Concentration for the Duration spread, Arcane Circumvent for a
roll-strip that pairs with grouping. Molt Efficiency or Aegis as swaps.

**Focus.** Unairu for a full armour and shield strip on a grouped tornado cluster,
which is exactly what electric and gas want at high levels. Madurai for cast speed.
Zenurik for energy.

**Weapon synergy.** AoE and high-spread weapons that hit multiple tornadoes at
once: Trumna, Kuva Zarr, Tenet Arca Plasmor, Bubonico alt-fire. Electric if the
weapon has no innate element, gas or blast if it has heat or toxin. Galvanized and
Condition Overload mods do nothing (tornadoes hold no status), so run flat damage
instead.

**Staying alive.** Turbulence blocks all projectiles; the rest is the ~30s recast
window covered by Rolling Guard and Brief Respite. It fails to melee, AoE and
environmental status that bypass Turbulence, and to a Violence dispel (bring
Silence).

**Energy.** Primed Flow plus Equilibrium plus Archon Stretch at 130% Efficiency.

**Where it struggles.** Melee enemies ignore Turbulence, so hover. The recast
window is a real vulnerability. Bosses. Single-target weapons waste the tornado
multiplier.

**Variants.** A zero-forma budget non-Prime build. A Jet Stream speedrun and
open-world build.

**Strengths and weaknesses.** Strong: near-total projectile immunity, a huge
weapon multiplier, strong grouping and defense, scales to level cap. Weak: melee-
vulnerable, recast gaps, weapon-carried, no Strength scaling.

**Who runs this.** Players who want a defense and survival frame that ignores
gunfire and turns any AoE weapon into a room-clearing nuke.

---

### Indestructible Diamond
**Citrine. A million effective HP, squad status priming, and a companion-nuke package.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Support |
| Role | Casual tank, team status prime and heal, companion DPS enabler |
| Difficulty | Beginner |
| Investment | Medium. 4 forma, cast-speed shards near-mandatory |
| Weapon reliance | Low for the frame. Damage comes from a companion or a crystal-crit weapon |

> Tenno. Citrine stacks damage reduction until nothing matters. Fractured Blast
> makes health orbs that feed Arcane Blessing's health, Health Conversion's
> armour, and Equilibrium's energy. Preserving Shell adds 90% DR for you and the
> squad, and Prismatic Gem primes status for everyone's Condition Overload. With
> the Prismatic Companion augment and Summoner's Wrath, your pet becomes a
> self-spreading nuke.

**The build**

- Equilibrium, rank 10, Naramon polarity
- Prismatic Companion, rank 3, unpolarised — augment. Prismatic Gem effects apply to a free-moving companion
- Primed Flow, rank 10, Naramon polarity
- Blind Rage, rank 10, Madurai polarity
- Archon Continuity, rank 10, Madurai polarity
- Recrystalize, rank 3, unpolarised — augment. Crystallize can be re-triggered
- Stretch, rank 5, unpolarised
- Adaptation, rank 10, Vazarin polarity
- Aura: Summoner's Wrath, aura slot
- Exilus: Cunning Drift, unpolarised
- Arcanes: Arcane Blessing, Arcane Guardian

Arsenal figures land at roughly 199% Strength, 155% Duration, 160% Range, 45%
Efficiency, with 500 health, 370 shield, 265 armor and a 513 energy pool.

**How it works.** Stacked and multiplied: Arcane Blessing (~1605 health), Health
Conversion (~1600 armour, 84% DR), Adaptation (90% DR to a type), Preserving Shell
(90% DR). Multiplied out that is about 99.84% DR and roughly one million effective
HP, enough for Steel Path to around level 500 to 1000. Fractured Blast (spam 1)
makes the orbs that fund all of it. Prismatic Gem primes status for the squad and
buffs status weapons; with Prismatic Companion and Summoner's Wrath a Kubrow or
Moa becomes a Contagious Bond feedback nuke. *Confidence: Approximation, per the
author's EHP math.*

**Playstyle.**

1. Spam 1 (Fractured Blast) everywhere for orbs, armour, health and energy.
2. Keep Preserving Shell (4) up for the 90% squad DR.
3. Keep Prismatic Gem (3) up for status priming and the weapon status buff.
4. Optionally cast Crystallize (2) and shoot the crystals for forced red crits (not with AoE weapons).

**Survivability.** EHP tanking as above, or swap Adaptation for Catalyzing Shields
plus Augur mods for a shield-gate-plus-Huras-invisibility endurance route where
spamming 1 makes you effectively unkillable.

**Duration, Efficiency, Range, Strength.** Positive Duration for Preserving Shell,
3 and 4. Efficiency dumped because 1 plus Equilibrium funds it. Range 145% to 175%
for Fractured Blast, Prismatic Gem and Crystallize. Strength wants 200% so
Fractured Blast is a guaranteed health-orb drop; beyond that it adds a second orb
and energy orbs.

**The mods.** *Blind Rage* is the Strength toward the 200% orb threshold.
*Stretch* is the Range. *Archon Continuity* is Duration plus corrosive procs for
Condition Overload. *Adaptation* is a DR layer. *Primed Flow, Equilibrium* are the
energy base. *Prismatic Companion, Recrystalize* are the augments. *Summoner's
Wrath* aura is +75% companion damage that double-dips DoTs.

**Flexible slots.** Recrystalize drops if you do not use a crystal-crit weapon.
Natural Talent is strongly recommended without cast-speed shards (3 and 4 are very
slow). Archon Vitality over Health Conversion if you lack Arcane Blessing. Mecha
Pulse for a Kubrow Mecha nuke.

**Helminth.** Pick one. Subsume over Crystallize (slow and clunky).

- **Roar** for team damage and to make Fractured Blast kill Steel Path enemies.
- **Expedite Suffering** to compress slash and toxin-heat procs for fast kills.
- **Pillage** for a full strip, shields and status cleanse.
- **Terrify** with Creeping Terrify for crowd control, slow and strip.
- **Ensnare** for grouping. **Nourish** for viral and energy.

**Archon Shards.** Two Amber cast-speed (near-mandatory for Crystallize). The rest
flexible: two violet Equilibrium to free the mod, parkour, or one Tauforged
Emerald corrosive for Archon Continuity's 13-stack 98% strip. Five total.

**Arcanes.** Arcane Blessing for health, Arcane Guardian for armour. Arcane Impetus
or Molt Augmented as swaps.

**Focus.** Any. Madurai Power Transfer helps the slow cast times. Vazarin for a
panic i-frame.

**Weapon synergy.** Crystallize red-crits favour low-crit, high-multiplier weapons
or weapons with no headshot multiplier (Nataruk, Dread Incarnon, Paris Prime
Incarnon, Kuva Nukor). For the companion nuke, a Huras Kubrow with a Paris Prime
Incarnon statstick, or a Moa with Verglas.

**Staying alive.** The DR stack, or the shield-gate route. The EHP route fails past
roughly level 1000 where hits exceed a million; toxin bypasses armour but not the
other layers.

**Energy.** Fractured Blast orbs through Equilibrium. A non-issue.

**Where it struggles.** The frame itself does almost no damage; it is a tank and
an enabler. Deep endurance outscales even a million EHP. Slow cast times without
shards.

**Variants.** A shield-gating endurance build. A Prismatic Gem DPS full-strip
Pillage build.

**Strengths and weaknesses.** Strong: enormous survivability, strong squad support
and priming, a hands-off companion nuke option, beginner-friendly. Weak: no self
damage, EHP route has a ceiling, painfully slow casts without investment.

**Who runs this.** Players who want a near-unkillable support that primes and heals
the squad while a pet does the killing.

---

### The Razor Storm
**Caliban Prime. Level-scaling Ortholyst turrets, a Razor Gyre shield engine, and a lingering strip zone.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Summoner DPS that scales with enemy level, crowd control, armour strip, shield tank |
| Difficulty | Intermediate |
| Investment | High. 5 forma, strength and cast-speed shards |
| Weapon reliance | Low. Ortholysts do the killing and get stronger the deeper you go |

> Tenno. Caliban summons Ortholysts, and their damage is multiplied by your
> Strength and by the enemy's own level, so a level-cap turret hits for numbers a
> weapon cannot reach. Razor Mortar sets them to mortar mode: three turrets, a
> storm of electric shells. Razor Gyre is your engine, spin through a crowd for
> shields and energy. Fusion Strike drops a zone that strips anything walking into
> it. Sentient Wrath slows and marks. Push Strength as high as it goes.

**The build**

- Umbral Intensify, rank 10, unpolarised
- Razor Mortar, rank 3, Zenurik polarity — augment. Ortholysts fire scaling electric mortars
- Blind Rage, rank 10, Madurai polarity
- Primed Continuity, rank 10, Madurai polarity
- Primed Flow, rank 10, Naramon polarity
- Archon Stretch, rank 10, Naramon polarity
- Transient Fortitude, rank 10, Madurai polarity
- Rolling Guard, rank 10, Vazarin polarity
- Aura: Summoner's Wrath, aura slot
- Exilus: Coaction Drift, unpolarised
- Arcanes: Molt Augmented, Arcane Camisado

Arsenal figures land at roughly 298% Strength, 128% Duration, 145% Range, 45%
Efficiency, with 370 health, 740 shield, 290 armor and a 641 energy pool.

**How it works.** Ortholyst DPS multiplies through Strength several times over: a
direct 2.5x, an exponential boost from their level scaling (their level is 30x
Strength), and Razor Mortar's electric and fire-rate multipliers (each 1 + 0.7x
Strength). The author's figure: going from 100% to 200% Strength is about 14x
damage, and 400% is about 282x. With Camisado, Molt Augmented and Madurai you
reach 400%+, and with shards 500% for roughly 800x. Fusion Strike full-strips at
200% Strength, 164% with Corrosive Projection. *Confidence: Approximation, per the
author's damage formulas.*

**Playstyle.** Invert tap/hold.

1. Hold 3 to select Ortholysts, tap 3 to summon; keep them up.
2. Cast 1 (Razor Gyre) often, and whenever shields break, to restore shields, gain energy, group and trigger Razor Mortar.
3. Cast 4 (Fusion Strike) for the 20m+ lingering strip zone.
4. Cast Sentient Wrath frequently for the slow, the damage vulnerability and Tau status.

**Survivability.** Shield tanking for casual and base Steel Path (shields' innate
50% plus Caliban's passive 50% adaptation, plus Adaptation itself for 95%). Shield
gating for endurance: overshields from 1 or 3 count for the full 2.5s gate, so
spinning in Razor Gyre with over 1150 overshield resets it every time. Do not run
Augur mods; they overwrite the 2.5s gate with a tiny one. *Confidence:
Approximation, per the author.*

**Duration, Efficiency, Range, Strength.** Positive Duration for Lethal Progeny and
Razor Mortar uptime. Efficiency at 45% because Razor Gyre nets energy per enemy
hit; 100% if you drop Blind Rage. Range 145% to 235% for all abilities. Strength
is the entire build.

**The mods.** *Blind Rage, Transient Fortitude, Umbral Intensify* are the Strength
stack, with *Primed Continuity* holding Duration. *Archon Stretch* is Range plus
passive energy off Razor Mortar. *Primed Flow* is the pool. *Rolling Guard* is
the status cleanse. *Summoner's Wrath* aura is a faction-style buff for the
Ortholysts that double-dips their electric status. *Razor Mortar* is the turret
damage form.

**Flexible slots.** Transient Fortitude or Rolling Guard to Overextended for more
Range. Coaction Drift in the exilus boosts Summoner's Wrath to ~99%. Adaptation
over Rolling Guard for passive tank.

**Helminth.** Pick one. Subsume over Razor Gyre, Sentient Wrath, Lethal Progeny or
Fusion Strike depending on focus.

- **Nourish** over 4 for viral on Lethal Progeny and weapons plus an energy multiplier.
- **Roar** over a slot for status weapons, though Summoner's Wrath is already a large summon buff.
- **Brightbonnet** for even more Strength and Ortholyst DPS.
- **Shock** with Shock Trooper for an electric add to Ortholysts out of mortar mode and to influence melees.

**Archon Shards.** One to two Amber cast-speed. Two to three Crimson strength. Two
parkour. Five total.

**Arcanes.** Arcane Camisado for a fast 60% Strength off the summons, Molt
Augmented for another 60%. Molt Efficiency as a Duration swap.

**Focus.** Madurai for 50% cast speed on Fusion Strike and 40% Strength.

**Weapon synergy.** Caliban's abilities apply Tau status, a final status-DPS
multiplier, so status weapons pair best: Torid Incarnon, Boar Incarnon, Strun,
Kuva Nukor, influence melees. A companion (Diriga, Hound) that primes puncture,
corrosive and cold buffs the Ortholysts directly.

**Staying alive.** Overshield gating off Razor Gyre plus Sentient Wrath's slow
plus Rolling Guard. It fails if you stop spinning with the gate down, and to
Augur mods breaking the long gate.

**Energy.** Razor Gyre nets energy per hit. Arcane Steadfast and Archon Stretch
back it up.

**Where it struggles.** Slow at low levels where Ortholysts have little to scale
against. Bosses. The 5-forma cost and the reliance on hitting very high Strength.

**Variants.** A hyper-mobile endurance variant. A Pyrotechnics Flechette variant.

**Strengths and weaknesses.** Strong: damage that scales with the enemy forever,
strong crowd control and strip, self-sustaining shields, low weapon investment.
Weak: weak early, boss-blind, forma-hungry, wants extreme Strength to shine.

**Who runs this.** Players who want a summoner whose turrets out-damage weapons the
deeper the endurance run goes.

---

### Galactic Immunisation Program
**Vauban Prime. Flechette Orbs that scale with enemy level, plus a Photon Strike nuke.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Scaling ability DPS, grouping, armour strip, damage buff |
| Difficulty | Advanced. Minelayer, Bastille or Vortex, Photon Strike and a crit-stack setup |
| Investment | Very high. 6 forma, strength and cast-speed shards |
| Weapon reliance | Low. Flechette and Photon Strike do the killing |

> Tenno. Vauban lays traps. Flechette Orbs fire nails whose damage is multiplied
> by enemy level, faster than enemy health scales, so at level cap each nail
> nearly one-shots a heavy gunner with no priming. Photon Strike is an on-demand
> blast nuke. Bastille lifts and strips, Vortex groups, Overdriver buffs your
> damage. Set the orbs on a wall at head height and let the room walk into them.

**The build**

- Umbral Intensify, rank 10, unpolarised
- Overextended, rank 5, Vazarin polarity
- Equilibrium, rank 10, Naramon polarity
- Primed Flow, rank 10, Naramon polarity
- Catalyzing Shields, rank 3, Vazarin polarity
- Archon Stretch, rank 10, Naramon polarity
- Blind Rage, rank 10, Madurai polarity
- Primed Continuity, rank 10, Madurai polarity
- Aura: Brief Respite, aura slot
- Exilus: Ice Spring, Vazarin polarity
- Arcanes: Molt Augmented, Arcane Sculptor

Arsenal figures land at roughly 183% Strength, 155% Duration, 235% Range, 45%
Efficiency, with 370 health, 370 shield, 210 armor and a 641 energy pool.

**How it works.** Flechette Orb damage multiplies by `1 + enemy level / 10` on top
of Strength, Vauban's passive, Overdriver, and optional crit-stack multipliers, so
it scales past enemy EHP. The author's figure: about 200,000 per nail at level
101, about 15 million at level 9999, 90 million with 10 viral. Arcane Sculptor
triggers off multiple abilities and locks 175% Efficiency, letting Blind Rage run
at 45% arsenal Efficiency. *Confidence: Approximation, per the author's calculator.*

**Playstyle.**

1. Hold 2 for a Vector-Overdriver, step on it for a damage and speed buff.
2. Tap 2 to lay up to four Flechette-Tether orbs in the area you want to hold, at head height on a wall.
3. Tap 4 for up to four Bastilles to lift and strip; hold 4 to collapse into a grouping Vortex, or cast Vortex first then Bastilles for both.
4. Spam tap 3 (Photon Strike) into the group or freely while moving.

**Duration, Efficiency, Range, Strength.** Positive Duration for Minelayer,
Bastille and Vortex, and buff uptime. Efficiency solved by Sculptor. Range for
Bastille and Vortex reach, tether grab and Photon Strike radius. Strength for
Flechette and Photon Strike damage, Overdriver, and the strip speed.

**The mods.** *Blind Rage, Umbral Intensify* are the Strength, covered by *Arcane
Sculptor*. *Overextended, Archon Stretch* set the Range, with Archon Stretch
feeding passive energy. *Primed Continuity* holds Duration. *Primed Flow,
Equilibrium* are the energy base. *Catalyzing Shields* locks the gate. *Brief
Respite* aura feeds it.

**Flexible slots.** Augur Reach flexes for Rolling Guard, Photon Repeater (Photon
Strike spam economy), Enduring Bastille, Tesla Bank, or Vigorous Swap. Corrosive
Projection over Brief Respite with Catalyzing Shields plus one Augur mod
elsewhere. The exilus is open.

**Helminth.** Pick one. Subsume over 1.

- **Nourish** for viral Flechettes, an energy multiplier, and fast Vortex viral.
- **Roar** for a smaller multiplier that also hits Photon Strike and double-dips blast.

**Archon Shards.** Two Amber cast-speed. Two Crimson strength. One flexible
(parkour). Five total.

**Arcanes.** Arcane Sculptor for the Efficiency lock, Molt Augmented for Strength.
For a max-Flechette build: Arcane Hot Shot plus Arcane Crepuscular for crit, with
Naramon's Lethal Levitation on top.

**Focus.** Naramon for Lethal Levitation's 300% Flechette buff. Vazarin Sling as a
backup. Madurai for Strength and cast speed.

**Weapon synergy.** Mutalist Quanta lets Flechettes pass through its orbs for
electric, flat crit chance and crit damage. Tenet Glaxion or a Grimoire with Xata
Invocation for energy. A Huras Kubrow or Shade for invisibility to enable Arcane
Crepuscular on Flechette.

**Staying alive.** Shield gating off 2 and 4 plus Bastille and Vortex crowd
control. It fails in the gap between casts if you cannot gate, and to toxin.

**Energy.** Arcane Sculptor plus Equilibrium plus Archon Stretch.

**Where it struggles.** Weak at low levels where Flechette has little to scale
against. The rotation is genuinely busy. Bosses need Photon Strike or the weapon.
6 forma is a heavy ask.

**Variants.** A hyperactive mobile endurance build. A Pyrotechnics Flechette
build. A Photon Repeater spam build. An infinite Vortex plus Spectrosiphon build.

**Strengths and weaknesses.** Strong: damage that scales with the enemy, strong
grouping and strip, an on-demand nuke, low weapon investment. Weak: weak early,
high complexity, forma-hungry, boss damage needs Photon Strike.

**Who runs this.** Players who want a trap-frame whose orbs get lethal exactly
when the endurance run gets hard.

---

### Fantastic Funguy
**Nokko. A bouncing Sporespring toxin nuke launched off a Brightbonnet, cast from immortality.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Toxin room nuke, self-immortal caster, minor squad energy support |
| Difficulty | Intermediate. The Brightbonnet-then-triple-Sporespring rhythm |
| Investment | High. 5 forma, toxin and cast-speed shards |
| Weapon reliance | Very low. Sporespring is the damage; a viral primer helps |

> Tenno. Nokko grows mushrooms. Brightbonnet is a trampoline that pulses energy
> and doubles your Strength when you throw a Sporespring into it. Sporespring is a
> ball that bounces ten times, each bounce multiplying its damage and adding crit
> chance, ending in a forced-toxin nuke. Cast three at the Brightbonnet, dive into
> Reroot to be immortal and unseen, and wait for the room to dissolve.

**The build**

- Augur Reach, rank 5, unpolarised
- Umbral Intensify, rank 10, unpolarised
- Primed Flow, rank 10, Naramon polarity
- Transient Fortitude, rank 10, Madurai polarity
- Blind Rage, rank 10, Madurai polarity
- Stretch, rank 5, Naramon polarity
- Overextended, rank 5, Vazarin polarity
- Archon Continuity, rank 10, Madurai polarity
- Aura: Corrosive Projection, aura slot
- Exilus: Cunning Drift, unpolarised
- Arcanes: Molt Augmented, Arcane Crepuscular

Arsenal figures land at roughly 238% Strength, 128% Duration, 280% Range, 45%
Efficiency, with 250 health, 400 shield, 135 armor and a 513 energy pool.

**How it works.** Sporespring deals 2500 base toxin plus a 1250/s forced toxin
DoT, multiplied by Strength; Brightbonnet adds 30% x Strength, doubled if you
throw a Sporespring into it first. Each of the 10 bounces multiplies damage by
1.5x and adds 25% crit chance. While in Reroot (which counts as invisibility)
Arcane Crepuscular's flat crit-damage add pushes the final bounce to red crits.
The author's figure: about 677 million lifetime damage per Sporespring with Roar
and toxin shards, near 3 billion with 10 viral. *Confidence: Approximation, per
the author's spreadsheet.*

**Playstyle.**

1. Optional: cast Stinkbrains (tap 1) around the map for viral and sleep, or keep your subsume active instead.
2. Cast a Brightbonnet (tap 2) under you and jump on it for energy and Strength.
3. Cast Sporespring (tap 4) three times fast at the Brightbonnet.
4. Enter Reroot to be immortal and unseen; wait for all bounces, then pop out and repeat.

**Survivability.** Reroot is total invulnerability. Between casts, shield gate off
your constant ability casting (Augur mods or Brief Respite), and if you die you
revive by touching one of your mushrooms, so always keep a Brightbonnet nearby.
Huras or Shade keeps you invisible so Reroot is a bonus rather than a crutch.
*Confidence: Approximation, per the author.*

**Duration, Efficiency, Range, Strength.** Duration only for the 1 and 2 mushrooms
and Reroot; it does not touch Sporespring. Efficiency negative because Brightbonnet
pulses energy scaled by Strength. Range is the priority, maxed, so Sporespring's
zero-falloff explosions hit the whole room. Strength is second, driving the nuke
and the Brightbonnet boost.

**The mods.** *Blind Rage, Transient Fortitude, Umbral Intensify* are the Strength.
*Overextended, Stretch, Augur Reach* set the maxed Range, with Augur Reach also
feeding the gate. *Primed Flow* is the pool. *Archon Continuity* is Duration plus
corrosive procs off Sporespring's toxin. *Corrosive Projection* helps the early
bounces.

**Flexible slots.** Precision Intensify over Umbral Intensify if not subsuming
Roar. The aura and exilus are open.

**Helminth.** Pick one. Subsume over 1 (mobile or endurance) or 3 (stationary).

- **Roar** for Sporespring damage and a toxin double-dip.
- **Breach Surge** for homing sparks off Sporespring's damage and toxin, double-dipped by Crepuscular.

**Archon Shards.** Two Amber cast-speed for the triple-Sporespring cast. Three
Emerald toxin-status damage (the highest lifetime-damage shard). Five total.

**Arcanes.** Arcane Crepuscular for the flat crit-damage add in Reroot (this is
what makes the final bounce red-crit), Molt Augmented for Strength. Note Nourish,
Camisado, Hotshot and Arachne do not affect Sporespring.

**Focus.** Madurai for Strength and cast speed. Any works given the immortality.

**Weapon synergy.** None specific. Spore-themed weapons (Coda Sporothrix,
Sporelacer) for flavour and viral spread; a viral primer or Shade with Tazicor
for the 10-stack multiplier.

**Staying alive.** Reroot immortality plus shield gating plus mushroom revive. It
fails only if you have no mushroom down when you die.

**Energy.** Brightbonnet pulses cover the 45% Efficiency cost.

**Where it struggles.** Bosses (Sporespring targets centre mass and does not
special-case them). Very open tiles where enemies spread past even 280% Range's
bounce reach. The setup rhythm is unforgiving if you fumble the triple cast.

**Variants.** A Precision Intensify non-Roar build. A health-tank build for
sub-level-500.

**Strengths and weaknesses.** Strong: enormous room-clear numbers, true immortality
on tap, self-revive, squad energy from Brightbonnet. Weak: boss-blind, setup-
dependent, wants a primer for the ceiling, 5 forma.

**Who runs this.** Players who want a toxin nuke frame that literally cannot die
while it waits for the room to melt.

---

### Divine Shield Lotus
**Nezha Prime. Chakram vulnerability and Divine Retribution status spread, behind Warding Halo.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Status-spread nuke, crowd control, armour strip, near-immortal |
| Difficulty | Beginner to intermediate |
| Investment | Very low. 1 forma |
| Weapon reliance | High. A DoT weapon feeds Divine Retribution; the frame amplifies and spreads it |

> Tenno. Nezha wraps himself in Warding Halo for 90% damage reduction and status
> immunity, then goes to work. Blazing Chakram tags a crowd with a damage
> vulnerability and drops health and energy orbs on every kill, so energy is
> infinite. Divine Spears pins a group and lets Chakram multiply across it. Divine
> Retribution takes the status your weapon applied and expedites it into a
> map-wide nuke. Pillage strips and refills your shields.

**The build**

- Stretch, rank 5, unpolarised
- Fleeting Expertise, rank 5, unpolarised
- Blind Rage, rank 10, Madurai polarity
- Primed Flow, rank 10, Naramon polarity
- Augur Reach, rank 5, unpolarised
- Divine Retribution, rank 3, unpolarised — augment. Divine Spears expedites weapon status in an area
- Overextended, rank 5, Vazarin polarity
- Equilibrium, rank 10, Naramon polarity
- Aura: Corrosive Projection, Naramon polarity
- Exilus: Cunning Drift, unpolarised
- Arcanes: Arcane Steadfast, Molt Augmented

Arsenal figures land at roughly 139% Strength, 40% Duration, 280% Range, 105%
Efficiency, with 465 health, 185 shield, 265 armor and a 641 energy pool.

**How it works.** Negative Duration is a feature: Divine Spears ends sooner, which
expedites all the accumulated weapon status at once, and lets you recast on a new
group faster; it also speeds Pillage's shield return so it lands inside the 2.5s
gate. Blazing Chakram's kills drop a guaranteed health orb (55 energy through
Equilibrium) and a 35% energy orb, so ten kills is 550+ energy. Strength only
needs the Pillage strip threshold and the Chakram vulnerability. *Confidence:
Approximation, per the author.*

**Playstyle.**

1. Cast Warding Halo; recast when it breaks.
2. Cast Divine Spears into a crowd to pin them.
3. Cast Chakram at a speared enemy so it multiplies and tags the group; kill the tagged for orbs and to spread DoTs.
4. Spam Pillage to gate and strip.

**Survivability.** Endurance leans on Pillage overshield gating (2.5s over 1150
overshield), Divine Spears crowd control, Warding Halo's 3s activation and 2s
break i-frames, and optional Rolling Guard. Base Steel Path just shield-tanks on
Warding Halo's 90% DR plus Pillage refills. *Confidence: Approximation, per the
author.*

**Duration, Efficiency, Range, Strength.** Negative Duration as above. Efficiency
neutral-to-positive via Fleeting Expertise plus the Chakram-Equilibrium loop. Range
maxed for Divine Retribution's spread (~35m at 250%). Strength for the strip and
the Chakram vulnerability.

**The mods.** *Blind Rage* is the Strength, offset by *Fleeting Expertise* for
Efficiency. *Overextended, Stretch, Augur Reach* set the maxed Range, with Augur
Reach feeding the gate. *Primed Flow* is the pool. *Equilibrium* converts Chakram
orbs. *Divine Retribution* is the nuke. *Corrosive Projection* lowers the strip
threshold.

**Flexible slots.** Fleeting Expertise to Transient Fortitude or Augur Reach for a
45%-Efficiency style. Reaping Chakram for more orbs and Chakram DPS. The exilus is
open.

**Helminth.** Pick one.

- **Pillage** is the default: strip, shields, status cleanse, and it likes the negative Duration.
- **Nourish** for viral and energy (add some Duration back).
- **Breach Surge** to double-dip the Chakram vulnerability on sparks.
- A **grouping** ability (Pull, Airburst, Ensnare) for high Range and negative Duration.
- **Reave** for a Chakram-boosted one-shot to level cap.

**Archon Shards.** Two Amber cast-speed. Three Crimson strength, or two parkour.
Five total.

**Arcanes.** Arcane Steadfast for free casts on a negative-Efficiency high-cost
ability, Molt Augmented for Strength. Arcane Aegis as a survival swap.

**Focus.** Any. Vazarin Sling as a backup. Madurai for Strength and cast speed.

**Weapon synergy.** Any weapon with strong DoTs feeds Divine Retribution: Paris
Incarnon, Sporothrix, Torid, Kuva Zarr, influence melees, Kuva Nukor.

**Staying alive.** Pillage overshield gating plus Warding Halo plus Divine Spears
crowd control. It fails if Warding Halo lapses with the gate down, and to toxin.

**Energy.** The Chakram-Equilibrium loop is a river once it starts.

**Where it struggles.** A cold start before Chakram is up. Bosses. Needs a DoT
weapon to nuke at all.

**Variants.** A no-helminth Firewalker build. A Reave nuke build.

**Strengths and weaknesses.** Strong: strong status nuke, infinite energy, near-
immortal, one forma. Weak: weapon-carried, boss-blind, cold start.

**Who runs this.** Players who want a cheap, durable frame that turns a
status weapon into a map nuke.

---

### Control and Assimilate
**Nyx Prime. Permanent Assimilate immortality with a banked-damage nuke and a strip.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Immortal caster, banked nuke, armour and shield strip, mind-control buff |
| Difficulty | Beginner |
| Investment | Very low. 1 forma |
| Weapon reliance | Medium. A mind-control weapon or the banked nuke does the damage |

> Tenno. Assimilate is a bubble you carry. Inside it Nyx and her sentinel cannot
> be hurt, it scales to level cap, and it lasts over six minutes. It costs
> mobility, but you can roll, and dropping the bubble after banking enough damage
> nukes 50m and hands you a 400% damage buff. Psychic Bolts strip armour and
> shields and steal overguard. Mind Control turns a heavy into a damage
> multiplier.

**The build**

- Assimilate, rank 3, unpolarised — augment. Absorb becomes a mobile, scaling invulnerability
- Pacifying Bolts, rank 3, unpolarised — augment. Psychic Bolts gain a long stun and forced radiation
- Mind Freak, rank 3, unpolarised — augment. Mind Control target deals more damage
- Primed Continuity, rank 10, Madurai polarity
- Streamline, rank 5, unpolarised
- Stretch, rank 5, unpolarised
- Equilibrium, rank 10, Naramon polarity
- Primed Flow, rank 10, Naramon polarity
- Aura: Corrosive Projection, Naramon polarity
- Exilus: Preparation, unpolarised
- Arcanes: Molt Efficiency, Arcane Consequence

Arsenal figures land at roughly 100% Strength, 155% Duration, 145% Range, 130%
Efficiency, with 370 health, 465 shield, 135 armor and a 641 energy pool.

**How it works.** Assimilate's drain is set by a Duration-Efficiency pairing: at
this build's 155% Duration you need about 175% Efficiency (Streamline plus Seismic
Bond, or Streamline plus Fleeting Expertise) to hit the drain floor and hold it
indefinitely. Exiting after absorbing 64,000 damage gives 6s of i-frames, a 400%
additive damage buff for ~12s, and a nuke up to 50m. Psychic Bolts full-strip at
125% Strength, 103% with Corrosive Projection. *Confidence: Approximation, per the
author's Duration and Efficiency table.*

**Playstyle.**

1. Tap 4 to enter Assimilate for total immortality. Exit after banking damage to nuke and to move normally with the buff.
2. Tap 1 on an enemy for Mind Control, then damage it fast to buff its damage.
3. Tap 2 for Psychic Bolts to strip, steal overguard and spread on kill.
4. Tap 3 (Chaos) for crowd control if defending an objective.

**Duration, Efficiency, Range, Strength.** Duration and Efficiency are paired to
the drain floor (see the author's brackets). Range only matters for Chaos, and
even Assimilate's nuke radius scales with banked damage. Strength only for the
Psychic Bolts strip threshold and Mind Freak.

**The mods.** *Assimilate* is the whole build. *Streamline* plus the Duration mods
hit the drain floor. *Primed Flow, Equilibrium* are the energy base. *Stretch* is
Chaos range. *Pacifying Bolts, Mind Freak* are optional augments. *Corrosive
Projection* lowers the strip threshold to 103%.

**Flexible slots.** Streamline drops if you run Seismic Bond. Amar's Hatred for
strength and a heavy-attack teleport for mobility in Assimilate. The exilus is
open (Preparation for an instant mission-start Assimilate).

**Helminth.** Pick one. Subsume over Chaos (3) unless you need objective crowd
control.

- **Nourish** for a damage and energy buff that also buffs the Mind Control ally.
- **Roar** for a damage buff that double-dips status and buffs the Mind Control target.
- **Xata's Whisper** for raw weapon damage and headshots.
- **Pillage** for a radial strip.

**Archon Shards.** One Amber cast-speed. Two parkour for rolling speed in
Assimilate. Two Crimson Duration for the drain brackets. Five total.

**Arcanes.** Molt Efficiency for Mind Control uptime, Arcane Consequence for
parkour. Arcane Agility or a weapon arcane as swaps.

**Focus.** Any. A robotic companion (sentinel, Hound, Moa) is immortal in
Assimilate; equip Seismic Bond for the Efficiency threshold.

**Weapon synergy.** Nyx's passive gives up to 200% additive crit chance to
primaries and secondaries. For Mind Control buffing, a multiplicative Galvanized
Shot secondary (Ballistica Incarnon, Prisma Angstrum Incarnon, Kuva Seer, Epitaph)
plus a primer can reach 20,000% to 40,000%. Secondary Irradiate off Chaos's
radiation.

**Staying alive.** Assimilate is total immortality while active; exiting gives a
6s i-frame bridge and overguard from Psychic Bolts. It effectively does not fail
while 4 is up.

**Energy.** The Duration-Efficiency floor plus Equilibrium. A non-issue once tuned.

**Where it struggles.** Mobility is the cost: you roll everywhere or use a teleport
melee. Damage is entirely on the weapon or the banked nuke. Bosses.

**Variants.** A Nourish Nyx build. A Roar Nyx build.

**Strengths and weaknesses.** Strong: unconditional immortality that scales to
level cap, a strip, a banked nuke, one forma, beginner-proof. Weak: slow, weapon-
carried, boss damage on the gun.

**Who runs this.** Players who want to simply not die, ever, and are fine trading
speed for it.

---

### Loyal Waverider
**Yareli Prime. Double-stacked Sea Snare vulnerability and a pistol crit passive, off the board.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap, Weapon platform |
| Role | Secondary-weapon platform with one of the largest damage debuffs in the game |
| Difficulty | Beginner to intermediate |
| Investment | Low. 2 forma |
| Weapon reliance | Total. Yareli buffs and protects; a secondary weapon does everything |

> Tenno. Loyal Merulina lets you keep normal footing while Merulina floats beside
> you like a pet, casting its own Sea Snares. Your Sea Snares and Merulina's stack
> multiplicatively, so a target caught in both takes a 9x hit at 200% Strength, as
> strong as a 400% Mirage's Eclipse. On top of that, moving gives your pistols a
> flat 200% crit chance. Double-tap 2 for a 4-second i-frame whenever you need it.

**The build**

- Energy Nexus, rank 5, unpolarised
- Loyal Merulina, rank 3, unpolarised — augment. Merulina follows you and auto-casts Sea Snares
- Boreal's Hatred, rank 5, Vazarin polarity
- Fast Deflection, rank 5, unpolarised
- Stretch, rank 5, Naramon polarity
- Umbral Intensify, rank 10, unpolarised
- Streamline, rank 5, unpolarised
- Primed Continuity, rank 10, Madurai polarity
- Aura: Corrosive Projection, aura slot
- Exilus: Ice Spring, Vazarin polarity
- Arcanes: Arcane Precision, Molt Augmented

Arsenal figures land at roughly 144% Strength, 155% Duration, 145% Range, 145%
Efficiency, with 370 health, a 1073 shield pool, 105 armor and a 315 energy pool.

**How it works.** Max Efficiency is the point: at 175% Efficiency Merulina
auto-casts Sea Snares every 0.5s instead of every 2s, and every cast costs about 6
energy. Two overlapping Sea Snares multiply: at 200% Strength that is 3x times 3x
for 9x, and Strength's effect is magnified through the stacking (300% Strength
takes it to 16x). Yareli's passive adds a flat 200% pistol crit chance while
moving. *Confidence: Approximation, per the author.*

**Playstyle.**

1. Cast 1 (Sea Snares) whenever enemies are near.
2. Double-tap 2 whenever shields break or you need cover for the 4s i-frame; keep Merulina up.
3. Keep a subsumed buff on 3 up if you run one.
4. Tap 4 (Riptide) occasionally to group.

**Survivability.** Merulina gating: double-tapping 2 with Loyal Merulina active
gives the full 4s of invulnerability every time. Fast Deflection plus Boreal's
Hatred shorten the recharge delay so you come out of the i-frame with a shield
buffer for a second gate. Sea Snares also passively crowd-control. Or just stay in
Merulina with Adaptation for 99% DR in casual content. *Confidence: Approximation,
per the author.*

**Duration, Efficiency, Range, Strength.** Efficiency is maxed and is the priority.
Duration is neutral-to-positive for a subsumed buff and Sea Snare linger. Range
only for Riptide grouping (Sea Snares' base 30m is plenty). Strength boosts the
Sea Snare vulnerability, magnified hard by the stacking.

**The mods.** *Umbral Intensify* is the Strength. *Streamline* is the Efficiency
toward the 175% threshold (with Seismic Bond or Fleeting Expertise filling the
rest). *Primed Continuity* holds Duration. *Fast Deflection, Boreal's Hatred* are
the passive-gate package. *Energy Nexus* is a small but now-meaningful energy
trickle. *Stretch* is Riptide range.

**Flexible slots.** Energy Nexus flexes for Archon Stretch, a Dethcube, or a violet
Equilibrium shard. More Strength or Duration in the flex. Do not add a cast-speed
shard if you run Madurai Power Transfer, or the i-frame can cancel itself.

**Helminth.** Pick one. Subsume over Aquablades (3).

- **Roar** to double-dip DoTs.
- **Xata's Whisper** for raw damage, headshots and Thrax.
- **Nourish** for viral and energy.
- **Shock** with Shock Trooper for an electric add.
- **Silence** or **Omamori** for an even lazier survival layer.

**Archon Shards.** Two to four Crimson strength for the Sea Snare vulnerability.
Two to four Topaz secondary crit-chance optional. One violet Equilibrium optional.
Five total.

**Arcanes.** Arcane Precision for a large pistol headshot buff, Molt Augmented for
Strength. Arcane Pistoleer or Velocity as swaps.

**Focus.** Any. Corrosive Projection aura already covers armour. Avoid a cast-speed
shard with Madurai.

**Weapon synergy.** High-base-crit secondaries to use the Critical Flow passive:
Dual Toxocyst Incarnon, Furis Incarnon, Prisma Angstrum Incarnon, Sicarus Prime
Incarnon. Low-crit options (Kompressa, Kuva Nukor) work through Secondary Enervate
or raw strength. Furax Wraith Incarnon as a holstered combo melee.

**Staying alive.** The 4s Merulina gate plus the shield buffer plus Sea Snare
crowd control. It fails only if a very high cast speed cancels the i-frame, and
to knockdowns Merulina does not block (bring Primed Sure Footed).

**Energy.** Max Efficiency makes casts nearly free; Energy Nexus plus orbs cover it.

**Where it struggles.** Entirely weapon-carried. Bosses need the gun. Knockdowns
slip through Merulina.

**Variants.** An ultra-comfort Seismic Bond plus Nourish endurance build. A Gloom
tank Merulina Guardian board build. A Surging Aquablades DPS build.

**Strengths and weaknesses.** Strong: one of the biggest damage multipliers in the
game, a flat pistol crit passive, a reliable 4s panic i-frame, cheap forma. Weak:
does no damage itself, boss-blind, knockdown-vulnerable, cast-speed quirk.

**Who runs this.** Players who have a favourite secondary and want a frame that
makes it hit 9 to 16 times harder while keeping them alive.

---

### The Faceless Rider
**Dagath. Spectral Spirit immortality feeding a Doom-and-Rakhali strip nuke.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Immortal caster nuke, armour strip, near-total slow, weapon platform |
| Difficulty | Intermediate |
| Investment | High. 5 forma, duration and cast-speed shards |
| Weapon reliance | Low to medium. Rakhali nukes; a crit weapon uses the Grave Spirit buff |

> Tenno. Grave Spirit with the Spectral Spirit augment makes you invulnerable for
> 30 seconds at a time, and kills cut its cooldown by a second each, so it is
> effectively always on. Wyrd Scythe throws sickles that slow and apply viral.
> Doom marks a crowd so damage you deal is banked and dealt again as true damage.
> Rakhali's Cavalry strips and nukes the marked. Spam 1, 2, 4 and never drop 3.

**The build**

- Catalyzing Shields, rank 3, Vazarin polarity
- Spectral Spirit, rank 3, unpolarised — augment. Force Spectral Form: invulnerability, orb drops, forced Doom
- Constitution, rank 3, unpolarised
- Equilibrium, rank 10, Naramon polarity
- Primed Flow, rank 10, Naramon polarity
- Narrow Minded, rank 10, Vazarin polarity
- Primed Continuity, rank 10, Madurai polarity
- Blind Rage, rank 10, Madurai polarity
- Aura: Brief Respite, Zenurik polarity
- Exilus: Primed Sure Footed, Vazarin polarity
- Arcanes: Arcane Concentration, Molt Augmented

Arsenal figures land at roughly 199% Strength, 282% Duration, 34% Range, 45%
Efficiency, with 666 health, 250 shield, 125 armor and a 641 energy pool.

**How it works.** Max Duration pushes Spectral Spirit to 30s+ of invulnerability
per activation, and its 25s cooldown drops 1s per kill, so 25 kills (a few
seconds of Rakhali or gunfire) resets it. It also gives a 100% health-orb drop on
kill, which Equilibrium turns into 55 energy each, so energy is a flood. Range is
dumped to 34% because Doom spreads between enemies within 15m of a Wyrd-Scythe hit
regardless of your Range, and Spectral Spirit lets weapons and Rakhali self-apply
Doom from any range. *Confidence: Approximation, per the author.*

**Playstyle.**

1. Activate Grave Spirit (tap 3) at mission start and whenever it is off cooldown.
2. Cast Wyrd Scythe (tap 1): 7 auto-targeting sickles, slow plus forced viral.
3. Cast Doom (tap 2) within Wyrd Scythe's 1s delay to mark a crowd; it spreads on hit.
4. Cast Rakhali's Cavalry (tap 4) to strip and nuke the marked.
5. Rotation: spam 1, 2, 4; keep 3 up.

**Survivability.** Spectral Spirit invulnerability covers most of the mission;
between activations, Catalyzing Shields (max shields 50) plus Brief Respite plus an
Augur mod gives a full 1.33s gate off one cast of 2 or 4, and casting 4 is
preferred for its innate i-frames. Wyrd Scythe's slow means little reaches you
anyway. *Confidence: Approximation, per the author.*

**Duration, Efficiency, Range, Strength.** Max Duration for Spectral Spirit.
Efficiency dumped because of the orb flood plus Dagath's passive that quadruples
orb value 35% of the time. Range dumped as above. Strength for the slow (95% cap
at 272%), the banked damage (100% at 286%), and the Rakhali strip, though ~140%
strips consistently since a horse hits multiple times.

**The mods.** *Blind Rage* is the Strength. *Narrow Minded, Primed Continuity,
Constitution* are the max Duration, and Narrow Minded's Range cost is free.
*Primed Flow, Equilibrium* are the energy flood. *Catalyzing Shields* is the gate
lock. *Brief Respite* aura feeds it. *Spectral Spirit* is the immortality.

**Flexible slots.** Natural Talent, Madurai or an Amber shard is mandatory for
Rakhali's slow cast. Catalyzing Shields and Rolling Guard are optional if you use
Vazarin Sling. Augur Message or Nira's Hatred for more Duration.

**Helminth.** Pick one. Subsume over 1 or 4, never over Doom (you keep Doom
application via Spectral Spirit but lose its Strength scaling).

- **Roar** over 1 for Rakhali and weapon damage.
- **Wrathful Advance**, **Eclipse**, **Energized Munitions**, **Xata's Whisper** or **Nourish** over 4 for a weapon platform.
- **Breach Surge** to semi-double-dip the Grave Spirit crit buff on sparks.
- **Reave** over 4: Doom banking drops the one-shot threshold to 181% Strength with 10 viral.

**Archon Shards.** One Amber cast-speed for Rakhali. One to two Tauforged Crimson
Duration. One Violet Equilibrium to free the mod. Parkour to taste. Five total.

**Arcanes.** Arcane Concentration for more Duration, Molt Augmented for Strength.
Arcane Ice Storm with a cold weapon as a swap.

**Focus.** Madurai for cast speed and Strength. Vazarin Sling as a backup.

**Weapon synergy.** High-crit weapons for the Grave Spirit crit-damage buff: Torid
Incarnon, Miter Incarnon, Kuva Chakkhurr, Nataruk, Knell Prime. Note Doom steals
kills and blocks on-kill effects, so drop Galvanized mods and kill-dependent
arcanes for the static variants.

**Staying alive.** Spectral Spirit immortality plus the between-activation shield
gate plus the Wyrd Scythe slow. It effectively does not fail while you keep
getting kills to reset the cooldown.

**Energy.** The Spectral Spirit orb flood through Equilibrium. A river.

**Where it struggles.** Bosses. Doom stealing kills can disrupt weapon build-up.
The Rakhali cast is slow without a cast-speed source. 5 forma.

**Variants.** A no-augment shield-gate build. A pure weapon platform. A Reave nuke
build.

**Strengths and weaknesses.** Strong: near-permanent immortality, a strip nuke,
a top-tier slow, an energy flood, huge Helminth flexibility. Weak: boss-blind,
slow Rakhali cast, Doom interferes with kill-based weapon mechanics.

**Who runs this.** Players who want an immortal caster that strips and nukes and
can be rebuilt into almost any weapon platform.

---

### Flux Dancer
**Gyre Prime. Rotorswell and Conductive Sphere electric spread on a dash-strip weapon platform.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap, Weapon platform |
| Role | Electric weapon platform, passive area damage, dash strip, passive shield gate |
| Difficulty | Intermediate |
| Investment | Low. 3 forma |
| Weapon reliance | High. Rotorswell falls off; an electric weapon through Conductive Sphere does the work |

> Tenno. Gyre electrifies the room. Cathode Grace self-sustains once you get kills,
> feeding energy and crit chance. Rotorswell hangs an electric aura on you that
> chains off every crit you land. Conductive Sphere is an orb you shoot through
> for forced electric procs and a damage bonus. Dash through enemies with the
> fluxing animation to strip armour, shields and overguard and steal it. Set 3 and
> 4, then platform.

**The build**

- Conductive Sphere, rank 3, Zenurik polarity — augment. Shots through the orb gain forced electric and a damage bonus
- Cathode Current, rank 3, unpolarised — augment. Rotorswell duration extends on kills, plus an extra discharge
- Overextended, rank 5, Vazarin polarity
- Catalyzing Shields, rank 3, Vazarin polarity
- Vigilante Vigor, rank 5, unpolarised
- Fast Deflection, rank 5, unpolarised
- Archon Stretch, rank 10, Naramon polarity
- Blind Rage, rank 10, Madurai polarity
- Aura: Corrosive Projection, Naramon polarity
- Exilus: Lightning Dash, unpolarised
- Arcanes: Arcane Aegis, Arcane Circumvent

Arsenal figures land at roughly 139% Strength, 100% Duration, 235% Range, 45%
Efficiency, with 445 health, 740 shield, 105 armor and a 240 energy pool.

**How it works.** Cathode Grace (3) extends its own duration on kills up to 60s,
so after ~13 kills you never recast it, and with Archon Stretch it regenerates
about 300 energy/min. Cathode Current does the same for Rotorswell (4). Conductive
Sphere adds 75% base electric damage (additive to elementalist for status,
multiplicative with +electric mods) and a forced electric proc per shot. Arcane
Circumvent strips 50% of armour, shields and overguard on a dash. *Confidence:
Approximation, per the author.*

**Playstyle.**

1. Press 3 (Cathode Grace) with enemies around to kill and lock its duration.
2. Press 4 (Rotorswell) once you have energy; kills keep it up.
3. Press 2 (throw orb, tap again to group) when a crowd is near.
4. Press 1 to shield gate and shoot through the orb for the Conductive Sphere buff. Spam it to cover the map.

**Survivability.** Passive shield gating: Fast Deflection plus Vigilante Vigor drop
the recharge delay to 1s, and Rotorswell's electric procs stun to bridge it;
Arcane Aegis gives 12s of immortality on proc. Or active gating off tap 1 with
Catalyzing Shields. Arcane Circumvent gives a full gate whenever you dash through
Corpus enemies. *Confidence: Approximation, per the author.*

**Duration, Efficiency, Range, Strength.** Neutral Duration (only Cathode Grace's
8 to 10s initial window matters). Efficiency at 45% because Cathode Grace plus
Archon Stretch makes ~300 energy/min and 3 and 4 never recast. Range for the
Rotorswell aura and Coil Horizon grouping. Strength for the electric discharges,
Cathode Grace's crit and energy, and the Conductive Sphere boost.

**The mods.** *Blind Rage* is the Strength. *Overextended, Archon Stretch* set the
Range, with Archon Stretch feeding energy. *Catalyzing Shields, Fast Deflection,
Vigilante Vigor* are the passive-gate package. *Cathode Current* is the Rotorswell
extender. *Corrosive Projection* helps electric against armour.

**Flexible slots.** If you skip passive gating, drop Fast Deflection and Vigilante
Vigor for Rolling Guard, Primed Flow, Equilibrium or more Strength. Reverse
Rotorswell plus Adaptation for a base-Steel-Path tank. The exilus is open.

**Helminth.** Pick one. Subsume over Arcsphere (2) or Coil Horizon.

- **Nourish** over 2 for viral on weapons plus an energy multiplier (~800 energy/min with Cathode Grace and Archon Stretch).
- **Omamori** over 2 for lazy passive survival.
- **Roar** over 1 for pure ability DPS, double-dipping the electric DoTs.
- **Tharros Strike** for a cheap full strip that works on Acolytes, paired with Coil Horizon grouping.
- **Sickening Pulse** to multiply stacked electric status 10x into a group.

**Archon Shards.** One Amber cast-speed. Parkour, or violet electric-damage on
primary for a weapon platform, or violet ability-damage on electric for an ability
build. Five total.

**Arcanes.** Arcane Aegis for the passive-gate immortality, Arcane Circumvent for
the dash strip. Molt Augmented or a weapon arcane as swaps.

**Focus.** Any. Vazarin Sling as a backup. Madurai for Strength and cast speed.

**Weapon synergy.** Conductive Sphere wants high multishot and mandatory +electric
mods: Kuva Hek, Cedo, Strun Incarnon, Amprex, Fulmin Prime, Vadarya Prime. Violet
primary electric-damage shards multiply the electric status hard. Projectile
melees gain forced influence through the orb.

**Staying alive.** The passive gate plus Rotorswell and Coil Horizon crowd
control. It fails to toxin and to a burst in the sub-1s recharge window.

**Energy.** Cathode Grace plus Archon Stretch. A non-issue once 3 is locked.

**Where it struggles.** Rotorswell damage falls off hard in Steel Path, so the
weapon carries. Bosses. A cold start before Cathode Grace is locked (do not cast
it with no enemies around, or you eat a long cooldown).

**Variants.** A pure ability DPS Mecha build. An active-gate platform build. A
Gloom persistence-tank build.

**Strengths and weaknesses.** Strong: strong electric weapon buff, self-sustaining
energy, passive survival, a dash strip, cheap forma. Weak: weapon-carried at high
levels, boss-blind, cold-start cooldown risk on 3.

**Who runs this.** Players who want a low-maintenance electric weapon platform that
strips and survives while dashing around.

---

### Hallowed Fairy King
**Oberon Prime. A percent-health Smite nuke and a Reckoning strip, with orb-fed immortality.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Percent-health nuke, armour strip, status and knockdown immunity aura, near-immortal |
| Difficulty | Intermediate. Smite's viral and Strength breakpoints |
| Investment | Medium. 3 forma, cast-speed and Topaz shards |
| Weapon reliance | Low to medium. A viral primer sets up the Smite AoE one-shot |

> Tenno. Since the rework Smite deals a percentage of an enemy's current health as
> radiation, up to 75% on the target and up to 30% in an area, ignoring level.
> Prime with viral, add Roar and a shard, and that area hit becomes 100%: the room
> dies. Reckoning full-strips and slams. Hallowed Ground carpets the floor in
> radiation for status immunity and confusion. Righteous Negation turns the orbs
> your kills drop into passive immortality.

**The build**

- Umbral Intensify, rank 10, unpolarised
- Overextended, rank 5, Vazarin polarity
- Blind Rage, rank 10, Madurai polarity
- Augur Reach, rank 5, unpolarised
- Stretch, rank 5, Naramon polarity
- Equilibrium, rank 10, Naramon polarity
- Primed Flow, rank 10, Naramon polarity
- Primed Continuity, rank 10, Madurai polarity
- Aura: Brief Respite, Zenurik polarity
- Exilus: Power Drift, unpolarised
- Arcanes: Arcane Universal Fallout, Molt Augmented

Arsenal figures land at roughly 198% Strength, 155% Duration, 265% Range, 45%
Efficiency, with 465 health, 370 shield, 450 armor and a 755 energy pool.

**How it works.** Smite's AoE base is 10% current HP, capped at 30% at 300%
Strength. To reach the 100% needed for a room nuke you stack Roar (+30% ability
damage), Topaz shards (+15% each), and viral (2x at one stack, 4.25x at ten). The
author's build sits at a 249% Strength breakpoint: one Topaz shard plus one viral
stack plus Roar. Early game, 185% Strength plus Roar one-shots single targets with
nothing else. Reckoning full-strips at 167%. *Confidence: Approximation, per the
author's calculator.*

**Playstyle.**

1. Cast 2 (Hallowed Ground) to carpet the map for status and knockdown immunity and radiation confusion.
2. Cast 4 (Reckoning) to full-strip, slam, and apply radiation.
3. Spam 1 (Smite) everywhere for the percent-health nuke.
4. Keep Roar up if subsumed.

**Survivability.** Righteous Negation gives up to three damage-negating charges
(1s total i-frames) from picking up health and universal orbs, which Reckoning and
Universal Fallout spew constantly on kills, so it is passive immortality while you
keep killing. Shield gating off Reckoning plus Brief Respite is the backup, plus
the radiation crowd control. Or just health-tank on Oberon's high armour and
Renewal healing. *Confidence: Approximation, per the author.*

**Duration, Efficiency, Range, Strength.** Positive Duration for Roar and Hallowed
Ground. Efficiency at 45% is fine because Universal Fallout plus Equilibrium
returns roughly 1000+ energy per 20 kills. Range maxed for Smite's ~16.8m AoE and
huge Reckoning and Hallowed Ground coverage (Reckoning is line-of-sight now).
Strength to the chosen Smite breakpoint.

**The mods.** *Blind Rage, Umbral Intensify* are the Strength. *Overextended,
Stretch, Augur Reach* set the maxed Range, with Augur Reach feeding the gate.
*Primed Continuity* holds Duration. *Primed Flow, Equilibrium* are the energy base.
*Brief Respite* aura is backup gating.

**Flexible slots.** Hallowed Reckoning for a passive damage zone and Arcane Battery
energy. Smite Infusion for weapon radiation. Natural Talent without cast-speed
shards. Arcane Battery over a slot for a huge energy pool from Reckoning's armour
buff (which it overwrites on recast, so be careful). The aura is open.

**Helminth.** Pick one. Subsume over Renewal (3) or Axios Javelin, per the source.

- **Roar** is the default: it lifts Smite and Reckoning and drops the Smite breakpoint.
- **Breach Surge** for blinds and cascading sparks scaling off Smite damage.
- **Marked for Death** or **Blood Altar** as alternatives.

**Archon Shards.** One to two Amber cast-speed for Smite and Reckoning spam. One
to four Tauforged Topaz radiation-ability-damage for the Smite breakpoint.
Parkour or Equilibrium shards to taste. Five total.

**Arcanes.** Arcane Universal Fallout for the energy flood off radiation kills,
Molt Augmented for the Strength to reach the breakpoint with less viral. Arcane
Battery as an energy-pool swap.

**Focus.** Madurai for 50% cast speed on the slow Reckoning and 40% Strength.

**Weapon synergy.** An area viral primer matching Smite's ~16.8m radius: Epitaph
quickshot (14.4m), Bubonico alt-fire, Cedo alt-fire. Rakta Dark Dagger regenerates
shields off Oberon's radiation procs.

**Staying alive.** Righteous Negation orb immortality plus shield gating plus
radiation crowd control, or health tanking on Renewal. It fails if you cannot kill
fast enough to drop orbs and your gate runs out, and to Orokin enemies halving the
radiation.

**Energy.** Universal Fallout plus Equilibrium. A flood.

**Where it struggles.** Orokin factions (fissures, Circuit, Conjunction) halve
Smite's radiation, so you need far more viral there. Line-of-sight tiles cut
Reckoning. Bosses.

**Variants.** A health-tank Renewal build. A five-Topaz no-viral build.

**Strengths and weaknesses.** Strong: level-independent nuke, a full strip, a
squad status-immunity aura, passive immortality, cheap forma. Weak: radiation
penalty vs Orokin, needs a primer for the AoE, line-of-sight Reckoning.

**Who runs this.** Players who want a support-flavoured nuke that ignores enemy
scaling and keeps the squad status-immune.

---

### Flashing Blades
**Kullervo. Wrathful Advance teleport-crits and Collective Curse damage sharing, behind Volatile Recompense.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Melee platform with a flat crit buff and crowd-wide damage sharing |
| Difficulty | Beginner to intermediate |
| Investment | Medium. 4 forma, one armour shard mandatory for the arcane |
| Weapon reliance | High. A heavy-attack melee is the whole damage plan |

> Tenno. Wrathful Advance teleports Kullervo to a target, heavy-attacks, and hands
> him a flat 400%+ additive crit chance for twelve seconds, so every melee red-
> crits. Collective Curse marks a wide cone of enemies so hitting one transfers
> the full hit to all of them. Volatile Recompense and Arcane Persistence make him
> immortal to level cap on overguard alone. Tap 1 to blink around while the buff
> holds.

**The build**

- Stretch, rank 5, Naramon polarity
- Umbral Intensify, rank 10, unpolarised
- Blind Rage, rank 10, Madurai polarity
- Equilibrium, rank 10, Naramon polarity
- Volatile Recompense, rank 3, Zenurik polarity — augment. Overguard is refunded when it breaks, on a timer
- Primed Continuity, rank 10, Madurai polarity
- Augur Reach, rank 5, unpolarised
- Primed Flow, rank 10, Naramon polarity
- Aura: Corrosive Projection, Naramon polarity
- Exilus: Ice Spring, unpolarised
- Arcanes: Arcane Persistence, Arcane Steadfast

Arsenal figures land at roughly 243% Strength, 155% Duration, 175% Range, 45%
Efficiency, with 1205 health, 650 armor, no shields and a 641 energy pool.

**How it works.** Wrathful Advance's crit-chance buff is flat additive and scales
with Strength, so higher Strength means a bigger buff on top of the ~400% base.
Collective Curse transfers 100% of a hit to all cursed enemies at 200% Strength.
Arcane Persistence caps damage at 500/s while armour is above 700 (one Stand
United aura or one armour shard gets Kullervo there), giving a ~2s buffer if
Volatile Recompense has not re-shielded you. *Confidence: Approximation, per the
author.*

**Playstyle.**

1. Tap 1 (invert tap/hold) to teleport to an enemy, auto heavy-attack, and gain the crit buff. Keep blinking with 1 to stay buffed and mobile.
2. Tap 3 (Collective Curse) over a wide cone; hitting any cursed enemy with a x12 heavy shares the hit.
3. Keep 2 active as needed.
4. Tap 4 (Storm of Ukko) if not subsumed for a slash zone and combo generation.

**Duration, Efficiency, Range, Strength.** Positive Duration for the crit buff and
2. Efficiency at 45% with Primed Flow plus Equilibrium, plus Volatile Recompense
saving casts of 2. Range for the teleport, dagger seek, curse spread and 4 radius.
Strength wants 200% for the full Collective Curse transfer; above that just grows
the crit buff.

**The mods.** *Blind Rage, Umbral Intensify* are the Strength. *Primed Continuity*
holds Duration. *Stretch, Augur Reach* set the Range. *Primed Flow, Equilibrium*
are the energy base. *Volatile Recompense* is the overguard immortality.
*Corrosive Projection* is a straight damage lift.

**Flexible slots.** Add Vitality for more of a health buffer in deep endurance.
Streamline or Transient Fortitude over Blind Rage if energy is tight. The aura and
exilus are open.

**Helminth.** Pick one. Subsume over 4 (Storm of Ukko).

- **Roar** to double-dip status and triple-dip melee influence.
- **Shock** with Shock Trooper for an electric add to influence melees.
- **Nourish** for viral and energy on raw-damage melees.
- **Eclipse** to double-dip Glaives and Exodia Contagion.
- **Silence** to stop Acolyte Violence stripping your overguard.

**Archon Shards.** One to two Amber cast-speed. One normal armour shard to reach
700 for Arcane Persistence. The rest Tauforged Violet melee crit-damage or
parkour. Five total.

**Arcanes.** Arcane Persistence for the damage cap, Arcane Steadfast for energy.
Arcane Fury or Strike for melee output once survival is settled.

**Focus.** Naramon for combo. Madurai for Strength on the crit buff.

**Weapon synergy.** Heavy-attack melees that fit the Wrathful Advance auto-heavy:
Syam, Hate Incarnon, Corufell, Ceramic Dagger, heavy-slam Magistar or Arca Titron,
Glaives, or x12 light-attack hybrids (Nami Solo Incarnon, Innodem, Praedos).

**Staying alive.** Volatile Recompense overguard immortality plus Arcane
Persistence's buffer. Overguard blocks status, so it rarely fails; it only lapses
if you are outside Volatile Recompense's range with no enemy to hit.

**Energy.** Primed Flow plus Equilibrium plus Arcane Steadfast.

**Where it struggles.** Ranged targets need a teleport in. Bosses take the melee.
Being out of range of Volatile Recompense with overguard down.

**Variants.** A pure Mecha 4 ability-DPS build.

**Strengths and weaknesses.** Strong: instant red crits with no combo needed,
crowd-wide damage sharing, near-immortal on overguard, strong mobility. Weak:
weapon-carried, boss-slow, overguard gap if you stop hitting things.

**Who runs this.** Players who want a melee frame that red-crits from the first
swing and blinks around a room sharing one hit to everything.

---

### The Spear of Longinus
**Styanax. A Final Stand spear nuke and a Tharros Strike strip, immortal through Intrepid Stand overguard.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Spear-volley nuke, full strip, self and squad energy, near-immortal |
| Difficulty | Beginner to intermediate |
| Investment | Medium. 4 forma, cast-speed shards |
| Weapon reliance | Low. Final Stand is coded like a weapon and does the killing |

> Tenno. Styanax throws a wall of spears. Final Stand fires a volley scaled by
> Duration, and Intrepid Stand puts overguard on every enemy it hits, which means
> a 0.5s i-frame every time it breaks, so he is immortal while firing. Tharros
> Strike full-strips armour and shields in a cone. Rally Point regenerates the
> squad's energy. Strip, then fire.

**The build**

- Primed Flow, rank 10, Naramon polarity
- Equilibrium, rank 10, Naramon polarity
- Primed Continuity, rank 10, Madurai polarity
- Umbral Intensify, rank 10, unpolarised
- Overextended, rank 5, Vazarin polarity
- Stretch, rank 5, Naramon polarity
- Intrepid Stand, rank 3, unpolarised — augment. Final Stand grants overguard per enemy hit
- Blind Rage, rank 10, Madurai polarity
- Aura: Corrosive Projection, Naramon polarity
- Exilus: Cunning Drift, unpolarised
- Arcanes: Arcane Truculence, Arcane Arachne

Arsenal figures land at roughly 183% Strength, 155% Duration, 250% Range, 45%
Efficiency, with 370 health, 925 shield, 265 armor and a 641 energy pool.

**How it works.** Final Stand is coded as a weapon, so Nourish's viral (if
subsumed) nearly doubles its damage and Arcane Arachne's 2.5x applies. Tharros
Strike full-strips at 200% Strength, 164% with Corrosive Projection, so it strips
from mission start with no kills needed. Intrepid Stand overguard plus shield
gating plus Rally Point's shield regen is the survival stack. *Confidence:
Approximation, per the author.*

**Playstyle.**

1. Activate Rally Point (and Nourish if subsumed) at mission start for passive energy.
2. Cast Tharros Strike to full-strip armour and shields.
3. Cast Final Stand at a group to kill while generating shields and overguard.

**Duration, Efficiency, Range, Strength.** Duration matters for Rally Point and for
Final Stand's total damage output (more volley time). Efficiency at 45% with
Nourish, or 75% without; Rally Point regenerates ~6 to 20 energy/s. Extreme Range
for Tharros Strike, Axios Javelin pull and Final Stand explosions. Strength for
the strip threshold and ability damage.

**The mods.** *Blind Rage, Umbral Intensify* are the Strength. *Primed Continuity*
holds Duration. *Overextended, Stretch* set the Range. *Primed Flow, Equilibrium*
are the energy base. *Intrepid Stand* is the overguard immortality. *Corrosive
Projection* lowers the strip threshold to 164% for an instant strip.

**Flexible slots.** Natural Talent without cast-speed shards. Rolling Guard for
status cleanse. Vigorous Swap for a 2.65x Final Stand multiplier (needs a weapon
swap first). The aura is open.

**Helminth.** Pick one. Subsume over Axios Javelin (1).

- **Nourish** is the default: it applies viral to Final Stand (coded as a weapon, ~2x damage), the occasional viral proc, and multiplies Rally Point energy to ~18/s.
- **Roar** for a Final Stand spam build (lower raw boost than Nourish, but double-dips slash); pair with Adaptation since you are vulnerable in 4.

**Archon Shards.** Two Amber cast-speed (mandatory for Final Stand's cast time).
Three Crimson strength or Duration. Five total.

**Arcanes.** Arcane Truculence for area viral (10 stacks in 30m, up to 4.25x),
Arcane Arachne for a 2.5x Final Stand multiplier after a wall-latch. Molt Augmented
or Avenger as swaps.

**Focus.** Naramon for Lethal Levitation stacking with Arachne. Madurai for cast
speed and Strength.

**Weapon synergy.** Styanax's shield-crit passive is weak (only additive), so do
not build shields for it. Final Stand does the damage; a primer or Panzer for the
Truculence-free viral is the only real synergy.

**Staying alive.** Intrepid Stand overguard (0.5s gate on break) plus shield
gating plus Rally Point regen. It effectively does not fail while you are hitting
enemies with Final Stand; it does fail in the vulnerable window of the cast at
very high levels (Roar variant wants Adaptation).

**Energy.** Rally Point plus Equilibrium, multiplied by Nourish. Comfortable.

**Where it struggles.** Final Stand DPS is poor for its energy since the health and
armour reworks, so it is a clear tool, not a boss tool. Line-of-sight tiles. Axios
Javelin targeting is unreliable (hence the subsume).

**Variants.** A pure weapon platform (non-Final Stand).

**Strengths and weaknesses.** Strong: instant full strip, near-immortal while
firing, strong squad energy, low weapon investment. Weak: weak Final Stand DPS per
energy, boss-blind, cast-time dependent.

**Who runs this.** Players who want a strip-and-clear frame that keeps the squad's
energy full and rarely dies.

---

### Dual Surge
**Limbo Prime. Rift Torrent double-dipped into Breach Surge sparks, from inside the safe rift.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap, Solo |
| Role | Extreme spark nuke, total safety in the rift |
| Difficulty | Advanced. Rift mechanics and the Acolyte exception |
| Investment | Low. 3 forma |
| Weapon reliance | High. A heavy single-hit weapon feeds the sparks |

> Tenno. Limbo's rift is a room nobody else can touch. Rift Torrent stacks a weapon
> damage bonus for every enemy under Rift Surge, and Breach Surge sparks are
> counted as weapons, so that bonus applies to the shot and again to the spark:
> the same multiplier, twice. Freeze the room with Stasis and Cataclysm, headshot
> one enemy, and the sparks do numbers that wrap the integer.

**The build**

- Rolling Guard, rank 10, Vazarin polarity
- Primed Flow, rank 10, Naramon polarity
- Blind Rage, rank 10, Madurai polarity
- Equilibrium, rank 10, Naramon polarity
- Overextended, rank 5, unpolarised
- Stretch, rank 5, unpolarised
- Rift Torrent, rank 3, unpolarised — augment. Weapon damage bonus per Rift-Surged enemy
- Primed Continuity, rank 10, Madurai polarity
- Aura: Brief Respite, aura slot
- Exilus: Primed Sure Footed, Vazarin polarity
- Arcanes: Molt Efficiency, Molt Augmented

Arsenal figures land at roughly 139% Strength, 155% Duration, 235% Range, 45%
Efficiency, with 370 health, 370 shield, 135 armor and a 755 energy pool.

**How it works.** Rift Surge 50 enemies for roughly a 3000% Rift Torrent bonus
(additive to Serration, so you can drop base-damage mods for fire rate).
Because a Breach Surge spark is itself a weapon, that bonus multiplies the shot
and then the spark, roughly 900x, times Breach Surge's own ~4x, for ~3600x weapon
damage per spark. Sparks headshot. Glaives and Exodia Contagion double-dip Rift
Torrent on top. *Confidence: Approximation, per the author, and post-nerf the spark
is capped at 5 million before multipliers.*

**Playstyle.**

1. Activate Stasis and keep it up.
2. Cast Cataclysm over a large group.
3. Cast Rift Surge for the Rift Torrent stack; shrinking bubble edges banish neighbours so you can hit beyond it.
4. Cast Breach Surge and headshot a frozen enemy.
5. Sparks fly.

**Duration, Efficiency, Range, Strength.** Positive Duration so Stasis, Rift Surge
and Cataclysm do not need frequent recasts. Efficiency negative because Limbo's
passive returns 10 energy per rift kill (300 for a room of 30). Range for Rift
Surge and Cataclysm coverage (the Rift Torrent stack) and Breach Surge. Strength is
the priority: it scales the Breach Surge multiplier and the Rift Torrent bonus,
which itself feeds the spark, so it double-dips.

**The mods.** *Blind Rage* is the Strength. *Overextended, Stretch* set the Range.
*Primed Continuity* holds Duration. *Primed Flow, Equilibrium* are the energy base.
*Rift Torrent* is the multiplier. *Rolling Guard* and *Primed Sure Footed* are
survival for the moments you leave the rift. *Brief Respite* aura for shield
gating.

**Flexible slots.** Rolling Guard flexes for Range, Strength or Efficiency. Augur
Secrets over a slot for more grouping speed and Breach Surge multiplier. The
exilus is open.

**Helminth.** Pick one. Subsume over Breach Surge's slot only if you do not need
the extreme damage.

- **Breach Surge** is the whole build.
- **Ensnare** as the alternative: it locks Acolytes (immune to Stasis) and drags enemies into Cataclysm.

**Archon Shards.** Two or more Amber cast-speed to drop Natural Talent. The rest
Duration. Five total.

**Arcanes.** Molt Augmented and Molt Efficiency for Strength and Duration. Arcane
Energize as an energy backup, Arcane Consequence for parkour off the easy frozen
headshots.

**Focus.** Any. Madurai for Strength and cast speed.

**Weapon synergy.** Heavy single-hit weapons for the biggest spark: Latron
Incarnon, Miter Incarnon, Tenet Arca Plasmor. Glaives (Falcor, Xoris) double-dip
Rift Torrent for ~900x. Exodia Contagion also double-dips. Drop Serration on these
builds for fire rate.

**Staying alive.** The rift is total safety from anything not also in the rift.
Stasis freezes everything except Acolytes; against those, freeze the adds and use
Magus Lockdown plus the Rift Torrent damage. Rolling Guard and Primed Sure Footed
cover the rest.

**Energy.** Limbo's rift-kill passive plus Equilibrium. Kills fuel it, which is the
whole loop.

**Where it struggles.** Acolytes ignore Stasis and need a workaround. It is a
solo-oriented build (the rift can inconvenience teammates). Bosses.

**Variants.** An Ensnare utility build.

**Strengths and weaknesses.** Strong: some of the highest spark numbers in the
game, total safety, easy frozen headshots, cheap forma. Weak: Acolyte-awkward,
team-unfriendly, boss-blind.

**Who runs this.** Solo players who want to stand in a bubble nothing can touch and
delete rooms with wrapped-integer sparks.

---

### Breach and Crush
**Mag Prime. A Magnetize damage-absorb nuke fed by Breach Surge, plus a one-cast Crush strip.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Absorb-and-detonate nuke, grouping, projectile block, full strip |
| Difficulty | Intermediate |
| Investment | Very low. 1 forma |
| Weapon reliance | High. Your weapon's damage is what the Magnetize bubble stores and multiplies |

> Tenno. Magnetize wraps an enemy in a bubble that sucks in bullets and stores a
> quarter of your weapon's damage, dealing it back as magnetic DoT and then a
> multiplied explosion when the bubble pops. Breach Surge sparks count as
> projectiles, so they feed the bubble and the bubble's DoT makes more sparks: a
> loop that grows itself. Fracturing Crush full-strips at 134% Strength. Cast the
> bubble in a doorway and shoot slightly off-centre.

**The build**

- Magnetized Discharge, rank 3, unpolarised — augment. Bigger Magnetize radius, detonate on demand, disarm
- Counter Pulse, rank 3, unpolarised — augment. Polarize jams enemy guns through walls
- Stretch, rank 5, Naramon polarity
- Primed Flow, rank 10, Naramon polarity
- Fracturing Crush, rank 3, unpolarised — augment. Permanent full strip at 134% Strength, plus cast speed
- Overextended, rank 5, unpolarised
- Equilibrium, rank 10, Naramon polarity
- Transient Fortitude, rank 10, Madurai polarity
- Aura: Growing Power, Madurai polarity
- Exilus: Cunning Drift, unpolarised
- Arcanes: Arcane Arachne, Molt Augmented

Arsenal figures land at roughly 95% Strength, 73% Duration, 250% Range, 100%
Efficiency, with 370 health, 555 shield, 135 armor and a 755 energy pool.

**How it works.** Magnetize absorbs 25% of weapon damage (multishot counts, crits
and DoT do not), ticks it as magnetic DoT, then on pop multiplies the total by
roughly 2 x duration x enemies-in-bubble and releases it in a line-of-sight
explosion. Breach Surge sparks feed the bubble and the DoT makes more sparks, a
positive loop worth over 10x the no-Surge damage with 20 enemies. Fracturing Crush
full-strips at 134% Strength (110% with Corrosive Projection). Strength barely
matters otherwise because the absorb does not scale with it. *Confidence:
Approximation, per the author.*

**Playstyle.**

1. Cast Breach Surge (1 or 3) to blind and prime for sparks.
2. Cast Magnetize (2) on an enemy in a corridor so the bubble also blocks fire.
3. Cast Crush (4) to full-strip and immobilise.
4. Shoot slightly off-centre so bullets orbit.
5. Let the bubble expire or recast 2 near it to detonate a 42m explosion.

**Duration, Efficiency, Range, Strength.** Near-neutral Duration (Breach Surge
blind and Magnetize both ~15s base). Efficiency covered by Equilibrium plus a Synth
Deconstruct pet plus Arcane Steadfast. Range is the priority stat, maxed;
Magnetized Discharge adds a further 45% for an 11.2m bubble and 42m explosion.
Strength only needs the 134% Fracturing Crush threshold (Precision Intensify plus
Growing Power, or Umbral Intensify plus Molt Augmented against Overextended).

**The mods.** *Transient Fortitude* plus *Growing Power* aura clear the Crush
threshold. *Overextended, Stretch* set the maxed Range. *Primed Flow, Equilibrium*
are the energy base. *Magnetized Discharge* is the radius and detonation.
*Fracturing Crush* is the strip. *Counter Pulse* is wall-piercing crowd control.

**Flexible slots.** The three augments are all swappable for Streamline, Strength,
Duration or Augur Reach. Rolling Guard for the status cleanse Mag's kit lacks.
Worthy Comradery aura to make Breach Surge orange-crit.

**Helminth.** Pick one. Subsume over 1 or 3.

- **Breach Surge** is the build's engine if you keep it.
- **Pull** for longer-range grouping into the bubble.
- **Polarize** (kept, not subsumed) for shield restore and Counter Pulse.
- **Ensnare** to lock Acolytes and group.

**Archon Shards.** Two Amber cast-speed to drop Natural Talent. Parkour, or
strength shards to boost Breach Surge. Azure energy-max to skip Primed Flow. Five
total.

**Arcanes.** Arcane Arachne for a 2.5x Breach Surge multiplier after a wall-latch,
Molt Augmented for the Crush threshold. Arcane Steadfast for free casts.

**Focus.** Any. Madurai for cast speed. Vazarin Sling as a backup.

**Weapon synergy.** High raw-damage projectile or punch-through weapons that orbit
the bubble and store big hits: Tenet Arca Plasmor, Latron Incarnon, Miter Incarnon,
Felarx, Phenmor. Electric or gas on grouped enemies for the fastest kills (DoT
does not feed the bubble, but the kills do).

**Staying alive.** The bubble blocks incoming fire, plus shield gating off Polarize
or Crush, plus Counter Pulse crowd control, plus optional Rolling Guard. It fails
to status (Mag has no cleanse without Rolling Guard) and to toxin.

**Energy.** Equilibrium plus a Synth Deconstruct pet plus Arcane Steadfast. Mag
casts constantly, so keep the loop fed.

**Where it struggles.** Line-of-sight tiles cut the explosion. Open areas with no
corridors to block fire. Strong single-hit weapons hit the 5-million spark cap and
stop scaling. Bosses take the single-target bubble shred, which is slower.

**Variants.** A triple-augment build with shards.

**Strengths and weaknesses.** Strong: a self-feeding nuke loop, a one-cast full
strip, projectile immunity, one forma. Weak: no status cleanse, corridor-
dependent, weapon-carried, boss-slow.

**Who runs this.** Players who want a cheap nuke frame that turns a doorway into a
kill box.

---

### Full Mecha Alchemist
**Lavos Prime. A Gas-and-Heat Catalyze nuke stacked with the Mecha set, on an energy-free tank.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Status-spread nuke, armour strip, health or shield tank |
| Difficulty | Advanced. Element infusion, cooldown management, and the status-count multiplier |
| Investment | High. 5 forma, duration and cast-speed shards, a Mecha-set Kubrow |
| Weapon reliance | Low to medium. Catalyze nukes; a status primer adds elements that multiply it |

> Tenno. Lavos has no energy bar, only cooldowns, and everything he does applies
> elements. Catalyze is a through-wall nuke that doubles its damage for every
> distinct status on the target, so a primer that stacks eight elements is a 256x
> multiplier. Infuse Gas and the procs linger across the map. The Mecha set marks
> an enemy for a huge damage multiplier and spreads the kill's statuses to the
> whole room. Prime, infuse, nuke, tap 1 and 3 to reset the cooldown.

**The build**

- Overextended, rank 5, unpolarised
- Adaptation, rank 10, Vazarin polarity
- Blind Rage, rank 10, Madurai polarity
- Swift Bite, rank 3, unpolarised — augment. Transmutation Probe reduces ability cooldowns
- Valence Formation, rank 3, Zenurik polarity — augment. +200% element bonus that also reaches ability statuses
- Mecha Pulse, rank 3, unpolarised
- Archon Continuity, rank 10, Madurai polarity
- Archon Vitality, rank 10, Vazarin polarity — doubles Catalyze heat procs
- Aura: Mecha Empowered, aura slot
- Exilus: Cunning Drift, unpolarised
- Arcanes: Arcane Impetus, Arcane Blessing

Arsenal figures land at roughly 139% Strength, 155% Duration, 205% Range, 45%
Efficiency, with a 1600 health pool, 410 shield, 675 armor and no energy bar.

**How it works.** Catalyze scales as 2^(number of distinct statuses), so the whole
plan is stacking elements: Archon Continuity turns Ophidian Bite's toxin into
corrosive, a Cedo or Grimoire primer adds the rest, and Valence Formation
multiplies the resulting status. Gas infusion makes the procs linger and spread.
The Mecha set's Empowered mark double-dips status for a 6.25x DoT multiplier and
its bonus spreads statuses to a 30m radius on a marked kill. Efficiency does not
touch Lavos's cooldowns directly, but it changes how much Swift Bite and
Transmutation Probe cut them. *Confidence: Approximation, per the author's
calculations.*

**Playstyle.**

1. Group enemies (Magus Anomaly, Ensnare, Nautilus Cordon, melee vortex).
2. Infuse Corrosive (hold 1 and 3) and cast Vial Rush (tap 2) through the group to stack corrosive pools.
3. Shoot a primer for viral and heat, then infuse Gas (hold 1 and 4) and cast Catalyze (4).
4. Tap 3, then tap 1 into the group, to slash the cooldowns of 4 and 3.

**Duration, Efficiency, Range, Strength.** Duration extends every status's DoT
(about 9s at 155%, 15s with shards and Ris Invocation). Efficiency at 45% because
Arcane Impetus gives back 30% and it only affects cooldown reduction. Range for
all abilities including Catalyze's reach and any grouping subsume. Strength for
Catalyze's base damage (Precision Intensify if you want it).

**The mods.** *Blind Rage* is the Strength. *Overextended* is the Range. *Archon
Continuity* is Duration plus the corrosive conversion. *Archon Vitality* doubles
Catalyze heat procs. *Valence Formation* is the status multiplier. *Swift Bite* is
the cooldown engine. *Adaptation* is the tank layer. *Mecha Pulse* aura and
*Mecha Empowered* aura are the Mecha set.

**Survivability.** Lavos cannot shield-gate the normal way (no energy). Health
tank on his high base armour plus Mecha Pulse (up to ~5850 armour) plus Adaptation
plus Arcane Blessing health, healed by Ophidian Bite, for ~600k effective HP to
around level 500. Arcane Persistence (700+ armour) with consistent lifesteal for
higher. Or a Fast Deflection plus Vigilante Vigor passive-gate build, made
immortal by the Fass Canticle bug on a Grimoire. *Confidence: Approximation, and
the Fass Canticle interaction is flagged as a bug.*

**Helminth.** Pick one. Subsume over Vial Rush.

- **Sickening Pulse** for the highest ceiling: it multiplies electric and Gas status 10x and doubles heat and toxin, best on tight-corridor maps with grouping.
- **Roar** for a passive multiplier that double-dips all DoTs.
- **Ensnare** or another grouping ability for Gas overlap.
- **Expedite Suffering** for Disruption with a slash weapon.
- **Pillage** for shield gating plus a strip.
- **Omamori** or **Evade** for lazy survival.

**Archon Shards.** One optional Azure armour shard for Arcane Persistence. One to
two Amber cast-speed. Two to three Crimson Duration for Gas proc length. Note
Archon Stretch and Archon Flow do nothing (no energy). Five total.

**Arcanes.** Arcane Impetus for 60% Strength and 30% Efficiency from Lavos's ten
possible elements, Arcane Blessing for the tank health. Molt Augmented or Arcane
Ice Storm as swaps.

**Focus.** Any. Madurai for cast speed on the slow infusion casts.

**Weapon synergy.** An area primer that procs many distinct statuses: Cedo
alt-fire, Kuva Ogris, Bubonico (viral plus corrosive), Grimoire. A heat-inherit
secondary primer (Kompressa, Catabolyst, Dex Furis) multiplies Catalyze's heat
procs ~5x. Telos Boltace for slide grouping, Dual Ichor for light-attack clear.

**Staying alive.** The tank stack plus Ophidian Bite healing, or Arcane
Persistence with lifesteal. It fails to Violence, nullifiers, magnetic, and heat
or corrosive dropping armour below 700 (Hearty Nourishment gives status immunity).

**Energy.** There is none. Cooldowns are the resource, shortened by Swift Bite and
Transmutation Probe.

**Where it struggles.** The element-and-cooldown system is the most complex of any
frame here. Overguard (often larger than health) resists Regurgitate-style
percent-HP effects. Orokin heat resistance. Bosses.

**Variants.** Hybrid weapon and Catalyze builds. Full weapon-platform endurance
builds (persistence, shield-recharge, invisible Evade).

**Strengths and weaknesses.** Strong: enormous status-nuke ceiling, no energy to
manage, very tanky, spreads its own kills. Weak: extreme complexity, element-
infusion busywork, overguard-awkward, forma-hungry, needs a Kubrow.

**Who runs this.** Players who want the deepest ability-scaling puzzle in the game
and do not mind a busy rotation.

---

### Threads of Fate
**Koumei. Omikuji decree stacking and Omamori dice-roll immortality, on a lazy shield-gate chassis.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Self-buffing melee or gun platform, gambler's immortality, status priming |
| Difficulty | Beginner to intermediate |
| Investment | Low. 3 forma |
| Weapon reliance | Total. Koumei buffs and primes; the weapon and the decrees do the damage |

> Tenno. Koumei rolls dice. Omikuji hands you a decree each time you complete a
> small challenge, and the pool leans melee, so over a run your weapon quietly
> becomes a monster. Omamori is a 50% chance to negate any hit, and a triple six
> makes it 100% until the charms run out: literal luck-based immortality. Kumihimo
> and Bunraku spray status for your Condition Overload. Keep 3 up, roll decrees,
> spam 1.

**The build**

- Catalyzing Shields, rank 3, Vazarin polarity
- Rolling Guard, rank 10, unpolarised
- Vigilante Vigor, rank 5, unpolarised
- Fast Deflection, rank 5, unpolarised
- Overextended, rank 5, Vazarin polarity
- Omikuji's Fortune, rank 3, unpolarised — augment. Kills with the rotating passive weapon cut Omikuji's cooldown
- Equilibrium, rank 10, Naramon polarity
- Archon Continuity, rank 10, Madurai polarity
- Aura: Aerodynamic, aura slot
- Exilus: Mobilize, unpolarised
- Arcanes: Arcane Impetus, Arcane Aegis (rank 0)

Arsenal figures land at roughly 40% Strength, 155% Duration, 190% Range, 100%
Efficiency, with 444 health, 222 shield, 444 armor and a 222 energy pool.

**How it works.** Most of Koumei's abilities barely use stats, so the build spends
its slots on lazy survival instead. Fast Deflection plus Vigilante Vigor drop the
recharge delay to 1s and Catalyzing Shields gives a full 1.33s gate on any shield
gained, so you passively re-gate as long as you are not hit in the window. Omamori
(3) makes that window rarely matter. Omikuji's Fortune keeps the decree cooldown
short. Arcane Impetus gives back 78% Strength and 39% Efficiency from all the
status. *Confidence: Approximation, per the author.*

**Playstyle.**

1. Keep 3 (Omamori) up at all times for the 50% negate.
2. Press 2 and complete a challenge to unlock a decree; carry utility weapons for the harder challenges.
3. Spam tap 1 to shield gate and prime status.
4. Press 4 on cooldown into a crowd to lock it down and stack statuses.

**Duration, Efficiency, Range, Strength.** Duration only affects 1 and 4 (both long
base). Some Efficiency to cast 1 and 4 on demand before you roll energy decrees.
200% Range caps the thread count on 1. Strength is dumped; you get it back from
Arcane Impetus, Fortifier's Will and armour decrees.

**The mods.** *Fast Deflection, Vigilante Vigor, Catalyzing Shields, Rolling Guard*
are the whole passive-survival package. *Overextended* is the Range. *Equilibrium*
is energy. *Archon Continuity* adds corrosive procs for Condition Overload.
*Omikuji's Fortune* is the decree engine. *Aerodynamic* aura helps aim-glide and
wall-latch decree challenges.

**Flexible slots.** Swap the survival mods for Mecha Pulse, Health Conversion,
Adaptation, Archon Vitality and Primed Flow for a health-tank Koumei. The aura and
exilus are open.

**Helminth.** Pick one. Most want a bit of Strength back (drop a survival mod for
Umbral Intensify or Molt Augmented).

- **Pillage** over 1 for a strip and reliable shield gating even if you roll the free-cast decree.
- **Wrathful Advance** for flat melee crit chance.
- **Nourish** for viral and energy.
- **Sickening Pulse** over 1 to multiply the status from 4.
- A **grouping** ability over 4.

**Archon Shards.** One to two Amber cast-speed for Bunraku. The rest Azure
energy-max, parkour, or violet melee crit-damage (needs Primed Flow). Five total.

**Arcanes.** Arcane Impetus for the Strength and Efficiency return, Arcane Aegis
(any rank) for a gambler's immortality layer. Molt Augmented or a weapon arcane as
swaps.

**Focus.** Any. Naramon for combo on a melee build.

**Weapon synergy.** Weapons that complete decree challenges fast: a hitscan gun for
headshot and 20m challenges (Cedo Prime, Dual Toxocyst), a light-attack melee for
slide, airborne and 10m challenges (Innodem, Nami Solo), Cedo alt-fire for
status. Condition Overload light-attack and hybrid melees benefit most from the
status; Rakta Dark Dagger is a strong mid-game pick that also helps shield gating.

**Staying alive.** Passive shield gating plus Omamori's negate plus Rolling Guard
plus optional Arcane Aegis. It fails to toxin and to a bad-luck string where
Omamori does not negate during the recharge window.

**Energy.** Equilibrium before you roll energy decrees; trivial afterward.

**Where it struggles.** It is slow to come online; a short mission gets little
from Omikuji. Decrees are random, so the build's power varies run to run. Bosses
take the weapon.

**Variants.** A Cold-Ward health-tank build.

**Strengths and weaknesses.** Strong: a weapon that scales over a run, a huge
lazy-survival slot budget, gambler's immortality, strong priming, cheap forma.
Weak: slow ramp, RNG-dependent, weapon-carried, boss-slow.

**Who runs this.** Players who want an endurance frame that gets stronger the
longer they stay and enjoy the dice-roll survival.

---

### The Sanguine Heart
**Garuda Prime. Aerial Dread Heart nuking and Seeking Talons slash spread, with self-sustaining energy.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Aerial nuke, scaling slash spread, mobile survivor, open-world clear |
| Difficulty | Intermediate. The aerial ability chains take practice |
| Investment | Medium. 3 forma, cast-speed shards |
| Weapon reliance | Low to medium. Dread Heart nukes; a slash weapon feeds Seeking Talons |

> Tenno. Garuda fights from the air. Dread Mirror blocks everything in front and
> banks the damage it eats. Blood Altar heals and lets you pounce across the map.
> Bloodletting trades half your health for a wall of energy. Seeking Talons marks
> a cone so any damage on those enemies becomes a stacking slash proc. Ascend with
> 3, hover, and drop a charged Dread Heart on the room.

**The build**

- Primed Flow, rank 10, Naramon polarity
- Primed Continuity, rank 10, Madurai polarity
- Stretch, rank 5, Naramon polarity
- Overextended, rank 5, Vazarin polarity
- Transient Fortitude, rank 10, Madurai polarity
- Umbral Intensify, rank 10, unpolarised
- Blending Talons, rank 3, unpolarised — augment. Tap 4 for a radial Seeking Talons and quick gate
- Augur Reach, rank 5, unpolarised
- Aura: Brief Respite, aura slot
- Exilus: Kavat's Grace, unpolarised
- Arcanes: Molt Reconstruct, Arcane Arachne

Arsenal figures land at roughly 139% Strength, 128% Duration, 265% Range, 100%
Efficiency, with 370 health, 370 shield, 420 armor and a 912 energy pool.

**How it works.** Bloodletting returns more energy at higher Efficiency (about 364
per 50% health at 100%, versus 228 at 45%), so neutral Efficiency means fewer,
safer casts. Seeking Talons only needs 134% Strength for a 100% slash-proc chance;
above that Strength does little. Dread Mirror and Seeking Talons both have innate
i-frames now, so Bloodletting's status cleanse replaces Rolling Guard. Garuda's
+100% passive applies twice to Glaives and Exodia Contagion. *Confidence:
Approximation, per the author.*

**Playstyle.**

1. Cast Bloodletting (tap 3) twice at mission start; recast below ~300 energy.
2. Cast up to three Blood Altars for coverage or concentrated healing.
3. Keep Dread Mirror (tap 1) up, facing enemies; pounce onto heavies to bank Dread Heart.
4. Charge and release Dread Heart (hold 1) to nuke, keeping ~100 energy for 4.
5. Tap 4 (Blending Talons) for a radial slash and full shield gate.

**Aerial chains.** Heart to Heart: with Dread Mirror up and airborne, tap 4, aim-
glide, hold 1 to hover, release Dread Heart, aim-glide, tap 1 on an enemy to
refresh the mirror. The Ascension: aim down sights and tap 3 to rise without
bullet-jumping. Clean Energy: cast 4 then tap 3 to fit a Bloodletting inside the
last i-frames for a safe status cleanse.

**Duration, Efficiency, Range, Strength.** Positive Duration for Dread Mirror,
Blood Altar and the Seeking Talons mark. Neutral Efficiency for the Bloodletting
return. High Range for pounce distance, Dread Heart explosion and Blood Altar heal
radius. Strength only to the 134% slash threshold.

**The mods.** *Transient Fortitude, Umbral Intensify* clear the 134% threshold
against Overextended. *Primed Continuity* holds Duration. *Overextended, Stretch,
Augur Reach* set the maxed Range, with Augur Reach feeding the gate. *Primed Flow*
is the pool for chaining combos. *Blending Talons* is the radial quick-cast.
*Brief Respite* aura feeds the gate.

**Flexible slots.** The augments are all optional over an Augur Message slot: Blood
Forge to reload slow weapons, Dread Ward for an invulnerability window. Natural
Talent without cast-speed shards. Vigorous Swap for a controllable Dread Mirror
multiplier.

**Helminth.** Pick one. Subsume over Blood Altar (her 2), the weakest ability.

- **Breach Surge** for a blind plus a self-propagating slash loop with Seeking Talons (Garuda's passive double-dips the sparks).
- **Expedite Suffering** for an infinitely scaling slash feedback loop with Seeking Talons.
- **Gloom** for infinite-range healing and a 95% slow (see The Slow Bleed).
- **Nourish** for viral on Dread Mirror and Seeking Talons plus double energy.
- **Molt** with Regenerative Molt for speedrunning.

**Archon Shards.** Two or more Amber cast-speed to drop Natural Talent. The rest
Duration, Strength or energy-max. Five total.

**Arcanes.** Molt Reconstruct for healing on energy spend (useful with a non-
healing subsume), Arcane Arachne for a 2.5x Dread Heart multiplier. Arcane
Eruption for passive crowd control, which Garuda's kit lacks.

**Focus.** Naramon for Lethal Levitation stacking with Arachne. Madurai for cast
speed.

**Weapon synergy.** High-base-damage area weapons for Seeking Talons: Proboscis
Cernos, Zymos, Acid Shells Sobek (infinitely scaling once turned to slash).
Glaives and Exodia Contagion get Garuda's doubled passive. Bleed procs scale only
on +damage, +faction and crit.

**Staying alive.** Shield gating off Seeking Talons plus Dread Mirror frontal
attenuation plus the innate ability i-frames plus Bloodletting cleanse. It fails
to attacks from behind and to toxin.

**Energy.** The Bloodletting-plus-Blood-Altar loop, held by Primed Flow.

**Where it struggles.** Attacks from behind bypass Dread Mirror. No native crowd
control (subsume for it). Bosses.

**Variants.** A max-range Breach Surge build. A Gloom high-Strength build. A
run-and-gun weapon platform.

**Strengths and weaknesses.** Strong: strong aerial nuke, an infinitely scaling
slash loop, excellent mobility and open-world play, self-sustaining energy. Weak:
frontal-only defense, no native crowd control, boss-blind.

**Who runs this.** Players who want to fight from the sky, nuking rooms and
raining slash on everything they mark.

---

### Silent Assassin
**Banshee Prime. Sonar damage multipliers and a Gloom-stretched Silence stun, for boss and lich kills.**

| | |
|--|--|
| Content | Steel Path, Boss and Lich and Sister killer |
| Role | Weakspot damage multiplier, hard crowd control, single-target deleter |
| Difficulty | Advanced. You must actually hit the Sonar spots |
| Investment | Medium. 4 forma, strength and cast-speed shards |
| Weapon reliance | Total. Banshee multiplies a weapon's weakspot hits; the weapon does everything |

> Tenno. Sonar paints glowing weakspots that multiply your damage, and two
> overlapping Sonars multiply together, 100x at 200% Strength. Gloom slows the room
> to a crawl, which stretches Silence's 2-second stun to as long as 40. Land your
> shots on the spots and a lich folds. Stack Sonar for anything with damage
> resistance.

**The build**

- Resonance, rank 3, unpolarised — augment. Sonar self-propagates on weakspot kills
- Stretch, rank 5, unpolarised
- Catalyzing Shields, rank 3, Vazarin polarity
- Precision Intensify, rank 5, Madurai polarity
- Sonic Fracture, rank 3, unpolarised — augment. Sonic Boom strips armour
- Primed Flow, rank 10, Naramon polarity
- Equilibrium, rank 10, Naramon polarity
- Primed Continuity, rank 10, Madurai polarity
- Aura: Brief Respite, aura slot
- Exilus: Primed Sure Footed, Vazarin polarity
- Arcanes: Molt Vigor, Molt Augmented

Arsenal figures land at roughly 100% Strength, 155% Duration, 145% Range, 100%
Efficiency, with 370 health, 370 shield, 135 armor and a 755 energy pool.

**How it works.** Subsume Gloom over 4. Silence's 2s stun stretches to about 8s in
Gloom and up to 40s at the 95% slow cap (272% Strength). Sonar's multiplier scales
with Strength, and Precision Intensify plus Molt Vigor plus Molt Augmented plus
Resonance (which snapshots the initial cast's Strength) locks it high. Sonic
Fracture full-strips at 143% Strength for priority targets. *Confidence:
Approximation, per the author.*

**Playstyle.**

1. Activate Gloom and Silence (get a headshot first to snapshot Pax Bolt or Growing Power Strength, then cast Gloom).
2. Keep Silence up for the stun and ability lockout.
3. On shield break, roll and cast Sonar to fully regenerate shields and reset the gate.
4. Stack multiple Sonars on a lich, sister or Acolyte.

**Duration, Efficiency, Range, Strength.** Positive Duration for Sonar and Silence
length and to cut Gloom drain. Neutral Efficiency for shield gating off Sonic Boom
(0.7s) and Sonar (1.33s). Range should stay modest: too much Range makes Silence's
stun expire before enemies re-enter, and Silence out-ranging Gloom weakens the
stun stretch. Strength wants the 272% Gloom cap.

**The mods.** *Precision Intensify* is the Strength, with Molt Vigor and Molt
Augmented behind it. *Stretch* is Gloom range. *Primed Continuity* holds Duration.
*Primed Flow, Equilibrium* are the energy base. *Catalyzing Shields* improves the
per-cast gate. *Resonance* and *Sonic Fracture* are the augments. *Brief Respite*
aura feeds the gate.

**Flexible slots.** Catalyzing Shields and Rolling Guard swap for each other.
Resonance and Sonic Fracture swap for Streamline or Strength. The exilus is
Preparation for speedrun lich missions.

**Helminth.** Gloom over 4 is the build. Alternatives are limited; the kit wants
Gloom's slow to stretch Silence.

**Archon Shards.** Two Amber cast-speed for Sonar spam and Silence recasts. Three
Crimson strength (up to 45% Tauforged) to drop Molt Vigor or Molt Augmented for
Arcane Aegis or Energize. Five total.

**Arcanes.** Molt Vigor and Molt Augmented for the Strength to hit the Gloom cap
and boost Sonar. Headshot arcanes (Consequence, Pistoleer, Precision, Rage) also
fit since Gloom makes headshots trivial.

**Focus.** Any. Madurai for cast speed and Strength.

**Weapon synergy.** Any weapon that can reliably hit the Sonar spots: high-
precision hitscan or a weapon with a bullet-attractor (Scourge). Kitgun
secondaries with Pax Bolt for a snapshot Strength boost.

**Staying alive.** Shield gating off Sonar and Sonic Boom plus Gloom's slow plus
Silence's stun plus Primed Sure Footed. It fails if you cannot land shots to feed
Resonance and the Sonar lapses, and to toxin.

**Energy.** Equilibrium plus a Dethcube with Energy Generator. Gloom drain is the
main cost.

**Where it struggles.** It is a marksman frame: if you cannot consistently hit
weakspots, the whole build does nothing. Crowd clear is weak. It shines on single
tough targets, not rooms.

**Variants.** None material; the source is a focused single build.

**Strengths and weaknesses.** Strong: the largest weakspot multiplier in the game,
40-second crowd control, a real lich and boss deleter. Weak: demands precise aim,
poor at trash clear, entirely weapon-carried.

**Who runs this.** Confident marksmen who want to fold liches, sisters and Acolytes
with a weapon that would otherwise bounce off them.

---

### The Eternal Hunger
**Grendel Prime. A Regurgitate percent-health nuke fed by Nourish, on a persistence tank.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Percent-health scaling nuke, armour strip, near-immortal bruiser |
| Difficulty | Intermediate |
| Investment | Very high. 6 forma, Umbral forma, strength shards |
| Weapon reliance | Low. Regurgitate scales on enemy health; Nourish arms your weapon anyway |

> Tenno. Grendel eats the room and spits it back. Feast swallows five enemies to
> power the kit. Nourish paints everything viral, stuns on hit, and floods your
> energy. Regurgitate launches a swallowed enemy for a chunk of its current
> health as gas, and with Gastro it bounces four times. Because it scales on
> health, not level, it kills anything if you feed it a similar target. Arcane
> Persistence caps the damage you take.

**The build**

- Umbral Intensify, rank 10, Umbral polarity
- Umbral Vitality, rank 10, unpolarised
- Hunter Adrenaline, rank 5, Madurai polarity
- Blind Rage, rank 10, Madurai polarity
- Umbral Fiber, rank 10, unpolarised
- Hearty Nourishment, rank 3, Zenurik polarity — augment. Nourish grants status immunity
- Gastro, rank 3, Zenurik polarity — augment. Regurgitate bounces up to 4 times
- Primed Flow, rank 10, Naramon polarity
- Aura: Growing Power, aura slot
- Exilus: Catapult, Zenurik polarity — augment. Move fast in Pulverize
- Arcanes: Arcane Persistence, Arcane Bellicose

Arsenal figures land at roughly 276% Strength, 100% Duration, 100% Range, 45%
Efficiency, with a 3626 health pool, 1120 armor, 95 shield and a 712 energy pool.

**How it works.** Regurgitate deals 2000 x Strength plus 10% of the launched
enemy's current health as gas, then two forced gas procs, and Gastro adds bounces
at 25% and 6.25%. Feed it a level-9999 heavy gunner and it deals over a million
raw plus millions per second in gas, multiplied 4.25x by Nourish's ten-stack viral
retaliation. It full-strips at 134% Strength. Arcane Persistence caps damage at
500/s above 700 armour, which Grendel's base plus his swallow passive clears
easily. *Confidence: Approximation, per the author's calculations.*

**Playstyle.**

1. Tap 1 (Feast) to ingest five enemies; keep it topped up.
2. Tap 2 (Nourish) and keep it up for energy, viral, the AoE stun on hit, and as an emergency heal.
3. Tap 4 (Regurgitate) to slow, strip, and nuke, producing Breach Surge sparks if subsumed.
4. Optional: hold 1 to expel all five at once for a bigger hit.

**Survivability.** Arcane Persistence (700+ armour, hit with Stand United or one
armour shard or Unairu) caps damage at 500/s, and Nourish (~2000 on cast) plus
Pulverize (~400-500/s) heals it back over the ~7s buffer the 3626 health gives.
Or Catalyzing Shields shield gating (max shields 19, one Nourish cast re-gates).
*Confidence: Approximation, per the author.*

**Duration, Efficiency, Range, Strength.** Positive Duration for Nourish uptime.
Negative Efficiency because Nourish multiplies all energy. Range for Nourish
retaliation and Regurgitate AoE. Strength barely touches Regurgitate damage
(health-scaled) but wants 134% for the strip and 250% to 500% for Pulverize's
heal-per-second to match Persistence's drain.

**The mods.** The *Umbral set* (Intensify, Vitality, Fiber) plus *Blind Rage* is
the Strength-and-tank core. *Hunter Adrenaline* is the energy engine. *Primed
Flow* is the pool. *Hearty Nourishment* is status immunity. *Gastro* is the 4x
Regurgitate DPS. *Growing Power* aura for Strength. *Catapult* exilus for
Pulverize speed.

**Flexible slots.** Hearty Nourishment to more Range if you do not need status
immunity. Adaptation plus Gourmand plus Vitality for a casual ~300k-EHP tank.
Mecha Empowered aura plus Mecha Pulse for a Kubrow nuke.

**Helminth.** Pick one. Subsume over Pulverize (heal with Nourish or a weapon
instead).

- **Breach Surge** for line-of-sight blinds and sparks that scale off Regurgitate's damage.
- **Roar** to double-dip Regurgitate's forced toxin DoT.
- **Resonator** for wide crowd control.
- A **grouping** ability (Pull, Airburst, Ensnare, Larva) to line up Regurgitate.

**Archon Shards.** One optional Amber cast-speed. One optional Tauforged armour
for the 1400-armour Persistence safety margin. Four Crimson strength toward the
Pulverize immortality threshold. Five total.

**Arcanes.** Arcane Bellicose for 72% Strength, Arcane Persistence for the damage
cap. Arcane Arachne for a 2.5x Breach Surge multiplier if you go ability-DPS,
Arcane Energize for more energy.

**Focus.** Any. Unairu for the passive 200 armour toward Persistence. Madurai for
Strength.

**Weapon synergy.** Nourish supplies viral, so drop viral mods for damage, crit
and fire rate: pure-toxin Torid Incarnon, electric Bubonico, Acid Shells Sobek,
Dual Toxocyst, Ocucor. Pulverize movement speed scales with Amalgam Serration,
Ceramic Dagger Incarnon, Okina Prime, Ruvox.

**Staying alive.** Arcane Persistence plus Nourish and Pulverize healing, or shield
gating. It fails to Violence, nullifiers, magnetic, and heat or corrosive dropping
armour below 700 (Hearty Nourishment covers status).

**Energy.** Nourish's multiplier plus Hunter Adrenaline plus Primed Flow. A flood.

**Where it struggles.** Overguard (usually larger than health) resists the
percent-health nuke. You must feed Regurgitate enemies of comparable health to the
target. 6 forma plus Umbral forma is a huge cost. Bosses.

**Variants.** A casual 300k-EHP tank build (0 forma). A Mecha-set nuke build.

**Strengths and weaknesses.** Strong: a nuke that scales with enemy health so it
never falls off, a full strip, near-immortal, floods its own energy. Weak:
overguard-awkward, needs to eat comparable enemies, extremely forma-hungry, boss-
blind.

**Who runs this.** Players who want a bruiser whose spit-nuke kills anything at any
level, and who have the forma to spare.

---

### Immortal Slumbering Dragon
**Chroma Prime. Vex Armor damage and a persistence tank, held forever by Guardian Armor.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap, Weapon platform |
| Role | Weapon damage buff, set-and-forget tank |
| Difficulty | Beginner to intermediate |
| Investment | High. 6 forma, Umbral forma |
| Weapon reliance | Total. Chroma buffs a weapon and tanks; the weapon does everything |

> Tenno. Vex Armor stacks a large additive weapon damage buff and an armour buff
> as you take hits and land kills, and Guardian Armor holds it up forever without
> a recast. Heat Elemental Ward pads your health past the 700-armour line for
> Arcane Persistence, which caps incoming damage. Turn on 2 and 3, feed the
> stacks, and carry a gun.

**The build**

- Umbral Intensify, rank 10, Umbral polarity
- Umbral Vitality, rank 10, unpolarised
- Guardian Armor, rank 3, Zenurik polarity — augment. Kills heal you and hold Vex Armor indefinitely
- Primed Flow, rank 10, Naramon polarity
- Hunter Adrenaline, rank 5, Madurai polarity
- Blind Rage, rank 10, Madurai polarity
- Narrow Minded, rank 10, Vazarin polarity
- Primed Continuity, rank 10, Madurai polarity
- Aura: Corrosive Projection, aura slot
- Exilus: Ice Spring, Vazarin polarity
- Arcanes: Arcane Persistence, Arcane Blessing

Arsenal figures land at roughly 254% Strength, 254% Duration, 34% Range, 45%
Efficiency, with an 851 health pool, 370 shield, 450 armor and an 855 energy pool.

**How it works.** Vex Armor's damage buff is additive to Serration and Hornet
Strike, so you can drop base-damage mods on your weapon, and it double-dips on
Glaives and Exodia Contagion. Guardian Armor prolongs Vex Armor forever, so you
only ever recast Elemental Ward. Heat Ward adds 370 x 55% x Strength health; at
221% Strength that plus Umbral Vitality plus Arcane Blessing reaches ~2500 health
for Arcane Persistence, which is armed by Vex Armor's armour. *Confidence:
Approximation, per the author.*

**Playstyle.**

1. Activate Heat Elemental Ward (2); set your emissive colour to red first. Recast when it ends.
2. Activate Vex Armor (3) and get melee and ranged kills to build the armour and damage stacks.
3. Activate Gloom (if subsumed) so weapon damage heals you.
4. Optional: Effigy (4) for a speed and credit boost.

**Duration, Efficiency, Range, Strength.** High Duration for Elemental Ward and the
initial Vex Armor. Efficiency does not matter; Hunter Adrenaline keeps you full
and you never recast Vex Armor. Range is dumped to 34% (nothing needs it, Gloom
heal ignores it). Strength is the priority for Vex Armor and the ~221% Heat Ward
health target.

**The mods.** *Umbral set* plus *Blind Rage* is the Strength core. *Narrow Minded,
Primed Continuity* are the Duration, and the Range cost is free. *Hunter
Adrenaline* is energy. *Primed Flow* is the pool for melee crit-damage shard
value. *Guardian Armor* is the Vex Armor hold plus healing.

**Flexible slots.** Umbral Fiber or two armour shards for a Persistence safety net
even with Vex Armor down. The aura and exilus are open (Primed Sure Footed if you
skip Spellbind).

**Helminth.** Pick one. Subsume over Spectral Scream (1). Set emissive to red for
Heat.

- **Gloom** is the default: it lets any weapon heal you consistently.
- **Spellbind** for status immunity (blocks the magnetic, heat and corrosive that break Persistence) and self-knockdown immunity for Glaives.
- **Wrathful Advance** for more melee damage.
- **Nourish** for viral and energy.

**Archon Shards.** One optional Amber cast-speed. Two parkour. Two to three Violet
melee crit-damage. Five total.

**Arcanes.** Arcane Persistence for the damage cap (mandatory), Arcane Blessing for
the health that buys a second of buffer. Molt Augmented as a Strength swap.

**Focus.** Any. Madurai for Strength. Vazarin Sling as a backup.

**Weapon synergy.** Vex Armor's additive buff means you drop Serration and Hornet
Strike. It double-dips Glaives (Glaive Prime, Xoris, Cerata) and Exodia Contagion.
Without Gloom, pair a lifesteal weapon: Sancti Magistar, Coda Hirudo, Coda Hema,
Life Strike Glaives, Daikyu plus Syam. Carnis-set melees give heavy-kill status
immunity.

**Staying alive.** Arcane Persistence plus Gloom (or weapon lifesteal) healing,
padded by the health pool. It fails to Violence, nullifiers, and magnetic, heat or
corrosive dropping armour below 700 (Spellbind covers status).

**Energy.** Hunter Adrenaline keeps you topped; you rarely spend.

**Where it struggles.** The frame does no damage; it is a buff and a tank. Needs a
healing source (Gloom or lifesteal weapon). 6 forma plus Umbral forma. Bosses take
the weapon.

**Variants.** The source is a single focused build.

**Strengths and weaknesses.** Strong: one of the largest weapon damage buffs,
set-and-forget once the stacks build, near-immortal, double-dips Glaives and
Contagion. Weak: entirely weapon-carried, needs a heal source, forma-hungry,
boss-blind.

**Who runs this.** Players who want a tank that quietly doubles their favourite
weapon's damage and never has to think about survival.

---

### Disco Ball of Death
**Mirage Prime. A Prism laser ball that ramps up until it wipes rooms, or a single target, in a second.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Ramping laser nuke, single-target deleter with an attractor |
| Difficulty | Intermediate. The attractor-bubble trick and the long cast |
| Investment | Medium. 4 forma, cast-speed shards mandatory |
| Weapon reliance | Low for clear. A primer or Scourge multiplies it hugely |

> Tenno. Prism throws twenty lasers that track enemies, and every tick they get
> 25% stronger, 50% under Solar Eclipse, so a Prism that lives ten seconds ends up
> doing tens of millions per laser. Force the ball through an enemy with an
> attractor bubble and all twenty lasers hit them at once: a million a second on
> one target, dead regardless of level. Prism Guard lets you steer the ball.

**The build**

- Prism Guard, rank 3, unpolarised — augment. Steer the Prism ball and enable the attractor interaction
- Rolling Guard, rank 10, Vazarin polarity
- Blind Rage, rank 10, Madurai polarity
- Primed Continuity, rank 10, Madurai polarity
- Overextended, rank 5, unpolarised
- Equilibrium, rank 10, Naramon polarity
- Primed Flow, rank 10, Naramon polarity
- Narrow Minded, rank 10, Vazarin polarity
- Aura: Corrosive Projection, Naramon polarity
- Exilus: Primed Sure Footed, Vazarin polarity
- Arcanes: Arcane Concentration, Molt Augmented

Arsenal figures land at roughly 139% Strength, 254% Duration, 124% Range, 45%
Efficiency, with 300 health, 410 shield, 185 armor and a 641 energy pool.

**How it works.** Each Prism cast fires 20 lasers dealing 250 radiation twice a
second, and every tick raises all lasers' damage by 25% (50% with Solar Eclipse).
The author's figure: at ~200% Strength on a dense map, each laser reaches ~180,000
per tick after 6 seconds, roughly 63 million total across all lasers over a
10-second Prism. A single laser normally hits one enemy, but an attractor bubble
(Scourge alt-fire, Xata's Whisper void status, Amp) pulls the ball through a
target so all 20 land at once, over a million per second, killing anything to
level cap with no strip. *Confidence: Approximation, per the author.*

**Playstyle.**

1. Cast Hall of Mirrors (tap 1) and Solar Eclipse (invert controls, tap 3); keep both up.
2. Keep Nourish or Pillage active if subsumed.
3. Fire a Scourge alt-fire attractor bubble.
4. Cast 4 and run into enemies so the ball is caught by the bubbles.

**Duration, Efficiency, Range, Strength.** High Duration is the priority: it
extends the very short Prism and cuts its channel drain, and the longer it lives
the more it ramps. Efficiency at 45% with Primed Flow, Equilibrium and Seismic
Bond. A little Range for laser and blind radius. Strength boosts Prism damage.

**The mods.** *Narrow Minded, Primed Continuity* are the Duration. *Blind Rage* is
the Strength. *Overextended* is the Range. *Primed Flow, Equilibrium* are the
energy base. *Prism Guard* is mandatory for steering and the attractor trick.
*Rolling Guard* is survival. *Corrosive Projection* helps against armour.

**Flexible slots.** Rolling Guard flexes for Umbral Intensify or Augur Secrets.
Natural Talent is mandatory without cast-speed shards (Prism's cast is very slow).
Prism Guard can drop for Fleeting Expertise if you only play tiny rooms.

**Helminth.** Pick one. Subsume over Sleight of Hand (2).

- **Pillage** for survivability plus a strip that helps Prism damage.
- **Nourish** for energy sustain (does not help Prism damage).

**Archon Shards.** Two to three Tauforged Amber cast-speed (mandatory). The rest
Duration. Five total.

**Arcanes.** Arcane Concentration (cast Prism right after Pillage for a 60%
Duration bonus), Molt Augmented for Strength. Arcane Aegis for lazy survival.

**Focus.** Any. Vazarin Sling as a backup. Madurai for cast speed on the slow
Prism.

**Weapon synergy.** Scourge is the best pairing: its alt-fire makes the headshot
attractor bubble that sucks in the ball and rapidly accelerates the ramp, ideal
for Acolytes, Thrax and Demolysts. An area viral or magnetic primer (Epitaph, Kuva
Nukor, Kuva Ogris) multiplies the lasers up to 4.25x.

**Staying alive.** Hall of Mirrors making enemies miss plus Rolling Guard plus
Corrosive Projection. Mirage is fragile; this build has no gate, so lean on the
holograms and Pillage if subsumed. It fails to focused fire and to toxin.

**Energy.** Primed Flow plus Equilibrium plus Seismic Bond at 45% Efficiency.

**Where it struggles.** The ramp means Prism is weak for its first few seconds.
The cast animation is punishing without shards. Line-of-sight limits the lasers.
Open tiles dilute the ramp.

**Variants.** The Total Malevolence hologram platform is the other Mirage build.

**Strengths and weaknesses.** Strong: enormous ramping AoE, an instant single-
target delete with an attractor, scales to level cap. Weak: slow to ramp, slow
cast, fragile frame, tile-dependent.

**Who runs this.** Players who want a nuke that also folds Acolytes and Demolysts
by dragging a laser ball through their face.

---

### Danse Danse Revenant
**Revenant Prime. A Danse Macabre damage-absorb nuke that scales with enemy damage, on a speedrun chassis.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap, Speedrun |
| Role | Scaling channelled nuke, fast map traversal, Mesmer Skin survival |
| Difficulty | Intermediate. The Duration and Efficiency drain brackets |
| Investment | Medium. 4 forma, strength and cast-speed shards |
| Weapon reliance | Very low. Danse Macabre nukes; a primer covers non-attacking targets |

> Tenno. Danse Macabre eats enemy damage and pays it back out of nine spinning
> lasers, so the harder enemies hit, the harder it nukes: at level cap one
> revolution can deal hundreds of millions. Mesmer Skin keeps you immortal while
> it spins. Reave is here only as a movement tool, and bugged with Danse it makes
> you faster than Titania. Prime, spin, absorb, delete.

**The build**

- Mesmer Shield, rank 3, unpolarised — augment. Hands allies Mesmer Skin charges
- Narrow Minded, rank 10, Vazarin polarity
- Primed Continuity, rank 10, Madurai polarity
- Transient Fortitude, rank 10, Madurai polarity
- Streamline, rank 5, Naramon polarity
- Primed Flow, rank 10, Naramon polarity
- Equilibrium, rank 10, Naramon polarity
- Umbral Intensify, rank 10, unpolarised
- Aura: Corrosive Projection, Naramon polarity
- Exilus: Power Drift, Zenurik polarity
- Arcanes: Arcane Concentration, Molt Augmented

Arsenal figures land at roughly 214% Strength, 227% Duration, 34% Range, 130%
Efficiency, with 370 health, 925 shield, 135 armor and a 641 energy pool.

**How it works.** Danse Macabre deals damage equal to what enemies deal to you,
decaying fast unless you keep taking hits, plus it procs corrosive on armoured
enemies for an innate strip. The author's figure: at level cap enemies hit for
~1 million per shot, so one nine-laser revolution deals ~9 million after a single
hit, and a few seconds of absorbing pushes a revolution to ~450 million. Strength
barely matters at high levels because absorbed damage is flat. Duration and
Efficiency are paired to minimise the channel drain (280% Duration plus 130%
Efficiency is one valid point). *Confidence: Approximation, per the author and the
wiki drain table.*

**Playstyle.**

1. Prime a specific tough target (Thrax, or a non-attacking enemy) with viral and magnetic, then Reave it.
2. Activate Mesmer Skin.
3. Enter Danse Macabre and let it absorb and pay out.
4. Spam Reave between engagements for speed.

**Duration, Efficiency, Range, Strength.** Duration and Efficiency are the drain
brackets and also Roar and Reave uptime. Range does nothing here (Danse's sweep
radius is fixed, and Reave is not for killing), so it is dumped to 34%. Strength is
for Mesmer Skin charges and Roar, and helps Danse only at low levels.

**The mods.** *Narrow Minded, Primed Continuity* are the Duration toward the drain
bracket. *Streamline* is the Efficiency. *Transient Fortitude, Umbral Intensify*
are the Strength for Mesmer Skin. *Primed Flow, Equilibrium* are the energy base.
*Mesmer Shield* is the team-share augment. *Corrosive Projection* stacks with
Danse's own corrosive.

**Flexible slots.** Mesmer Shield can drop for another Strength or Duration mod if
solo. Natural Talent without cast-speed shards. Seismic Bond on a pet frees the
Streamline slot.

**Helminth.** Pick one. Subsume over Enthrall (1).

- **Roar** to scale Danse at lower levels.
- **Nourish** for energy economy and a viral proc.

**Archon Shards.** One Tauforged or two regular Amber cast-speed. One Tauforged
corrosive-stack shard for a 98% Danse strip. The rest Crimson strength. Five total.

**Arcanes.** Arcane Concentration for Duration (Roar uptime and lower Danse drain),
Molt Augmented for Strength. Both optional.

**Focus.** Madurai for Strength and cast speed. Any works given Mesmer Skin.

**Weapon synergy.** A viral-magnetic primer (Kuva Nukor, Coda Catabolyst, Kompressa
Prime) so Reave can delete a tough target before Danse ramps.

**Staying alive.** Mesmer Skin, exactly as in the Enthralled Sovereign build:
refresh before the charge pool empties, bring Silence if Acolytes dispel it, watch
toxin in the gaps.

**Energy.** Positive Efficiency plus Equilibrium; the drain brackets are the whole
point of the stat spread.

**Where it struggles.** Danse is weak at low and mid levels where enemies do not
hit hard enough to absorb. Non-attacking targets need the Reave-primer workaround.
Bosses.

**Variants.** The Enthralled Sovereign is the Mesmer-tank-and-Reave build. A
Reave-nuke marked-for-death build exists.

**Strengths and weaknesses.** Strong: a nuke that scales with enemy damage so it
never falls off in endurance, immortal, absurd movement speed, low weapon
investment. Weak: weak below the deep end, needs a primer for stubborn targets,
boss-blind.

**Who runs this.** Players who want a Revenant that speedruns and gets stronger the
deeper the endurance run goes.

---

### Well of Death
**Ivara Prime. A Concentrated Arrow room nuke fired at a floating invulnerable target, from stealth.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Silent ramping bow nuke, status immunity, invisible survival |
| Difficulty | Intermediate. The Crepuscular activation order |
| Investment | Low. 1 forma, violet electric shards |
| Weapon reliance | Total. Artemis Bow with Concentrated Arrow is the entire damage plan |

> Tenno. Concentrated Arrow turns Artemis Bow into an explosion with the biggest
> radius in the game, and forced impact in that radius, so Internal Bleeding
> paints the whole room in slash. Well of Life hangs an invulnerable target in the
> air for you to headshot over and over, nuking the room without chasing a new
> mark, and it makes you status- and knockdown-immune. Prowl keeps you invisible.

**The build**

- Stretch, rank 5, unpolarised
- Concentrated Arrow, rank 3, unpolarised — augment. Artemis Bow arrows explode on headshot
- Pool of Life, rank 3, unpolarised — augment. Well of Life target drops four health orbs
- Blind Rage, rank 10, Madurai polarity
- Primed Flow, rank 10, Naramon polarity
- Overextended, rank 5, Vazarin polarity
- Augur Reach, rank 5, unpolarised
- Equilibrium, rank 10, Naramon polarity
- Aura: Corrosive Projection, Naramon polarity
- Exilus: Cunning Drift, unpolarised
- Arcanes: Arcane Crepuscular, Arcane Rage

Arsenal figures land at roughly 139% Strength, 100% Duration, 280% Range, 45%
Efficiency, with 280 health, 555 shield, 135 armor and an 855 energy pool.

**How it works.** Concentrated Arrow's headshot explosion has the largest radius
in the game (19.6m at max Range, 22.68m with Primed Firestorm), no falloff, is
silent, and does not stagger you. It forces impact in that radius so Internal
Bleeding converts it to slash at 70%. Well of Life is a permanent headshot target
that triggers the explosion repeatedly; Pool of Life turns it into four health
orbs (220 energy through Equilibrium) when it expires. *Confidence: Approximation,
per the author.*

**Crepuscular order.** To get both Crepuscular's Strength and Spectral Serration
onto Artemis Bow: activate Artemis Bow first while visible, then cast Cloak Arrow
and stand in the bubble, then activate Prowl.

**Playstyle.**

1. Optional: drop an Afentis and stand in the bubble for the reload buff (speeds bow fire rate).
2. Activate Prowl and Artemis Bow.
3. Cast Well of Life on an enemy (up to three, one per chokepoint).
4. Spam headshots onto the Well of Life target to nuke the room.

**Duration, Efficiency, Range, Strength.** Duration is not needed (helps Well of
Life uptime and Prowl drain). Efficiency dumped because Pool of Life makes 220
energy per Well. Range is the priority stat, maxed, for the explosion radius.
Strength scales Prowl's headshot multiplier and the Artemis Bow damage multiplier.

**The mods.** *Blind Rage* is the Strength. *Overextended, Stretch, Augur Reach*
set the maxed Range. *Primed Flow, Equilibrium* are the energy base. *Concentrated
Arrow* and *Pool of Life* are the augments. *Corrosive Projection* is a straight
damage lift against armour.

**Flexible slots.** Precision Intensify over Blind Rage or Augur Reach for a
no-downside Strength boost. The exilus is open.

**Helminth.** Pick one. Subsume over Navigator (4's replacement) or keep the kit.

- **Well of Life** is the build's engine if you keep it.
- **Roar** for a status double-dip; swap Pool of Life for Empowered Quiver and shoot from a dashwire.

**Archon Shards.** One to two Amber parkour for roll speed. Three to five Violet
primary electric-damage for raw electric and area electric status on Artemis Bow.
Five total.

**Arcanes.** Arcane Crepuscular for 30% Strength and a flat crit-damage add, Arcane
Rage for +180% Artemis Bow damage.

**Focus.** Any. Madurai for Strength.

**Weapon synergy.** Artemis Bow is the weapon. A non-bow primary statstick lets it
inherit the Vigilante bonus (Afentis for the reload buff, Mutalist Quanta for crit
damage, Scourge for a headshot bubble). A Panzer primes viral for the low base
status chance.

**Staying alive.** Prowl invisibility plus Well of Life's status and knockdown
immunity within its radius. It fails outside a Well's radius if you take a burst,
and to enemies that ignore stealth.

**Energy.** Pool of Life orbs through Equilibrium; terminate a Well early for an
emergency 220 energy.

**Where it struggles.** Bosses. It wants a Well target and a stealth setup, so a
cold start is slow. Artemis Bow cannot self-proc viral (0% status) so it needs a
companion primer.

**Variants.** A Roar dashwire variant. An old Spectrorage version.

**Strengths and weaknesses.** Strong: the largest AoE in the game, silent and
non-staggering, invisible, status-immune, one forma. Weak: weapon-carried, boss-
blind, needs a primer and a stealth setup.

**Who runs this.** Players who want a silent bow that erases rooms from cover,
without ever being seen.

---

### Ironclad Rhino
**Rhino Prime. A non-helminth Iron Skin tank with a strong Roar and Stomp crowd control.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Set-and-forget tank, team damage buff, crowd control |
| Difficulty | Beginner |
| Investment | High. 6 forma |
| Weapon reliance | Total. Rhino tanks and buffs; the weapon does everything |

> Tenno. This is Iron Skin without a subsume. Ironclad Charge inflates your armour
> when you charge a crowd, Health Conversion stacks more, and casting Iron Skin
> while the bonus is up locks it all into a health bar in the tens or hundreds of
> thousands. Reinforcing Stomp tops it back up on every cast without redoing the
> setup. Keep Roar going for the squad.

**The build**

- Ironclad Charge, rank 3, Zenurik polarity — augment. Charge grants a large temporary total-armour bonus per enemy hit
- Equilibrium, rank 10, Naramon polarity
- Blind Rage, rank 10, Madurai polarity
- Stretch, rank 5, Naramon polarity
- Reinforcing Stomp, rank 3, unpolarised — augment. Stomp restores 4% of Iron Skin per enemy hit
- Umbral Intensify, rank 10, unpolarised
- Primed Continuity, rank 10, Madurai polarity
- Health Conversion, rank 5, Vazarin polarity
- Aura: Corrosive Projection, aura slot
- Exilus: Ice Spring, Vazarin polarity
- Arcanes: Molt Augmented, Arcane Battery

Arsenal figures land at roughly 243% Strength, 155% Duration, 145% Range, 45%
Efficiency, with 370 health, 555 shield, 290 armor and a 150 energy pool (Arcane
Battery raises the effective pool toward 1000 at high armour).

**How it works.** Iron Skin is base armour times a stack of multipliers, and
Strength enters twice (via Ironclad Charge's bonus and as a final multiplier).
Health Conversion at three stacks gives 1350 armour, far more than Umbral Fiber's
378 on Rhino's tiny 290 base. Reinforcing Stomp restores 4% of the total per enemy
hit, so you never redo the full combo. Arcane Battery converts the armour into up
to 1000 energy. The author's figures at ~300% Strength: about 80k Iron Skin after
charging 20 enemies, about 480k with Health Conversion. *Confidence: Approximation,
per the author.*

**Playstyle.**

1. Get kills for energy and health orbs; build Health Conversion to three stacks.
2. Group a crowd (Proboscis Cernos, Magus Anomaly, Vazarin Snare).
3. Cast Charge through the group for the Ironclad Charge bonus.
4. Stomp constantly for crowd control and to keep Iron Skin near max.
5. Keep Roar up.

**Duration, Efficiency, Range, Strength.** Primed Continuity gives Ironclad Charge
a 15s+ setup window and near-minute Roar. Efficiency at 45% because Arcane Battery
plus Equilibrium covers it. A little Range gives a 30m+ Stomp and Roar. Strength is
the whole build.

**The mods.** *Blind Rage, Umbral Intensify* are the Strength, with *Primed
Continuity* holding Duration. *Ironclad Charge* is the mandatory armour multiplier.
*Health Conversion* is a large stacking armour source. *Reinforcing Stomp* is the
top-up. *Equilibrium* converts orbs.

**Flexible slots.** Blind Rage to Transient Fortitude if energy is tight in quick
missions. The aura and exilus are open.

**Helminth.** Pick one. Subsume over Stomp (unless you keep it, in which case run
Nourish over Charge).

- **Parasitic Armor** for the biggest armour boost (see Shield of Iron).
- **Elemental Ward (Cold)** for ~1291 armour plus reflection.
- **Ensnare, Larva or Airburst** for grouping to feed Ironclad Charge.
- **Empower** to boost both Iron Skin and Roar.

**Archon Shards.** Two Amber cast-speed for Stomp speed. The rest Crimson strength
(triple-dips Iron Skin). Five total.

**Arcanes.** Arcane Battery for the energy pool, Molt Augmented for Strength.
Arcane Guardian now builds Iron Skin on hits taken, a strong swap.

**Focus.** Madurai for a 40% Strength Sling perk. Vazarin for a grouping ability.

**Weapon synergy.** None from the frame beyond Roar. A grouping weapon (Proboscis
Cernos) helps the Charge setup.

**Staying alive.** Iron Skin, topped by Reinforcing Stomp. No regen otherwise;
when the pool is gone you redo the combo. Toxin bypasses it.

**Energy.** Arcane Battery plus Equilibrium. Once Iron Skin is huge you only cast
Roar and Stomp.

**Where it struggles.** Toxin. Deep endurance where a hit exceeds the pool. The
setup ritual. Does no damage itself.

**Variants.** The Shield of Iron Parasitic Armor build pushes Iron Skin into the
millions. A Roar buff build. An endurance Nourish non-tank build.

**Strengths and weaknesses.** Strong: near-unkillable in most content, strong team
Roar, simple, no helminth needed. Weak: zero self damage, toxin-vulnerable, setup
ritual, no regen, 6 forma.

**Who runs this.** Players who want a no-subsume Iron Skin tank that carries a
weapon and a Roar.

---

### Lazy Monkey King
**Wukong Prime. A persistence health-tank that scales to level cap while carrying an Iron Staff.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap, Speedrun |
| Role | Effortless health tank, Iron Staff influence clear |
| Difficulty | Beginner |
| Investment | High. 5 forma, Umbral forma, violet melee crit-damage shards |
| Weapon reliance | High. Iron Staff (and any subsumed buff) does the damage; the frame just survives |

> Tenno. This Wukong does almost nothing except not die. Defy stacks 1500 armour,
> the Umbral set and Arcane Blessing push health past 3000, and Arcane Persistence
> caps incoming damage at 500 a second above 700 armour. Cloudwalker heals and
> travels. Enter Iron Staff and hold light attack. That is the whole game.

**The build**

- Umbral Intensify, rank 10, Umbral polarity
- Umbral Vitality, rank 10, Umbral polarity
- Umbral Fiber, rank 10, unpolarised
- Narrow Minded, rank 10, Vazarin polarity
- Gladiator Resolve, rank 5, Vazarin polarity
- Hunter Adrenaline, rank 5, Madurai polarity
- Primed Flow, rank 10, Naramon polarity
- Nira's Hatred, rank 5, Vazarin polarity
- Aura: Corrosive Projection, aura slot
- Exilus: Preparation, unpolarised
- Arcanes: Arcane Blessing, Arcane Persistence

Arsenal figures land at roughly 177% Strength, 214% Duration, 34% Range, 100%
Efficiency, with a 1970 health pool, 812 armor, 445 shield and a 556 energy pool.

**How it works.** Arcane Persistence caps damage at 500/s while armour is above
700, which Defy (1500 armour on cast, over 2000 held) clears with a huge buffer
against heat and corrosive stripping it. The Umbral set plus Gladiator Resolve plus
Nira's Hatred plus Arcane Blessing push health past 3000 for a ~5s buffer, and any
healing over 500/s keeps you alive indefinitely. Gloom is the most consistent
heal. *Confidence: Approximation, per the author.*

**Playstyle.**

1. Activate the Twin (optional if not subsumed).
2. Press 3 (Defy) to absorb hits and stack 1500 armour.
3. Use 2 (Cloudwalker) to travel and heal.
4. Enter 4 (Iron Staff), hold light attack, use Tennokai when it lights up.

**Duration, Efficiency, Range, Strength.** Duration for Cloudwalker range and buff
length. Efficiency for Cloudwalker and Iron Staff drain. Range is dumped (only
Defy uses it). Strength scales Iron Staff (and any subsumed buff).

**The mods.** The *Umbral set plus Umbral Fiber* is the health-and-armour core.
*Narrow Minded* is the Duration with its Range cost free. *Hunter Adrenaline* is
the energy engine. *Primed Flow* is the pool for melee crit-damage shard value.
*Gladiator Resolve, Nira's Hatred* push health over 3000 and add combo crit.

**Flexible slots.** Arcane Deflection over Arcane Blessing for Grineer and fissure
Cascade, where Kuva Trokarian slash procs one-shot through Persistence. The aura
and exilus are open.

**Helminth.** Pick one. Subsume over the Twin (1) or Defy (3).

- **Gloom** for consistent passive healing while Iron Staff deals damage.
- **Firewalker** for status immunity (protects against the heat, corrosive, magnetic and slash that break Persistence) plus Cloudwalker speed.
- **Roar** to triple-dip melee influence.
- **Wrathful Advance** for flat Iron Staff crit chance.
- **Molt** for the biggest Cloudwalker speed boost.

**Archon Shards.** Five Tauforged Violet melee crit-damage for a full Iron Staff
commitment. Or split with cast-speed and parkour. Five total.

**Arcanes.** Arcane Persistence (mandatory for the tank), Arcane Blessing for the
health buffer. Arcane Strike for Iron Staff attack speed if you skip Arcane Strike
on a subsume.

**Focus.** Any. Madurai for Strength.

**Weapon synergy.** Dexterity arcanes on a primary, secondary and archgun give ~30s
combo duration so Iron Staff never drops combo. Okina Prime with Condition
Perfection gives Iron Staff a 4s Tennokai window.

**Staying alive.** Arcane Persistence plus a healing source, padded by the health
pool. It fails to Violence, nullifiers, magnetic, slash procs that bypass the cap
(Arcane Deflection), and heat or corrosive dropping armour below 700.

**Energy.** Hunter Adrenaline keeps you topped.

**Where it struggles.** The frame does no damage. It needs a heal source. Slash
procs (Kuva Trokarians) bypass Persistence. 5 forma plus Umbral forma. Bosses.

**Variants.** The Celestial Monkey build is the active Iron Staff and Defy-nuke
version. A low-range pure Iron Staff build.

**Strengths and weaknesses.** Strong: effectively unkillable to level cap with
minimal input, strong Iron Staff clear, great for speedruns. Weak: no self damage,
needs a heal, slash-proc vulnerability, forma-hungry.

**Who runs this.** Players who want to stop thinking about survival entirely and
just hold light attack.

---

### Shadow Realm
**Sevagoth Prime. A min-maxed Sow-and-Reap build tuned to one-shot to level cap with no viral.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Pure zero-effort nuke |
| Difficulty | Intermediate |
| Investment | Medium. 4 forma, three to four Tauforged strength shards mandatory |
| Weapon reliance | Very low. Sow-and-Reap is the whole plan |

> Tenno. This is the Gloom Reaper stripped to just the nuke. Both augments are
> mandatory: Shadow Haze spawns three Reap shadows, Dark Propagation spreads Sow
> for you. Roar is mandatory too. Hit exactly 255% Strength on Reap and Roar and
> the Sow-then-Reap combo one-shots any non-boss enemy to level cap with no viral
> at all. Spam 1, occasionally 2, and the room dies.

**The build**

- Shadow Haze, rank 3, Zenurik polarity — augment. Spawns three Reap shadows and a flat crit-chance debuff
- Dark Propagation, rank 3, unpolarised — augment. Sow self-propagates
- Stretch, rank 5, Naramon polarity
- Umbral Intensify, rank 10, unpolarised
- Equilibrium, rank 10, Naramon polarity
- Primed Flow, rank 10, Naramon polarity
- Transient Fortitude, rank 10, Madurai polarity
- Catalyzing Shields, rank 3, Vazarin polarity
- Aura: Brief Respite, aura slot
- Exilus: Power Drift, unpolarised
- Arcanes: Arcane Energize, Arcane Concentration

Arsenal figures land at roughly 214% Strength, 72% Duration, 145% Range, 100%
Efficiency, with 370 health, 370 shield, 185 armor and a 641 energy pool.

**How it works.** Reap deals 25% of an enemy's current health as true damage, not
scaled by Strength, multiplied by viral and Roar. The threshold to one-shot with
no viral is exactly 255% Strength on both Reap and Roar, which the listed 214%
arsenal plus three or four Tauforged strength shards reaches. Dark Propagation
spreads Sow so you rarely recast it. *Confidence: Approximation, per the author's
spreadsheet.*

**Playstyle.**

1. Cast Sow to mark enemies (self-spreads).
2. Cast Reap to delete the marked and debuff survivors.
3. Recast Sow occasionally when new enemies spawn (25 energy).
4. Keep Roar up.

**Survivability.** Catalyzing Shields shield gating off constant Sow and Reap casts
plus Brief Respite, backed by Vazarin Protective Sling for a 5s panic i-frame.
*Confidence: Approximation, per the author.*

**Duration, Efficiency, Range, Strength.** Low Duration is fine (Dark Propagation
carries Sow); keep enough for Roar uptime. Neutral Efficiency with Equilibrium.
Range for Sow spread and Gloom if you keep it. Strength does not affect Reap
damage but is needed for the Reap debuff, the Shadow Haze crit buff, and Roar.

**The mods.** *Transient Fortitude, Umbral Intensify* plus shards are the Strength
toward 255%. *Stretch* is the spread Range. *Primed Flow, Equilibrium* are the
energy base. *Catalyzing Shields* locks the gate. *Shadow Haze, Dark Propagation*
are the mandatory augments. *Brief Respite* aura feeds the gate.

**Flexible slots.** Precision Intensify over Umbral Intensify if you have enough
Strength on Reap. Power Drift can become Primed Sure Footed with a fourth strength
shard. Rolling Guard if you swap an arcane.

**Helminth.** **Roar is mandatory** for the one-shot threshold. Subsume it over
Gloom or Shadow depending on whether you want the Shadow form available.

**Archon Shards.** One Tauforged Amber cast-speed. Three to four Tauforged Crimson
strength (mandatory for the threshold). One flexible. Five total.

**Arcanes.** Arcane Energize or Steadfast for energy (Steadfast breaks consistent
shield gating), Arcane Concentration for Roar uptime. Molt Augmented as a swap that
frees a shard or a mod slot.

**Focus.** Vazarin for the panic Sling. Madurai for Strength toward the threshold.

**Weapon synergy.** Energy-generating weapons only (Tenet Glaxion, Miter Incarnon,
Grimoire), since the build barely uses a weapon for damage.

**Staying alive.** The Sow-and-Reap shield-gate loop plus Vazarin Sling. It fails
if you run out of energy with Roar down, and to toxin.

**Energy.** Equilibrium plus Arcane Energize; casts are infrequent.

**Where it struggles.** Bosses and Acolytes resist Reap. It wants density. It is a
one-trick build with almost no weapon damage.

**Variants.** The Gloom Reaper build is the general-use version with a slow field
and a spare frame.

**Strengths and weaknesses.** Strong: a true level-cap one-shot with no priming,
zero effort to pilot. Weak: boss-blind, density-dependent, shard-gated, does
nothing else.

**Who runs this.** Players who want the purest possible point-and-delete nuke and
have the shards to feed it.

---

### Through the Fire and Flames
**Temple. A backbeat-timed exalted flamethrower with a red-crit weapon buff.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap, Weapon platform |
| Role | Exalted solo DPS, flat crit-chance and heat weapon buff, on-beat invulnerability |
| Difficulty | Advanced. Everything keys off hitting the "backbeat" timing |
| Investment | Medium to high. 4 forma, primary status and cast-speed shards |
| Weapon reliance | High. Lizzie the exalted, or your own weapon, does the damage; Temple buffs it |

> Tenno. Temple fights on rhythm. Tap 1 and 2 on the backbeat, the sweet spot on
> the pendulum, and you fuel Lizzie the exalted flamethrower, extend Ripper's Wail
> for up to 750% heat, and double Overdrive's flat crit chance. Tap 3 on a
> backbeat for invulnerability and a heat buff. Cast 4 on a backbeat for a free
> exalted. Miss the beats and the whole kit sputters.

**The build**

- Rolling Guard, rank 10, Vazarin polarity
- Primed Flow, rank 10, Naramon polarity
- Archon Vitality, rank 0, unpolarised — doubles Lizzie's heat procs
- Equilibrium, rank 10, Naramon polarity
- Archon Continuity, rank 10, Madurai polarity
- Stretch, rank 5, unpolarised
- Transient Fortitude, rank 10, Madurai polarity
- Blind Rage, rank 10, Madurai polarity
- Aura: Corrosive Projection, Naramon polarity
- Exilus: Firewalker, unpolarised
- Arcanes: Arcane Hot Shot, Arcane Impetus

Arsenal figures land at roughly 254% Strength, 128% Duration, 145% Range, 45%
Efficiency, with about 551 health, 325 shield, 325 armor and a 613 energy pool.

**How it works.** Hitting a backbeat on 1 or 2 cuts that cast's energy cost by
50%, fuels Lizzie (which runs on fuel, not energy), extends and grows Ripper's
Wail's heat bonus (capped at 750%), and doubles Overdrive's flat crit chance
(175% at 350% Strength). Strength acts as a +damage mod for Lizzie at 1.25x
Strength, so ~350% Strength is roughly a 337% damage mod, additive with Serration
and Merciless. *Confidence: Approximation, per the author's formulas.*

**Playstyle.**

1. Tap 1 and 2 on crowds, hitting backbeats as often as possible to fuel Lizzie.
2. Tap 3 on a backbeat for ~7s invulnerability, a shield refill (2.5s gate), and a heat buff.
3. Cast 4 on a backbeat (0 energy) to summon Lizzie, then shoot.

**Duration, Efficiency, Range, Strength.** Duration is minor: Ripper's Wail has a
30s base extended by backbeats, Exalted Solo ignores Duration, Overdrive is 20s
base. Efficiency is not needed because backbeat casts halve costs and 4 on-beat is
free. Range for 1 and 2 (~145 to 175 covers Lizzie's reach). Strength is the
priority, scaling 1, 2, 4 and the crit buff.

**The mods.** *Blind Rage, Transient Fortitude* are the Strength. *Stretch* is
Range. *Primed Flow, Equilibrium* are the energy base. *Archon Continuity* adds
corrosive off a Blast-Toxin Lizzie. *Rank 0 Archon Vitality* doubles Lizzie heat
procs. *Rolling Guard* is status cleanse for the 1-and-2 spam. *Corrosive
Projection* helps against armour.

**Flexible slots.** Archon Vitality drops if you do not use Lizzie. Rolling Guard
swaps for Catalyzing Shields (active gating off 1 and 2) or more Strength. The
exilus is open.

**Survivability.** Backbeat 3 gives ~7s invulnerability plus a 2.5s shield gate,
backed by Rolling Guard and heat crowd control from 1. Or health-tank with
Adaptation, Health Conversion and a full-rank Archon Vitality for lower content.

**Helminth.** Pick one. Subsume over 1 (Lizzie focus) or 4 (Pyrotechnics or
non-Lizzie platform).

- **Nourish** for passive viral and energy without needing alt-fire.
- **Silence** for passive crowd control and Eximus and Acolyte lockout.
- **Omamori** for a lazy-gate layer.
- **Resonator** for passive area crowd control (fits the theme).

**Archon Shards.** One Amber cast-speed for Ripper's Wail and 2. Up to three
Crimson primary status-chance and one Tauforged corrosive-stack for Lizzie DPS,
or energy-max and parkour for general use. Five total.

**Arcanes.** Arcane Hot Shot for 300% weapon crit chance, Arcane Impetus for 54%
Strength and 27% Efficiency from Lizzie's status spread. Arcane Acceleration for
Lizzie fire rate, Molt Augmented for Strength, as swaps.

**Focus.** Any. Madurai for Strength and cast speed on Ripper's Wail.

**Weapon synergy.** Lizzie builds: Blast-Toxin for general clear, pure Heat for
single-target Disruption. A heat-inherit primer (Epitaph, Kompressa, Cedo)
multiplies Lizzie's heat procs. A Wyrm Prime with Reinforced and Tenacious Bond
buffs Lizzie's fire rate and crit.

**Staying alive.** On-beat 3 invulnerability plus the shield gate plus Rolling
Guard plus heat crowd control. It fails if you cannot hit backbeats to trigger 3,
and to toxin.

**Energy.** Backbeat cost reduction plus Equilibrium plus Seismic Bond. A non-issue
if your rhythm is good.

**Where it struggles.** The entire kit depends on backbeat timing, which is a real
skill barrier. No native crowd control (subsume for it). Bosses take Lizzie or the
weapon.

**Variants.** A lazy-gating exalted DPS build with Silence, Omamori or Nourish.
A Mecha Roar Pyrotechnics nuke.

**Strengths and weaknesses.** Strong: a strong exalted flamethrower, a large flat
crit and heat weapon buff, on-demand invulnerability, good energy economy. Weak:
timing-dependent to the point of frustration, no native crowd control, boss damage
on the weapon.

**Who runs this.** Players who enjoy a rhythm mechanic and want an exalted platform
that rewards hitting the beat.

---

### Critical Mass
**Qorvex. A Crucible Blast chain nuke off Chyrinka Pillars, from inside invulnerable Fused Crucible.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Beam chain nuke, armour strip, status immunity, high-armour tank |
| Difficulty | Intermediate |
| Investment | Medium. 4 forma, Topaz radiation shards |
| Weapon reliance | Low. Crucible Blast nukes; a strip and grouping subsume feed it |

> Tenno. Qorvex plants Chyrinka Pillars, then beams Crucible Blast through a
> grouped line of enemies while clipping the Pillars, which inherit the chain
> reaction and pulse it out to everything in their radius. Fused Crucible lets him
> walk around beaming while completely invulnerable and status-immune. Grouping
> and armour strip are what turn the beam from a poke into a nuke.

**The build**

- Wrecking Wall, rank 3, unpolarised — augment. Containment Wall full-strips at 200% Strength and refreshes Pillars
- Primed Flow, rank 10, Naramon polarity
- Fused Crucible, rank 3, unpolarised — augment. Walk while beaming, fully invulnerable
- Precision Intensify, rank 5, unpolarised
- Overextended, rank 5, Vazarin polarity
- Stretch, rank 5, Naramon polarity
- Blind Rage, rank 10, Madurai polarity
- Primed Continuity, rank 10, Madurai polarity
- Aura: Corrosive Projection, aura slot
- Exilus: Cunning Drift, unpolarised
- Arcanes: Arcane Universal Fallout, Molt Augmented

Arsenal figures land at roughly 139% Strength, 155% Duration, 250% Range, 45%
Efficiency, with 700 health, 875 armor, 300 shield and a 570 energy pool.

**How it works.** Crucible Blast wants both grouping (so one beam hits many) and
armour strip (so its damage lands), neither of which Qorvex's own kit does well,
so both come from a subsume or a companion. Hitting a Chyrinka Pillar with the beam
empowers it for 5s, letting its pulses carry the chain reaction to enemies you are
not aiming at. Fused Crucible makes you invulnerable and status-immune while
beaming. Arcane Universal Fallout floods energy off radiation kills. *Confidence:
Approximation, per the author.*

**Playstyle.**

1. Tap 1 to plant two Chyrinka Pillars in separate areas but within line of sight.
2. Tap 3 (Disometric Guard) for status immunity, or keep a subsume up.
3. Tap 2 (Containment Wall) to group enemies in a line and strip (with Wrecking Wall).
4. Tap 4 and beam the group while clipping both Pillars each pass.

**Duration, Efficiency, Range, Strength.** Chyrinka Pillar's 35s base tolerates
negative Duration; Duration also affects Fused Crucible drain. Efficiency at 45%
because Universal Fallout floods energy on radiation kills. Range is maxed for
Pillar radius, Containment Wall grouping and beam explosions. Strength scales the
beam and the Containment Wall strip (200%, or 164% with Corrosive Projection).

**The mods.** *Blind Rage, Precision Intensify* are the Strength. *Overextended,
Stretch* set the maxed Range. *Primed Continuity* holds Duration. *Primed Flow* is
the pool. *Wrecking Wall* is the strip. *Fused Crucible* is the invulnerable beam.
*Corrosive Projection* lowers the strip threshold.

**Flexible slots.** Precision Intensify to Umbral Intensify if you lack it.
Wrecking Wall drops for Streamline or Transient Fortitude if you subsume Ophanim
Eyes for the strip. Umbral Fiber for a casual EHP tank (~146k). The exilus is open.

**Survivability.** Fused Crucible is total invulnerability while beaming. Between
beams, shield gate off Containment Wall with an Augur mod. Or casual-tank on
Qorvex's 875 base armour plus an armour mod plus Adaptation for ~146k EHP to about
level 300. *Confidence: Approximation, per the author.*

**Helminth.** Pick one. Subsume over Disometric Guard (Fused Crucible already
covers invulnerability and status).

- **Ophanim Eyes** for a slower strip that works without leaving Fused Crucible, freeing the Wrecking Wall slot.
- **Roar** to boost the beam and weapons.
- **Nourish** for extra energy sustain.
- **Breach Surge** for blinds and radiation sparks (thematic).
- A **grouping** ability (Airburst, Larva, Pull, Coil Horizon) if Containment Wall's line grouping is not enough.

**Archon Shards.** One to two Amber cast-speed. Three to four Topaz radiation
ability-damage for the beam. Five total.

**Arcanes.** Arcane Universal Fallout is near-mandatory for energy (Equilibrium
otherwise). Molt Augmented for Strength. Molt Efficiency or Arcane Energize as
swaps.

**Focus.** Any. Madurai for Strength and cast speed.

**Weapon synergy.** Qorvex's passive gives +3 punch-through to all weapons, so
drop punch-through mods on weapons that want it (Dual Toxocyst Incarnon, Soma Prime
Incarnon). A Grimoire for viral priming, passive energy and passive strip. A
Nautilus with Cordon for grouping.

**Staying alive.** Fused Crucible invulnerability while beaming, plus shield gating
between, plus the casual armour tank. It fails to toxin in the gaps and to being
caught out of Fused Crucible with no gate.

**Energy.** Arcane Universal Fallout floods it on radiation kills; add Equilibrium
or Streamline if it runs thin.

**Where it struggles.** Its own grouping and strip are weak, so it leans on a
subsume or companion for both. Line-of-sight tiles. Bosses. Movement in Fused
Crucible is very slow.

**Variants.** An Ophanim Eyes strip variant. A casual EHP-tank variant.

**Strengths and weaknesses.** Strong: a strong chain nuke, total invulnerability
while beaming, status immunity, high base armour. Weak: depends on external
grouping and strip, slow in Fused Crucible, boss-blind.

**Who runs this.** Players who want a caster that stands invulnerable and beams a
grouped, stripped room into a chain reaction.

---

### Lashing Venom
**Saryn Prime. The strongest weapon buff in the game, Venom Dose plus Toxic Lash plus Roar on one gun.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Weapon platform with an enormous toxin buff |
| Difficulty | Intermediate. The shield-gate rhythm |
| Investment | Medium. 4 forma, emerald toxin shards |
| Weapon reliance | Total. Saryn buffs and survives; the weapon does everything |

> Tenno. Stack Venom Dose, Toxic Lash and a subsumed Roar and your weapon's toxin
> status climbs into the thousands of percent. Roar and faction mods double-dip
> Toxic Lash's damage and triple-dip its forced toxin status, and emerald shards
> multiply it again. Molt shield-gates you on demand. Point a toxin weapon at the
> room and it dissolves.

**The build**

- Precision Intensify, rank 5, unpolarised
- Augur Secrets, rank 5, Naramon polarity
- Catalyzing Shields, rank 3, Vazarin polarity
- Narrow Minded, rank 10, Vazarin polarity
- Equilibrium, rank 10, Naramon polarity
- Blind Rage, rank 10, Madurai polarity
- Venom Dose, rank 3, unpolarised — augment. Adds a toxin damage buff to weapons
- Primed Continuity, rank 10, Madurai polarity
- Aura: Corrosive Projection, aura slot
- Exilus: Toxic Flight, unpolarised
- Arcanes: Arcane Sculptor, Molt Augmented

Arsenal figures land at roughly 223% Strength, 254% Duration, 34% Range, 45%
Efficiency, with 465 health, 370 shield, 315 armor and a 300 energy pool.

**How it works.** Toxic Lash's damage is double-dipped by Roar and faction mods,
and its forced toxin status is triple-dipped; two Tauforged Emerald toxin shards
multiply the status ~1.9x on top. The author's worked example: a 100-base-damage
weapon with two toxin mods, 350% Venom Dose, ~105% Roar and two toxin shards
reaches roughly a 1550% raw damage buff and a 7700% toxin-status buff. Arcane
Sculptor locks 175% Efficiency off Molt casts, so Blind Rage runs at 45% arsenal
Efficiency with no Flow. *Confidence: Approximation, per the author's damage
formulas.*

**Playstyle.**

1. Hold 1 (Venom Dose) and press 3 (Toxic Lash) to overbuff your weapon; keep both up.
2. Keep the subsumed Roar up.
3. Tap 2 (Molt) whenever shields break to fully reset the gate, and for the speed buff.
4. Shoot.

**Duration, Efficiency, Range, Strength.** High Duration for Venom Dose, Toxic
Lash and Roar. Efficiency at 45% via Arcane Sculptor. Range does nothing here and
is dumped to 34%. Strength scales all three buffs; Precision Intensify is a hair
better than Umbral below ~300% for Roar triple-dipping Toxic Lash, and easier to
slot.

**The mods.** *Blind Rage, Precision Intensify* are the Strength, covered by
*Arcane Sculptor*. *Narrow Minded, Primed Continuity* are the Duration, Range cost
free. *Catalyzing Shields* locks the Molt gate. *Equilibrium* is energy. *Venom
Dose* is the toxin buff. *Augur Secrets* adds Strength and a gate contribution.

**Flexible slots.** Augur Secrets flexes for Duration or Strength if you run an
Augur mod elsewhere. Without Arcane Sculptor, swap Blind Rage for Primed Flow. The
aura and exilus are open.

**Helminth.** Pick one. Subsume over Spores or Miasma.

- **Roar** is the default: it double-dips Toxic Lash and triple-dips its status.
- **Expedite Suffering** for Disruption, compressing the toxin procs into one multiplied instance (Saryn's passive extends the window 25%).

**Archon Shards.** One Tauforged Amber cast-speed. Two to three Tauforged Emerald
toxin-status damage (each additive third shard is a ~24% total-damage gain,
better than a full strip in most cases). One Tauforged Emerald max-corrosive-stack
for 13-stack 98% strip against armour. Five total.

**Arcanes.** Arcane Sculptor for the Efficiency lock, Molt Augmented for Strength.
Arcane Aegis for lazy survival as a swap.

**Focus.** Any. Madurai for Strength on the buffs.

**Weapon synergy.** Any toxin or toxin-convertible weapon: pure-viral or pure-toxin
Torid, Ocucor (the comfiest, auto-aim and auto-reload), Acid Shells Sobek for a
map-wide chain, Nightwatch Napalm Kuva Ogris for lingering fields, Vermisplicer
with Combustion Beam.

**Staying alive.** The Molt shield-gate loop plus Catalyzing Shields, or a passive
Fast Deflection plus Vigilante Vigor plus Arcane Aegis setup. It fails in the gap
if you cannot cast Molt, and to toxin.

**Energy.** Arcane Sculptor plus Equilibrium. Molt on demand for the gate.

**Where it struggles.** Entirely weapon-carried. Bosses need the weapon. The
buff-and-gate juggling is constant.

**Variants.** The Venomous Bloom build is the spore-nuke hybrid. Pure Expedite
Suffering for Disruption.

**Strengths and weaknesses.** Strong: the single largest weapon damage buff in the
game, strong shield-gate survival, faction-flexible. Weak: does no damage itself,
boss-blind, constant upkeep.

**Who runs this.** Players who want to make one toxin weapon hit like a nuke and do
not mind babysitting three buffs and a shield gate.

---

### The Undying
**Inaros Prime. A 6000-health persistence tank with a Sandstorm strip-nuke and a percent-health execute.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Effectively immortal tank, grouping, armour strip, priming, trash nuke |
| Difficulty | Beginner |
| Investment | Extreme. 8 forma, two Umbral forma |
| Weapon reliance | Medium. Sandstorm can nuke and prime; a weapon covers single targets |

> Tenno. Inaros does not shield-gate; he just has 6000 health and Arcane
> Persistence capping incoming damage at 500 a second. Sandstorm makes him
> invulnerable while it spins, heals him per trapped enemy, and strips and primes
> whatever it holds. Desiccation is a percent-health execute. Scarab Shell makes
> him status-immune. Stand in the fire and let the sand do the work.

**The build**

- Blind Rage, rank 10, Madurai polarity
- Elemental Sandstorm, rank 3, Zenurik polarity — augment. Sandstorm inherits your melee's elements and status
- Umbral Fiber, rank 10, Umbral polarity
- Hunter Adrenaline, rank 5, Madurai polarity
- Umbral Intensify, rank 10, Umbral polarity
- Umbral Vitality, rank 10, unpolarised
- Primed Continuity, rank 10, Madurai polarity
- Primed Flow, rank 10, Naramon polarity
- Aura: Stand United, aura slot
- Exilus: Power Drift, unpolarised
- Arcanes: Arcane Bellicose, Arcane Persistence

Arsenal figures land at roughly 291% Strength, 155% Duration, 100% Range, 45%
Efficiency, with a 6762 health pool, 732 armor, no shields and a 541 energy pool.

**How it works.** Arcane Persistence caps damage at 500/s above 700 armour, which
Stand United plus the Umbral set (or two Tauforged armour shards) clears
non-conditionally. With 6000+ health that is 8 to 16 seconds of standing still
before dying, and Sandstorm heals 50/s per trapped enemy plus grants full
invulnerability while it spins. Scarab Shell adds immunity to the magnetic, heat
and corrosive statuses that break Persistence. *Confidence: Approximation, per the
author.*

**Playstyle.**

1. Cast Sandstorm (2) on a crowd for invulnerability, healing, grouping, strip and priming.
2. Cast Desiccation (1) as a percent-health execute and a blind.
3. Keep Scarab Swarm (4) charged for the armour and status immunity.
4. Weapon covers single targets.

**Duration, Efficiency, Range, Strength.** Positive Duration for Sandstorm and
Scarab Swarm. Efficiency dumped because Hunter Adrenaline floods energy from the
hits you take (outside Sandstorm). Neutral Range for Sandstorm suction. Strength
boosts Scarab Shell armour and Sandstorm's damage and status (double-dips the DoT).

**The mods.** The *Umbral set plus Umbral Fiber* plus *Stand United* is the
armour-and-health core for Persistence. *Blind Rage* is the Strength. *Hunter
Adrenaline* is the energy engine. *Primed Flow* is the pool. *Elemental Sandstorm*
makes Sandstorm a strip-primer-nuke.

**Flexible slots.** Two Tauforged armour shards plus non-Umbral Strength mods if
you cannot afford Umbral forma. The aura and exilus are otherwise open.

**Helminth.** Pick one. Subsume over Devour (3).

- **Roar** for Sandstorm and weapon damage.
- **Nourish** for viral and energy.
- A **grouping** ability if Sandstorm's suction is not enough.

**Archon Shards.** For a weapon Inaros: two Crimson Duration, two violet weapon-
damage, one Amber cast-speed. For pure Sandstorm DPS: two Emerald corrosive-stack
plus three Tauforged Emerald corrosive-ability-damage. Two Tauforged armour if not
running Umbral. Five total.

**Arcanes.** Arcane Bellicose for 72% Strength (from the huge health), Arcane
Persistence for the damage cap. Arcane Grace as a swap if health clears 8334 for
self-sufficient regen.

**Focus.** Any. Unairu for passive armour. Madurai for Strength.

**Weapon synergy.** The melee's elements set Sandstorm's status weighting, so a
pure-blast or electric-influence melee doubles as a Sandstorm statstick and a
weapon. Primary Bulwark on a primary when Scarab Shell is charged. Coda Hema for
headshot lifesteal to heal outside Sandstorm.

**Staying alive.** Arcane Persistence plus the health pool plus Sandstorm
invulnerability and healing plus Scarab Shell status immunity. It fails only to
Violence and nullifiers.

**Energy.** Hunter Adrenaline floods it. A non-issue.

**Where it struggles.** 8 forma plus two Umbral forma is the heaviest investment
here. The frame's damage is Sandstorm (trash only) or the weapon. Bosses.

**Variants.** A pure Sandstorm DPS build. A weapon-platform build.

**Strengths and weaknesses.** Strong: as close to unkillable as any frame, strong
grouping, strip and priming, floods its own energy. Weak: extreme forma cost, weak
own damage, boss-blind.

**Who runs this.** Players who want the single most durable frame in the game and
have the forma to build it properly.

---

### The Kindling
**Ember Prime. A Fireball Frenzy heat weapon buff with Fire Blast overguard survival.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Heat weapon buff platform, overguard survival, partial strip |
| Difficulty | Beginner to intermediate |
| Investment | Medium. 4 forma, Topaz secondary crit shards |
| Weapon reliance | Total. Ember buffs and survives; the weapon does everything |

> Tenno. Fireball Frenzy adds a big heat damage bonus to your weapon, and Ember's
> passive gives 5% Strength per burning enemy, so lighting a room up with Inferno
> pumps the next buff. Healing Flame grants overguard, which cleanses status,
> blocks knockdown, and gives a 0.5s gate on break, so one cast is worth ~1.5s of
> i-frames and a partial armour strip. Light the room, buff, shoot.

**The build**

- Healing Flame, rank 3, unpolarised — augment. Fire Blast heals and grants overguard
- Fireball Frenzy, rank 3, unpolarised — augment. Fireball grants a heat weapon buff
- Exothermic, rank 3, unpolarised — augment. Inferno kills make energy orbs
- Umbral Intensify, rank 10, unpolarised
- Primed Flow, rank 10, Naramon polarity
- Catalyzing Shields, rank 3, Vazarin polarity
- Augur Reach, rank 5, Naramon polarity
- Primed Continuity, rank 10, Madurai polarity
- Aura: Corrosive Projection, aura slot
- Exilus: Firewalker, Madurai polarity
- Arcanes: Arcane Hot Shot, Molt Augmented

Arsenal figures land at roughly 144% Strength, 155% Duration, 130% Range, 100%
Efficiency, with 370 health, 465 shield, 160 armor and a 641 energy pool.

**How it works.** Fireball Frenzy's heat bonus scales with Strength, and Ember's
passive adds 5% Strength per burning enemy (100% after Inferno hits 20), so you
cast Inferno, then hold Fireball for a pumped buff. Healing Flame's overguard is
worth ~1.5s of i-frames per Fire Blast (1s shield gate plus 0.5s overguard gate)
and replaces Catalyzing Shields, Rolling Guard and Primed Sure Footed in one slot.
*Confidence: Approximation, per the author.*

**Playstyle.**

1. Cast Inferno (4) to light enemies on fire, proc the passive Strength, and boost energy-orb drops.
2. Hold Fireball (1) for the heat buff once the room is burning.
3. Spam Fire Blast (3) whenever overguard drops for i-frames and a partial strip.
4. Shoot.

**Duration, Efficiency, Range, Strength.** Duration for Fireball Frenzy and Nourish
uptime. Neutral Efficiency with Exothermic or Equilibrium. Range for Fire Blast
radius (overguard consistency). Strength for the heat buff, pumped by the passive.

**The mods.** *Umbral Intensify* is the Strength. *Primed Continuity* holds
Duration. *Augur Reach* is Range plus a gate contribution. *Primed Flow* is the
pool. *Healing Flame* is the survival engine. *Fireball Frenzy* is the buff.
*Exothermic* is the energy.

**Flexible slots.** Catalyzing Shields is optional on top of Healing Flame for a
guaranteed 1.33s gate. Augur Reach flexes to Stretch with an Augur mod elsewhere.
The aura and exilus are open.

**Helminth.** Pick one. Subsume over Immolation (2) for endurance.

- **Nourish** for free viral plus energy, no frame vulnerability in Operator.
- **Roar** for weapon and Inferno damage (frame-vulnerable in Operator).
- **Sickening Pulse** to double Inferno's heat DoT.
- **Breach Surge** for sparks off Inferno DoTs after a strip.

**Archon Shards.** Two Amber cast-speed. Three Topaz secondary crit-chance (+75%
crit on heat-status kills). Or parkour. Five total.

**Arcanes.** Arcane Hot Shot for 300% weapon crit chance, Molt Augmented for
Strength. Arcane Truculence (area viral on overguard gain) or Arcane Eruption (map
knockdown off energy orbs) as fun swaps.

**Focus.** Any. Madurai for Strength.

**Weapon synergy.** Avoid heat-status weapons: heat inherit means casting Inferno
or Fire Blast first strips your weapon's heat and faction mods from later procs.
Use raw or non-heat weapons with decent crit: Torid Incarnon (corrosive-blast),
Burston Incarnon (magnetic), Boar Incarnoff, Dual Toxocyst Incarnon, Laetum
Incarnon.

**Staying alive.** Healing Flame's overguard and shield gate plus heat crowd
control. It fails if you cannot recast Fire Blast in time, and to toxin.

**Energy.** Exothermic orbs plus Nourish if subsumed. Comfortable.

**Where it struggles.** Inferno's own DPS does not scale. The heat-inherit rule
limits your weapon choice. Bosses take the weapon.

**Variants.** A Gloom "Slow Cooker" crowd-control build.

**Strengths and weaknesses.** Strong: a large heat weapon buff, overguard survival
in one slot, partial strip, good energy. Weak: weapon-carried, heat-weapon-
incompatible, boss-blind.

**Who runs this.** Players who want a simple weapon platform with a strong buff and
a one-slot survival answer.

---

### Infinite Fists of Ore
**Atlas Prime. Free Landslide spam and Ore Gaze looting on a rubble-armour tank.**

| | |
|--|--|
| Content | Steel Path (to about level 500), Looting |
| Role | Casual solo loot farm, punch clear, rubble tank |
| Difficulty | Beginner |
| Investment | Low. 1 forma |
| Weapon reliance | Low. Landslide clears; a statstick shapes its damage |

> Tenno. Path of Statues petrifies anything that walks where you slid, and Rubble
> Heap makes Landslide free and stronger at max rubble, so you just punch
> forever, keeping 1500 rubble armour up without ever casting Petrify. Ore Gaze
> adds a ~60% bonus loot roll, matching Nekros. Punch your way to the drops.

**The build**

- Blind Rage, rank 10, Madurai polarity
- Primed Flow, rank 10, Naramon polarity
- Ore Gaze, rank 3, unpolarised — augment. Petrified enemies drop bonus loot
- Overextended, rank 5, Vazarin polarity
- Path of Statues, rank 3, unpolarised — augment. Petrifies enemies that cross your Landslide path
- Rubble Heap, rank 3, unpolarised — augment. Free Landslide and more damage at max rubble
- Archon Stretch, rank 10, Naramon polarity
- Adaptation, rank 10, unpolarised
- Aura: Steel Charge, Madurai polarity
- Exilus: Cunning Drift, unpolarised
- Arcanes: Arcane Blessing, Molt Augmented

Arsenal figures land at roughly 139% Strength, 100% Duration, 250% Range, 45%
Efficiency, with 650 health, 555 shield, 500 armor and a 755 energy pool.

**How it works.** At max rubble (1400+), Landslide is free to cast and stronger,
and Path of Statues petrifies enemies crossing your path, so you punch and gain
rubble without casting Petrify. Ore Gaze's loot roll is ~63% at 250% Strength,
exceeding Khora and Nekros. This is a solo, high-density build only; other players
rerouting spawns break the rubble economy. *Confidence: Approximation, per the
author.*

**Playstyle.**

1. Petrify (3) a group and kill them with Landslide or your weapon for rubble.
2. Keep Nourish (2) up if subsumed.
3. Above 1400 rubble, spam Landslide (1) into everything; enemies crossing your path petrify.
4. Occasionally Petrify a fresh crowd for loot.

**Duration, Efficiency, Range, Strength.** Positive Duration for a 20s+ Petrify.
Minimum Efficiency because Ore Gaze drops energy orbs, Landslide is free at max
rubble, and Path of Statues replaces Petrify casts. Range for Landslide's AoE and
Petrify's cone. Strength for Landslide damage and Ore Gaze's loot chance.

**The mods.** *Blind Rage* is the Strength. *Overextended* is the Range. *Primed
Flow* is the pool. *Rubble Heap, Path of Statues, Ore Gaze* are the three augments
that make it a self-sustaining loot loop. *Adaptation* plus rubble armour is the
tank. *Archon Stretch* is Range plus passive energy.

**Flexible slots.** Path of Statues and Ore Gaze drop for a non-looting or
non-survival build. Adaptation and Archon Flow for more tank or energy. The aura
and exilus are open.

**Helminth.** Pick one. Subsume over Tectonics (2).

- **Nourish** for viral Landslide plus an energy multiplier.
- **Roar** for damage and DoT double-dip.
- **Wrathful Advance** for forced red crits on Landslide.
- **Pillage** or **Resonator** for shields or crowd control in endurance.

**Archon Shards.** Two Amber cast-speed for Petrify and Rumbler. Three Tauforged
Violet melee crit-damage for a crit statstick. Five total.

**Arcanes.** Arcane Blessing for health, Molt Augmented for Strength and loot
chance. Arcane Avenger for flat crit on Landslide's low base.

**Focus.** Madurai plus a Nidus specter to push Ore Gaze to 100%. Any works.

**Weapon synergy.** A statstick shapes Landslide (electric influence, gas
afflictions). A Helios with Deconstructor and Vicious Bond spreads a 15% armour
strip through Landslide's 9m.

**Staying alive.** Rubble armour (1500) plus Adaptation, healed by Arcane Blessing
and rubble pickups. It falls off past about level 500; use the endurance variant
with shield gating there.

**Energy.** Ore Gaze orbs plus Nourish. Minimum Efficiency is fine.

**Where it struggles.** Only works solo on dense maps. Falls off past level 500.
Bosses. Low-density content starves the rubble loop.

**Variants.** An endurance shield-gate variant. A quick-mission variant. A
non-Landslide Ore Gaze loot variant.

**Strengths and weaknesses.** Strong: a self-sustaining free-Landslide loop, a
top-tier loot multiplier, tanky and cheap. Weak: solo-and-density-locked, level-
capped around 500, boss-blind.

**Who runs this.** Solo farmers who want to punch a dense survival tile for an hour
and come out loaded.

---

### Ghost Recon
**Cyte-09. A through-wall weakpoint highlighter and a Neutralizer exalted sniper, from permanent stealth.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap, Weapon platform |
| Role | Exalted-sniper DPS, weakpoint marksman, invisible survivor |
| Difficulty | Intermediate |
| Investment | Medium to high. 5 forma, violet electric shards |
| Weapon reliance | Low. The Neutralizer exalted is the damage; your own weapon is optional |

> Tenno. Cyte marks weakpoints through walls and boosts weakpoint damage. Resupply
> reloads your gun with a chosen element and forces that status like Saryn's Toxic
> Lash. Evade keeps you invisible as long as you land the occasional headshot.
> Neutralizer is an exalted sniper whose weakpoint shots ricochet. Highlight,
> shoot the glowing spots, delete.

**The build**

- Augur Message, rank 5, unpolarised
- Blind Rage, rank 10, Madurai polarity
- Primed Continuity, rank 10, Madurai polarity
- Rolling Guard, rank 10, Vazarin polarity
- Archon Stretch, rank 10, Naramon polarity
- Augur Reach, rank 5, unpolarised
- Umbral Intensify, rank 10, unpolarised
- Constitution, rank 3, Naramon polarity
- Aura: Corrosive Projection, aura slot
- Exilus: Ice Spring, Vazarin polarity
- Arcanes: Arcane Sculptor, Arcane Crepuscular

Arsenal figures land at roughly 243% Strength, 207% Duration, 175% Range, 45%
Efficiency, with 325 health, 235 shield, 150 armor and a 230 energy pool.

**How it works.** Arcane Sculptor triggers off Seek and Resupply and locks 175%
Efficiency; entering Neutralizer during that window snapshots every subsequent shot
to 175% Efficiency permanently, so bullets cost ~2.5 energy. Archon Stretch off an
electric Resupply gives 2 energy/s, covering the rest. Strength triple-dips
Neutralizer DPS (the weakpoint multiplier from 1, the buff from 2, the multiplier
of 4). *Confidence: Approximation, per the author.*

**Playstyle.**

1. Tap 1 (Seek) to highlight weakpoints through walls and boost weakpoint damage.
2. Hold 2, pick Electric, tap 2 to reload with Electric Resupply.
3. Tap 3 (Evade) for invisibility; weakpoint kills prolong it.
4. Tap 4 (Neutralizer) and shoot the glowing spots; alt-fire lobs cold grenades.

**Duration, Efficiency, Range, Strength.** High Duration (150 to 200%+) so Evade
survives dry spells. Efficiency locked by Arcane Sculptor. Range tuned to tileset
for ricochet and Seek punch-through (70 to 100 in corridors, 145 to 280 in the
open). Strength is pushed as high as comfortable.

**The mods.** *Blind Rage, Umbral Intensify* are the Strength, covered by *Arcane
Sculptor*. *Primed Continuity, Constitution* are the Duration for Evade. *Augur
Message, Augur Reach* are Range and gate contributions. *Archon Stretch* is Range
plus passive energy off electric Resupply. *Rolling Guard* is status cleanse.

**Flexible slots.** Rolling Guard flexes for more Strength or Duration. Energy
Nexus if energy still feels tight. The aura and exilus are open (Primed Sure
Footed).

**Helminth.** Cyte's kit is self-sufficient; a subsume is optional. Roar cannot
run alongside Resupply solo. Silence or a grouping ability are reasonable.

**Archon Shards.** Two to four Violet primary electric-damage (double-dips the
electric DoT). One optional Amber cast-speed. Two parkour. Five total.

**Arcanes.** Arcane Sculptor for the Efficiency snapshot (mandatory), Arcane
Crepuscular for Strength and flat crit damage while invisible. Molt Augmented as a
swap.

**Focus.** Any. Madurai for Strength.

**Resupply element.** Electric is the best general pick: instant proc, small AoE,
triggers Archon Stretch, boosted by Primed Convulsion and violet shards, good vs
Murmur. Gas for camping KPM, Blast for mobile headshot clear, Toxin vs Corpus,
Heat for single-target with Archon Vitality.

**Weapon synergy.** Neutralizer builds: raw-damage one-shot for Thrax, Electric DoT
for trash, Gas DoT for camping. Other snipers gain the Resupply bonus. Scourge
plus a headshot pistol for a non-exalted option.

**Staying alive.** Evade invisibility plus Rolling Guard for the status procs that
tag you through it. It fails if you cannot land headshots to sustain Evade, and to
enemies that ignore stealth.

**Energy.** The Arcane Sculptor snapshot plus Archon Stretch. A non-issue once set.

**Where it struggles.** It is a marksman platform: poor aim means poor damage.
Bosses want the raw Neutralizer build. Open tiles need a Range rebuild.

**Variants.** Neutralizer raw one-shot, Electric DoT, Gas DoT. Scourge plus pistol.

**Strengths and weaknesses.** Strong: strong scaling exalted DPS, through-wall
weakpoint marking, permanent stealth, near-free bullets. Weak: aim-dependent,
tileset-sensitive Range, boss setup differs.

**Who runs this.** Marksmen who want an exalted sniper that highlights every
weakpoint and never runs out of ammo or invisibility.

---

### The Holy Ghost
**Harrow Prime. Permanent Evade invisibility and a flat headshot crit buff, with almost no casting.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Comfortable invisible crit-DPS carrier |
| Difficulty | Beginner |
| Investment | Medium. 4 forma |
| Weapon reliance | Total. Harrow buffs and hides; the weapon does everything |

> Tenno. This is the lazy Harrow. Evade keeps you invisible almost forever off a
> few headshots. Lasting Covenant gives a permanent 200% flat crit chance on
> headshots. Penance buffs fire rate and reload. You cast almost nothing except
> the occasional Condemn to line up heads. Get headshots, profit.

**The build**

- Blind Rage, rank 10, Madurai polarity
- Lasting Covenant, rank 3, unpolarised — augment. Covenant's crit buff becomes permanent, no i-frames
- Stretch, rank 5, unpolarised
- Narrow Minded, rank 10, Vazarin polarity
- Primed Flow, rank 10, Naramon polarity
- Primed Continuity, rank 10, Madurai polarity
- Equilibrium, rank 10, Naramon polarity
- Rolling Guard, rank 10, Vazarin polarity
- Aura: Corrosive Projection, Naramon polarity
- Exilus: Primed Sure Footed, Vazarin polarity
- Arcanes: Arcane Crepuscular, Arcane Precision

Arsenal figures land at roughly 199% Strength, 254% Duration, 79% Range, 45%
Efficiency, with 370 health, 740 shield, 185 armor and a 541 energy pool.

**How it works.** Evade (subsumed over Thurible) gives invisibility that prolongs
off headshots, effectively permanent at this Duration off a headshot every ~50s.
Lasting Covenant makes Covenant's crit buff permanent (200% flat on headshots) at
the cost of its i-frames. Penance adds fire rate and reload. Beyond that you only
cast Condemn to lock enemies for easy heads. *Confidence: Approximation, per the
author.*

**Playstyle.**

1. Cast Covenant (4) twice for max duration of the crit buff (press 1 for shield, 2 to spend it).
2. Cast Evade (3) for invisibility.
3. Get headshots.
4. Occasional Condemn to lock a group.

**Duration, Efficiency, Range, Strength.** Very high Duration for Evade and the
crit buff. Efficiency dumped with Primed Flow and Equilibrium. Range is low (only
Condemn uses it). Strength for Penance and Covenant.

**The mods.** *Blind Rage* is the Strength. *Narrow Minded, Primed Continuity* are
the Duration, Range cost free. *Primed Flow, Equilibrium* are the energy base.
*Lasting Covenant* is the permanent crit buff. *Rolling Guard* is status cleanse
for the procs that tag you through invisibility. *Stretch* is a little Condemn
range.

**Flexible slots.** Archon Stretch over Stretch with an electric companion for
passive energy. Constitution over Archon Stretch if you never use Condemn. Worthy
Comradery aura over Corrosive Projection for +75% headshot crit.

**Helminth.** Evade over Thurible is the build. No other subsume is needed.

**Archon Shards.** Three to four Duration. One or two optional corrosive-stack for
a strip. Keep one cast-speed if you like. Five total.

**Arcanes.** Arcane Crepuscular for Strength and flat crit damage while invisible,
Arcane Precision for pistol damage. Arcane Pistoleer for a non-Incarnon pistol.

**Focus.** Any. Vazarin as a backup for when Evade lapses.

**Weapon synergy.** Headshot-attractor or headshot-payoff weapons: Scourge, Dual
Toxocyst, Knell Prime, Sicarus Prime Incarnon. Vadarya Prime can self-sustain
Evade.

**Staying alive.** Permanent Evade invisibility plus Rolling Guard for status. It
fails to AoE and environmental procs that ignore stealth, and to a nullifier
stripping Evade.

**Energy.** Primed Flow plus Equilibrium; you barely cast.

**Where it struggles.** Entirely weapon-carried. Bosses take the weapon. It does
nothing for the squad (unlike Preacher of Pain).

**Variants.** The Preacher of Pain build is the full-kit team-support Harrow.

**Strengths and weaknesses.** Strong: permanent invisibility, a large permanent
crit buff, near-zero casting, very comfortable. Weak: selfish, weapon-carried,
boss-blind.

**Who runs this.** Players who want the most low-effort possible invisible
crit-carry and do not need Harrow's team energy.

---

### Siege Tank
**Protea Prime. A semi-AFK Blaze Artillery heat nuke stacked with the Mecha set and Roar.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Camp turret nuke, near-AFK with an invisibility pet |
| Difficulty | Intermediate. The Temporal Anchor timer-lock and camp setup |
| Investment | Low. 2 forma, duration shards, a Huras Kubrow |
| Weapon reliance | Very low. Blaze Artillery turrets do everything |

> Tenno. Set up a camp: a spot where enemies funnel in and a separate spot for
> your Dispensary. Snapshot a big Roar with Protea's fourth-cast passive, then
> enter Temporal Anchor and lock its timer with 2. Drop three Blaze Artillery
> turrets every ten seconds. They strip and nuke through Temporal Erosion, the
> Mecha set spreads the kills, and Huras keeps you invisible. You barely move.

**The build**

- Equilibrium, rank 10, Naramon polarity
- Narrow Minded, rank 10, Vazarin polarity
- Overextended, rank 5, unpolarised
- Temporal Artillery, rank 3, unpolarised — augment. Blaze Artillery deals more damage
- Primed Flow, rank 10, Naramon polarity
- Archon Vitality, rank 0, unpolarised — doubles Blaze Artillery heat procs
- Temporal Erosion, rank 3, unpolarised — augment. Damage during Temporal Anchor strips armour
- Blind Rage, rank 10, Madurai polarity
- Aura: Mecha Empowered, aura slot
- Exilus: Primed Sure Footed, Vazarin polarity
- Arcanes: Arcane Concentration, Arcane Sculptor

Arsenal figures land at roughly 139% Strength, 199% Duration, 124% Range, 45%
Efficiency, with about 404 health, 555 shield, 185 armor and a 712 energy pool.

**How it works.** This is the camp-focused sibling of The Blazing Lotus. Casting 2
during Temporal Anchor locks its timer despite the UI ticking down, so the Anchor
runs indefinitely while its armour-strip and no-decay bank stay active. Roar
subsumed over 3, snapshotted at ~299% Strength via the fourth-cast passive,
double-dips Blaze Artillery's heat DoT for ~3.6x. The Mecha set spreads a marked
kill's statuses to a 20m+ radius. *Confidence: Approximation, per the author's heat
calculations.*

**Playstyle (camping).**

1. Pick a DPS spot with one enemy entrance and a Dispensary spot at least 15m away.
2. Trigger the 100% Strength passive with three casts of 2, then cast Roar for a ~299% Strength Roar.
3. Trigger the passive again, grab Dispensary orbs to top energy, then cast Temporal Anchor.
4. Do not move. Recast three turrets every 8 to 10 seconds. Huras keeps you invisible while you do not shoot.

**Duration, Efficiency, Range, Strength.** Duration scales Blaze Artillery's
cumulative damage and gives long Dispensary, Shrapnel Vortex and Temporal Anchor.
Efficiency solved by Arcane Sculptor. Slightly positive Range for ~40m Blaze
Artillery reach. Strength for turret damage, Dispensary drops and the strip rate.

**The mods.** *Blind Rage* is the Strength, covered by *Arcane Sculptor*.
*Narrow Minded* is the Duration. *Overextended* is the Range. *Primed Flow,
Equilibrium* are the energy base. *Temporal Erosion* is the strip, *Temporal
Artillery* the turret damage, *Rank 0 Archon Vitality* the heat-proc doubler.
*Mecha Empowered* aura is the set effect.

**Flexible slots.** The new Blaze Artillery augment (one turret follows you at 20x
during Temporal Anchor) fits the empty slot for a mobile version. Mecha Pulse over
Primed Continuity for the full set. Growing Power or Corrosive Projection aura if
you skip the Mecha set.

**Helminth.** **Roar** over 3 (or over 1 if you run Huras for invisibility) is the
build: it double-dips Blaze Artillery's heat DoT for ~3.6x and buffs the squad.

**Archon Shards.** One to two Amber cast-speed. Three to four Tauforged Crimson
Duration for turret ramp. Five total.

**Arcanes.** Arcane Sculptor for the Efficiency lock, Arcane Concentration for
Duration. Molt Augmented or Arcane Steadfast as swaps.

**Focus.** Vazarin Sling for i-frames. Madurai for Strength and cast speed.

**Weapon synergy.** A heat-inherit primer multiplies Blaze Artillery's heat procs,
but its range makes manual priming impractical; a Shade or Huras with Tazicor or
Helstrum primes heat passively instead. Zenistar gives passive heat priming plus
melee-vortex grouping.

**Staying alive.** Temporal Anchor's 3s i-frames plus status cleanse plus Huras
invisibility, backed by shield gating off 1. It fails if you shoot and break
invisibility with the gate down, and to toxin.

**Energy.** Arcane Sculptor plus Equilibrium plus a Synth Deconstruct pet.

**Where it struggles.** It is a camp build; it does little while moving. Line-of-
sight tiles. Bosses. Fully armoured targets without a strip eat dozens of casts.

**Variants.** The Blazing Lotus is the active, mobile Temporal Anchor build.

**Strengths and weaknesses.** Strong: near-AFK room clear, a strip built into the
nuke, strong heat scaling, invisible. Weak: camp-only, boss-blind, tile-dependent,
needs a Kubrow.

**Who runs this.** Players who want to set up in one spot and let turrets clear an
endurance survival while they barely touch the controls.

---

### Mecha Anvil
**Lavos. A leaner Mecha-set Gas-and-Heat Catalyze nuke on a straightforward armour tank.**

| | |
|--|--|
| Content | Steel Path, Level cap |
| Role | Status-spread nuke, high-armour tank |
| Difficulty | Advanced. The element-infusion rotation |
| Investment | Medium. 3 forma, a Mecha-set Kubrow |
| Weapon reliance | Low to medium. Catalyze nukes; a primer stacks the elements |

> Tenno. This is the base-Lavos version of the Full Mecha Alchemist: fewer forma,
> a plain Adaptation-and-Guardian armour tank instead of Arcane Persistence, but
> the same Catalyze plan. Infuse Gas, prime with elements, and the 2^status
> multiplier plus the Mecha set does the rest. Lavos has no energy, only
> cooldowns, so Swift Bite and Transmutation Probe are how you cast again.

**The build**

- Lingering Transmutation, rank 3, unpolarised — augment. Transmutation Probe lasts longer
- Valence Formation, rank 3, unpolarised — augment. +200% element bonus (weapons; DoT interaction is bugged)
- Adaptation, rank 10, Vazarin polarity
- Mecha Pulse, rank 3, unpolarised
- Stretch, rank 5, unpolarised
- Precision Intensify, rank 5, Madurai polarity
- Archon Continuity, rank 10, Madurai polarity
- Archon Vitality, rank 10, Vazarin polarity — doubles Catalyze heat procs
- Aura: Mecha Empowered, Naramon polarity
- Exilus: Cunning Drift, unpolarised
- Arcanes: Arcane Impetus, Arcane Guardian

Arsenal figures land at roughly 100% Strength, 155% Duration, 160% Range, 100%
Efficiency, with a 1480 health pool, 370 shield, 675 armor and no energy bar.

**How it works.** Identical Catalyze scaling to the Full Mecha Alchemist: 2^(number
of distinct statuses), Gas infusion for lingering procs, Archon Continuity for
corrosive off Ophidian Bite, and the Mecha set's Empowered mark (6.25x DoT) plus
its kill-spread. The difference is the tank: Adaptation plus Mecha Pulse armour
(up to ~5850, ~99.5% DR with Adaptation) plus Arcane Guardian and Ophidian Bite
healing, for ~600k effective HP to around level 500, instead of Arcane Persistence.
Note Valence Formation's DoT interaction is currently bugged, so drop it for a pure
Catalyze build. *Confidence: Approximation, per the author.*

**Playstyle.**

1. Group enemies (Magus Anomaly, Ensnare, Nautilus Cordon).
2. Shoot a primer for statuses, infuse Gas (hold 1 and 4) or Heat (hold 4), then cast Catalyze (4).
3. Infuse Corrosive (hold 1 and 3) into casts of 1, 2 and 3 for the strip.
4. Tap 3 then tap 1 into the group to slash the cooldowns of 4 and 3.
5. Tap 2 (Vial Rush) through the group for corrosive pools.

**Duration, Efficiency, Range, Strength.** Duration extends every status's DoT
(~9s at 155%). Efficiency matters only for how much Swift Bite and Transmutation
Probe cut cooldowns; ~100% is the sweet spot. Range for all abilities. Strength as
high as the other stats allow (Precision Intensify).

**The mods.** *Precision Intensify* is the Strength. *Stretch* is the Range.
*Archon Continuity* is Duration plus the corrosive conversion. *Archon Vitality*
doubles Catalyze heat procs. *Adaptation, Mecha Pulse* plus the *Mecha Empowered*
aura are the tank and the set. *Lingering Transmutation* extends the cooldown-
reduction window.

**Flexible slots.** Drop Valence Formation for a pure Catalyze build. Fast
Deflection plus Vigilante Vigor plus Catalyzing Shields for a passive-gate version.
The exilus is open (Coaction Drift double-dips Mecha Empowered).

**Helminth.** Pick one. Subsume over Vial Rush.

- **Ensnare** or another grouping ability for Gas overlap and cooldown reduction.
- **Sickening Pulse** for the 10x Gas and electric multiplier on tight maps.
- **Roar** for a passive DoT multiplier.
- **Expedite Suffering** for Disruption. **Pillage** for shield gating.

**Archon Shards.** One to two Amber cast-speed. Three to four Crimson Duration for
Gas proc length. One optional Tauforged Emerald corrosive-stack for a 98% strip.
Note Archon Stretch and Archon Flow do nothing (no energy). Five total.

**Arcanes.** Arcane Impetus for 60% Strength and 30% Efficiency from Lavos's ten
elements, Arcane Guardian for the tank armour. Molt Augmented or Arcane Ice Storm
as swaps.

**Focus.** Any. Madurai for cast speed on the infusion casts.

**Weapon synergy.** An area primer that procs many statuses (Cedo alt-fire,
Bubonico, Kuva Ogris, Grimoire), or a heat-inherit secondary for Catalyze's heat
procs. Telos Boltace or Dual Ichor for a melee-vortex or influence loadout.

**Staying alive.** The armour tank plus Ophidian Bite healing plus Arcane Guardian.
It falls off past about level 500; use the Full Mecha Alchemist's Arcane
Persistence build for higher. It fails to Violence, nullifiers, and heat or
corrosive stripping armour.

**Energy.** There is none. Cooldowns, shortened by Swift Bite and Transmutation
Probe.

**Where it struggles.** The element-infusion rotation is the same steep learning
curve. The tank has a level-500 ceiling. Overguard resists percent-HP effects.
Bosses.

**Variants.** The Full Mecha Alchemist (Lavos Prime) build is the endurance version
with Arcane Persistence.

**Strengths and weaknesses.** Strong: the same huge status-nuke ceiling for fewer
forma, no energy to manage, tanky to level 500. Weak: tank ceiling, complex
rotation, overguard-awkward, needs a Kubrow.

**Who runs this.** Players who want the Mecha Alchemist nuke on a cheaper, simpler
tank chassis for sub-endurance content.

---

### Two Body Problem
**Sirius and Orion. A Celestial Clash burst that chains between the two brothers, one held permanently invisible.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Aerial burst-combo nuke, armour strip, self-buff |
| Difficulty | Advanced. Two frames, a combo order, and an invisibility bug to set up |
| Investment | High. 4 forma per brother, strength and cast-speed shards, a Shade |
| Weapon reliance | Low. Celestial Clash does the damage; weapons are a bonus off the strip and Roar |

> Tenno. Sirius and Orion are one Warframe you swap between. Build up Constellation
> stars by casting, then enter Celestial Clash and alternate left and right click
> to fire a chain of hits that alternate between the brothers. Make Sirius
> permanently invisible with the Shade bug so Arcane Crepuscular's crit multiplier
> is always on him, keep Roar up, and strip with Orion before you commit the
> combo.

**The build (Sirius)**

- Blind Rage, rank 10, aura slot
- Umbral Intensify, rank 10, unpolarised
- Equilibrium, rank 10, Naramon polarity
- Archon Vitality, rank 0, Vazarin polarity — doubles Celestial Clash heat procs
- Transient Fortitude, rank 10, Madurai polarity
- Stretch, rank 5, unpolarised
- Primed Continuity, rank 10, Madurai polarity
- Primed Flow, rank 10, Naramon polarity
- Aura: Corrosive Projection, aura slot
- Exilus: Power Drift, unpolarised
- Arcanes: Arcane Crepuscular, Molt Augmented

Arsenal figures land at roughly 313% Strength, 128% Duration, 145% Range, 45%
Efficiency, with about 627 health, 455 shield, 160 armor and a 712 energy pool.

**How it works.** Celestial Clash damage is boosted by Roar, Arcane Crepuscular
(30% Strength and a flat +3 crit multiplier), and ability-damage shards; it is not
affected by Nourish, Tenacious Bond, Arcane Hot Shot or Vigorous Swap. Since Aug
2026 Sirius forces a heat proc on Clash, so Archon Vitality (rank 0) doubles it and
heat-inherit priming applies. Umbral Intensify beats Precision Intensify on Sirius
because Strength also feeds Roar, which double-dips the heat proc. Every form swap
gives 1.5s of invulnerability and every Clash attack gives ~0.6s, so you chain
i-frames while comboing. *Confidence: Approximation, per the author's spreadsheet.*

**Playstyle (Orion's Belt combo).** Default controls, invisibility locked on
Sirius.

1. Starting in Sirius, tap 1 twice to build stars.
2. Hold 1 to swap to Orion and strip enemies in front (viral primer optional here).
3. Enter 4 and click Right, Left, Left.
4. The last hit is Sirius at max damage and leaves you on Sirius to repeat.

Lazy mode: invert controls, tap abilities to build stars, then alternate clicks in
Celestial Clash.

**Duration, Efficiency, Range, Strength.** Duration mostly for Roar on Sirius.
Efficiency covered by the passive (+45% on the two casts after a swap) plus
Equilibrium. Range: Stretch gives 37m and Clash is line-of-sight with a 26m base,
enough for most rooms. Strength is the priority, double-dipping on Sirius.

**The mods.** *Blind Rage, Transient Fortitude, Umbral Intensify* are the Strength.
*Primed Continuity* holds Roar. *Stretch* is Range. *Primed Flow, Equilibrium* are
the energy base. *Archon Vitality* doubles the heat proc. *Corrosive Projection*
helps the strip against overguarded enemies Orion cannot strip.

**Orion's differences.** Growing Power or Power Donation aura, Augur Reach over
Primed Continuity, Overextended over Equilibrium, Augur Secrets over Archon
Vitality, Arcane Energize over Molt Augmented. Orion needs only 200% Strength to
full-strip with Gravitic Slash.

**Helminth.** **Roar** subsumed onto Sirius's 3 (so Jade Stars stays for a weapon
platform). It buffs both frames and double-dips the heat proc. You cannot cast
anything while in Celestial Clash, so only duration-based buffs work.

**Archon Shards.** Two Amber cast-speed. Three Crimson strength (double-dips Clash
on Sirius). Ability-damage shards beat strength technically but need a consistent
radiation, corrosive or electric primer. Five total per brother.

**Arcanes.** Arcane Crepuscular (needs the invisible brother), Molt Augmented for
Strength. Arcane Concentration for Roar uptime, Arcane Energize for economy, as
swaps.

**Focus.** Madurai for Strength and cast speed. Any works.

**Weapon synergy.** A Shade with Duplex Bond and Tazicor holds the invisibility
bug and AoE-primes viral and magnetic. A heat-inherit primer (Epitaph, Kuva Nukor)
before entering 4, or a Tazicor for passive heat inherit.

**Staying alive.** Chained i-frames from swaps and Clash attacks, plus shield
gating, plus one brother permanently invisible, plus Orion's Astral Shell negating
a hit on both. It fails if you stop comboing with the gate down.

**Energy.** The swap passive plus Equilibrium plus Arcane Energize shared across
both frames.

**Where it struggles.** The two-frame management plus combo order plus the
invisibility bug is the steepest setup of any frame here. Later combo hits do less
because you cannot re-strip mid-Clash. Bosses.

**Variants.** A dedicated weapon-platform Roar setup. An Orion-primary config.

**Strengths and weaknesses.** Strong: strong burst combo, near-constant i-frames,
two frames of utility, self-buffing. Weak: very high complexity, combo damage
falls off across hits, boss-blind, needs a Shade.

**Who runs this.** Players who want the most mechanically involved frame in the
game and will learn the combo order to make it sing.

---

### Gloom Saryn
**Saryn Prime. Spores plus Gloom lifesteal: stand still, take fire, out-heal it.**

| | |
|--|--|
| Content | Steel Path (not deep endurance) |
| Role | Face-tank that heals through spore damage |
| Difficulty | Beginner |
| Investment | High. 6 forma, Umbral forma |
| Weapon reliance | Low. Spores heal; a weapon spreads them and covers single targets |

> Tenno. Gloom gives lifesteal from every damage source at infinite range, and
> Spores are always dealing damage to a spread of enemies, so you heal for a
> percentage of that constantly. Ten enemies at 1000 spore damage is ~800 health a
> second. Keep spores alive, keep Gloom on, and stand in the open. This is a
> niche tank, not an endurance build.

**The build**

- Umbral Intensify, rank 10, Umbral polarity
- Umbral Vitality, rank 10, unpolarised
- Umbral Fiber, rank 10, unpolarised
- Hunter Adrenaline, rank 5, Madurai polarity
- Venom Dose, rank 3, Zenurik polarity — augment. Adds a toxin weapon buff
- Primed Continuity, rank 10, Madurai polarity
- Stretch, rank 5, Naramon polarity
- Augur Reach, rank 5, Naramon polarity
- Aura: Growing Power, aura slot
- Exilus: Toxic Flight, Naramon polarity
- Arcanes: Arcane Persistence, Arcane Blessing

Arsenal figures land at roughly 177% Strength, 155% Duration, 175% Range, 100%
Efficiency, with a 1302 health pool, 882 armor, 370 shield and a 300 energy pool.

**How it works.** Gloom's lifesteal is ~7 to 8% of damage dealt, applied per
affected enemy, so a spread of spores heals faster than most incoming fire. The
build runs lower Strength deliberately: at 139% Gloom gives 49% slow, and you do
not want the 95% cap because high-Range Saryn would then slow the whole map and
you want enemies shooting you to feed Hunter Adrenaline. *Confidence:
Approximation, per the author.*

**Playstyle.**

1. Get an energy buffer (Zenurik or Preparation).
2. Activate Toxic Lash (3), cast Spores (1), shoot to spread.
3. Activate Gloom (2).
4. Kill enemies; keep the spore count alive or you stop healing and die.
5. If energy runs low, let enemies shoot you.

**Duration, Efficiency, Range, Strength.** Positive Duration for Gloom drain and
spore decay. 100% Efficiency works with Saryn's huge pool plus Hunter Adrenaline.
Range for spore spread. Strength deliberately kept at ~139% for a partial slow.

**The mods.** The *Umbral set plus Umbral Fiber* is the health-and-armour buffer.
*Hunter Adrenaline* is the energy engine. *Primed Continuity* holds Duration.
*Stretch, Augur Reach* set the spread Range. *Venom Dose* is a weapon buff.
*Growing Power* aura for a touch more Strength.

**Flexible slots.** Preparation exilus for an instant Gloom. Adaptation and
Vitality for more EHP. Streamline over Stretch for less drain.

**Helminth.** Gloom over Miasma is the build. No other subsume applies.

**Archon Shards.** Cast-speed and armour or duration to taste; the source does not
specify. Five total.

**Arcanes.** Arcane Persistence for a damage cap above 700 armour, Arcane Blessing
for the health buffer. Arcane Energize or Guardian as swaps.

**Focus.** Any. Zenurik for the start-of-mission energy.

**Weapon synergy.** Any weapon that spreads spores. Toxic Lash makes a toxin
weapon strong for single targets.

**Staying alive.** Gloom lifesteal off spore damage, padded by the Umbral health
pool. It fails the moment spores lapse, and to a single hit that exceeds your pool
(which happens around level 500 to 1000, hence "not endurance").

**Energy.** Hunter Adrenaline from the hits you take, plus Arcane Energize.

**Where it struggles.** Deep endurance one-shots it regardless of heal rate. A
cold start before spores ramp. Bosses. 6 forma plus Umbral forma for a niche tank.

**Variants.** The Venomous Bloom and Lashing Venom builds are the offensive and
weapon-platform Saryns.

**Strengths and weaknesses.** Strong: genuinely stand-still tanky in mid Steel
Path, self-healing, simple. Weak: spore-dependent, level-500 ceiling, boss-blind,
forma-hungry for what it is.

**Who runs this.** Players who want a Saryn that can ignore incoming fire in
regular Steel Path and do not care about level cap.

---

### Rave Party
**Nova Prime. Max-speed Molecular Prime and a Resonator that switches off the room's aggression.**

| | |
|--|--|
| Content | Steel Path, Speedrun, Looting |
| Role | Squad speed buff for fast survivals and defenses, crowd control by aggro-off |
| Difficulty | Beginner |
| Investment | Medium. 4 forma |
| Weapon reliance | Total. Nova buffs and hides; the weapon does everything |

> Tenno. Speedva makes every enemy move 75% faster, which sounds bad until you
> pair it with Resonator, which switches off enemy AI aggression in a wide radius.
> Now enemies sprint to the objective and to you but never actually attack, so a
> survival or defense finishes in a fraction of the time. Quiver Cloak is the
> alternative for camping.

**The build**

- Augur Reach, rank 5, unpolarised
- Augur Secrets, rank 5, unpolarised
- Precision Intensify, rank 5, unpolarised
- Primed Continuity, rank 10, Madurai polarity
- Primed Flow, rank 10, Naramon polarity
- Overextended, rank 5, unpolarised
- Narrow Minded, rank 10, Vazarin polarity
- Stretch, rank 5, Naramon polarity
- Aura: Brief Respite, aura slot
- Exilus: Cunning Drift, unpolarised
- Arcanes: Arcane Energize, Molt Efficiency

Arsenal figures land at roughly 64% Strength, 254% Duration, 214% Range, 100%
Efficiency, with 370 health, 370 shield, 135 armor and a 755 energy pool.

**How it works.** Molecular Prime hits max 75% speed at exactly 150% Strength on
the ability; Precision Intensify's 90% to 4 plus Overextended plus Augur Secrets
lands 154%. Resonator (subsumed over 1) switches off aggressive AI in a Range-
scaled radius without slowing enemies, so they reach the objective fast but do not
shoot. It does not work on overguarded enemies. *Confidence: Approximation, per the
author.*

**Playstyle.**

1. Cast 4 to prime the map and speed enemies up.
2. Cast Resonator to switch off AI; command it with the Conductor augment or keep Quiver up.
3. Use 3 (Wormhole) to traverse.
4. Recast 1 (Null Stars) for a little damage reduction.

**Duration, Efficiency, Range, Strength.** High Duration for Molecular Prime map
coverage and Resonator uptime. Neutral-to-positive Efficiency for the 100-energy
Molecular Prime. Range for the Resonator radius. Strength tuned to exactly hit
154% on 4 and no more.

**The mods.** *Narrow Minded, Primed Continuity* are the Duration. *Overextended,
Stretch, Augur Reach, Augur Secrets* set the Range and the exact Strength.
*Precision Intensify* is the +90% to 4. *Primed Flow* is the pool. *Brief Respite*
aura is shield gating.

**Flexible slots.** Conductor augment over Cunning Drift to stop Resonator
wandering. Quiver Cloak instead of Resonator for a camping invisibility version.

**Helminth.** Pick one. Subsume over 1 or 2.

- **Resonator** is the default: crowd control that does not slow enemies down.
- **Quiver** (Cloak Arrow) for a camping invisibility bubble.

**Archon Shards.** Two Amber cast-speed. One or two Crimson strength to free the
Augur Secrets slot. The rest flexible. Five total.

**Arcanes.** Arcane Energize for energy (the passive drops energy orbs off
sped-enemy kills), Molt Efficiency for Duration. Arcane Consequence for parkour.

**Focus.** Any. Zenurik for energy.

**Weapon synergy.** Molecular Prime's death explosions inherit weapon quirks:
Devouring Attrition on Phenmor and Laetum, Devastating Attrition on Felarx, Acid
Shells on Sobek.

**Staying alive.** Resonator switching off aggression plus shield gating plus Null
Stars' damage reduction. Overguarded enemies still shoot; watch those.

**Energy.** Arcane Energize plus the sped-kill energy orbs.

**Where it struggles.** Overguarded enemies (Eximus, Thrax, Acolytes) ignore
Resonator. It is a utility frame, not a damage frame. Bosses.

**Variants.** The Event Horizon build is the general-use Slowva/Speedva. A
non-helminth tank Speedva. A Silence Slowva.

**Strengths and weaknesses.** Strong: turns long survivals and defenses into quick
runs, strong squad speed buff, safe. Weak: Eximus-vulnerable, does no damage,
boss-blind.

**Who runs this.** Squad leaders who want to blast through a survival or defense
rotation as fast as the timer allows.

---

### Frozen Flames
**Gauss Prime. Pure Thermal Sunder heat-and-cold spam to level cap, immortal through an Aegis bug.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Pure ability nuke, armour strip, blast-expedite single-target |
| Difficulty | Intermediate. Battery-versus-Redline management |
| Investment | Very low. 1 forma |
| Weapon reliance | Very low. Thermal Sunder is the whole plan |

> Tenno. This is Gauss stripped to the nuke. Keep the battery near the red line,
> then at max Redline spam Heat Sunder, which doubles all current heat procs each
> cast, and detonate with Cold Sunder to strip and compress the procs into one
> blast. Fast Deflection plus Arcane Aegis plus Gauss's passive currently triggers
> Aegis 100% of the time, so you are immortal to non-toxin damage without Kinetic
> Plating.

**The build**

- Stretch, rank 5, unpolarised
- Fast Deflection, rank 5, unpolarised
- Archon Vitality, rank 0, unpolarised — doubles Thermal Sunder heat procs
- Overextended, rank 5, Vazarin polarity
- Equilibrium, rank 10, Naramon polarity
- Primed Flow, rank 10, Naramon polarity
- Streamline, rank 5, unpolarised
- Primed Continuity, rank 10, Madurai polarity
- Aura: Corrosive Projection, Naramon polarity
- Exilus: Cunning Drift, Naramon polarity
- Arcanes: Arcane Aegis, Molt Augmented

Arsenal figures land at roughly 40% Strength, 155% Duration, 250% Range, 130%
Efficiency, with about 404 health, 650 shield, 185 armor and a 641 energy pool.
Sprint speed 1.5.

**How it works.** Thermal Sunder has exponential scaling: each Heat Sunder doubles
current heat procs, and Cold Sunder compresses them into one blast after a strip.
Archon Vitality (rank 0) doubles the heat procs feeding it. Corrosive Projection
drops the battery threshold for a full strip to ~96.4%. The Fast Deflection plus
Arcane Aegis plus passive interaction currently makes Aegis proc every time you
are near the red line, so you can subsume Kinetic Plating away entirely.
*Confidence: Approximation, and the Aegis loop is flagged as a bug.*

**Playstyle.** Invert tap/hold so Heat Sunder is tap.

1. Activate 2 and 4, keep them up.
2. Spam 1 and Cold Sunder (hold 3) until battery hits 100%; alternate cold and heat at 100% battery while Redline grows.
3. At max Redline, spam Heat Sunder (tap 1), then Cold Sunder (hold 3) to strip and compress into a blast nuke.
4. Recast 4 when it lapses and repeat.

**Duration, Efficiency, Range, Strength.** Duration holds Redline and slows Mach
Rush drain, and extends the heat-proc window (direct Sunder damage). Streamline
plus Fleeting-style Efficiency. Range is maxed for Sunder radius. Strength is
dumped to 40% because Sunder's exponential scaling and built-in strip carry it.

**The mods.** *Primed Continuity* is the Duration core. *Streamline* is Efficiency.
*Overextended, Stretch* set the maxed Range. *Primed Flow, Equilibrium* are the
energy base. *Fast Deflection* plus *Arcane Aegis* is the immortality loop.
*Rank 0 Archon Vitality* doubles heat procs. *Corrosive Projection* eases the
full-strip threshold.

**Flexible slots.** Streamline flexes for more Duration with an Augur mod
elsewhere. Brief Respite aura for augment-free gating.

**Helminth.** **Roar** over Kinetic Plating (2) for a triple-dip on the final
blast (a 30% Roar is a 2.2x multiplier). You do not need Kinetic Plating because
Fast Deflection plus Aegis covers survival, and getting shot drains the battery
anyway.

**Archon Shards.** Four to five Tauforged Duration. One optional cast-speed. Five
total.

**Arcanes.** Arcane Aegis (any rank) for the immortality loop, Molt Augmented for
Strength. Arcane Ice Storm as a swap.

**Focus.** Vazarin Sling as a backup. Zenurik for energy.

**Weapon synergy.** A heat-inherit primer (Epitaph, Kuva Nukor) with Augur mods
multiplies the blast on select targets and helps the gate.

**Staying alive.** The Fast Deflection plus Arcane Aegis loop (immortal to
non-toxin while near the red line), plus cold-Sunder crowd control. It fails to
toxin and if the battery drops far below the red line.

**Energy.** Streamline plus Equilibrium plus Redline's passive recharge.

**Where it struggles.** Toxin. The Aegis loop is a bug and could be patched. The
battery-versus-Redline learning curve is still here. Bosses need the blast-
expedite.

**Variants.** The Electromagnetic Accelerator is the hybrid weapon-platform Gauss.

**Strengths and weaknesses.** Strong: an exponential-scaling nuke with a built-in
strip, immortal via the loop, one forma, extremely fast. Weak: toxin-vulnerable,
bug-dependent survival, learning curve, boss setup differs.

**Who runs this.** Players who want a cheap pure-ability nuke Gauss that clears to
level cap and does not think about survival.

---

### Septic Shock
**Nidus Prime. A Roar-buffed gun platform on a Parasitic Vitality persistence tank.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap, Weapon platform |
| Role | Primary-weapon crit buff and damage buff, near-immortal bruiser |
| Difficulty | Intermediate |
| Investment | High. 5 forma, Umbral forma, an armour shard |
| Weapon reliance | Total. Teeming Virulence and Roar make the primary hit; the frame tanks |

> Tenno. This is Nidus built to carry a gun. Teeming Virulence turns Mutation
> stacks into flat primary crit chance, Roar subsumed over Ravenous buffs weapon
> damage and double-dips DoTs, and Parasitic Vitality plus Arcane Persistence
> makes you effectively immortal to level cap. Ball a crowd, stab it for stacks,
> and shoot.

**The build**

- Umbral Intensify, rank 10, Umbral polarity
- Parasitic Vitality, rank 3, unpolarised — augment. Stacks grant large health
- Stretch, rank 5, unpolarised
- Primed Flow, rank 10, Naramon polarity
- Teeming Virulence, rank 3, unpolarised — augment. Stacks grant flat primary crit chance
- Constitution, rank 3, Naramon polarity
- Blind Rage, rank 10, Madurai polarity
- Primed Continuity, rank 10, Madurai polarity
- Aura: Corrosive Projection, aura slot
- Exilus: Primed Sure Footed, Vazarin polarity
- Arcanes: Arcane Persistence, Arcane Bellicose

Arsenal figures land at roughly 258% Strength, 183% Duration, 145% Range, 45%
Efficiency, with a 925 health pool (climbing to ~20k with stacks), 525 armor, no
shields and a 541 energy pool.

**How it works.** Parasitic Vitality at 200 stacks reaches ~20k health, which with
Arcane Persistence's 500/s cap (above 700 armour, hit with one Tauforged shard) is
~40s of standing still. Even without Persistence, 200 stacks is ~65s of immortality
from the passive alone (five 5s death-gates). Teeming Virulence's flat crit chance
plus Roar's damage buff is the gun platform. Note linking a companion does not
grant status or knockdown immunity. *Confidence: Approximation, per the author.*

**Playstyle.**

1. Larva (2) to group, Virulence (1) to stab for stacks and energy.
2. Link (3) to a companion for the multiplicative damage buff.
3. Keep Roar (subsumed over 4) up.
4. Shoot. Refresh stacks with Virulence every 10 to 15s.

**Duration, Efficiency, Range, Strength.** Duration for Link and Roar. Minimum
Efficiency because Virulence refunds energy. Range for Larva. Strength for the crit
chance, the health pool and Roar.

**The mods.** *Blind Rage, Umbral Intensify* are the Strength. *Stretch* is Larva
Range. *Primed Continuity, Constitution* hold Duration. *Primed Flow* is the pool.
*Teeming Virulence* is the crit buff, *Parasitic Vitality* the health.
*Corrosive Projection* is a straight damage lift.

**Flexible slots.** The augments are the flex zone as in Critical Infestation.
Arcane swaps by weapon type (Strike for melee, Precision or Velocity for pistol,
Rage or Acceleration for rifle).

**Helminth.** **Roar** over Ravenous, double-dipping toxin status and buffing the
weapon.

**Archon Shards.** One Tauforged armour (for Persistence). Two parkour. Two Violet
primary electric-damage. Five total.

**Arcanes.** Arcane Persistence for the damage cap, Arcane Bellicose for 72%
Strength toward the crit buff. Weapon arcanes as swaps.

**Focus.** Any. Madurai for Strength.

**Weapon synergy.** Primaries that want flat crit and do not lean on Galvanized
Aptitude (Parasitic Link ignores Condition Overload): Coda Hema (headshot
lifesteal, multiplicative Galvanized Aptitude), plus lifesteal weapons for healing
outside Larva (Furis Incarnon with Winds of Purity, Coda Hirudo, Sancti Magistar).

**Staying alive.** The Parasitic Vitality pool plus Arcane Persistence plus the
passive death-gates. It fails to Violence, nullifiers, and magnetic, heat or
corrosive stripping armour; and if you let stacks decay.

**Energy.** Virulence into a five-plus Larva refills you.

**Where it struggles.** Density-dependent for stacks. Boss single-target is on the
weapon. Linking a companion does not give status immunity.

**Variants.** The Critical Infestation build is the general-use bruiser.

**Strengths and weaknesses.** Strong: a large flat primary crit buff plus Roar,
near-immortal, strong grouping. Weak: weapon-carried, density-dependent, forma-
hungry.

**Who runs this.** Players who want a near-unkillable frame that makes their
primary weapon crit and hit harder.

---

### Spears of Longinus
**Styanax Prime. A Final Stand spear volley and Tharros strip, with a hybrid weapon lean.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Spear-volley nuke or hybrid weapon platform, full strip, near-immortal |
| Difficulty | Beginner to intermediate |
| Investment | Medium. 3 forma, cast-speed shards |
| Weapon reliance | Low to medium. Final Stand nukes; Tharros Lethality leans it toward your weapon |

> Tenno. This is the Prime Styanax version of the Spear of Longinus, with the same
> immortal-while-firing Intrepid Stand overguard and instant Tharros Strike full
> strip, plus Tharros Lethality bolted on to buff your weapon's crit damage after
> the strip for a hybrid platform. Strip, then fire spears or shoot.

**The build**

- Equilibrium, rank 10, Naramon polarity
- Intrepid Stand, rank 3, unpolarised — augment. Final Stand grants overguard per enemy hit
- Primed Flow, rank 10, Naramon polarity
- Tharros Lethality, rank 3, unpolarised — augment. Tharros Strike buffs weapon crit damage
- Overextended, rank 5, Vazarin polarity
- Stretch, rank 5, Naramon polarity
- Primed Continuity, rank 10, Madurai polarity
- Blind Rage, rank 10, Madurai polarity
- Aura: Corrosive Projection, Naramon polarity
- Exilus: Cunning Drift, unpolarised
- Arcanes: Arcane Truculence, Arcane Arachne

Arsenal figures land at roughly 139% Strength, 155% Duration, 250% Range, 45%
Efficiency, with 370 health, 1025 shield, 265 armor and a 755 energy pool.

**How it works.** Identical to The Spear of Longinus: Intrepid Stand overguard
(0.5s gate on break) plus Rally Point shield regen plus shield gating is the
survival stack, and Tharros Strike full-strips at 200% Strength (164% with
Corrosive Projection). The addition here is Tharros Lethality, which buffs your
weapon's crit damage after a strip so you can lean on the gun as much as Final
Stand. *Confidence: Approximation, per the author.*

**Playstyle.**

1. Activate Rally Point and Nourish at mission start.
2. Cast Tharros Strike to full-strip everywhere.
3. Cast Final Stand at groups, or shoot your Tharros-Lethality-buffed weapon.

**Duration, Efficiency, Range, Strength.** Duration for Rally Point, Nourish and
Final Stand's volley time. Efficiency at 45% with Nourish doubling Rally Point's
energy return. Extreme Range for Tharros Strike and Final Stand explosions.
Strength for the strip threshold and ability damage.

**The mods.** *Blind Rage* is the Strength. *Primed Continuity* holds Duration.
*Overextended, Stretch* set the Range. *Primed Flow, Equilibrium* are the energy
base. *Intrepid Stand* is the overguard immortality. *Tharros Lethality* is the
hybrid weapon buff. *Corrosive Projection* lowers the strip threshold.

**Flexible slots.** Tharros Lethality drops for Umbral Intensify (with strength
shards) or Equilibrium on a pure Final Stand build. Natural Talent without
cast-speed shards. Vigorous Swap for a 2.65x Final Stand multiplier.

**Helminth.** Pick one. Subsume over Axios Javelin (1).

- **Nourish** is the default: viral on Final Stand (coded as a weapon), the
  occasional viral proc, and doubled Rally Point energy.
- **Roar** for a Final Stand spam build (lower raw boost, double-dips slash).

**Archon Shards.** One to two Amber cast-speed (mandatory for Final Stand's cast
time). Three Crimson strength or Duration. Parkour to taste. Five total.

**Arcanes.** Arcane Truculence (10 viral in 30m every ~5s with Intrepid Stand),
Arcane Arachne (2.5x Final Stand after a wall-latch). Molt Augmented or Avenger as
swaps.

**Focus.** Naramon for Lethal Levitation stacking with Arachne. Madurai for cast
speed and Strength. Vazarin as an endurance backup.

**Weapon synergy.** Tharros Lethality's crit-damage buff pairs with a crit weapon
you lean on between Final Stand casts. Otherwise as The Spear of Longinus: a primer
or Panzer for the Truculence-free viral.

**Staying alive.** Intrepid Stand overguard plus shield gating plus Rally Point
regen. It fails in the vulnerable window of the Final Stand cast at very high
levels, and if you cannot hit enemies to sustain overguard.

**Energy.** Rally Point plus Equilibrium, doubled by Nourish. Comfortable.

**Where it struggles.** Final Stand DPS per energy is poor since the health and
armour reworks. Line-of-sight tiles. Bosses need the weapon.

**Variants.** The Spear of Longinus (#046) is the pure Final Stand build. A pure
non-Final-Stand weapon platform.

**Strengths and weaknesses.** Strong: instant full strip, immortal while firing,
strong squad energy, flexible between spears and gun. Weak: weak Final Stand DPS
per energy, cast-time dependent, boss-blind.

**Who runs this.** Players who want the Spear of Longinus with the option to lean
on a crit weapon after the strip.

---

### Muzzled Wolf
**Voruna. A Fangs of Raksh status-taxi nuke behind a map-wide Muzzle Flash blind.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Status-spread nuke, permanent crowd control, stealth melee carry |
| Difficulty | Intermediate. The status-taxi mechanic takes learning |
| Investment | High. 5 forma, energy-max and melee crit-damage shards |
| Weapon reliance | High. A forced-slash or high-status melee is what Fangs taxis across the room |

> Tenno. Shooting Gallery with Muzzle Flash keeps the whole map blinded off six
> kills, and blinded enemies take a 700% stealth melee multiplier. Fangs of Raksh
> stamps five random statuses on a target; Prey of Dynar marks one so Fangs
> multiplies its spread 2.5x. Land a strong slash or gas proc on a marked enemy,
> kill it, and that proc is averaged and taxied to everything in a 44m radius.

**The build**

- Muzzle Flash, rank 3, unpolarised — augment. Shooting Gallery blinds in a radius on kills
- Primed Flow, rank 10, Naramon polarity
- Equilibrium, rank 10, Naramon polarity
- Prey of Dynar, rank 3, unpolarised — augment. Marks an enemy for a 2.5x Fangs spread
- Overextended, rank 5, Vazarin polarity
- Blind Rage, rank 10, Madurai polarity
- Archon Stretch, rank 10, Naramon polarity
- Archon Continuity, rank 10, Madurai polarity
- Aura: Corrosive Projection, aura slot
- Exilus: Cunning Drift, unpolarised
- Arcanes: Arcane Strike, Arcane Impetus

Arsenal figures land at roughly 139% Strength, 155% Duration, 250% Range, 45%
Efficiency, with 555 health, 370 shield, 200 armor and a 427 energy pool.

**How it works.** Muzzle Flash needs six kills to charge a blind triggered on your
next attack, keeping the map stunned for 40s+ with no line-of-sight requirement.
Blinded enemies take a 700% stealth melee multiplier (additive to crit multiplier,
so ~70 to 80% final damage). Fangs of Raksh (2) applies five random statuses and
spreads matching ones from your melee on the target's death, in an 18m radius or
44m on a Prey of Dynar mark. Melee Afflictions multiplies transferred DoTs
exponentially. *Confidence: Approximation, per the author.*

**Playstyle.**

1. Activate Shooting Gallery (3) and keep it up (kills on 5-status enemies extend it).
2. Activate Lycath's Hunt (4) and refresh it (kills charge it).
3. Press 1 to go invisible, gain the melee crit-damage buff, and mark an enemy.
4. Press 2 on the marked enemy to stamp five statuses, then kill it to taxi the strong procs.
5. Repeat 1 and 2 on each fresh group.

**Duration, Efficiency, Range, Strength.** Positive Duration for 1 and 3, extended
by melee kills. Negative Efficiency with Lycath's Hunt orbs plus Equilibrium plus
Arcane Impetus. Maxed Range for the Fangs spread (17m, ~30m marked). Strength for
the crit-damage buff and status damage.

**The mods.** *Blind Rage* is the Strength. *Overextended, Archon Stretch* set the
maxed Range, with Archon Stretch feeding passive energy. *Primed Flow, Equilibrium*
are the energy base. *Muzzle Flash* is the blind. *Prey of Dynar* is the 2.5x
spread. *Archon Continuity* adds corrosive procs for Condition Overload.

**Flexible slots.** Archon mods are optional and cost starting energy; you need 9
free capacity to cast Lycath's Hunt at mission start. The aura and exilus are open.

**Helminth.** Pick one. Subsume over Ulfrun's Descent (4).

- **Shooting Gallery** with Muzzle Flash is the build's crowd control and stealth
  multiplier.
- **Wrathful Advance** for flat crit chance to red-crit.
- **Roar** to triple-dip the Fangs status spread.
- **Silence** with Savage Silence for a mobile permanent stun.

**Archon Shards.** One Tauforged cast-speed. One Tauforged Azure energy-max (only
needed on base Voruna; Voruna Prime hits 500 without it). Two to three Tauforged
Violet melee crit-damage. Five total.

**Arcanes.** Arcane Strike for melee attack speed, Arcane Impetus for Strength and
Efficiency from Fangs. Arcane Crepuscular for hit-and-run melees, Molt Augmented,
as swaps.

**Focus.** Naramon for combo. Madurai for Strength.

**Weapon synergy.** Forced-slash-on-heavy melees for slash taxi: nikanas (5x
multiplier), scythes (6x), claws (5x, Keratinos fits thematically). Or
light-attack influence melees (Innodem, Nami Solo, Okina Prime). Influence
Contagion has the strongest synergy since Dynar gives it the status chance it
lacks. A primer secondary with Augur mods for backup shield gating.

**Staying alive.** The Muzzle Flash blind plus invisibility on tap (which also
generates shields) plus Vazarin Sling. It fails against Eximus and Thrax (blind
does not work through overguard) and to toxin.

**Energy.** Lycath's Hunt orbs plus Equilibrium plus Arcane Impetus.

**Where it struggles.** Eximus and Thrax ignore the blind. The status-taxi
mechanic is fiddly to learn and inconsistent if Fangs rolls the wrong five
statuses. Bosses.

**Variants.** A pure red-crit build for slam, Glaives and Contagion. An Ulfrun's
Descent pure-ability build. A Blood Altar gas-afflictions nuke.

**Strengths and weaknesses.** Strong: map-wide clear via status taxi, permanent
crowd control, a huge stealth melee multiplier, strong priming. Weak: Eximus-
awkward, RNG on the Fangs roll, complex, boss-blind.

**Who runs this.** Players who want a melee frame that blinds the whole map and
sprays one strong proc across 44 metres.

---

### Flying Fortress
**Hildryn Prime. The Aegis Gale nuke with Molt speed and an Arcane Sculptor efficiency lock.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Mobile exalted-weapon nuke, shield tank |
| Difficulty | Beginner to intermediate |
| Investment | Medium. 4 forma |
| Weapon reliance | Low. Balefire under Aegis Gale is the damage |

> Tenno. This is the Aegis Gale build with Molt subsumed for movement speed inside
> Aegis Storm, and Arcane Sculptor to lock efficiency so the drain barely matters.
> Spam Balefire alt-fire, spam Pillage, float around fast.

**The build**

- Augur Reach, rank 5, Naramon polarity
- Umbral Intensify, rank 10, unpolarised
- Aegis Gale, rank 3, unpolarised — augment. Balefire gains a spammable area alt-fire
- Stretch, rank 5, Naramon polarity
- Blind Rage, rank 10, Madurai polarity
- Primed Continuity, rank 10, Madurai polarity
- Overextended, rank 5, Vazarin polarity
- Primed Redirection, rank 10, Vazarin polarity
- Aura: Corrosive Projection, Naramon polarity
- Exilus: Cunning Drift, unpolarised
- Arcanes: Arcane Velocity, Arcane Sculptor

Arsenal figures land at roughly 183% Strength, 155% Duration, 280% Range, 45%
Efficiency, with 370 health, a 5263 shield pool, 315 armor and no energy bar.

**How it works.** Same core as The Aegis Gale: everything costs shields, Aegis
Gale's alt-fire nukes with real area, and Pillage refuels you off stripped
enemies. The difference is Molt subsumed over 3 for movement speed inside Aegis
Storm, and Arcane Sculptor triggering off Molt to lock 175% Efficiency for 12s, so
entering Aegis Storm within that window snapshots the low drain. Primed
Fulmination plus Range multiply Balefire's radius to ~11.5m. *Confidence:
Approximation, per the author.*

**Playstyle.** Enter Aegis Gale and spam alt-fire; spam Pillage to refuel and
strip; spam Molt to move fast and keep the Sculptor lock.

**The mods.** *Blind Rage, Umbral Intensify* are the Strength. *Primed Continuity*
holds Duration. *Overextended, Stretch, Augur Reach* set the wide Range. *Primed
Redirection* deepens the shield pool. *Aegis Gale* is the nuke. *Corrosive
Projection* keeps a partial strip so Pillage still returns shields.

**Helminth.** **Molt** over Pillage's slot (her 3) for the speed and the Arcane
Sculptor trigger.

**Archon Shards.** One Amber cast-speed, four Crimson strength. Five total.

**Arcanes.** Arcane Velocity for Balefire fire rate, Arcane Sculptor for the
Efficiency lock.

**Focus.** Vazarin Sling for i-frames. Madurai for cast speed and Strength.

**Staying alive.** The shield pool plus Hildryn's 3s passive i-frames plus Pillage
refuel. It fails to toxin and to a single hit exceeding the whole pool in deep
endurance.

**Where it struggles.** Toxin. Very deep endurance. Everything else as The Aegis
Gale.

**Variants.** The Aegis Gale (#010) is the general-use build with Pillage kept.

**Strengths and weaknesses.** Strong: a spammable area nuke with no energy
management, mobile inside Aegis Storm, tanky. Weak: toxin-vulnerable, endurance
ceiling, weapon-light.

**Who runs this.** Players who want the Aegis Gale nuke but faster and with the
drain solved.

---

### Electrolysis
**Gyre. Rotorswell and Coil Horizon electric chaining with a strip subsume.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Electric ability-DPS, grouping, self-sustaining energy, shield-gate survivor |
| Difficulty | Intermediate |
| Investment | High. 5 forma |
| Weapon reliance | Medium. Rotorswell and Coil Horizon carry with a strip; a weapon helps at high levels |

> Tenno. This is the ability-DPS lean of Gyre. Coil Horizon groups a crowd so
> electric status chains through it, Rotorswell hangs an electric aura that fires
> off every crit, and Cathode Grace self-sustains energy and crit chance. Add a
> strip subsume so electric procs actually land against armour, and the room
> fries.

**The build**

- Cathode Current, rank 3, unpolarised — augment. Rotorswell duration extends on kills, plus a discharge
- Equilibrium, rank 10, Naramon polarity
- Conductive Sphere, rank 3, unpolarised — augment. Shots through the orb gain forced electric
- Catalyzing Shields, rank 3, Vazarin polarity
- Primed Flow, rank 10, Naramon polarity
- Overextended, rank 5, Vazarin polarity
- Archon Stretch, rank 10, Naramon polarity
- Blind Rage, rank 10, Madurai polarity
- Aura: Brief Respite, aura slot
- Exilus: Lightning Dash, unpolarised
- Arcanes: Arcane Aegis, Molt Augmented

Arsenal figures land at roughly 139% Strength, 100% Duration, 235% Range, 45%
Efficiency, with 370 health, 650 shield, 105 armor and a 684 energy pool.

**How it works.** Cathode Grace (3) locks its own duration after ~13 kills and,
with Archon Stretch, regenerates ~300 energy/min; Cathode Current does the same for
Rotorswell (4). Coil Horizon (2) groups so electric status chains, exponentially
magnifying it. A strip subsume is what makes electric procs scale against armoured
Grineer and Corrupted, where armour is up to 99.9% damage reduction. *Confidence:
Approximation, per the author.*

**Playstyle.**

1. Press 3 (Cathode Grace) with enemies around to lock its duration.
2. Press 4 (Rotorswell); kills keep it up.
3. Press 2 (Coil Horizon) on each fresh group to chain electric.
4. Press 1 to shield gate and shoot through the orb.

**The mods.** *Blind Rage* is the Strength. *Overextended, Archon Stretch* set the
Range, with Archon Stretch feeding energy. *Cathode Current* extends Rotorswell.
*Primed Flow, Equilibrium* are the energy base. *Catalyzing Shields* locks the gate.
*Brief Respite* aura feeds it.

**Helminth.** Pick one. Subsume over Arcsphere or Coil Horizon.

- A **strip** (Tharros Strike at 200%, Pillage at 328% with Corrosive Projection,
  Terrify at 167%) is the highest priority for electric scaling.
- **Nourish** for viral plus an energy multiplier (~800 energy/min).
- **Sickening Pulse** to multiply stacked electric status 10x into a group.

**Archon Shards.** One Amber cast-speed. Two parkour. Two to four Violet electric
ability-damage (or primary electric-damage for a weapon lean). Five total.

**Arcanes.** Arcane Aegis for lazy shield sustain, Molt Augmented for Strength
toward a strip threshold. Arcane Circumvent for a dash strip.

**Focus.** Vazarin Sling for i-frames. Madurai for Strength and cast speed.

**Weapon synergy.** High-multishot electric weapons through Conductive Sphere, with
mandatory +electric mods: Kuva Hek, Amprex, Cedo. Violet primary electric shards
multiply the status. Projectile melees gain forced influence through the orb.

**Staying alive.** Coil Horizon and Rotorswell crowd control plus Catalyzing
Shields gating plus Vazarin Sling. Gyre is fragile; lean on the crowd control. It
fails to toxin.

**Energy.** Cathode Grace plus Archon Stretch, or ~800/min with Nourish.

**Where it struggles.** Rotorswell damage falls off in Steel Path without a strip,
so the strip subsume is close to mandatory. Fragile frame. Bosses. Cold-start
cooldown risk on 3.

**Variants.** The Flux Dancer build is the weapon-platform lean with passive
gating.

**Strengths and weaknesses.** Strong: strong grouped electric chain damage,
self-sustaining energy, good crowd control. Weak: needs a strip subsume, fragile,
boss-blind.

**Who runs this.** Players who want an electric ability-DPS Gyre that fries grouped
rooms once the armour is off.

---

### Rock 'n' Rolla
**Atlas Prime. Free-Landslide endurance spam with passive shield-gate survival.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Free-cost punch clear, rubble tank plus passive shield gate |
| Difficulty | Beginner to intermediate |
| Investment | Medium. 3 forma, melee crit-damage shards |
| Weapon reliance | Low. Landslide clears; a statstick shapes it |

> Tenno. Above 1400 rubble, Rubble Heap makes Landslide cost nothing, so you punch
> forever. Petrify tops the rubble back up. Landslide's cast gives short i-frames,
> and Fast Deflection plus Vigilante Vigor start your shields recharging inside
> that window, so you come out of every punch with a fresh gate. This is the
> endurance version of the Atlas loop.

**The build**

- Catalyzing Shields, rank 3, Vazarin polarity
- Vigilante Vigor, rank 5, unpolarised
- Fast Deflection, rank 5, unpolarised
- Overextended, rank 5, Vazarin polarity
- Blind Rage, rank 10, Madurai polarity
- Rubble Heap, rank 3, unpolarised — augment. Free Landslide and more damage at max rubble
- Archon Stretch, rank 10, Naramon polarity
- Primed Flow, rank 10, Naramon polarity
- Aura: Corrosive Projection, aura slot
- Exilus: Cunning Drift, unpolarised
- Arcanes: Molt Augmented, Arcane Fury

Arsenal figures land at roughly 139% Strength, 100% Duration, 250% Range, 45%
Efficiency, with 650 health, 555 shield, 500 armor and a 755 energy pool.

**How it works.** Rubble Heap zeroes Landslide's cost above 1400 rubble, so active
shield gating (which needs an energy cost to generate shields) does not work here.
Instead Fast Deflection plus Vigilante Vigor cut the recharge delay to ~1s, which
elapses during Landslide's i-frames, so you re-gate every punch. Rubble armour
(1500) gives some falloff-prone damage reduction on top. *Confidence:
Approximation, per the author.*

**Playstyle.**

1. Petrify (3) groups and kill them for rubble until above 1400.
2. Spam Landslide (1).
3. Occasionally cast 3 and 4 to keep rubble topped.

**The mods.** *Blind Rage* is the Strength. *Overextended* is the Range. *Rubble
Heap* is the free-cost augment. *Catalyzing Shields, Fast Deflection, Vigilante
Vigor* are the passive-gate package. *Archon Stretch* is Range plus passive
energy. *Primed Flow* is the pool.

**Helminth.** Pick one. Subsume over Tectonics (2).

- An **armour strip** to scale Landslide's raw damage against armour.
- **Nourish** for viral and energy, the comfy pick.
- **Roar** for damage and DoT double-dip.
- **Wrathful Advance** for red crits.

**Archon Shards.** One to two Amber cast-speed for Petrify and Rumbler. Three to
four Tauforged Violet melee crit-damage. Five total.

**Arcanes.** Molt Augmented for Strength, Arcane Fury for melee damage. Arcane
Avenger for flat crit on Landslide's low base.

**Focus.** Any. Madurai for Strength.

**Weapon synergy.** A statstick shapes Landslide (electric influence, gas
afflictions). Helios with Deconstructor and Vicious Bond spreads a strip through
Landslide.

**Staying alive.** The passive gate re-established every Landslide, plus rubble
armour, plus Rumbler aggro and Petrify crowd control. It fails if you stop
punching (the gate lapses) and to toxin. Rubble armour falls off in deep
endurance.

**Energy.** Free Landslide plus Equilibrium for Petrify and Rumbler. Minimum
Efficiency is fine.

**Where it struggles.** Rubble upkeep is hard outside solo or dense maps. Rubble
armour falls off past ~level 500 (the passive gate carries it further). Bosses.

**Variants.** The Infinite Fists of Ore build is the casual solo loot farm.

**Strengths and weaknesses.** Strong: free infinite Landslide, a self-re-
establishing shield gate, tanky in mid content. Weak: rubble-upkeep-dependent,
armour falls off, boss-blind.

**Who runs this.** Players who want an endurance Atlas that punches for free and
never drops its shield gate.

---

### Shadow Arts
**Follie. Shadowgraph barrels and arc traps that scale on enemy health, plus tap-invulnerability.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Percent-health nuke, crowd control, on-tap invulnerability |
| Difficulty | Intermediate. The barrel-and-teleport combo and the 3.5s invuln cadence |
| Investment | High. 6 forma, cast-speed shards |
| Weapon reliance | Low. Shadowgraphs do the damage; a weapon detonates barrels |

> Tenno. Follie paints the room. Shadowgraph drops explosive barrels that deal
> 65% of an enemy's health and ignore armour, or arc traps that deal a flat amount
> plus 2.5% health, neither scaled by your Strength. Inkblot slows enemies and
> feeds you orbs. Forced Perspective gives 3.5 seconds of invulnerability on a
> 100m range. Drop a barrel, teleport into it to detonate, repeat.

**The build**

- Precision Intensify, rank 5, Madurai polarity
- Overextended, rank 5, unpolarised
- Primed Continuity, rank 10, Madurai polarity
- Archon Stretch, rank 10, Naramon polarity
- Blind Rage, rank 10, Madurai polarity
- Equilibrium, rank 10, Naramon polarity
- Archon Flow, rank 10, Naramon polarity
- Catalyzing Shields, rank 3, Vazarin polarity
- Aura: Brief Respite, aura slot
- Exilus: Preparation, unpolarised
- Arcanes: Arcane Sculptor, Arcane Concentration

Arsenal figures land at roughly 139% Strength, 155% Duration, 235% Range, 45%
Efficiency, with 585 health, 325 shield, 325 armor and a 641 energy pool.

**How it works.** Explosive barrels deal 65% health ignoring armour and need a
detonation (a direct shot, a corrosive proc from inkblot, or teleporting into
them). Arc traps deal 250 plus 2.5% health with 10 built-in charges. Neither
scales with Strength, so Strength is only for a subsumed Roar, which pushes the
barrel to 100% health for a one-shot at ~180% Roar Strength (200% through
overguard). Arcane Sculptor triggers off Shadowgraph and locks 175% Efficiency, so
Blind Rage runs at 45% arsenal Efficiency for maximum Range. *Confidence:
Approximation, per the author.*

**Playstyle.**

1. Keep Self Portrait (3) up in each zone for map-wide inkblot and energy.
2. Barrel spam: hold 2 to select Explosive Barrel, tap 2, then tap 1 to teleport into it and detonate.
3. Arc Trap spam: hold 2 to select Arc Traps, spam tap 2 (max 3 active).
4. Swap to Thermian RPG for Acolytes.
5. Tap 1 every 3.5s to stay invulnerable, or shield-gate off 2 with Catalyzing Shields.

**Duration, Efficiency, Range, Strength.** Duration for Shadowgraph lifespan (Arc
Trap ignores it). Efficiency 45% to 160% by mission density, solved by Arcane
Sculptor. Range spreads inkblot and Plein Air, not barrel or arc-trap AoE.
Strength only for a subsumed Roar and Plein Air's strip (200%, 164% with Corrosive
Projection).

**The mods.** *Blind Rage* is the Strength, covered by *Arcane Sculptor*.
*Overextended* is the Range. *Primed Continuity* holds Duration. *Archon Stretch*
is Range plus passive energy. *Equilibrium* converts inkblot orbs. *Catalyzing
Shields* locks the gate. *Brief Respite* aura feeds it.

**Flexible slots.** Streamline plus Arcane Impetus for a high-Efficiency low-
density version. Health Conversion plus Adaptation for a Self Portrait 90%-DR
health tank. The exilus is open.

**Helminth.** Pick one. Subsume over Plein Air (4).

- **Roar** is the standard: it pushes barrel damage to 100% health for a level-cap one-shot.
- **Breach Surge** for homing sparks off barrel and arc-trap damage.
- **Tempest Barrage** for a corrosive zone that auto-detonates barrels plus viral for the one-shot threshold.

**Archon Shards.** Two to three cast-speed for the 1-and-2 combo flow. The rest
parkour, duration or Equilibrium. Five total.

**Arcanes.** Arcane Sculptor for the Efficiency lock, Arcane Concentration for
Duration (good with Roar). Arcane Impetus for a low-density Efficiency version.

**Focus.** Any. Madurai for Roar Strength and cast speed.

**Weapon synergy.** Enkaus (Follie's signature gun) instantly dissolves enemies
below 35% health, syncing with inkblot. Otherwise any weapon that can shoot
barrels to detonate them.

**Staying alive.** Forced Perspective's 3.5s invulnerability plus Catalyzing
Shields gating off 2, plus inkblot's slow. It fails if you cannot recast 1 in time
with the gate down, and to toxin.

**Energy.** Inkblot orbs through Equilibrium plus Arcane Sculptor. Preparation for
the start.

**Where it struggles.** The barrel-teleport combo is fiddly and the 3.5s invuln
cadence interrupts everything. Bosses (barrels ignore armour but bosses have huge
health). 6 forma.

**Variants.** A high-Efficiency low-density build. A Self Portrait health tank.

**Strengths and weaknesses.** Strong: level-independent percent-health nuke,
map-wide slow, on-tap invulnerability, armour-ignoring. Weak: fiddly combo,
invuln-cadence interrupts play, boss-blind, forma-hungry.

**Who runs this.** Players who want a nuke that deletes anything by percentage and
do not mind the teleport-detonate rhythm.

---

### Descent of Fangs
**Voruna. Pure Ulfrun's Descent claw DPS with Fangs slash-taxi refilling charges.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Ability-DPS claw nuke |
| Difficulty | Intermediate |
| Investment | High. 7 forma |
| Weapon reliance | Very low. Ulfrun's Descent is the damage |

> Tenno. This is the ability-only Voruna. Enter Ulfrun's Descent and claw enemies;
> Fangs of Raksh stamps five statuses on a target, and if slash lands in that
> five, killing the target taxis a strong slash proc across 16m, which triggers
> Ulfrun's Endurance and refills your charges. Stay invisible, prime, claw,
> repeat.

**The build**

- Ulfrun's Endurance, rank 3, Zenurik polarity — augment. Slash-proc kills refill Ulfrun's Descent charges
- Equilibrium, rank 10, Naramon polarity
- Overextended, rank 5, Vazarin polarity
- Blind Rage, rank 10, Madurai polarity
- Prey of Dynar, rank 3, unpolarised — augment. Marks an enemy for a wider Fangs spread
- Primed Continuity, rank 10, Madurai polarity
- Archon Stretch, rank 10, Naramon polarity
- Primed Flow, rank 10, Naramon polarity
- Aura: Corrosive Projection, aura slot
- Exilus: Cunning Drift, Madurai polarity
- Arcanes: Arcane Crepuscular, Arcane Impetus

Arsenal figures land at roughly 139% Strength, 155% Duration, 250% Range, 45%
Efficiency, with 555 health, 370 shield, 200 armor and a 427 energy pool.

**How it works.** Same status-taxi engine as Muzzled Wolf, but the damage output
is Ulfrun's Descent's claw attacks rather than a melee weapon. Fangs (2) rolls
five random statuses; a slash in that roll, applied to a Prey of Dynar mark and
killed, spreads a strong slash proc and triggers Ulfrun's Endurance to refill
charges, so 4 is self-sustaining. The build needs 9 free mod capacity for a
mission-start Lycath's Hunt cast. *Confidence: Approximation, per the author.*

**Playstyle.**

1. Tap 1 to go invisible.
2. Tap 2 on an enemy (ideally the marked one) to prime five statuses.
3. Tap 4 to enter Ulfrun's Descent, claw the primed enemy to spread and refill charges.

**The mods.** *Blind Rage* is the Strength. *Overextended, Archon Stretch* set the
maxed Range for the Fangs spread, with Archon Stretch feeding passive energy.
*Primed Continuity* holds Duration for 1 and 3. *Primed Flow, Equilibrium* are the
energy base fed by Lycath's Hunt. *Ulfrun's Endurance* refills charges.
*Prey of Dynar* widens the spread. *Corrosive Projection* is a damage lift.

**Helminth.** **Roar** over 3 (swap Blind Rage for Transient Fortitude or
Streamline). It boosts Ulfrun and double-dips the slash it spreads.

**Archon Shards.** One cast-speed. Two Violet Equilibrium optional to free the
Equilibrium slot. Strength or parkour for Ulfrun (melee crit-damage does not
affect it). Five total.

**Arcanes.** Arcane Crepuscular for Strength and crit damage while invisible,
Arcane Impetus for Strength and Efficiency from Fangs.

**Focus.** Naramon or Madurai. Any works given the invisibility.

**Weapon synergy.** A primer secondary (Epitaph, Kuva Nukor) with Augur mods for
backup shield gating and consistent viral. A Huras Kubrow with claw mods, Contagious
Bond and the Mecha set for extra nuke potential.

**Staying alive.** Invisibility on tap plus spread-status crowd control plus
Vazarin Sling. It fails to Eximus (no blind) and to toxin.

**Energy.** Lycath's Hunt orbs plus Equilibrium plus Arcane Impetus.

**Where it struggles.** RNG on the Fangs slash roll (5/13 chance). Eximus and
Thrax. Bosses. 7 forma for an ability-only build.

**Variants.** Muzzled Wolf is the melee-platform version. Voruna Prime has a wider
spread and hits 500 energy without a shard.

**Strengths and weaknesses.** Strong: self-refilling ability nuke, map-wide status
spread, invisible, near no weapon investment. Weak: RNG-dependent, Eximus-awkward,
boss-blind, very forma-hungry.

**Who runs this.** Players who want to nuke rooms with Voruna's claws and nothing
else.

---

### Altar of the Dead
**Nekros Prime. A Shield of Shadows health tank with Desecrate energy and a million effective HP.**

| | |
|--|--|
| Content | Steel Path (to about level 500) |
| Role | Solo health tank with a shadow army |
| Difficulty | Beginner |
| Investment | Medium to high. 4 forma |
| Weapon reliance | Total. Nekros tanks; the weapon does everything |

> Tenno. Shield of Shadows redirects 90% of your damage to your shadow army at
> max shadows and 214% Strength. Stack that with Health Conversion armour, Arcane
> Guardian, Arcane Blessing and Adaptation and you reach around a million
> effective HP. Desecrate plus Despoil plus Equilibrium keeps health and energy
> flowing. This is a solo, sub-endurance tank, largely outclassed by shield
> gating.

**The build**

- Health Conversion, rank 5, Vazarin polarity
- Shield of Shadows, rank 3, unpolarised — augment. Redirects damage to shadows
- Primed Continuity, rank 10, Madurai polarity
- Blind Rage, rank 10, Madurai polarity
- Equilibrium, rank 10, Naramon polarity
- Stretch, rank 5, unpolarised
- Primed Flow, rank 10, Naramon polarity
- Adaptation, rank 10, Vazarin polarity
- Aura: Summoner's Wrath, aura slot
- Exilus: Power Drift, unpolarised
- Arcanes: Arcane Blessing, Arcane Guardian

Arsenal figures land at roughly 214% Strength, 155% Duration, 145% Range, 45%
Efficiency, with 370 health, 555 shield, 135 armor and a 541 energy pool.

**How it works.** Shield of Shadows needs 214% Strength for 90% DR at max shadows.
That plus 88% from ~2250 armour (Health Conversion plus Arcane Guardian) is 98.8%,
and Adaptation pushes it to 99.89%, for up to ~1.36 million EHP with max Arcane
Blessing. Despoil drops your health and Desecrate generates the orbs, so Health
Conversion and Equilibrium stay fed. *Confidence: Approximation, per the author's
DR math.*

**Playstyle.**

1. Turn on Desecrate (3).
2. Kill enemies for shadows and orbs.
3. Activate Shadows of the Dead (4).
4. Use Soul Punch (1) on heavies below 25% health for instant kills and strong shadows, or to mark tougher units.

**The mods.** *Blind Rage plus Power Drift* clears the 214% Strength breakpoint.
*Health Conversion* is the armour source. *Adaptation* is the DR layer. *Primed
Continuity* holds Duration to cut shadow decay. *Primed Flow, Equilibrium* are the
energy-and-health engine with Despoil. *Summoner's Wrath* aura boosts the shadows.

**Flexible slots.** Adaptation and Stretch are the flex zone: Natural Talent
(without cast-speed shards), Vitality (without Arcane Blessing) or Primed
Continuity.

**Helminth.** Pick one. Subsume over Soul Punch (1).

- **Blood Altar** to heal Nekros and the shadows constantly.
- **Nourish** for shadow damage, viral and energy.
- **Roar** for general DPS. **Gloom** for slow and self-heal (does not heal shadows).

**Archon Shards.** Two Amber cast-speed (Shadows of the Dead is a slow cast). One
to two Crimson strength for the breakpoint. Five total.

**Arcanes.** Arcane Blessing for the health, Arcane Guardian for the armour.

**Focus.** Any. Madurai for Strength.

**Weapon synergy.** None from the frame. Bring whatever kills.

**Staying alive.** The DR stack, healed by Despoil and Desecrate orbs. It fails
past about level 500 where a hit exceeds even a million EHP, and to toxin (bypasses
armour). Shadows can confuse allies in public (use a bright energy colour).

**Energy.** Despoil plus Desecrate plus Equilibrium. A flood.

**Where it struggles.** Level-500 ceiling. Shield gating does the same job with
less investment. The frame does no damage. Bosses.

**Variants.** The Reaper of Shadows build is the active shield-gate looting Nekros.

**Strengths and weaknesses.** Strong: enormous EHP for solo mid-content, a shadow
army, simple. Weak: hard ceiling, outclassed by gating, no self damage, boss-
blind.

**Who runs this.** Solo players who want a nostalgic set-and-forget tank for
regular Steel Path.

---

### Divine Lotus Flames
**Nezha Prime. Reaping Chakram heat stacking and Divine Retribution expedite, behind Warding Halo.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Heat-stacking nuke, status spread, crowd control, absorb tank |
| Difficulty | Intermediate |
| Investment | Medium. 3 forma |
| Weapon reliance | Low to medium. Chakram carries; a DoT weapon feeds the Divine Retribution spread |

> Tenno. This Nezha leans on Reaping Chakram, which doubles its own damage per
> enemy hit and, thrown into speared enemies, splits into two and applies heat
> procs. Archon Vitality doubles those procs. When Divine Spears ends, every
> accumulated heat proc is compressed and multiplied by Strength, wiping the
> speared room. Warding Halo absorbs a burst of fire into a huge health bar.

**The build**

- Stretch, rank 5, Naramon polarity
- Blind Rage, rank 10, Madurai polarity
- Overextended, rank 5, unpolarised
- Equilibrium, rank 10, Naramon polarity
- Reaping Chakram, rank 3, unpolarised — augment. Chakram doubles damage per hit and drops more orbs
- Divine Retribution, rank 3, unpolarised — augment. Divine Spears expedites accumulated status
- Archon Vitality, rank 10, Vazarin polarity — doubles heat procs
- Primed Flow, rank 10, Naramon polarity
- Aura: Brief Respite, aura slot
- Exilus: Cunning Drift, unpolarised
- Arcanes: Molt Augmented, Arcane Aegis

Arsenal figures land at roughly 139% Strength, 100% Duration, 250% Range, 45%
Efficiency, with a 930 health pool, 185 shield, 265 armor and a 641 energy pool.

**How it works.** Low Duration lets Divine Spears end on its own, triggering
Divine Retribution's expedite of all accumulated heat procs, multiplied by
Strength. Reaping Chakram thrown into speared enemies duplicates and stacks heat;
Archon Vitality doubles the procs. Chakram kills drop a guaranteed health orb (55
energy through Equilibrium) and a 35% energy orb, so energy floods. *Confidence:
Approximation, per the author.*

**Playstyle.**

1. Activate Warding Halo (3) surrounded by enemies for the absorb and the huge halo health.
2. Cast Divine Spears (4) to lock a room; shoot a status weapon or throw Chakram.
3. Cast Blazing Chakram (2) into the speared enemies to duplicate and spread heat.
4. Shield-gate off Chakram and Divine Spears casts.

**The mods.** *Blind Rage* is the Strength. *Overextended, Stretch* set the maxed
Range for Divine Spears (~53m). *Primed Flow, Equilibrium* are the energy base.
*Reaping Chakram* is the damage double and orb source. *Divine Retribution* is the
expedite. *Archon Vitality* doubles heat procs. *Brief Respite* aura feeds the
gate.

**Flexible slots.** Archon Vitality and Reaping Chakram are both flexible (Archon
Vitality only doubles heat procs and adds EHP; Reaping Chakram only adds orbs and
Chakram damage). Rolling Guard or Catalyzing Shields for solo endurance.

**Helminth.** Pick one.

- **Roar** is preferred: it double-dips heat from Chakram, and triple-dips the final Divine Retribution expedite.
- **Breach Surge** for stealth-damage stuns and sparks that double-dip the Chakram debuff.
- **Silence** to stop Violence dispelling your kit.

**Archon Shards.** Two Amber cast-speed. One optional Tauforged Azure shield-
capacity (for a full gate without overshields, freeing Catalyzing Shields). Two
Crimson strength. Five total.

**Arcanes.** Molt Augmented for Strength, Arcane Aegis for a passive survival
layer. Arcane Avenger with Combat Discipline as a swap.

**Focus.** Any. Madurai for Strength on the expedite multiplier.

**Weapon synergy.** A viral-corrosive-heat area primer (Bubonico, Epitaph Prime,
Cedo) to maximise Reaping Chakram DPS. Or any strong DoT weapon for the Divine
Retribution spread.

**Staying alive.** Warding Halo absorb plus its 3s activation and 2s break
i-frames, plus shield gating, plus Divine Spears crowd control. It fails if
Warding Halo lapses with the gate down, and to toxin.

**Energy.** The Chakram-Equilibrium loop. A flood once started.

**Where it struggles.** A cold start before Chakram is up. Bosses. Needs a DoT
weapon to nuke fully.

**Variants.** The Divine Shield Lotus build leans on the weapon status spread more
than Chakram.

**Strengths and weaknesses.** Strong: a strong self-contained heat nuke, infinite
energy, an absorb tank, crowd control. Weak: cold start, boss-blind, weapon helps.

**Who runs this.** Players who want a Nezha that nukes with Chakram and does not
lean as hard on a specific weapon.

---

### The Eternal Storm
**Gara Prime. Pure Splinter Storm: stack a moving damage field and run into things.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Passive damage aura that grows without limit, area denial, 90% DR tank |
| Difficulty | Intermediate. The Mass Vitrify plus Shattered Lash stacking loop |
| Investment | High. 5 forma, duration or melee crit-damage shards |
| Weapon reliance | Low. Shattered Lash stacks the field; a primer or roll-strip helps against armour |

> Tenno. Splinter Storm is a field that moves with you, cuts your damage taken by
> 90%, and has no damage ceiling. Cast Mass Vitrify, shatter it with Shattered
> Lash, and every point of that damage banks into the field. Repeat the wall-and-
> shatter loop and the field grows until you kill level-cap enemies by walking
> past them. Arcane Circumvent strips as you roll through.

**The build**

- Overextended, rank 5, Vazarin polarity
- Umbral Intensify, rank 10, unpolarised
- Augur Reach, rank 5, Naramon polarity
- Blind Rage, rank 10, Madurai polarity
- Primed Flow, rank 10, Naramon polarity
- Archon Stretch, rank 10, Naramon polarity
- Narrow Minded, rank 10, Vazarin polarity
- Primed Continuity, rank 10, Madurai polarity
- Aura: Brief Respite, aura slot
- Exilus: Cunning Drift, unpolarised
- Arcanes: Arcane Sculptor, Arcane Circumvent

Arsenal figures land at roughly 183% Strength, 254% Duration, 214% Range, 45%
Efficiency, with 445 health, 370 shield, 200 armor and a 641 energy pool.

**How it works.** Splinter Storm banks a portion of Shattered Lash's damage and
holds it with no cap, so the wall-and-shatter loop grows it indefinitely. High
Duration keeps the stacks from lapsing; high Range lets the ~7m field reach
without hugging enemies. Arcane Sculptor locks 175% Efficiency off casts of 3 or
4, so Blind Rage runs at 45% arsenal Efficiency. Since July 2024, corrosive plus
heat (no strip shards) is enough for the field to kill level cap after a few
stacks. *Confidence: Approximation, per the author.*

**Playstyle.**

1. Cast Splinter Storm (2) on yourself (not aimed at anything) and on your sentinel.
2. Cast 3 for the buff.
3. Cast Mass Vitrify (4), press 4 again to stop the expansion.
4. Shatter the wall with Shattered Lash (1).
5. Repeat 4 and 1 constantly to stack, refreshing Splinter Storm before it lapses.

**The mods.** *Blind Rage, Umbral Intensify* are the Strength for Shattered Lash,
covered by *Arcane Sculptor*. *Narrow Minded, Primed Continuity* are the Duration.
*Overextended, Augur Reach, Archon Stretch* set the Range, with Archon Stretch
feeding passive energy off electric Shattered Lash. *Primed Flow* is the pool.
*Brief Respite* aura feeds the gate.

**Flexible slots.** Adaptation for a ~300k shield-EHP casual tank. Rolling Guard
for status cleanse. Narrow Minded flexes for Augur Message. The aura and exilus
are open.

**Helminth.** Pick one. Subsume over Spectrorage (3).

- **Roar** for a multiplicative Shattered Lash boost (fastest stacking).
- **Nourish** for viral (additive, weaker than Roar) plus energy.
- **Silence** to stop Violence dispelling your stacked field.

**Archon Shards.** One to two Amber cast-speed. Three Crimson Duration or Violet
melee crit-damage. Five total.

**Arcanes.** Arcane Sculptor for the Efficiency lock, Arcane Circumvent for a
roll-strip that pairs with the moving field. Molt Augmented or Arcane Blade
Charger as swaps.

**Focus.** Any. Vazarin Sling for i-frames. Madurai for Strength and cast speed.

**Weapon synergy.** Use a sentinel, not a moving pet, and keep Splinter Storm on
it for a second overlapping damage source (double damage per tick). Diriga for
priming, Helios Prime with Vicious Bond for passive strip, Nautilus for grouping.

**Staying alive.** Splinter Storm's 90% DR plus shield gating off 1 plus Arcane
Circumvent's roll-strip-and-steal. It fails in the cold-start window before the
field has stacks, and to toxin.

**Energy.** Arcane Sculptor's lock. A non-issue.

**Where it struggles.** A cold start before Splinter Storm ramps. Losing the field
to Violence resets minutes of stacking (bring Silence). Bosses. Very open tiles
where Mass Vitrify cannot corral.

**Variants.** The Glass Storm build is the hybrid Shattered Lash and Splinter Storm
build. A pure Shattered Lash spam build.

**Strengths and weaknesses.** Strong: a passive damage field with no ceiling that
also tanks, strong area denial, comfortable once ramped. Weak: cold-start ramp,
Violence-vulnerable, boss-blind, tile-sensitive.

**Who runs this.** Players who want a Gara that kills level-cap enemies by walking
near them.

---

### Pillaging Thunder Fist
**Baruuk Prime. Minimum-Duration Lull spam and Pull grouping on the Desert Wind fist.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Exalted-fist clear with fast Restraint erosion and grouping |
| Difficulty | Intermediate |
| Investment | Medium. 4 forma |
| Weapon reliance | Low. Desert Wind is the damage; Pull groups for it |

> Tenno. This Baruuk runs minimum Duration so Lull can be spammed to erode
> Restraint fast and get you into Serene Storm quickly, and subsumes Pull over
> Elude for grouping so you build Desert Wind combo on a tight ball of enemies.
> Reactive Storm's electric procs and Archon Stretch off an electric Desert Wind
> pair with the grouping.

**The build**

- Reactive Storm, rank 3, Zenurik polarity — augment. Desert Wind gains status chance
- Blind Rage, rank 10, Madurai polarity
- Transient Fortitude, rank 10, Madurai polarity
- Overextended, rank 5, Vazarin polarity
- Precision Intensify, rank 5, unpolarised
- Archon Stretch, rank 10, Naramon polarity
- Equilibrium, rank 10, Naramon polarity
- Fleeting Expertise, rank 5, unpolarised
- Aura: Corrosive Projection, Naramon polarity
- Exilus: Power Drift, unpolarised
- Arcanes: Molt Augmented, Arcane Strike

Arsenal figures land at roughly 209% Strength, 12.5% Duration, 235% Range, 105%
Efficiency, with 280 health, 465 shield, 240 armor and a 300 energy pool.

**How it works.** 12.5% Duration makes Lull nearly free to spam for Restraint
erosion, and does not touch Pull, Desolate Hands or Serene Storm. Positive
Efficiency (from Fleeting Expertise offsetting Blind Rage) supports the Lull,
Pillage and Desolate Hands spam. Precision Intensify double-dips Desert Wind DPS
via Reactive Storm's status chance. Serene Storm runs on Restraint, not energy.
*Confidence: Approximation, per the author.*

**Playstyle.**

1. Activate Desolate Hands (3), keep daggers above 9.
2. Spam Lull (2) to erode Restraint, recast to keep it minimal.
3. Activate Serene Storm (4), spam light melee.
4. Spam Pull to group and build Desert Wind combo.

**The mods.** *Blind Rage, Transient Fortitude, Precision Intensify* are the
Strength. *Overextended, Archon Stretch* set the Range for Pillage and Lull, with
Archon Stretch feeding passive energy. *Fleeting Expertise* is the Efficiency
offset. *Equilibrium* is energy. *Corrosive Projection* is a global armour cut.

**Helminth.** Pick one. Subsume over Elude.

- **Pillage** (the source's default) for a strip that scales with the low Duration and high Range, plus shields.
- **Omamori** for a chill survival layer.

**Archon Shards.** One cast-speed. Two parkour. Two Violet melee crit-damage (with
Primed Flow to double the value). Five total.

**Arcanes.** Arcane Strike for Desert Wind attack speed, Molt Augmented for
Strength. Arcane Fury or Augmented as swaps.

**Focus.** Naramon for combo. Madurai for Strength.

**Survivability.** Baruuk's stacked innate DR (50% at minimum Restraint, 90% at 9
daggers, 40% in Serene Storm; ~97% total, 99.7% with Adaptation), plus Pillage or
passive shield gating in endurance.

**Weapon synergy.** Desert Wind is the weapon. An electric influence build pairs
with the grouping and Reactive Storm procs.

**Staying alive.** Stacked DR plus Pillage or shield gating plus Pull crowd
control. It fails in endurance if you must attack while surrounded and unshielded,
and to toxin.

**Energy.** Fleeting Expertise Efficiency plus Equilibrium plus Archon Stretch.

**Where it struggles.** The minimum-Duration build makes any duration-based
subsume useless. Ranged targets. Bosses.

**Variants.** The Endless Fist build is the Elude-and-Elusive-Retribution version.

**Strengths and weaknesses.** Strong: fast into Serene Storm, strong grouped
clear, very tanky, a strip via Pillage. Weak: no duration subsumes, melee range,
boss-slow.

**Who runs this.** Players who want a Baruuk that groups the room and gets into
its exalted fists faster.

---

### Longest Day and Eternal Night
**Equinox Prime. Gloom stacked with Peaceful Provocation for a 99% slow, plus a Maim nuke.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Near-total time freeze, stun-lock nuke, effective immortality in Night form |
| Difficulty | Advanced. The Day-to-Night slow-stacking sequence |
| Investment | Medium. 4 forma, cast-speed shards |
| Weapon reliance | Medium. Maim banks weapon and ability damage; a weapon releases it |

> Tenno. In Day form, Peaceful Provocation adds 70% Strength on top of Pacify and
> Provoke, pushing Gloom to a 94% slow and letting Rage stun-lock a room. Switch to
> Night form with Gloom still up and Peaceful Provocation's 80% slow multiplies
> against Gloom's 95% to reach 99%: time practically stops, and Mend regenerates
> your shields against any stray fire. Bank damage in Maim, then release.

**The build**

- Peaceful Provocation, rank 3, unpolarised — augment. Day 3 grants a stacking Strength buff
- Fleeting Expertise, rank 5, Naramon polarity
- Augur Reach, rank 5, unpolarised
- Primed Continuity, rank 10, Madurai polarity
- Transient Fortitude, rank 10, Madurai polarity
- Streamline, rank 5, unpolarised
- Stretch, rank 5, unpolarised
- Primed Flow, rank 10, Naramon polarity
- Aura: Brief Respite, aura slot
- Exilus: Primed Sure Footed, Vazarin polarity
- Arcanes: Arcane Energize, Molt Augmented

Arsenal figures land at roughly 155% Strength, 67% Duration, 175% Range, 190%
Efficiency, with 465 health, 370 shield, 160 armor and a 712 energy pool.

**How it works.** Max Fleeting Expertise plus Streamline hits the 190% Efficiency
channel-drain floor (the UI shows 175%) so you can hold up to three channelled
abilities. Duration is dumped above the 40% floor. Peaceful Provocation stacks to
+70% Strength in Day form (reaching 272% for a 95% Gloom slow), and in Night form
adds an 80% slow that multiplies against Gloom's 95% for a compound 99%.
*Confidence: Approximation, per the author.*

**Playstyle.**

1. Start in Day, activate 3 for the initial 40% Strength.
2. Activate Gloom with 3 up for ~83% slow; activate 4 to stun and bank damage.
3. Kill until Peaceful Provocation shows 70%; dispel and recast Gloom for 94%.
4. Deactivate 4 to nuke, reactivate immediately to re-stun.
5. Switch to Night, activate 3 and 4, take shield-only damage until Peaceful Provocation shows 80% for the 99% compound slow.

**The mods.** *Fleeting Expertise, Streamline* hit the Efficiency floor.
*Transient Fortitude* is the Strength core (drop for Primed Flow plus Rolling
Guard if you run Madurai plus Molt Augmented for +100%). *Stretch, Augur Reach*
set the Range. *Primed Continuity* keeps Duration above the floor. *Peaceful
Provocation* is the slow-stacking augment. *Brief Respite* aura feeds shield
gating.

**Helminth.** **Gloom** over a slot is the build. Energy Transfer augment as an
option to bank in Night and nuke in Day.

**Archon Shards.** Two cast-speed (mandatory). Three energy-max to free Primed
Flow for Rolling Guard. Five total.

**Arcanes.** Arcane Energize (essential for the triple-channel drain), Molt
Augmented or Molt Vigor for Strength. Arcane Consequence for parkour off the easy
slowed headshots.

**Focus.** Madurai or Zenurik plus Molt Augmented for +100% Strength to free
strength mods. Vazarin as a backup.

**Weapon synergy.** Zenith's infinite punch-through pairs with Maim's through-wall
slash indicators to hit enemies through walls. Otherwise a strong area weapon to
bank Maim fast.

**Staying alive.** The 99% slow in Night form is near-total time freeze, plus Mend
shield regen against stray fire, plus shield gating. It fails to a hit that lands
before the slow is fully stacked, and to toxin.

**Energy.** The Efficiency floor plus Arcane Energize. A Dethcube helps.

**Where it struggles.** The Day-to-Night stacking sequence is a real skill barrier
and interrupts DPS. Maim's falloff and banking delay as in Day and Night. Bosses.

**Variants.** The Day and Night build is the simpler sleep-and-Maim switch.

**Strengths and weaknesses.** Strong: the strongest slow in the game (near time
freeze), stun-lock nuke, effective immortality in Night form. Weak: complex
stacking sequence, Maim falloff, boss-blind.

**Who runs this.** Players who want to functionally stop time and delete the
frozen room.

---

### The Prime Wolf
**Voruna Prime. The Prime chassis Fangs status-taxi melee platform with a wider spread.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Status-spread melee nuke, permanent crowd control, stealth carry |
| Difficulty | Intermediate |
| Investment | Medium. 3 forma (5 with Archon mods for a mission-start Lycath cast) |
| Weapon reliance | High. A forced-slash or high-status melee is what Fangs taxis |

> Tenno. Voruna Prime is the Muzzled Wolf build with better numbers: the base
> chassis hits 500 energy without a shard, and the Fangs of Raksh spread reaches
> 20m, or 49m on a Prey of Dynar mark. Same plan: invisible, prime five statuses,
> land a strong slash or gas proc on the marked target, and taxi it across the
> room.

**The build**

- Equilibrium, rank 10, Naramon polarity
- Blind Rage, rank 10, Madurai polarity
- Prey of Dynar, rank 3, Zenurik polarity — augment. Marks an enemy for a 49m Fangs spread
- Augur Reach, rank 5, unpolarised
- Overextended, rank 5, Vazarin polarity
- Archon Continuity, rank 10, Madurai polarity
- Archon Stretch, rank 10, Naramon polarity
- Primed Flow, rank 10, Naramon polarity
- Aura: Corrosive Projection, aura slot
- Exilus: Cunning Drift, unpolarised
- Arcanes: Arcane Crepuscular, Arcane Impetus

Arsenal figures land at roughly 139% Strength, 155% Duration, 280% Range, 45%
Efficiency, with 555 health, 370 shield, 265 armor and a 513 energy pool.

**How it works.** Identical status-taxi engine to Muzzled Wolf. Fangs of Raksh (2)
rolls five random statuses (39% chance one matches your melee); a matching strong
proc from a heavy attack, applied to a Prey of Dynar mark and killed, is averaged
with the weaker procs and spread 49m. Dynar also gives the melee a flat 100% crit
and 100% status chance. Melee Afflictions multiplies transferred DoTs
exponentially. *Confidence: Approximation, per the author.*

**Playstyle.**

1. Activate Lycath's Hunt (3), keep it up (5-status kills extend it indefinitely).
2. Press 1 to go invisible and mark an enemy with Prey of Dynar.
3. Press 2 on the marked enemy for five statuses, then heavy-attack it to death to taxi the strong procs.
4. Repeat 1 and 2 on each fresh group.

**The mods.** *Blind Rage* is the Strength. *Overextended, Augur Reach, Archon
Stretch* set the maxed Range for the Fangs spread, with Archon Stretch feeding
passive energy. *Primed Flow, Equilibrium* are the energy base fed by Lycath's
Hunt. *Archon Continuity* adds corrosive procs. *Prey of Dynar* is the 49m spread.

**Flexible slots.** Equilibrium flexes for Ulfrun's Endurance, Catalyzing Shields,
Vigorous Swap (Glaives, Contagion), Nira's Hatred (slam) or a subsume augment.

**Helminth.** Pick one. Subsume over Ulfrun's Descent (4) for a melee platform.

- **Roar** to triple-dip the Fangs status spread.
- **Wrathful Advance** for red crits.
- **Shooting Gallery** with Muzzle Flash for a map-wide blind and a 700% stealth multiplier.
- **Silence** with Savage Silence for a mobile permanent stun.

**Archon Shards.** One Tauforged cast-speed. Two Violet Equilibrium optional. Two
Violet melee crit-damage (melee focus) or corrosive ability-damage (Ulfrun focus).
Five total.

**Arcanes.** Arcane Impetus for Strength and Efficiency from Fangs, Arcane
Crepuscular for hit-and-run melees. Arcane Strike, Fury or Augmented as swaps.

**Focus.** Naramon for combo. Madurai for Strength.

**Weapon synergy.** Forced-slash-on-heavy melees for slash taxi (nikanas 5x,
scythes 6x, claws 5x); dual daggers and tonfas are best for Melee Afflictions
(two knockdowns per heavy). Or light-attack influence melees. Influence Contagion
has the strongest synergy since Dynar gives it status chance. Tenet Exec or
Sampotes for influence slam.

**Staying alive.** Invisibility on tap plus spread-status crowd control plus
Vazarin Sling. It fails to Eximus and Thrax (no blind through overguard) and to
toxin.

**Energy.** Lycath's Hunt orbs plus Equilibrium plus Arcane Impetus.

**Where it struggles.** RNG on the Fangs slash roll. Eximus and Thrax. Bosses.

**Variants.** Muzzled Wolf is the base-Voruna version. Descent of Fangs is the
Ulfrun's Descent ability build. An Arcane Persistence health-tank variant.

**Strengths and weaknesses.** Strong: map-wide clear via status taxi with a wider
spread than base Voruna, permanent crowd control, invisible, strong priming. Weak:
RNG-dependent, Eximus-awkward, boss-blind.

**Who runs this.** Players who own Voruna Prime and want the Muzzled Wolf clear
with a bigger radius and no energy-max shard needed.

---

### Solar Cataclysm
**Wisp Prime. A Cataclysmic Gate Sol Gate area nuke feeding Breach Surge sparks.**

| | |
|--|--|
| Content | Steel Path, Steel Path endurance, Level cap |
| Role | Sustained beam nuke, spark nuke, self and team buff |
| Difficulty | Intermediate |
| Investment | Medium. 3 forma, Topaz radiation shards |
| Weapon reliance | Very low. Sol Gate and its sparks do the killing |

> Tenno. The Cataclysmic Gate augment turns Sol Gate from a single beam into a
> Range-scaling area nuke. Its escalating heat procs feed Breach Surge sparks that
> scale off that damage, and Arcane Universal Fallout floods energy off the
> radiation procs. Roar, Archon Vitality and a heat-inherit primer stack the heat
> until it one-shots level cap.

**The build**

- Vigorous Swap, rank 10, unpolarised
- Archon Vitality, rank 0, unpolarised — doubles Sol Gate heat procs
- Archon Stretch, rank 10, Naramon polarity
- Cataclysmic Gate, rank 3, unpolarised — augment. Sol Gate becomes a Range-scaling area nuke
- Overextended, rank 5, Vazarin polarity
- Blind Rage, rank 10, Madurai polarity
- Primed Flow, rank 10, Naramon polarity
- Primed Continuity, rank 10, Madurai polarity
- Aura: Worthy Comradery, aura slot
- Exilus: Power Drift, unpolarised
- Arcanes: Arcane Universal Fallout, Arcane Crepuscular

Arsenal figures land at roughly 154% Strength, 155% Duration, 235% Range, 45%
Efficiency, with about 404 health, 370 shield, 210 armor and an 855 energy pool.

**How it works.** Cataclysmic Gate scales Sol Gate's area with Range and raises its
damage. Heat procs ramp over time and feed Breach Surge sparks (subsumed) that
scale off the damage that made them, past the 5-million cap via Roar, Vigorous
Swap (2.65x), Arcane Crepuscular (+3 flat crit damage while invisible) and Worthy
Comradery (75% crit chance on headshots). Arcane Universal Fallout floods energy
off Sol Gate's radiation. *Confidence: Approximation, per the author's spark math.*

**How to maximise the heat.** Roar (double-dips heat), Haste mote corrosive strip,
a heat-inherit primer (~3.25x), 10 viral (4.25x), Health and Shock motes (1.25x),
Archon Vitality (doubles procs), and five Tauforged Topaz radiation ability-damage
shards (1.75x).

**Playstyle.** Plant motes, keep Roar (subsumed over Sol Gate's slot's
counterpart) or a buff up, cast Breach Surge, then hold Sol Gate over the enemy
area and let the ramp and sparks do the work.

**The mods.** *Blind Rage* is the Strength. *Overextended, Archon Stretch* set the
Range, with Archon Stretch feeding energy. *Cataclysmic Gate* is the area nuke.
*Rank 0 Archon Vitality* doubles heat procs. *Vigorous Swap* multiplies the sparks.
*Primed Continuity* holds mote and buff Duration. *Worthy Comradery* aura raises
spark crit.

**Helminth.** **Breach Surge** is the spark engine. **Roar** as the buff subsume if
you route Breach Surge elsewhere.

**Archon Shards.** Five Tauforged Topaz radiation ability-damage for the heat
multiplier. Or split with cast-speed and parkour. Five total.

**Arcanes.** Arcane Universal Fallout for the energy flood, Arcane Crepuscular for
the spark crit-damage add while airborne-invisible.

**Focus.** Any. Madurai for Strength.

**Weapon synergy.** A heat-inherit primer (Epitaph, Kuva Nukor, Kompressa)
multiplies Sol Gate's heat procs. Shock motes inherit Manifold Bond on a companion
weapon for a Contagious Bond heat-spread feedback loop with Roar.

**Staying alive.** Mote invisibility and shield gating as in Ravenous Wraith, plus
Sol Gate's own crowd control. It fails to toxin.

**Energy.** Arcane Universal Fallout plus Archon Stretch. A flood while Sol Gate is
up.

**Where it struggles.** Sol Gate roots you while channelling. Line-of-sight tiles.
Bosses. The heat-inherit setup is a real chore for the ceiling.

**Variants.** The Ravenous Wraith build is the general mote-and-Breach-Surge Wisp.

**Strengths and weaknesses.** Strong: a strong sustained area nuke, huge spark
potential, floods its own energy, keeps the team buffs. Weak: channel roots you,
line-of-sight limited, setup-heavy, boss-blind.

**Who runs this.** Players who want Wisp's Sol Gate to actually nuke and will stack
the heat multipliers to get there.

---

### Mightiest Motes
**Wisp Prime. A pure support build stacking Strength past 500% for maximum mote buffs.**

| | |
|--|--|
| Content | Steel Path, Support |
| Role | Maximum-strength Reservoir mote buffs for a squad |
| Difficulty | Beginner |
| Investment | Medium. 4 forma |
| Weapon reliance | Total. Wisp only buffs; the squad and your weapon do everything |

> Tenno. This Wisp does one thing: push ability Strength as high as it goes so the
> Haste, Vitality and Shock motes hand the squad the biggest possible buffs.
> Brightbonnet subsumed over Sol Gate adds Strength and energy while you bounce on
> it, and the conditional stack of Archon Intensify, Molt Vigor, Madurai and
> shards reaches 548% on demand.

**The build**

- Amar's Hatred, rank 5, unpolarised
- Transient Fortitude, rank 10, Madurai polarity
- Energy Conversion, rank 5, Madurai polarity
- Archon Stretch, rank 10, Naramon polarity
- Narrow Minded, rank 10, Vazarin polarity
- Blind Rage, rank 10, Madurai polarity
- Augur Secrets, rank 5, unpolarised
- Archon Intensify, rank 10, Madurai polarity
- Aura: Growing Power, aura slot
- Exilus: Power Drift, unpolarised
- Arcanes: Molt Augmented, Arcane Bellicose

Arsenal figures land at roughly 338% Strength on the arsenal screen (climbing to
~548% with Archon Intensify, Molt Vigor and conditionals), 172% Duration, 79%
Range, 45% Efficiency, with 370 health, 370 shield, ~263 armor and a 300 energy
pool.

**How it works.** The arsenal shows 338%, but Archon Intensify adds 30% on heal,
Molt Vigor adds 45% after an Operator ability, and Madurai (40%), Power Drain
(50%), Pax Bolt (30%) and shards (up to 75%) stack for ~548% on demand, or ~743%
with every conditional, or ~951% after a Nidus specter link. Every point of that
scales the mote buffs. *Confidence: Approximation, per the author, who notes
several sources are not shown on the arsenal screen.*

**Playstyle.**

1. Plant one of each Reservoir.
2. Bounce on Brightbonnet (subsumed) for Strength and energy while staying invisible via the passive.
3. Snapshot the conditional Strength stack, then place high-value motes for the squad.
4. Refresh motes; they have infinite duration so on a static point you place them once.

**The mods.** *Blind Rage, Transient Fortitude, Augur Secrets, Archon Intensify*
are the Strength stack. *Narrow Minded* is the Duration with its Range cost free.
*Energy Conversion* snapshots more Strength. *Archon Stretch* feeds passive energy.
*Growing Power* aura and *Power Drift* exilus add Strength.

**Helminth.** **Brightbonnet** over Sol Gate (4) for Strength and energy while
bouncing.

**Archon Shards.** Five Tauforged Crimson strength (up to 75%). Or split with
cast-speed. Five total.

**Arcanes.** Molt Augmented and Arcane Bellicose for Strength. Molt Vigor as a
conditional swap.

**Focus.** Madurai for the 40% Strength.

**Weapon synergy.** None from the frame. Bring whatever kills; the motes carry the
squad.

**Staying alive.** Wisp's airborne invisibility plus the Brightbonnet bounce. This
build has no gate and thin defense; stay in the air. It fails to focused fire and
toxin.

**Energy.** Brightbonnet plus Archon Stretch plus Energy Conversion. Thin without
them.

**Where it struggles.** It does no damage. It is a pure team-buff frame for
coordinated squads; solo it is just an invisible mote dispenser. Bosses.

**Variants.** The Ravenous Wraith build is the self-sufficient survivor-and-buffer
Wisp.

**Strengths and weaknesses.** Strong: the largest mote buffs possible, invisible,
simple. Weak: zero damage, fragile, only shines in a coordinated squad.

**Who runs this.** Players buffing a premade squad who want every mote at its
theoretical maximum.

---
