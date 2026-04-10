import type { PageLoad } from './$types';
import type { Match } from '$lib/types';

export const load: PageLoad = async () => {
	try {
		// Import games.json
		const gamesData = await import('$lib/data/games.json');
		
		// Vite's dynamic import for JSON can return the object directly or { default: object }
		const matches: Match[] = gamesData.default || gamesData;

		if (!Array.isArray(matches)) {
			console.error('Games data is not an array:', matches);
			return { matches: [] };
		}

		// Sort by start_time
		const sortedMatches = [...matches].sort((a, b) => {
			return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
		});

		return {
			matches: sortedMatches
		};
	} catch (e) {
		console.error('Failed to load games data:', e);
		return { matches: [] };
	}
};
