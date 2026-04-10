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
			this.selections.splice(existingIndex, 1);
		} else {
			const conflictIndex = this.selections.findIndex(
				(s) =>
					s.match.id === selection.match.id &&
					s.market.id === selection.market.id
			);

			if (conflictIndex !== -1) {
				this.selections[conflictIndex] = selection;
			} else {
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

export const betSlip = new BetSlip();
