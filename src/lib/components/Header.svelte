<script lang="ts">
	let { } = $props();
</script>

<header class="bg-background-surface border-b border-white/5 px-4 h-16 flex items-center justify-between sticky top-0 z-50">
	<div class="flex items-center gap-8">
		<div class="flex items-center gap-2">
			<div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-500/20">
				S
			</div>
			<span class="font-bold text-xl tracking-tight hidden md:block">SPORTSBOOK</span>
		</div>
		
		<nav class="hidden lg:flex items-center gap-2">
			<button class="px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-full text-sm font-medium border border-emerald-500/20">Home</button>
			<button class="px-4 py-2 hover:bg-white/5 transition-colors rounded-full text-sm font-medium text-text-secondary hover:text-white">Live</button>
			<button class="px-4 py-2 hover:bg-white/5 transition-colors rounded-full text-sm font-medium text-text-secondary hover:text-white">Aviator</button>
			<button class="px-4 py-2 hover:bg-white/5 transition-colors rounded-full text-sm font-medium text-text-secondary hover:text-white">Crash</button>
			<button class="px-4 py-2 hover:bg-white/5 transition-colors rounded-full text-sm font-medium text-text-secondary hover:text-white">League</button>
		</nav>
	</div>

	<div class="flex items-center gap-4">
		<button class="hidden sm:block text-sm font-medium text-text-secondary hover:text-white transition-colors">Login</button>
		<button class="bg-emerald-500 hover:bg-emerald-600 px-6 py-2 rounded-lg text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all active:scale-95">
			JOIN NOW
		</button>
	</div>
</header>
