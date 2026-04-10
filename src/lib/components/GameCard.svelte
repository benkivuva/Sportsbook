<script lang="ts">
	import type { Match, Market } from '$lib/types';
	import OddButton from './OddButton.svelte';

	let { match } = $props<{ match: Match }>();

	const market1x2 = $derived(match.markets.find((m: Market) => m.sub_type_id === 1));
	const marketDC = $derived(match.markets.find((m: Market) => m.sub_type_id === 10));
	const marketGG = $derived(match.markets.find((m: Market) => m.sub_type_id === 29));

	const formattedTime = $derived(new Date(match.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
	const formattedDate = $derived(new Date(match.start_time).toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' }));
</script>

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
					<h3 class="font-bold text-lg md:text-xl">{match.home_team}</h3>
					<span class="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">LIVE</span>
				</div>
				<h3 class="font-bold text-lg md:text-xl">{match.away_team}</h3>
			</div>
			
			<div class="flex items-center gap-3 text-xs text-text-muted font-medium">
				<span class="flex items-center gap-1">🕒 {formattedTime}</span>
				<span class="flex items-center gap-1">📅 {formattedDate}</span>
			</div>
		</div>

		<!-- Markets Grid (Horizontal Scroller on Mobile) -->
		<div class="w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
			<div class="flex items-center gap-6 min-w-max">
				<!-- 1x2 Market -->
				{#if market1x2}
					<div class="flex flex-col gap-1.5">
						<span class="text-[10px] text-text-muted font-black uppercase text-center mb-1">1X2</span>
						<div class="flex gap-1">
							{#each market1x2.odds as odd}
								<OddButton {odd} {match} market={market1x2} />
							{/each}
						</div>
					</div>
				{/if}

				<!-- Double Chance Market -->
				{#if marketDC}
					<div class="flex flex-col gap-1.5">
						<span class="text-[10px] text-text-muted font-black uppercase text-center mb-1">Double Chance</span>
						<div class="flex gap-1">
							{#each marketDC.odds as odd}
								<OddButton {odd} {match} market={marketDC} />
							{/each}
						</div>
					</div>
				{/if}

				<!-- GG/NG Market -->
				{#if marketGG}
					<div class="flex flex-col gap-1.5">
						<span class="text-[10px] text-text-muted font-black uppercase text-center mb-1">GG/NG</span>
						<div class="flex gap-1">
							{#each marketGG.odds as odd}
								<OddButton {odd} {match} market={marketGG} />
							{/each}
						</div>
					</div>
				{/if}

				<!-- More Markets Placeholder -->
				<button class="flex flex-col items-center justify-center p-2 rounded hover:bg-white/5 transition-colors group self-end">
					<span class="text-[10px] font-bold text-text-muted mb-1">{match.total_markets}+</span>
					<span class="text-xs font-bold text-text-secondary group-hover:text-white uppercase">More</span>
				</button>
			</div>
		</div>
	</div>
</article>
