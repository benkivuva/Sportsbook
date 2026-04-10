export class UIService {
	isBetSlipOpen = $state(false);
	searchQuery = $state('');
	toast = $state<{ message: string; type: 'success' | 'error' } | null>(null);

	toggleBetSlip() {
		this.isBetSlipOpen = !this.isBetSlipOpen;
	}

	closeBetSlip() {
		this.isBetSlipOpen = false;
	}

	showToast(message: string, type: 'success' | 'error' = 'success') {
		this.toast = { message, type };
		setTimeout(() => {
			this.toast = null;
		}, 3000);
	}
}

export const ui = new UIService();
