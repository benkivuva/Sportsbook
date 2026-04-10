import { dev } from '$app/environment';
import type { Selection } from './types';

export class BetSlip {
	selections = $state<Selection[]>([]);
	stake = $state<number>(10);
	maxSelections = 30;

	constructor() {
		// Senior Tooling: Monitor state changes during development
		$inspect(this.selections).with((type, value) => {
			if (dev) {
				console.log(`[BetSlip Selections ${type}]:`, value);
			}
		});
	}

	totalOdds = $derived.by(() => {
		if (this.selections.length === 0) return 0;
		const odds = this.selections.reduce((acc, curr) => acc * curr.odd.odd_value, 1);
		// Industry Standard: Round to 2 decimal places to avoid JS floating point issues
		return Math.round((odds + Number.EPSILON) * 100) / 100;
	});

	potentialPayout = $derived.by(() => {
		const payout = this.totalOdds * this.stake;
		return Math.round((payout + Number.EPSILON) * 100) / 100;
	});

	toggle(selection: Selection) {
		const existingIndex = this.selections.findIndex(
			(s) => s.odd.event_odd_id === selection.odd.event_odd_id
		);

		if (existingIndex !== -1) {
			this.selections.splice(existingIndex, 1);
		} else {
			// PROFESSIONAL RULE: Related Contingency Prevention
			// Search for ANY selection belonging to the same match
			const matchConflictIndex = this.selections.findIndex(
				(s) => s.match.id === selection.match.id
			);

			if (matchConflictIndex !== -1) {
				// Replace any existing market selection for this match
				this.selections[matchConflictIndex] = selection;
			} else if (this.selections.length < this.maxSelections) {
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
