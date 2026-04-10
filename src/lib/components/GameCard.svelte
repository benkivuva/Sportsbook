<script lang="ts">
	import type { Match, Market } from '$lib/types';
	import OddButton from './OddButton.svelte';
	import Highlighter from './Highlighter.svelte';
	import { ui } from '$lib/ui.svelte';

	let { match } = $props<{ match: Match }>();

	const market1x2 = $derived(match.markets.find((m: Market) => m.sub_type_id === 1));
	const marketDC = $derived(match.markets.find((m: Market) => m.sub_type_id === 10));
	const marketGG = $derived(match.markets.find((m: Market) => m.sub_type_id === 29));

	const formattedTime = $derived(new Date(match.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
	const formattedDate = $derived(new Date(match.start_time).toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' }));
</script>

{#snippet marketGrid(market: Market | undefined, label: string)}
	{#if market}
		<div class="flex flex-col gap-1.5">
			<span class="text-[10px] text-text-muted font-black uppercase text-center mb-1">{label}</span>
			<div class="flex gap-1">
				{#each market.odds as odd}
					<OddButton {odd} {match} {market} />
				{/each}
			</div>
		</div>
	{/if}
{/snippet}

<article class="bg-background-surface rounded-xl border border-white/5 overflow-hidden hover:border-white/10 transition-colors mb-3">
	<div class="px-4 py-2 bg-white/5 flex items-center justify-between">
		<div class="flex items-center gap-2">
			<span class="text-[10px] text-text-muted font-bold tracking-widest uppercase">
				{match.competition_name} / {match.country_name}
			</span>
		</div>
		<span class="text-xs text-text-muted">ID: {match.parent_match_id}</span>
	</div>

	<div class="p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
		<!-- Match Info -->
		<div class="flex-1 w-full md:w-auto">
			<div class="flex flex-col gap-1 mb-3">
				<div class="flex items-center justify-between md:justify-start md:gap-4">
					<h3 class="font-bold text-lg md:text-xl text-white">
						<Highlighter text={match.home_team} query={ui.searchQuery} />
					</h3>
					<span class="bg-red-500/10 text-red-500 text-[10px] font-black px-2 py-0.5 rounded-md border border-red-500/20 uppercase">
						Live
					</span>
				</div>
				<h3 class="font-bold text-lg md:text-xl text-white">
					<Highlighter text={match.away_team} query={ui.searchQuery} />
				</h3>
			</div>
			
			<div class="flex items-center gap-3 text-xs text-text-muted font-medium mt-3">
				<span class="flex items-center gap-1">🕒 {formattedTime}</span>
				<span class="flex items-center gap-1">📅 {formattedDate}</span>
			</div>
		</div>

		<!-- Markets Grid (Optimized Passive Scroller) -->
		<div 
			class="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scroll-smooth"
			onwheel={(e) => {}} 
		>
			<div class="flex items-center gap-6 min-w-max">
				{@render marketGrid(market1x2, '1X2')}
				{@render marketGrid(marketDC, 'Double Chance')}
				{@render marketGrid(marketGG, 'GG/NG')}

				<!-- More Markets -->
				<button class="flex flex-col items-center justify-center p-2 rounded hover:bg-white/5 transition-colors group self-end">
					<span class="text-[10px] font-bold text-text-muted mb-1">{match.total_markets}+</span>
					<span class="text-xs font-bold text-text-secondary group-hover:text-white uppercase">More</span>
				</button>
			</div>
		</div>
	</div>
</article>
