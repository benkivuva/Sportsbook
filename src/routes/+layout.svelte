<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import SideNav from '$lib/components/SideNav.svelte';
	import BetSlipUI from '$lib/components/BetSlipUI.svelte';
	import { betSlip } from '$lib/betSlip.svelte';
	import './layout.css';

	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col">
	<Header />
	
	<div class="flex flex-1 relative">
		<!-- Left Sidebar (Desktop) -->
		<SideNav />

		<!-- Main Content (Feed) -->
		<main class="flex-1 overflow-x-hidden">
			{@render children()}
		</main>

		<!-- Right Sidebar (BetSlip - Desktop) -->
		<aside class="hidden xl:block w-80 border-l border-white/5 h-[calc(100vh-64px)] overflow-y-auto sticky top-16 bg-background-surface">
			<BetSlipUI />
		</aside>
	</div>

	<!-- Mobile Bottom Nav / BetSlip Bar -->
	<div class="lg:hidden fixed bottom-0 left-0 right-0 bg-background-surface border-t border-white/10 p-3 z-50 flex items-center justify-between">
		<button class="flex flex-col items-center gap-1">
			<span class="text-xl">🏠</span>
			<span class="text-[10px] font-bold uppercase text-emerald-500">Home</span>
		</button>
		<button class="flex flex-col items-center gap-1 opacity-50">
			<span class="text-xl">📊</span>
			<span class="text-[10px] font-bold uppercase">Live</span>
		</button>
		<button class="bg-emerald-500 px-6 py-2 rounded-full font-bold text-sm shadow-lg -mt-8 border-4 border-background-deep relative">
			BETSLIP
			{#if betSlip.selections.length > 0}
				<span class="absolute -top-1 -right-1 bg-white text-emerald-600 rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-lg font-black animate-bounce">
					{betSlip.selections.length}
				</span>
			{/if}
		</button>
		<button class="flex flex-col items-center gap-1 opacity-50">
			<span class="text-xl">🎮</span>
			<span class="text-[10px] font-bold uppercase">Games</span>
		</button>
		<button class="flex flex-col items-center gap-1 opacity-50">
			<span class="text-xl">👤</span>
			<span class="text-[10px] font-bold uppercase">Profile</span>
		</button>
	</div>
</div>
