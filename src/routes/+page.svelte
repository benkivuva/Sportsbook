<script lang="ts">
	import GameCard from '$lib/components/GameCard.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let { data } = $props<{ data: PageData }>();
	let isLoading = $state(false);
</script>

<div class="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
	<!-- Hero Banner (Inspired by design) -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
		<div class="bg-gradient-to-br from-indigo-900 to-indigo-700 rounded-2xl p-6 flex items-center justify-between border border-white/10 relative overflow-hidden group cursor-pointer shadow-2xl">
			<div class="relative z-10 flex flex-col gap-2">
				<p class="text-[10px] font-black uppercase tracking-widest text-indigo-200">Sports welcome bonus.</p>
				<h2 class="text-3xl font-black text-white leading-tight">100% up to £50<br/>on first deposit.</h2>
			</div>
			<div class="absolute right-0 bottom-0 opacity-20 transform translate-y-4 translate-x-4 transition-transform group-hover:scale-110">⚽</div>
		</div>
		<div class="bg-gradient-to-br from-emerald-900 to-emerald-700 rounded-2xl p-6 flex items-center justify-between border border-white/10 relative overflow-hidden group cursor-pointer shadow-2xl">
			<div class="relative z-10 flex flex-col gap-2">
				<p class="text-[10px] font-black uppercase tracking-widest text-emerald-200">Early Payout.</p>
				<h2 class="text-3xl font-black text-white leading-tight">on a 2-goal or<br/>20-point lead.</h2>
			</div>
			<div class="absolute right-0 bottom-0 opacity-20 transform translate-y-4 translate-x-4 transition-transform group-hover:scale-110">🏆</div>
		</div>
	</div>

	<!-- Main Filter Tabs -->
	<div class="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
		<button class="px-6 py-2 rounded-full font-bold text-sm bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">Highlights</button>
		<button class="px-6 py-2 rounded-full font-bold text-sm hover:bg-white/5 text-text-secondary transition-colors relative">
			Live
			<span class="absolute top-1 right-3 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
		</button>
		<button class="px-6 py-2 rounded-full font-bold text-sm hover:bg-white/5 text-text-secondary transition-colors">Upcoming</button>
	</div>

	<!-- Soccer Header -->
	<div class="flex items-center gap-3 mb-4 p-3 bg-white/5 rounded-lg border border-white/5">
		<span class="text-xl">⚽</span>
		<h2 class="font-black italic text-lg uppercase tracking-tight">Soccer</h2>
	</div>

	<!-- Game Feed -->
	{#if isLoading}
		<div class="flex flex-col gap-4">
			{#each Array(5) as _}
				<div class="h-32 bg-background-surface rounded-xl border border-white/5 animate-pulse"></div>
			{/each}
		</div>
	{:else}
		<div class="flex flex-col gap-1" in:fade>
			{#each data.matches as match (match.parent_match_id)}
				<GameCard {match} />
			{/each}
		</div>
	{/if}
</div>
