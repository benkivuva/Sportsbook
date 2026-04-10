<script lang="ts">
	import { betSlip } from '$lib/betSlip.svelte';
	import type { Odd, Match, Market } from '$lib/types';

	let { odd, match, market } = $props<{
		odd: Odd,
		match: Match,
		market: Market
	}>();

	let isSelected = $derived(
		betSlip.selections.some((s) => s.odd.event_odd_id === odd.event_odd_id)
	);

	function handleToggle() {
		betSlip.toggle({
			odd,
			match: {
				id: match.parent_match_id,
				home_team: match.home_team,
				away_team: match.away_team
			},
			market: {
				id: market.sub_type_id,
				name: market.name
			}
		});
	}
</script>

<button
	class="flex flex-col items-center justify-center p-2 rounded border border-white/5 transition-all active:scale-95 {isSelected ? 'bg-emerald-500 border-emerald-400 shadow-lg shadow-emerald-500/20' : 'bg-background-deep hover:bg-background-surface-light hover:border-white/10'}"
	onclick={handleToggle}
	aria-pressed={isSelected}
>
	<span class="text-[10px] font-bold uppercase {isSelected ? 'text-white' : 'text-text-muted'} mb-1">
		{odd.outcome_name}
	</span>
	<span class="text-xs font-black tracking-tight {isSelected ? 'text-white' : 'text-emerald-500'}">
		{odd.odd_value.toFixed(2)}
	</span>
</button>
