<script lang="ts">
	let { text = '', query = '' } = $props<{ text?: string; query?: string }>();

	const parts = $derived.by(() => {
		if (!query.trim()) return [{ text: text, highlight: false }];
		
		const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		const regex = new RegExp(`(${escapedQuery})`, 'gi');
		const result = text.split(regex).map(part => ({
			text: part,
			highlight: part.toLowerCase() === query.toLowerCase()
		}));
		return result;
	});
</script>

<span>
	{#each parts as part}
		{#if part.highlight}
			<mark class="bg-emerald-500/30 text-emerald-400 rounded-sm px-0.5 border-b border-emerald-500/50">{part.text}</mark>
		{:else}
			{part.text}
		{/if}
	{/each}
</span>
