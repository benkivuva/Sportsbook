import type { PageLoad } from './$types';
import type { Match } from '$lib/types';

export const load: PageLoad = async () => {
	try {
		const gamesData = await import('$lib/data/games.json');
		const matches: Match[] = gamesData.default || gamesData;

		if (!Array.isArray(matches)) {
			return { matches: [] };
		}

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
