<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import { flip } from "svelte/animate";
    let { data } = $props();

    let searchQuery = $state("");

    let filteredMuseums = $derived(
        data.museums.filter(
            (m) =>
                m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.location.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );
</script>

<div class="space-y-6" in:fade>
    <!-- Modern Material Header & Search -->
    <div class="relative py-8 px-4 text-center space-y-6">
        <h1
            class="text-4xl md:text-6xl font-normal text-[var(--md-sys-color-primary)] font-display tracking-tight"
        >
            Explore Museums
        </h1>
        <div class="max-w-2xl mx-auto relative group">
            <input
                type="text"
                bind:value={searchQuery}
                placeholder="Search museums..."
                class="w-full bg-[var(--md-sys-color-surface-variant)] text-[var(--md-sys-color-on-surface-variant)] rounded-full py-4 pl-14 pr-6 text-lg shadow-sm focus:shadow-lg outline-none transition-all placeholder:text-[var(--md-sys-color-on-surface-variant)]/70"
            />
            <div
                class="absolute inset-y-0 left-4 flex items-center pointer-events-none"
            >
                <svg
                    class="h-6 w-6 text-[var(--md-sys-color-on-surface-variant)]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                </svg>
            </div>
        </div>
        {#if searchQuery}
            <p class="text-[var(--md-sys-color-primary)] font-medium" in:fade>
                Found {filteredMuseums.length} museums
            </p>
        {/if}
    </div>

    <!-- Material You Listings -->
    <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 pb-20"
    >
        {#each filteredMuseums as museum, i (museum.id)}
            <div animate:flip={{ duration: 400 }}>
                <a
                    href="/museums/{museum.id}"
                    class="block bg-[var(--md-sys-color-surface-container-low)] rounded-[32px] overflow-hidden hover:bg-[var(--md-sys-color-surface-container-high)] transition-all duration-300 group h-full flex flex-col hover:-translate-y-1 hover:shadow-xl"
                    in:fly={{ y: 30, duration: 500, delay: i * 50 }}
                >
                    <div class="relative aspect-[16/10] overflow-hidden">
                        <img
                            src={museum.image}
                            alt={museum.name}
                            loading="lazy"
                            class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                        />
                        <div
                            class="absolute bottom-3 left-3 bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)] text-xs font-bold px-3 py-1 rounded-full"
                        >
                            {museum.location}
                        </div>
                    </div>

                    <div class="p-6 flex-1 flex flex-col">
                        <h3
                            class="text-2xl text-[var(--md-sys-color-on-surface)] font-normal mb-2 leading-tight"
                        >
                            {museum.name}
                        </h3>
                        <p
                            class="text-[15px] text-[var(--md-sys-color-on-surface-variant)] line-clamp-2 leading-relaxed mb-6"
                        >
                            {museum.description}
                        </p>

                        <div class="flex flex-wrap gap-2 mt-auto">
                            {#each museum.features.slice(0, 3) as feature}
                                <span
                                    class="inline-block px-3 py-1 rounded-full text-xs font-medium border border-[var(--md-sys-color-outline)]/30 text-[var(--md-sys-color-on-surface-variant)]"
                                >
                                    {feature}
                                </span>
                            {/each}
                        </div>
                    </div>
                </a>
            </div>
        {/each}
    </div>

    {#if filteredMuseums.length === 0}
        <div class="text-center py-32 opacity-60">
            <p class="text-[var(--md-sys-color-on-surface)] text-xl">
                No museums found.
            </p>
        </div>
    {/if}
</div>
