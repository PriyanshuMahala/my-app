<script lang="ts">
    import { fade, fly } from "svelte/transition";
    let { data } = $props();
</script>

<div class="max-w-5xl mx-auto py-12 px-4" in:fade>
    <div class="flex items-center gap-6 mb-12">
        <div
            class="h-24 w-24 rounded-full bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] flex items-center justify-center text-4xl font-normal shadow-sm"
        >
            {data.user.username.charAt(0).toUpperCase()}
        </div>
        <div>
            <h1
                class="text-4xl font-normal text-[var(--md-sys-color-on-surface)] tracking-tight"
            >
                Welcome, {data.user.username}
            </h1>
            <p
                class="text-[var(--md-sys-color-on-surface-variant)] text-lg mt-2 font-light"
            >
                Manage your wishlist and account settings.
            </p>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Wishlist Card -->
        <div
            class="bg-[var(--md-sys-color-surface)] border border-[var(--md-sys-color-outline)]/20 rounded-[32px] overflow-hidden hover:shadow-xl transition-all duration-300"
        >
            <div class="p-8 pb-4">
                <h2
                    class="text-2xl font-normal text-[var(--md-sys-color-on-surface)] mb-2"
                >
                    Your Wishlist
                </h2>
                <p
                    class="text-[var(--md-sys-color-on-surface-variant)] text-sm"
                >
                    Museums you've saved to visit later.
                </p>
            </div>
            <div class="p-4 pt-0">
                {#if data.wishlist.length > 0}
                    <div class="space-y-2">
                        {#each data.wishlist as item}
                            <a
                                href="/museums/{item.id}"
                                class="flex items-center gap-4 p-4 rounded-2xl hover:bg-[var(--md-sys-color-surface-variant)]/30 transition-colors group"
                            >
                                <div
                                    class="h-16 w-16 rounded-xl bg-[var(--md-sys-color-surface-variant)] overflow-hidden flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        class="h-full w-full object-cover"
                                    />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h3
                                        class="text-[var(--md-sys-color-on-surface)] font-medium text-base truncate group-hover:text-[var(--md-sys-color-primary)] transition-colors"
                                    >
                                        {item.name}
                                    </h3>
                                    <p
                                        class="text-[var(--md-sys-color-on-surface-variant)] text-sm truncate"
                                    >
                                        {item.location}
                                    </p>
                                </div>
                                <div
                                    class="h-10 w-10 flex items-center justify-center rounded-full bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface-variant)] group-hover:bg-[var(--md-sys-color-primary)] group-hover:text-[var(--md-sys-color-on-primary)] transition-colors shadow-sm"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="2"
                                        stroke="currentColor"
                                        class="w-5 h-5"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                        />
                                    </svg>
                                </div>
                            </a>
                        {/each}
                    </div>
                {:else}
                    <div
                        class="py-12 text-center rounded-2xl bg-[var(--md-sys-color-surface-variant)]/10 border border-dashed border-[var(--md-sys-color-outline)]/20 mx-4 mb-4"
                    >
                        <div
                            class="h-16 w-16 mx-auto mb-4 rounded-full bg-[var(--md-sys-color-surface-variant)]/50 flex items-center justify-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-8 h-8 text-[var(--md-sys-color-on-surface-variant)]"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                />
                            </svg>
                        </div>
                        <p
                            class="text-[var(--md-sys-color-on-surface-variant)] text-base font-medium mb-1"
                        >
                            Your list is empty
                        </p>
                        <p
                            class="text-[var(--md-sys-color-on-surface-variant)] text-sm mb-6 max-w-[200px] mx-auto"
                        >
                            Start exploring museums to save them here.
                        </p>
                        <a
                            href="/museums"
                            class="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] text-sm font-medium hover:shadow-md transition-all active:translate-y-px"
                            >Find museums</a
                        >
                    </div>
                {/if}
            </div>
            {#if data.wishlist.length > 0}
                <div
                    class="border-t border-[var(--md-sys-color-outline)]/20 p-6 text-center"
                >
                    <a
                        href="/museums"
                        class="text-[var(--md-sys-color-primary)] font-medium text-sm hover:bg-[var(--md-sys-color-surface-variant)]/30 px-6 py-3 rounded-full transition-colors inline-block"
                        >Browse all museums</a
                    >
                </div>
            {/if}
        </div>

        <!-- Account Info Card -->
        <div
            class="bg-[var(--md-sys-color-surface)] border border-[var(--md-sys-color-outline)]/20 rounded-[32px] overflow-hidden hover:shadow-xl transition-all duration-300 h-fit"
        >
            <div class="p-8">
                <h2
                    class="text-2xl font-normal text-[var(--md-sys-color-on-surface)] mb-2"
                >
                    Account Info
                </h2>
                <p
                    class="text-[var(--md-sys-color-on-surface-variant)] text-sm mb-8"
                >
                    Your profile details and session.
                </p>

                <div class="space-y-6">
                    <div class="flex justify-between items-center py-2">
                        <span
                            class="text-[var(--md-sys-color-on-surface-variant)] text-sm font-medium"
                            >Username</span
                        >
                        <span
                            class="text-[var(--md-sys-color-on-surface)] text-base font-medium"
                            >{data.user.username}</span
                        >
                    </div>
                    <div class="flex justify-between items-center py-2">
                        <span
                            class="text-[var(--md-sys-color-on-surface-variant)] text-sm font-medium"
                            >User ID</span
                        >
                        <span
                            class="text-[var(--md-sys-color-on-surface-variant)] text-xs font-mono bg-[var(--md-sys-color-surface-variant)]/30 px-3 py-1.5 rounded-full"
                            >{data.user.id.slice(0, 8)}...{data.user.id.slice(
                                -4,
                            )}</span
                        >
                    </div>
                    <div class="flex justify-between items-center py-2">
                        <span
                            class="text-[var(--md-sys-color-on-surface-variant)] text-sm font-medium"
                            >Member Since</span
                        >
                        <span
                            class="text-[var(--md-sys-color-on-surface)] text-base"
                            >{new Date().getFullYear()}</span
                        >
                    </div>
                </div>
            </div>
            <div
                class="border-t border-[var(--md-sys-color-outline)]/20 p-6 text-center bg-[var(--md-sys-color-surface-variant)]/10"
            >
                <form action="/login?/logout" method="POST">
                    <button
                        type="submit"
                        class="text-[var(--md-sys-color-error)] font-medium text-sm hover:bg-[var(--md-sys-color-error-container)]/50 px-8 py-3 rounded-full transition-colors border border-[var(--md-sys-color-outline)]/20 w-full"
                        >Sign out</button
                    >
                </form>
            </div>
        </div>
    </div>
</div>
