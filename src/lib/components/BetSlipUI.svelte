<script lang="ts">
	import { betSlip } from '$lib/betSlip.svelte';
	import { ui } from '$lib/ui.svelte';
	import { fly, fade } from 'svelte/transition';

	let { isMobile = false } = $props<{ isMobile?: boolean }>();

	let stakeInput = $state(betSlip.stake.toString());

	function handlePlaceBet() {
		// Mock bet placement
		ui.showToast(`BET PLACED: $${betSlip.potentialPayout.toLocaleString()}`);
		betSlip.clear();
		if (isMobile) {
			ui.closeBetSlip();
		}
	}

	function addStake(amount: number) {
		const current = parseFloat(stakeInput) || 0;
		stakeInput = (current + amount).toString();
	}

	// Senior Touch: Input Synchronization
	$effect(() => {
		const val = parseFloat(stakeInput);
		if (!isNaN(val)) {
			betSlip.stake = val;
		}
	});

	// Sync local stakeInput when global betSlip.stake changes (e.g. from persistence)
	$effect(() => {
		stakeInput = betSlip.stake.toString();
	});

	function handleRemove(oddId: number) {
		const s = betSlip.selections.find(s => s.odd.event_odd_id === oddId);
		if (s) betSlip.toggle(s);
	}

	function handleClear() {
		betSlip.selections = [];
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
		<div class="flex items-center gap-4">
			<button 
				onclick={handleClear}
				class="text-[10px] font-bold text-text-muted hover:text-red-400 uppercase transition-colors"
				disabled={betSlip.selections.length === 0}
			>
				Clear All
			</button>
			{#if isMobile}
				<button 
					onclick={() => ui.closeBetSlip()}
					class="text-text-muted hover:text-white transition-colors"
				>
					✕
				</button>
			{/if}
		</div>
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
				class="bg-background-deep p-4 rounded-xl border border-white/5 relative group hover:border-emerald-500/20 transition-all shadow-lg"
			>
				<button 
					onclick={() => handleRemove(selection.odd.event_odd_id)}
					class="absolute top-3 right-3 text-text-muted hover:text-red-400 p-1 rounded-full hover:bg-red-400/10 transition-all opacity-0 group-hover:opacity-100"
				>
					✕
				</button>
				
				<div class="flex flex-col gap-3 pr-4">
					<div class="flex flex-col gap-0.5">
						<span class="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{selection.market.name}</span>
						<h4 class="font-bold text-sm text-white leading-snug">
							{selection.match.home_team} <span class="text-text-muted">vs</span> {selection.match.away_team}
						</h4>
					</div>

					<div class="flex items-center justify-between mt-1 bg-white/5 p-2 rounded-lg border border-white/5">
						<div class="flex flex-col">
							<span class="text-[10px] text-text-muted uppercase font-bold">Your Pick</span>
							<span class="font-black text-white text-sm uppercase italic">{selection.odd.outcome_name}</span>
						</div>
						<div class="bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20">
							<span class="font-black text-emerald-500 italic text-lg">{selection.odd.odd_value.toFixed(2)}</span>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<div class="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-20" in:fade>
				<p class="text-sm font-black uppercase tracking-widest">Empty Betslip</p>
				<p class="text-[10px] mt-1 text-text-muted uppercase">Add selections to build your ticket</p>
			</div>
		{/each}
	</div>

	<!-- Summary Footer -->
	{#if betSlip.selections.length > 0}
		<div class="p-4 bg-background-deep border-t border-white/10" transition:fly={{ y: 20 }}>
			<div class="bg-background-surface rounded-2xl border border-white/10 p-4 shadow-2xl flex flex-col gap-4">
				<div class="space-y-3">
					<div class="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-text-muted px-1">
						<span>Ticket Odds</span>
						<span class="text-white italic text-sm">{betSlip.totalOdds.toFixed(2)}</span>
					</div>
					
					<div class="flex flex-col gap-3 bg-white/5 p-4 rounded-xl border border-white/10 group focus-within:border-emerald-500/50 transition-colors">
						<div class="flex items-center justify-between">
							<span class="text-[10px] font-black uppercase tracking-widest text-text-muted">Stake</span>
							<div class="flex items-center gap-1">
								<span class="text-xs text-text-muted font-bold">$</span>
								<input 
									type="text" 
									bind:value={stakeInput}
									class="w-24 bg-transparent text-right font-black text-xl text-white focus:outline-none"
								/>
							</div>
						</div>
						<!-- Quick Stake Buttons -->
						<div class="flex gap-2">
							{#each [10, 50, 100] as amount}
								<button 
									onclick={() => addStake(amount)}
									class="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/20 text-[10px] font-black text-text-muted hover:text-emerald-500 transition-all uppercase"
								>
									+${amount}
								</button>
							{/each}
						</div>
					</div>

					<div class="flex items-center justify-between bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10">
						<span class="text-[10px] font-black uppercase tracking-widest text-emerald-500/70">Potential Payout</span>
						<span class="font-black text-2xl text-emerald-500 italic">
							${betSlip.potentialPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
						</span>
					</div>
				</div>

				<!-- Action Button -->
				<button 
					onclick={handlePlaceBet}
					disabled={betSlip.selections.length === 0 || betSlip.stake <= 0}
					class="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl transition-all active:scale-95 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed
					{betSlip.potentialPayout > 10000 ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/30' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30'} text-white"
				>
					{#if betSlip.selections.length === 0}
						Select an outcome
					{:else if betSlip.stake <= 0}
						Enter a stake
					{:else}
						Place Bet
					{/if}
				</button>
				
				<p class="text-[9px] text-center text-text-muted leading-tight uppercase font-bold px-2">
					By placing this bet, you agree to our <span class="text-text-secondary">Terms</span> and <span class="text-text-secondary">Privacy Policy</span>.
				</p>
			</div>
		</div>
	{/if}
</div>
