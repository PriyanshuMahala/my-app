<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import { flip } from "svelte/animate";

    let { data } = $props();
    let selectedRegion = $state("All");

    const regions = ["North", "South", "East", "West", "Central", "North East"];

    // Filter logic
    let filteredMuseums = $derived(
        selectedRegion === "All"
            ? data.museums
            : data.museums.filter((m) => m.region === selectedRegion),
    );

    // Simplified Map coordinates for regions (Visual representation)
    const mapRegions = [
        { name: "North", cx: 150, cy: 80, r: 40, color: "#FF9800" },
        { name: "West", cx: 80, cy: 180, r: 35, color: "#E91E63" },
        { name: "Central", cx: 150, cy: 180, r: 35, color: "#9C27B0" },
        { name: "East", cx: 240, cy: 160, r: 35, color: "#2196F3" },
        { name: "South", cx: 150, cy: 280, r: 40, color: "#4CAF50" },
        { name: "North East", cx: 280, cy: 100, r: 30, color: "#00BCD4" },
    ];
</script>

<div class="min-h-screen px-4 pb-20">
    <div class="text-center mb-12">
        <h1
            class="text-4xl md:text-6xl font-bold text-[var(--md-sys-color-primary)] mb-4"
        >
            Explore by Region
        </h1>
        <p class="text-xl text-[var(--md-sys-color-on-surface-variant)]">
            Tap a region on the map to discover museums
        </p>
    </div>

    <!-- Interactive Abstract Map -->
    <div class="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
        <div class="flex-1 flex justify-center items-center min-h-[400px]">
            <div class="relative w-[320px] h-[360px] md:w-[400px] md:h-[450px]">
                <!-- Abstract India Shape (Simplified SVG) -->
                <svg
                    viewBox="0 0 350 350"
                    class="w-full h-full drop-shadow-2xl"
                >
                    <path
                        d="M150 10 L200 60 L280 80 L240 160 L200 240 L150 340 L100 240 L60 160 L20 80 L100 60 Z"
                        fill="var(--md-sys-color-surface-container-high)"
                        opacity="0.5"
                    />

                    <!-- Connection Lines -->
                    <line
                        x1="150"
                        y1="80"
                        x2="150"
                        y2="180"
                        stroke="var(--md-sys-color-outline)"
                        stroke-width="2"
                        stroke-dasharray="4"
                        opacity="0.3"
                    />
                    <line
                        x1="150"
                        y1="180"
                        x2="240"
                        y2="160"
                        stroke="var(--md-sys-color-outline)"
                        stroke-width="2"
                        stroke-dasharray="4"
                        opacity="0.3"
                    />
                    <line
                        x1="80"
                        y1="180"
                        x2="150"
                        y2="180"
                        stroke="var(--md-sys-color-outline)"
                        stroke-width="2"
                        stroke-dasharray="4"
                        opacity="0.3"
                    />
                    <line
                        x1="150"
                        y1="180"
                        x2="150"
                        y2="280"
                        stroke="var(--md-sys-color-outline)"
                        stroke-width="2"
                        stroke-dasharray="4"
                        opacity="0.3"
                    />
                    <line
                        x1="280"
                        y1="100"
                        x2="240"
                        y2="160"
                        stroke="var(--md-sys-color-outline)"
                        stroke-width="2"
                        stroke-dasharray="4"
                        opacity="0.3"
                    />

                    {#each mapRegions as region}
                        <!-- Region Node -->
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <g
                            onclick={() => (selectedRegion = region.name)}
                            class="cursor-pointer transition-all duration-300 hover:scale-110"
                            class:opacity-50={selectedRegion !== "All" &&
                                selectedRegion !== region.name}
                        >
                            <circle
                                cx={region.cx}
                                cy={region.cy}
                                r={selectedRegion === region.name
                                    ? region.r + 5
                                    : region.r}
                                fill={region.color}
                                fill-opacity="0.2"
                                stroke={region.color}
                                stroke-width="2"
                            />
                            <circle
                                cx={region.cx}
                                cy={region.cy}
                                r={selectedRegion === region.name ? 8 : 4}
                                fill={region.color}
                            />
                            <text
                                x={region.cx}
                                y={region.cy + region.r + 15}
                                text-anchor="middle"
                                class="text-[12px] font-bold fill-[var(--md-sys-color-on-surface)] uppercase tracking-widest"
                            >
                                {region.name}
                            </text>
                        </g>
                    {/each}
                </svg>
            </div>
        </div>

        <div class="flex-1">
            <div class="flex items-center justify-between mb-6">
                <h3
                    class="text-2xl font-bold text-[var(--md-sys-color-on-surface)]"
                >
                    {selectedRegion === "All"
                        ? "All Museums"
                        : `${selectedRegion}ern India`}
                </h3>
                {#if selectedRegion !== "All"}
                    <button
                        onclick={() => (selectedRegion = "All")}
                        class="text-sm text-[var(--md-sys-color-primary)] font-medium hover:underline"
                    >
                        Reset Filter
                    </button>
                {/if}
            </div>

            <div
                class="grid grid-cols-1 gap-4 max-h-[600px] overflow-y-auto pr-2"
            >
                {#each filteredMuseums as museum (museum.id)}
                    <div
                        animate:flip={{ duration: 300 }}
                        in:fly={{ y: 20, duration: 300 }}
                        class="flex gap-4 p-4 rounded-2xl bg-[var(--md-sys-color-surface-container)] hover:bg-[var(--md-sys-color-surface-container-high)] transition-colors cursor-pointer group"
                        onclick={() =>
                            (window.location.href = `/museums/${museum.id}`)}
                    >
                        <div
                            class="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0"
                        >
                            <img
                                src={museum.image}
                                alt={museum.name}
                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div>
                            <span
                                class="text-xs font-bold text-[var(--md-sys-color-tertiary)] uppercase tracking-wide"
                                >{museum.location}</span
                            >
                            <h4
                                class="text-lg font-bold text-[var(--md-sys-color-on-surface)] leading-tight mb-1"
                            >
                                {museum.name}
                            </h4>
                            <p
                                class="text-sm text-[var(--md-sys-color-on-surface-variant)] line-clamp-2"
                            >
                                {museum.description}
                            </p>
                        </div>
                    </div>
                {/each}
                {#if filteredMuseums.length === 0}
                    <div
                        class="p-8 text-center text-[var(--md-sys-color-on-surface-variant)]"
                    >
                        No museums found in this region.
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>
