import type { Selection } from './types';

export class BetSlip {
	selections = $state<Selection[]>([]);
	stake = $state<number>(10);

	totalOdds = $derived.by(() => {
		if (this.selections.length === 0) return 0;
		return this.selections.reduce((acc, curr) => acc * curr.odd.odd_value, 1);
	});

	potentialPayout = $derived(this.totalOdds * this.stake);

	toggle(selection: Selection) {
		const existingIndex = this.selections.findIndex(
			(s) => s.odd.event_odd_id === selection.odd.event_odd_id
		);

		if (existingIndex !== -1) {
			// Remove if already selected
			this.selections.splice(existingIndex, 1);
		} else {
			// Enforce: Max 1 outcome per market per match
			// Find if there's already a selection for this match and market
			const conflictIndex = this.selections.findIndex(
				(s) =>
					s.match.id === selection.match.id &&
					s.market.id === selection.market.id
			);

			if (conflictIndex !== -1) {
				// Replace the existing selection in the same market
				this.selections[conflictIndex] = selection;
			} else {
				// Add new selection
				this.selections.push(selection);
			}
		}
	}

	clear() {
		this.selections = [];
	}

	remove(oddId: number) {
		this.selections = this.selections.filter((s) => s.odd.event_odd_id !== oddId);
	}
}

// Singleton instance for the app
export const betSlip = new BetSlip();
