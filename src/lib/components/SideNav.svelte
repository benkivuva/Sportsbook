<script lang="ts">
	import { ui } from '$lib/ui.svelte';

	const menuItems = [
		{ name: 'My Bets' },
		{ name: 'Profile' },
		{ name: 'Chat us' },
		{ name: 'Join Affiliate' },
		{ name: 'Promos' }
	];

	const topGames = [
		{ name: 'Aviator', color: 'bg-red-600' },
		{ name: 'JetX', color: 'bg-blue-600' },
		{ name: 'Navigator', color: 'bg-gray-800' }
	];
</script>

<aside class="hidden lg:flex flex-col w-64 bg-background-surface border-r border-white/5 h-[calc(100vh-64px)] overflow-y-auto sticky top-16">
	<div class="p-4">
		<div class="relative">
			<input 
				type="text" 
				placeholder="Search by team..." 
				bind:value={ui.searchQuery}
				class="w-full bg-background-deep border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
			/>
			<span class="absolute left-3 top-2.5 text-text-muted text-[10px]">SEARCH</span>
		</div>
	</div>

	<div class="px-2 grid grid-cols-3 gap-1 mb-8">
		{#each menuItems as item}
			<button class="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 transition-colors group">
				<span class="text-[10px] uppercase font-bold text-text-muted group-hover:text-text-secondary">{item.name}</span>
			</button>
		{/each}
	</div>

	<div class="px-4 mb-8">
		<h3 class="text-[10px] uppercase font-bold text-text-muted mb-4 tracking-widest">Top Games</h3>
		<div class="flex flex-col gap-2">
			{#each topGames as game}
				<div class="{game.color} p-4 rounded-xl font-black italic text-xl flex items-center justify-center shadow-lg border border-white/10 relative overflow-hidden group cursor-pointer">
					<div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
					{game.name}
				</div>
			{/each}
		</div>
	</div>

	<div class="px-4">
		<h3 class="text-[10px] uppercase font-bold text-text-muted mb-4 tracking-widest">Top Leagues</h3>
		<div class="flex flex-col gap-1">
			<button class="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-sm text-text-secondary hover:text-white transition-colors">
				LaLiga
			</button>
			<button class="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-sm text-text-secondary hover:text-white transition-colors">
				Premier League
			</button>
			<button class="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-sm text-text-secondary hover:text-white transition-colors">
				Bundesliga
			</button>
		</div>
	</div>
</aside>
