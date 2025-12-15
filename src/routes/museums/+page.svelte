<script lang="ts">
    import { fade, scale } from "svelte/transition";
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
    <!-- Filter Chips & Search -->
    <div
        class="sticky top-[64px] z-40 bg-[#f8f9fa] bg-opacity-95 backdrop-blur py-4 -mx-4 px-4 sm:mx-0 sm:px-0"
    >
        <div class="flex flex-col md:flex-row gap-4 items-center">
            <div class="relative w-full max-w-2xl group">
                <input
                    type="text"
                    bind:value={searchQuery}
                    placeholder="Search by museum name or location..."
                    class="w-full bg-white border border-gray-200 rounded-full py-3 pl-12 pr-4 text-[16px] shadow-sm focus:shadow-md focus:outline-none transition-shadow"
                />
                <div
                    class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                >
                    <svg
                        class="h-5 w-5 text-gray-400 group-focus-within:text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </div>
            </div>

            <div
                class="flex gap-2 w-full overflow-x-auto pb-2 md:pb-0 scrollbar-hide"
            >
                <button
                    class="whitespace-nowrap px-4 py-2 rounded-[8px] border border-[#dadce0] bg-white text-sm font-medium text-[#3c4043] hover:bg-[#f1f3f4]"
                    >All Museums</button
                >
                <button
                    class="whitespace-nowrap px-4 py-2 rounded-[8px] border border-[#dadce0] bg-white text-sm font-medium text-[#3c4043] hover:bg-[#f1f3f4]"
                    >Images</button
                >
                <button
                    class="whitespace-nowrap px-4 py-2 rounded-[8px] border border-[#dadce0] bg-white text-sm font-medium text-[#3c4043] hover:bg-[#f1f3f4]"
                    >Maps</button
                >
                <button
                    class="whitespace-nowrap px-4 py-2 rounded-[8px] border border-[#dadce0] bg-white text-sm font-medium text-[#3c4043] hover:bg-[#f1f3f4]"
                    >News</button
                >
            </div>
        </div>
        <div class="h-px bg-gray-200 mt-4 w-full"></div>
    </div>

    <div class="text-sm text-[#70757a] -mt-2">
        About {filteredMuseums.length} results
    </div>

    <!-- Listings -->
    <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
        {#each filteredMuseums as museum (museum.id)}
            <a
                href="/museums/{museum.id}"
                class="block bg-white rounded-[16px] overflow-hidden border border-[#dadce0] hover:shadow-lg transition-all duration-300"
                in:scale={{ duration: 300, start: 0.98 }}
            >
                <div
                    class="relative aspect-[4/3] overflow-hidden bg-gray-100 border-b border-[#dadce0]"
                >
                    <img
                        src={museum.image}
                        alt={museum.name}
                        loading="lazy"
                        class="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                    />
                </div>

                <div class="p-4">
                    <div class="text-xs text-[#70757a] mb-1 truncate">
                        {museum.location}
                    </div>
                    <h3
                        class="text-[18px] text-[#1a0dab] group-hover:underline mb-2 leading-snug line-clamp-2 visited:text-[#609]"
                    >
                        {museum.name}
                    </h3>
                    <p
                        class="text-[14px] text-[#4d5156] line-clamp-2 leading-relaxed"
                    >
                        {museum.description}
                    </p>

                    <div class="mt-4 flex flex-wrap gap-2">
                        {#each museum.features.slice(0, 2) as feature}
                            <span
                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#e8f0fe] text-[#1967d2] border border-transparent"
                            >
                                {feature}
                            </span>
                        {/each}
                    </div>
                </div>
            </a>
        {/each}
    </div>

    {#if filteredMuseums.length === 0}
        <div class="text-center py-20">
            <p class="text-[#202124] text-lg mb-2">
                Your search - <span class="font-bold">{searchQuery}</span> - did
                not match any museums.
            </p>
            <p class="text-[#5f6368]">Suggestions:</p>
            <ul class="text-[#5f6368] mt-2 list-disc inline-block text-left">
                <li>Make sure that all words are spelled correctly.</li>
                <li>Try different keywords.</li>
                <li>Try more general keywords.</li>
            </ul>
        </div>
    {/if}
</div>
