<script lang="ts">
    import { enhance } from "$app/forms";
    import { fade, fly } from "svelte/transition";
    let { data } = $props();

    let museum = $derived(data.museum);
    let reviews = $derived(data.reviews);
    let isWishlisted = $derived(data.isWishlisted);
    let user = $derived(data.user);
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-12" in:fade>
    <!-- Left Column: Image and Actions -->
    <div class="lg:col-span-1 space-y-8">
        <div
            class="rounded-[32px] overflow-hidden shadow-lg bg-[var(--md-sys-color-surface)] border border-[var(--md-sys-color-outline)]/20"
            in:fly={{ y: 20, duration: 500 }}
        >
            <img
                src={museum.image}
                alt={museum.name}
                class="w-full h-80 object-cover"
            />
            <div class="p-6">
                {#if user}
                    <form action="?/toggleWishlist" method="POST" use:enhance>
                        <button
                            type="submit"
                            class="w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-md active:shadow-sm {isWishlisted
                                ? 'bg-[var(--md-sys-color-error-container)] text-[var(--md-sys-color-on-error-container)] hover:bg-[var(--md-sys-color-error-container)]/80'
                                : 'bg-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-primary)]/90 text-[var(--md-sys-color-on-primary)]'}"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                class="w-5 h-5"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            {isWishlisted
                                ? "Remove from Wishlist"
                                : "Add to Wishlist"}
                        </button>
                    </form>
                {:else}
                    <a
                        href="/login"
                        class="block w-full text-center py-4 rounded-full bg-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-primary)]/90 text-[var(--md-sys-color-on-primary)] font-bold shadow-md transition-all"
                        >Login to Wishlist</a
                    >
                {/if}
            </div>
        </div>

        <div
            class="bg-[var(--md-sys-color-surface)] rounded-[32px] p-8 border border-[var(--md-sys-color-outline)]/20 shadow-sm"
        >
            <h3
                class="text-[var(--md-sys-color-on-surface)] font-bold text-lg mb-4"
            >
                Location
            </h3>
            <div
                class="flex items-start text-[var(--md-sys-color-on-surface-variant)]"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-5 h-5 mr-3 text-[var(--md-sys-color-tertiary)] shrink-0 mt-0.5"
                >
                    <path
                        fill-rule="evenodd"
                        d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.62.829.799 1.654 1.381 2.274 1.766.311.192.571.337.757.433.093.048.17.085.23.115.03.015.051.025.066.032l.025.01h.003a1 1 0 00-.015-.071zM10 5.25a3.75 3.75 0 110 7.5 3.75 3.75 0 010-7.5z"
                        clip-rule="evenodd"
                    />
                </svg>
                {museum.location}
            </div>
        </div>
    </div>

    <!-- Right Column: Details and Features -->
    <div class="lg:col-span-2 space-y-10">
        <div in:fly={{ y: 20, duration: 500, delay: 100 }}>
            <h1
                class="text-[3.5rem] font-normal text-[var(--md-sys-color-on-surface)] mb-6 tracking-tight leading-tight"
            >
                {museum.name}
            </h1>
            <p
                class="text-xl text-[var(--md-sys-color-on-surface-variant)] leading-relaxed font-light"
            >
                {museum.description}
            </p>
        </div>

        <div in:fly={{ y: 20, duration: 500, delay: 200 }}>
            <h2
                class="text-2xl font-medium text-[var(--md-sys-color-on-surface)] mb-6"
            >
                Key Highlights
            </h2>
            <div class="flex flex-wrap gap-3">
                {#each museum.features as feature}
                    <span
                        class="px-5 py-2.5 bg-[var(--md-sys-color-secondary-container)] rounded-xl text-[var(--md-sys-color-on-secondary-container)] text-sm font-medium hover:shadow-md transition-all cursor-default border border-transparent"
                        >✨ {feature}</span
                    >
                {/each}
            </div>
        </div>

        <div
            class="border-t border-[var(--md-sys-color-outline)]/20 pt-10"
            in:fly={{ y: 20, duration: 500, delay: 300 }}
        >
            <h2
                class="text-2xl font-medium text-[var(--md-sys-color-on-surface)] mb-8"
            >
                Visitor Reviews
            </h2>

            {#if user}
                <div
                    class="bg-[var(--md-sys-color-surface)] p-8 rounded-[32px] border border-[var(--md-sys-color-outline)]/20 mb-10 shadow-sm"
                >
                    <h3
                        class="text-lg font-bold text-[var(--md-sys-color-on-surface)] mb-6"
                    >
                        Share your experience
                    </h3>
                    <form
                        action="?/addReview"
                        method="POST"
                        use:enhance
                        class="space-y-6"
                    >
                        <fieldset>
                            <legend
                                class="block text-sm font-semibold text-[var(--md-sys-color-on-surface-variant)] mb-2"
                                >Rating</legend
                            >
                            <div class="flex gap-4">
                                {#each [1, 2, 3, 4, 5] as star}
                                    <label class="cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={star}
                                            class="peer sr-only"
                                            required
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            class="w-10 h-10 text-[var(--md-sys-color-outline)]/30 peer-checked:text-[var(--md-sys-color-tertiary)] group-hover:text-[var(--md-sys-color-tertiary)]/70 transition-colors"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </label>
                                {/each}
                            </div>
                        </fieldset>
                        <div>
                            <label
                                for="comment"
                                class="block text-sm font-semibold text-[var(--md-sys-color-on-surface-variant)] mb-2"
                                >Comment</label
                            >
                            <textarea
                                name="comment"
                                id="comment"
                                rows="3"
                                class="w-full bg-[var(--md-sys-color-surface-variant)] border-transparent text-[var(--md-sys-color-on-surface)] rounded-2xl focus:ring-2 focus:ring-[var(--md-sys-color-primary)] focus:border-transparent p-4 shadow-sm placeholder-[var(--md-sys-color-on-surface-variant)]/50"
                                placeholder="Tell us what you liked..."
                            ></textarea>
                        </div>
                        <div class="flex justify-end">
                            <button
                                type="submit"
                                class="bg-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-primary)]/90 text-[var(--md-sys-color-on-primary)] px-8 py-3 rounded-full font-bold transition-all shadow-md active:translate-y-px"
                                >Post Review</button
                            >
                        </div>
                    </form>
                </div>
            {/if}

            <div class="space-y-6">
                {#each reviews as review}
                    <div
                        class="bg-[var(--md-sys-color-surface)] p-6 rounded-[24px] border border-[var(--md-sys-color-outline)]/20 shadow-sm"
                    >
                        <div class="flex items-center justify-between mb-3">
                            <div class="flex items-center gap-3">
                                <div
                                    class="h-10 w-10 rounded-full bg-[var(--md-sys-color-tertiary-container)] flex items-center justify-center text-sm font-bold text-[var(--md-sys-color-on-tertiary-container)]"
                                >
                                    {review.username.charAt(0).toUpperCase()}
                                </div>
                                <span
                                    class="font-bold text-[var(--md-sys-color-on-surface)]"
                                    >{review.username}</span
                                >
                            </div>
                            <div
                                class="flex text-[var(--md-sys-color-tertiary)]"
                            >
                                {#each Array(review.rating) as _}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        class="w-5 h-5"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                {/each}
                            </div>
                        </div>
                        <p
                            class="text-[var(--md-sys-color-on-surface-variant)] leading-relaxed"
                        >
                            {review.comment}
                        </p>
                        <p
                            class="text-xs text-[var(--md-sys-color-outline)] mt-4 font-medium"
                        >
                            {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                {:else}
                    <div
                        class="text-center py-12 bg-[var(--md-sys-color-surface-variant)]/30 rounded-2xl border border-[var(--md-sys-color-outline)]/20 border-dashed"
                    >
                        <p
                            class="text-[var(--md-sys-color-on-surface-variant)]"
                        >
                            No reviews yet. Be the first to share your thoughts!
                        </p>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
