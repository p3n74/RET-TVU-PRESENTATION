// Content for the conference presentation. Every figure, number, and claim here is
// drawn from the thesis (Pazon & Montero, June 2026) and its IEEE conference
// manuscript. No metric is invented; placeholders are not used.

export const meta = {
  title: "Resistance, schedule by schedule",
  thesisTitle:
    "Evolutionary Simulation and Prediction of Superbugs\u2019 Generational Resistance Trajectories",
  manuscriptTitle:
    "Schedule-Aware PK/PD\u2013Wright\u2013Fisher Simulation of Stenotrophomonas maltophilia Resistance Under Cyclical and Alternating Therapy",
  authors: [
    { name: "Nikolai Tristan E. Pazon" },
    { name: "Charles Vincent M. Montero" },
  ],
  date: "June 2026",
  organism: "Stenotrophomonas maltophilia",
};

export const lede =
  "Antimicrobial stewardship comparisons often hinge on how drugs are scheduled \u2014 not only which agent is used. We map YAML-defined dosing schedules to a normalized selective pressure and drive a multi-locus Wright\u2013Fisher simulator from an empirical resistance-gene panel, then read how cyclical, alternating, and combination regimens bend the resistance trajectory.";

// Burden context — figures cited from the thesis abstract (Murray et al. 2022; OECD/World Bank).
export const burden = [
  {
    value: "\u22485M",
    unit: "deaths",
    note: "associated with bacterial AMR in 2019 \u2014 the scale this work models against.",
  },
  {
    value: "3.8%",
    unit: "global GDP",
    note: "projected loss by 2050 if resistance goes unchecked.",
  },
  {
    value: "27",
    unit: "loci",
    note: "resistance-associated genes in the empirical S. maltophilia panel.",
  },
  {
    value: "463",
    unit: "isolates",
    note: "genomes initialising generation-zero prevalence.",
  },
];

export const contributions = [
  "A configurable schedule library \u2014 constant, cyclical-exponential, alternating two-drug blocks, and dual concurrent pressure \u2014 mapped to a normalized P(t) \u2208 [0, 1].",
  "Comparative trajectory analysis across four monotherapy profiles, one combination regimen, and three horizontal-gene-transfer settings on a shared genomic panel.",
  "A time-varying census extension that contrasts fixed Ne with pressure-coupled N(t) under cyclical TMP-SMX.",
  "An alternating TMP-SMX \u2194 minocycline stewardship scenario benchmarked against steady monotherapies.",
];

export type Stage = {
  id: string;
  num: string;
  kicker: string;
  title: string;
  body: string;
  figure?: { src: string; alt: string; caption: string };
  aside?: string;
};

export const stages: Stage[] = [
  {
    id: "genome",
    num: "1.0",
    kicker: "Genomic initialization",
    title: "Start from real genomes, not assumptions.",
    body: "Each simulation begins from a binary resistance-locus matrix for S. maltophilia: rows are isolates, columns are resistance-associated loci, and column means set generation-zero prevalence. The panel is heterogeneous by design \u2014 near-fixed genes coexist with rare ones \u2014 and every downstream scenario reuses the same baseline, so differences come only from schedule and transfer settings.",
    figure: {
      src: "figures/gene-prevalence.png",
      alt: "Horizontal bar chart of resistance-gene prevalence across 27 loci in 463 isolates, ranging from near-fixed (tet, sul, oxa) to rare (vim, dfr, oqx).",
      caption:
        "Observed prevalence across the 27-locus panel (n = 463 isolates). Near-fixed and rare loci coexist, fixing a shared starting point for every regimen.",
    },
    aside: "X_geno \u2014 isolates \u00d7 loci, column means = prevalence",
  },
  {
    id: "pressure",
    num: "2.0",
    kicker: "PK/PD pressure mapping",
    title: "Turn a dosing schedule into selective pressure.",
    body: "A schedule written in YAML is parsed into a normalized selective pressure P(t) \u2208 [0, 1], recomputed each generation. Cyclical-exponential TMP-SMX, for example, alternates on-blocks with first-order decay of an exposure proxy against washout-floor off-blocks. The same parser handles constant exposure, alternating blocks, and dual concurrent pressure \u2014 schedule shape becomes a first-class, auditable input.",
    figure: {
      src: "figures/pressure.png",
      alt: "Two stacked line plots over generations: top shows a sawtooth exposure proxy decaying within each cycle; bottom shows the resulting normalized pressure P(t) spiking then dropping to a washout floor.",
      caption:
        "Cyclical-exponential TMP-SMX: within-cycle decay of the exposure proxy (top) and the induced normalized pressure P(t) (bottom). PK/PD mapping only \u2014 no evolution yet.",
    },
    aside: "s\u2c7c(t) = c\u2c7c \u2212 B\u2c7c\u00b7P(t)",
  },
  {
    id: "evolve",
    num: "3.0",
    kicker: "Wright\u2013Fisher engine",
    title: "Evolve loci under selection, mutation, and drift.",
    body: "A multi-locus Wright\u2013Fisher process advances the panel generation by generation under selection, mutation, and drift at effective size Ne. Across four steady monotherapy profiles on the same panel, mean-frequency separation emerges by roughly 200\u2013400 generations, ordered by exposure intensity: high-dose levofloxacin and standard minocycline terminate above baseline, while the no-drug control and low-dose TMP-SMX settle below it.",
    figure: {
      src: "figures/monotherapy.png",
      alt: "Four-panel plot of mean resistance allele frequency over 1000 generations for Low TMP-SMX, Levofloxacin high, Minocycline, and High TMP-SMX scenarios.",
      caption:
        "Four steady monotherapy trajectories over 1000 generations. Strong exposure (levofloxacin, minocycline) drives frequency up; low TMP-SMX pressure lets it relax below baseline.",
    },
    aside: "selection + mutation + drift @ Ne = 1000",
  },
  {
    id: "schedule",
    num: "4.0",
    kicker: "Schedule structure",
    title: "Combination is not the sum of its parts.",
    body: "Simultaneous TMP-SMX + minocycline produces a trajectory that sits outside either monotherapy envelope, and alternating 75-generation blocks of each drug yield a distinct time-averaged path. Switching schedules is therefore not equivalent to running the stronger agent alone, nor to applying both at once \u2014 temporal sequencing is its own lever.",
    figure: {
      src: "figures/combination.png",
      alt: "Line plot comparing mean resistance frequency for TMP-SMX low monotherapy, minocycline monotherapy, and the TMP-SMX + minocycline combination over 1000 generations.",
      caption:
        "Combination versus component monotherapies under shared PK/PD dual pressure. The combined trajectory tracks the stronger component yet remains non-additive.",
    },
    aside: "s\u2c7c(t) = c\u2c7c \u2212 B\u2081\u2c7c\u00b7P\u2081 \u2212 B\u2082\u2c7c\u00b7P\u2082 \u2212 I\u2c7c\u00b7P\u2081P\u2082",
  },
  {
    id: "load",
    num: "5.0",
    kicker: "Frequency vs load",
    title: "Proportion and load can disagree.",
    body: "Pairing the cyclical schedule with a pressure-coupled census N(t) \u2014 extra mortality when pressure is high, logistic regrowth during washout \u2014 separates mean allele frequency from total resistance load N(t)\u00b7f\u0304(t). By generation 200, representative runs hold a similar frequency while load differs by more than 2\u00d7, because the census contracts during drug-on phases. Reporting only frequency can understate or overstate the resistance biomass.",
    figure: {
      src: "figures/load.png",
      alt: "Two stacked plots: top shows mean allele frequency for fixed Ne versus variable N(t) staying close; bottom shows resistance load diverging sharply, with the variable-N curve oscillating between ~100 and ~950.",
      caption:
        "Same per-capita selection, two census rules. Mean frequency (top) stays similar; resistance load N\u00b7f\u0304 (bottom) decouples as the census moves with pressure.",
    },
    aside: "load = N(t) \u00b7 f\u0304(t)",
  },
  {
    id: "robustness",
    num: "6.0",
    kicker: "Robustness & transfer",
    title: "The ordering survives the noise.",
    body: "Across ten seeds per scenario, the 5th\u201395th percentile bands preserve the qualitative ordering among regimen classes despite stochastic spread, and effective-size perturbations shift absolute means without erasing the low- versus high-pressure separation. Horizontal gene transfer behaves as a sensitivity bracket: realistic carriage barely moves the mean frequency relative to no transfer, with clear acceleration only under a high-transfer stress setting.",
    figure: {
      src: "figures/robustness.png",
      alt: "Cross-scenario comparison with 10-seed 5th-95th percentile ribbons for control, TMP-SMX low/high, levofloxacin high, minocycline, and combination, against a baseline line.",
      caption:
        "Ten-seed ribbons (5th\u201395th percentile) across representative scenarios. Bands overlap but the class ordering holds \u2014 the comparison is not a single-seed artifact.",
    },
    aside: "10 seeds \u00b7 5th\u201395th percentile bands",
  },
];

// Table I — terminal mean frequency across 10 seeds (steady scenarios).
export const resultsTable = {
  caption: "Terminal mean frequency across 10 seeds (steady scenarios).",
  columns: ["Scenario", "Final mean", "\u0394 vs baseline"],
  rows: [
    ["No drug (control)", "0.522", "\u22120.138"],
    ["TMP-SMX low dose", "0.558", "\u22120.102"],
    ["TMP-SMX high dose", "0.603", "\u22120.058"],
    ["Levofloxacin high dose", "0.737", "+0.077"],
    ["Minocycline standard", "0.737", "+0.077"],
    ["TMP-SMX + minocycline", "0.741", "+0.080"],
  ],
};

export const lessons = [
  {
    head: "Pressure shape is a first-class input.",
    body: "Cyclical-exponential schedules produce time-varying pressure even when peak exposure matches a steady regimen\u2019s setpoint, and trajectories integrate those selective effects over generations. Alternating blocks show temporal sequencing is not reducible to concurrent combination or to the stronger single agent.",
  },
  {
    head: "Proportion and load answer different questions.",
    body: "Under a coupled census, mean allele frequency and total resistance load can diverge. Schedule comparisons that imply a change in biomass should report both quantities \u2014 or justify a constant-census approximation \u2014 rather than reading frequency alone.",
  },
  {
    head: "Biological extensions are sensitivity brackets.",
    body: "Horizontal gene transfer and effective-size perturbations shift magnitudes while leaving the core comparative story intact across seeds. Combination pressure stays non-additive relative to its monotherapy components.",
  },
];

export const hgt = {
  alt: "Levofloxacin scenario comparing no-HGT Wright-Fisher baseline, realistic HGT, and high-transfer outbreak mean frequencies; realistic and no-HGT overlap while high-transfer rises higher.",
  caption:
    "No-HGT, realistic, and high-transfer settings on a shared PK/PD backbone. Realistic carriage overlaps the baseline; only the stress setting accelerates spread.",
};

export const limitations = [
  "P(t) is a normalized selective-intensity proxy \u2014 not a patient-level concentration or cure probability.",
  "Cyclical and alternating schedules are phenomenological configurations, not fitted to individual PK samples.",
  "The census-coupled model is illustrative rather than calibrated to in-vitro kill curves.",
  "Internal panel checks do not establish transportability to independent hospitals; external evaluation is deferred to a companion validation-focused manuscript.",
];

export const conclusion =
  "A schedule-aware PK/PD\u2013Wright\u2013Fisher framework lets cyclical exposure, alternating stewardship blocks, combination-versus-monotherapy contrasts, and frequency\u2013load decoupling be compared transparently from versioned YAML. The pipeline is positioned for in-silico regimen design \u2014 clinical deployment would require external calibration and uncertainty quantification beyond the present scope.";

export const navSections = [
  { id: "top", label: "Title" },
  { id: "burden", label: "Why" },
  { id: "pipeline", label: "Pipeline" },
  ...stages.map((s) => ({ id: s.id, label: s.num })),
  { id: "results", label: "Table" },
  { id: "discussion", label: "Lessons" },
  { id: "close", label: "Close" },
];
