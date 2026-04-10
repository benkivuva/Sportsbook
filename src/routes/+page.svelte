<script lang="ts">
	import GameCard from '$lib/components/GameCard.svelte';
	import type { PageData } from './$types';
	import type { Match } from '$lib/types';
	import { onMount } from 'svelte';
	import { ui } from '$lib/ui.svelte';
	import { fade } from 'svelte/transition';

	let { data } = $props<{ data: PageData }>();
	let isLoading = $state(false);

	const filteredMatches = $derived(
		data.matches.filter((m: Match) => 
			!ui.searchQuery || 
			m.home_team.toLowerCase().includes(ui.searchQuery.toLowerCase()) || 
			m.away_team.toLowerCase().includes(ui.searchQuery.toLowerCase())
		)
	);
</script>

<div class="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
	<!-- Hero Header -->
	<div class="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600/20 to-sky-600/20 border border-white/5 p-8 md:p-12">
		<div class="relative z-10 max-w-2xl">
			<span class="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-4">Live Betting</span>
			<h1 class="text-4xl md:text-6xl font-black mb-4 tracking-tighter leading-tight italic uppercase">Score Big on <span class="text-emerald-500">Every Match</span></h1>
			<p class="text-text-secondary text-sm md:text-lg mb-8 leading-relaxed">Join millions of fans. Experience sub-millisecond odds updates and the industry's fastest bet placement.</p>
			<button class="bg-emerald-500 hover:bg-emerald-600 px-8 py-3 rounded-xl font-bold text-white shadow-xl shadow-emerald-500/20 transition-all active:scale-95">START BETTING</button>
		</div>
		<div class="absolute right-0 bottom-0 opacity-20 transform translate-y-4 translate-x-4 transition-transform group-hover:scale-110">SPORTS</div>
	</div>

	<!-- Filter Tabs -->
	<div class="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
		<button class="bg-emerald-500 text-white px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap">Soccer ({filteredMatches.length})</button>
		<button class="bg-white/5 text-text-muted px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap hover:bg-white/10 transition-colors">Basketball</button>
		<button class="bg-white/5 text-text-muted px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap hover:bg-white/10 transition-colors">Tennis</button>
		<button class="bg-white/5 text-text-muted px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap hover:bg-white/10 transition-colors">Esports</button>
	</div>

	<!-- Game Feed -->
	{#if isLoading}
		<div class="flex flex-col gap-4">
			{#each Array(5) as _}
				<div class="h-32 bg-background-surface rounded-xl border border-white/5 animate-pulse"></div>
			{/each}
		</div>
	{:else if filteredMatches.length > 0}
		<div class="flex flex-col gap-1" in:fade>
			{#each filteredMatches as match (match.parent_match_id)}
				<GameCard {match} />
			{/each}
		</div>
	{:else}
		<div class="bg-background-surface border border-white/5 rounded-2xl p-12 text-center flex flex-col items-center justify-center" in:fade>
			<h3 class="font-bold text-lg mb-1">{ui.searchQuery ? `No results for "${ui.searchQuery}"` : 'No matches available'}</h3>
			<p class="text-sm text-text-muted max-w-xs">
				{ui.searchQuery ? 'Try searching for another team or clear the filter.' : 'There are no live or upcoming matches at this moment.'}
			</p>
			{#if ui.searchQuery}
				<button 
					onclick={() => ui.searchQuery = ''}
					class="mt-6 text-sm font-bold text-emerald-500 hover:text-emerald-400 transition-colors"
				>
					Clear Search
				</button>
			{:else}
				<button 
					onclick={() => window.location.reload()}
					class="mt-6 text-sm font-bold text-emerald-500 hover:text-emerald-400 transition-colors"
				>
					Refresh Feed
				</button>
			{/if}
		</div>
	{/if}
</div>
