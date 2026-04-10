<script lang="ts">
	import { ui } from '$lib/ui.svelte';
	import { fly } from 'svelte/transition';
</script>

{#if ui.toast}
	<div 
		class="fixed top-6 left-1/2 -translate-x-1/2 z-[200] pointer-events-none"
		transition:fly={{ y: -50, duration: 400 }}
	>
		<div class="bg-background-deep border border-emerald-500/20 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md">
			<div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
			<span class="text-sm font-black uppercase tracking-wider text-white">
				{ui.toast.message}
			</span>
		</div>
	</div>
{/if}
