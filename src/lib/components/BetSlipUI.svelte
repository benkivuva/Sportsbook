<script lang="ts">
	import { betSlip } from '$lib/betSlip.svelte';
	import { fly, fade } from 'svelte/transition';

	let stakeInput = $state(betSlip.stake.toString());

	// Senior Touch: Persistence & Synchronization
	$effect(() => {
		const val = parseFloat(stakeInput);
		if (!isNaN(val)) {
			betSlip.stake = val;
		}
	});

	// Load initial state from local storage
	$effect(() => {
		const saved = localStorage.getItem('sportsbook_slip');
		if (saved) {
			try {
				const { selections, stake } = JSON.parse(saved);
				betSlip.selections = selections;
				betSlip.stake = stake;
				stakeInput = stake.toString();
			} catch (e) {
				console.error('Failed to restore betslip', e);
			}
		}
	});

	// Auto-save changes
	$effect(() => {
		localStorage.setItem('sportsbook_slip', JSON.stringify({
			selections: betSlip.selections,
			stake: betSlip.stake
		}));
	});

	function handleRemove(oddId: number) {
		betSlip.remove(oddId);
	}

	function handleClear() {
		betSlip.clear();
	}
</script>

<div class="flex flex-col h-full bg-background-surface">
	<!-- Header -->
	<div class="p-4 flex items-center justify-between border-b border-white/5">
		<div class="flex items-center gap-2">
			<h2 class="font-bold text-sm tracking-widest uppercase">Betslip</h2>
			<span class="bg-sky-600/20 text-sky-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
				{betSlip.selections.length}
			</span>
		</div>
		<button 
			onclick={handleClear}
			class="text-[10px] font-bold text-text-muted hover:text-red-400 uppercase transition-colors"
			disabled={betSlip.selections.length === 0}
		>
			Clear All
		</button>
	</div>

	<!-- Selector Tabs -->
	<div class="flex border-b border-white/5">
		<button class="flex-1 py-3 text-[10px] font-bold uppercase border-b-2 border-sky-500 text-white">Single/Multi ({betSlip.selections.length})</button>
		<button class="flex-1 py-3 text-[10px] font-bold uppercase text-text-muted hover:text-white transition-colors">System</button>
	</div>

	<!-- Selection List -->
	<div class="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
		{#each betSlip.selections as selection (selection.odd.event_odd_id)}
			<div 
				transition:fly={{ x: 20, duration: 300 }}
				class="bg-background-deep p-3 rounded-lg border border-white/5 relative group"
			>
				<button 
					onclick={() => handleRemove(selection.odd.event_odd_id)}
					class="absolute top-2 right-2 text-text-muted hover:text-red-400 transition-colors"
				>
					✕
				</button>
				
				<div class="flex flex-col gap-1 pr-6">
					<span class="text-[10px] font-bold text-emerald-500 uppercase">{selection.market.name}</span>
					<div class="flex items-center justify-between">
						<span class="font-bold text-sm">{selection.odd.outcome_name}</span>
						<span class="font-black text-white italic">{selection.odd.odd_value.toFixed(2)}</span>
					</div>
					<div class="text-[10px] text-text-muted">
						{selection.match.home_team} vs {selection.match.away_team}
					</div>
				</div>
			</div>
		{:else}
			<div class="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-20" in:fade>
				<div class="text-4xl mb-4">🎫</div>
				<p class="text-sm font-medium">Your betslip is empty</p>
				<p class="text-xs mt-1">Select odds to start betting</p>
			</div>
		{/each}
	</div>

	<!-- Summary Footer -->
	{#if betSlip.selections.length > 0}
		<div class="p-4 bg-background-deep border-t border-white/10 flex flex-col gap-4" transition:fly={{ y: 20 }}>
			<div class="flex flex-col gap-2">
				<div class="flex items-center justify-between text-xs">
					<span class="text-text-secondary">Total Odds</span>
					<span class="font-black italic text-lg text-white">{betSlip.totalOdds.toFixed(2)}</span>
				</div>
				
				<div class="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/10 group focus-within:border-emerald-500/50 transition-colors">
					<span class="text-xs font-bold uppercase text-text-muted">Stake</span>
					<div class="flex items-center gap-1">
						<span class="text-xs text-text-muted font-bold">$</span>
						<input 
							type="text" 
							bind:value={stakeInput}
							class="w-20 bg-transparent text-right font-black text-white focus:outline-none"
						/>
					</div>
				</div>

				<div class="flex items-center justify-between text-xs px-1">
					<span class="text-text-secondary">Potential Payout</span>
					<span class="font-black text-lg text-emerald-500">${betSlip.potentialPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
				</div>
			</div>

			<!-- Action Button -->
			<div class="p-4 border-t border-white/5 space-y-3">
				<div class="flex items-center justify-between text-xs text-text-muted">
					<span>Commission (0%)</span>
					<span>$0.00</span>
				</div>
				
				<button 
					disabled={betSlip.selections.length === 0 || betSlip.stake <= 0}
					class="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-2xl transition-all active:scale-95 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed
					{betSlip.potentialPayout > 10000 ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20'} text-white"
				>
					{#if betSlip.selections.length === 0}
						Select an outcome
					{:else if betSlip.stake <= 0}
						Enter a stake
					{:else}
						Place Bet (${betSlip.potentialPayout.toLocaleString()})
					{/if}
				</button>
				
				<p class="text-[10px] text-center text-text-muted leading-relaxed">
					By clicking Place Bet, you agree to our Terms of Service. Odds are subject to change until confirmed.
				</p>
			</div>
		</div>
	{/if}
</div>
