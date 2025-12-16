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
                    <!-- Realistic India Map (Simplified Regions) -->
                    <!-- SVG ViewBox adjusted for India's aspect ratio -->
                    <svg
                        viewBox="0 0 600 700"
                        class="w-full h-full drop-shadow-2xl"
                    >
                        <!-- Stylized Background/Ocean -->
                        <filter
                            id="glow"
                            x="-20%"
                            y="-20%"
                            width="140%"
                            height="140%"
                        >
                            <feGaussianBlur stdDeviation="5" result="blur" />
                            <feComposite
                                in="SourceGraphic"
                                in2="blur"
                                operator="over"
                            />
                        </filter>

                        <!-- Map Group -->
                        <g
                            stroke="var(--md-sys-color-outline)"
                            stroke-width="1.5"
                            stroke-linejoin="round"
                        >
                            <!-- Northern Region (J&K, Himachal, Punjab, Haryana, Uttarakhand, Delhi, UP) -->
                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <path
                                d="M230,20 L280,25 L320,60 L350,90 L330,120 L380,150 L350,180 L250,180 L200,150 L180,100 L200,50 Z"
                                class="cursor-pointer transition-all duration-300 hover:brightness-110"
                                fill={selectedRegion === "North"
                                    ? "var(--md-sys-color-primary)"
                                    : "var(--md-sys-color-surface-container-high)"}
                                fill-opacity={selectedRegion === "All" ||
                                selectedRegion === "North"
                                    ? "0.8"
                                    : "0.3"}
                                onclick={() => (selectedRegion = "North")}
                            >
                                <title>North India</title>
                            </path>

                            <!-- Western Region (Rajasthan, Gujarat, Maharashtra, Goa) -->
                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <path
                                d="M100,200 L180,160 L200,150 L250,180 L250,300 L220,350 L180,320 L120,300 L50,250 L80,220 Z"
                                class="cursor-pointer transition-all duration-300 hover:brightness-110"
                                fill={selectedRegion === "West"
                                    ? "var(--md-sys-color-primary)"
                                    : "var(--md-sys-color-surface-container-high)"}
                                fill-opacity={selectedRegion === "All" ||
                                selectedRegion === "West"
                                    ? "0.8"
                                    : "0.3"}
                                onclick={() => (selectedRegion = "West")}
                            >
                                <title>West India</title>
                            </path>

                            <!-- Central Region (MP, Chhattisgarh) -->
                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <path
                                d="M250,180 L350,180 L380,250 L350,300 L250,300 L250,180 Z"
                                class="cursor-pointer transition-all duration-300 hover:brightness-110"
                                fill={selectedRegion === "Central"
                                    ? "var(--md-sys-color-primary)"
                                    : "var(--md-sys-color-surface-container-high)"}
                                fill-opacity={selectedRegion === "All" ||
                                selectedRegion === "Central"
                                    ? "0.8"
                                    : "0.3"}
                                onclick={() => (selectedRegion = "Central")}
                            >
                                <title>Central India</title>
                            </path>

                            <!-- Eastern Region (Bihar, Bengal, Odisha, Jharkhand) -->
                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <path
                                d="M350,180 L420,180 L420,250 L400,300 L350,300 L380,250 Z"
                                class="cursor-pointer transition-all duration-300 hover:brightness-110"
                                fill={selectedRegion === "East"
                                    ? "var(--md-sys-color-primary)"
                                    : "var(--md-sys-color-surface-container-high)"}
                                fill-opacity={selectedRegion === "All" ||
                                selectedRegion === "East"
                                    ? "0.8"
                                    : "0.3"}
                                onclick={() => (selectedRegion = "East")}
                            >
                                <title>East India</title>
                            </path>

                            <!-- North East Region -->
                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <path
                                d="M420,160 L550,140 L580,180 L520,220 L450,200 L420,180 Z"
                                class="cursor-pointer transition-all duration-300 hover:brightness-110"
                                fill={selectedRegion === "North East"
                                    ? "var(--md-sys-color-primary)"
                                    : "var(--md-sys-color-surface-container-high)"}
                                fill-opacity={selectedRegion === "All" ||
                                selectedRegion === "North East"
                                    ? "0.8"
                                    : "0.3"}
                                onclick={() => (selectedRegion = "North East")}
                            >
                                <title>North East India</title>
                            </path>

                            <!-- Southern Region (Andhra, Karnataka, TN, Kerala) -->
                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <path
                                d="M220,350 L250,300 L350,300 L400,300 L380,450 L300,650 L220,450 Z"
                                class="cursor-pointer transition-all duration-300 hover:brightness-110"
                                fill={selectedRegion === "South"
                                    ? "var(--md-sys-color-primary)"
                                    : "var(--md-sys-color-surface-container-high)"}
                                fill-opacity={selectedRegion === "All" ||
                                selectedRegion === "South"
                                    ? "0.8"
                                    : "0.3"}
                                onclick={() => (selectedRegion = "South")}
                            >
                                <title>South India</title>
                            </path>
                        </g>

                        <!-- Labels -->
                        <text
                            x="280"
                            y="120"
                            class="text-xs font-bold fill-[var(--md-sys-color-on-surface)] pointer-events-none opacity-50"
                            >NORTH</text
                        >
                        <text
                            x="150"
                            y="250"
                            class="text-xs font-bold fill-[var(--md-sys-color-on-surface)] pointer-events-none opacity-50"
                            >WEST</text
                        >
                        <text
                            x="300"
                            y="250"
                            class="text-xs font-bold fill-[var(--md-sys-color-on-surface)] pointer-events-none opacity-50"
                            >CENTRAL</text
                        >
                        <text
                            x="480"
                            y="180"
                            class="text-xs font-bold fill-[var(--md-sys-color-on-surface)] pointer-events-none opacity-50"
                            >NORTH EAST</text
                        >
                        <text
                            x="390"
                            y="240"
                            class="text-xs font-bold fill-[var(--md-sys-color-on-surface)] pointer-events-none opacity-50"
                            >EAST</text
                        >
                        <text
                            x="300"
                            y="450"
                            class="text-xs font-bold fill-[var(--md-sys-color-on-surface)] pointer-events-none opacity-50"
                            >SOUTH</text
                        >
                    </svg>
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