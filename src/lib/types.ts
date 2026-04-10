export interface Odd {
	event_odd_id: number;
	parent_match_id: number;
	sub_type_id: number;
	outcome_id: string;
	outcome_name: string;
	outcome_alias: string;
	market_type: string;
	market_name: string;
	market_priority: number;
	market_name_template: string;
	market_status: number;
	status: number;
	odd_value: number;
	prev_odd_value: number;
}

export interface Market {
	sub_type_id: number;
	name: string;
	market_type: string;
	market_priority?: number;
	odds: Odd[];
}

export interface Match {
	parent_match_id: number;
	home_team: string;
	away_team: string;
	start_time: string;
	periodic_time: string;
	sport_id: number;
	sport_name: string;
	competition_id: number;
	competition_name: string;
	competition_priority: number;
	country_code: string;
	country_name: string;
	result: string;
	status: number;
	status_desc: string;
	producer_state: number;
	total_markets: number;
	stats: Record<string, any>;
	periodic_score: any[];
	main_market_id: number;
	main_market_name: string;
	main_market_odds: number;
	main_market_outcomes: string;
	markets: Market[];
}

export interface Selection {
	odd: Odd;
	match: {
		id: number;
		home_team: string;
		away_team: string;
	};
	market: {
		id: number;
		name: string;
	};
}
