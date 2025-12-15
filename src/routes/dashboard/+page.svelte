<script lang="ts">
    import { fade } from "svelte/transition";
    let { data } = $props();
</script>

<div class="max-w-4xl mx-auto py-8" in:fade>
    <div class="flex items-center gap-4 mb-8">
        <div
            class="h-16 w-16 rounded-full bg-[#ef6c00] text-white flex items-center justify-center text-3xl font-normal"
        >
            {data.user.username.charAt(0).toUpperCase()}
        </div>
        <div>
            <h1 class="text-2xl font-normal text-[#202124]">
                Welcome, {data.user.username}
            </h1>
            <p class="text-[#5f6368] text-sm">
                Manage your info, privacy, and security to make Digital Museum
                work better for you.
            </p>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Wishlist Card -->
        <div
            class="bg-white border border-[#dadce0] rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
            <div class="p-6 pb-2">
                <h2 class="text-xl font-normal text-[#202124] mb-2">
                    Your Wishlist
                </h2>
                <p class="text-[#5f6368] text-sm">
                    Museums you've saved to visit later.
                </p>
            </div>
            <div class="p-0">
                {#if data.wishlist.length > 0}
                    <div class="divide-y divide-gray-100">
                        {#each data.wishlist as item}
                            <a
                                href="/museums/{item.id}"
                                class="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div
                                    class="h-12 w-12 rounded bg-gray-100 overflow-hidden flex-shrink-0"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        class="h-full w-full object-cover"
                                    />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h3
                                        class="text-[#3c4043] font-medium text-sm truncate"
                                    >
                                        {item.name}
                                    </h3>
                                    <p class="text-[#5f6368] text-xs truncate">
                                        {item.location}
                                    </p>
                                </div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-5 h-5 text-gray-400"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                    />
                                </svg>
                            </a>
                        {/each}
                    </div>
                {:else}
                    <div class="p-6 text-center">
                        <img
                            src="https://www.gstatic.com/images/branding/product/1x/keep_48dp.png"
                            alt="Keep Icon"
                            class="h-12 w-12 mx-auto mb-3 opacity-50 opacity-20 filter grayscale"
                        />
                        <p class="text-[#5f6368] text-sm mb-4">
                            No saved museums yet.
                        </p>
                        <a
                            href="/museums"
                            class="text-[#1a73e8] font-medium text-sm hover:underline"
                            >Find museums</a
                        >
                    </div>
                {/if}
            </div>
            {#if data.wishlist.length > 0}
                <div class="border-t border-[#dadce0] p-3 text-center">
                    <a
                        href="/museums"
                        class="text-[#1a73e8] font-medium text-sm hover:bg-blue-50 px-4 py-2 rounded transition-colors inline-block"
                        >Browse all museums</a
                    >
                </div>
            {/if}
        </div>

        <!-- Account Info Card -->
        <div
            class="bg-white border border-[#dadce0] rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
            <div class="p-6">
                <h2 class="text-xl font-normal text-[#202124] mb-2">
                    Account Info
                </h2>
                <p class="text-[#5f6368] text-sm mb-6">
                    Basic details about your profile.
                </p>

                <div class="space-y-4">
                    <div
                        class="flex justify-between py-2 border-b border-gray-100"
                    >
                        <span class="text-[#5f6368] text-sm font-medium"
                            >Username</span
                        >
                        <span class="text-[#3c4043] text-sm"
                            >{data.user.username}</span
                        >
                    </div>
                    <div
                        class="flex justify-between py-2 border-b border-gray-100"
                    >
                        <span class="text-[#5f6368] text-sm font-medium"
                            >User ID</span
                        >
                        <span
                            class="text-[#3c4043] text-sm font-mono bg-gray-50 px-2 py-0.5 rounded"
                            >{data.user.id.slice(0, 8)}...</span
                        >
                    </div>
                    <div
                        class="flex justify-between py-2 border-b border-gray-100"
                    >
                        <span class="text-[#5f6368] text-sm font-medium"
                            >Member Since</span
                        >
                        <span class="text-[#3c4043] text-sm"
                            >{new Date().getFullYear()}</span
                        >
                    </div>
                </div>
            </div>
            <div class="border-t border-[#dadce0] p-3 text-center bg-gray-50">
                <form action="/login?/logout" method="POST">
                    <button
                        type="submit"
                        class="text-[#1a73e8] font-medium text-sm hover:bg-blue-50 px-6 py-2 rounded transition-colors bg-white border border-[#dadce0] shadow-sm"
                        >Sign out</button
                    >
                </form>
            </div>
        </div>
    </div>
</div>
