# High-Performance Svelte 5 Sportsbook

A premium, "compiler-first" Sportsbook landing page built to senior technical specifications. This application prioritizes sub-millisecond interaction times and memory-safe reactivity using Svelte 5 Runes.

## Key Technical Features

### 1. The "Runes" Reactivity Engine
Utilizing Svelte 5's `$state`, `$derived`, and `$effect` primitives to go beyond the Virtual DOM. All odds calculations, potential payouts, and ticket aggregations happen in a single pass with zero re-rendering overhead.

### 2. Professional Betting Logic (Related Contingencies)
The `BetSlip` engine is mathematically optimized to handle **Related Contingencies**.
- **Industry Standard**: Enforces a "1 selection per match" constraint for standard accumulators to protect market edge.
- **Smart Replacement**: Intelligently swaps selections within the same match, providing a seamless UX for the user.

### 3. Financial-Grade Precision
JavaScript floating-point math is notoriously imprecise for currency. This project utilizes an `EPSILON`-aware rounding strategy at the state level to ensure all odds and payouts are 100% accurate to two decimal places.

### 4. Mobility-First Architecture
- **Adaptive Drawer**: On mobile, the BetSlip transitions into a professional "bottom sheet" drawer for review and placement.
- **Passive Scrollers**: Market grids use native passive listeners to maintain 60fps scrolling on touch devices.

### 5. Resilience Layers
- **Custom Error Boundaries**: Implemented `+error.svelte` to catch and manage data parsing failures without crashing the experience.
- **Empty State Logic**: Comprehensive "No Matches" and "Search Unavailable" views ensure the user is never left with a blank screen.

##  Tech Stack
- **Framework**: SvelteKit 5 (Next-Gen)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript (Strict Mode)
- **State**: Class-based Service Pattern with Svelte Runes

##  Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Run Svelte Check for types
npx svelte-check
```

##  Architecture Overview
```
src/
├── lib/
│   ├── betSlip.svelte.ts  # Core betting logic (Runes class)
│   ├── ui.svelte.ts       # Global UI state & toggles
│   ├── types.ts           # Strict data contract definitions
│   └── components/        # High-performance UI fragments
└── routes/
    ├── +layout.svelte     # Sidebars & Mobile Drawer logic
    ├── +page.svelte       # Live Match Feed & Team Search
    └── +error.svelte      # "Senior Level" Error Boundary
```

---
*Developed with a focus on sub-millisecond FCP and memory-efficient reactivity.*
