<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center bg-background-deep">
	<div class="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center text-4xl mb-6 border border-red-500/20">
		⚠️
	</div>
	
	<h1 class="text-4xl font-black mb-4 tracking-tight">Something went wrong.</h1>
	
	<p class="text-text-secondary max-w-md mb-8">
		{#if page.status === 404}
			The page you're looking for doesn't exist or has been moved.
		{:else}
			An unexpected error occurred while loading the matches. Please try refreshing the page.
		{/if}
	</p>

	<div class="flex gap-4">
		<button 
			onclick={() => window.location.reload()}
			class="bg-emerald-500 hover:bg-emerald-600 px-8 py-3 rounded-xl font-bold text-white shadow-xl shadow-emerald-500/20 transition-all active:scale-95"
		>
			RETRY
		</button>
		
		<a 
			href="/"
			class="bg-white/5 hover:bg-white/10 px-8 py-3 rounded-xl font-bold text-white border border-white/10 transition-all"
		>
			BACK HOME
		</a>
	</div>

	{#if page.error}
		<pre class="mt-12 p-4 bg-black/40 rounded-lg text-xs text-red-400 font-mono border border-red-900/20 text-left max-w-2xl overflow-auto">
			{JSON.stringify(page.error, null, 2)}
		</pre>
	{/if}
</div>
