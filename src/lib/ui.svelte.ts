export class UIService {
	isBetSlipOpen = $state(false);
	searchQuery = $state('');

	toggleBetSlip() {
		this.isBetSlipOpen = !this.isBetSlipOpen;
	}

	closeBetSlip() {
		this.isBetSlipOpen = false;
	}
}

export const ui = new UIService();
