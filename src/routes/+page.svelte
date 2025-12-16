<script lang="ts">
    import { fade, fly } from "svelte/transition";
</script>

<div
    class="flex flex-col items-center justify-center py-20 text-center"
    in:fade={{ duration: 400 }}
>
    <div class="mb-10 scale-110">
        <h1
            class="text-6xl md:text-8xl font-bold tracking-tighter leading-none select-none bg-gradient-to-r from-[var(--md-sys-color-primary)] via-[var(--md-sys-color-tertiary)] to-[var(--md-sys-color-primary)] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient"
        >
            DigiMuseum
        </h1>
        <p
            class="mt-4 text-xl text-[var(--md-sys-color-on-surface-variant)] font-light tracking-wide"
        >
            Discover India's Heritage
        </p>
    </div>

    <!-- Buttons removed as requested -->
</div>

<div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Main Feature Card -->
    <div
        class="bg-[var(--md-sys-color-surface)] rounded-[32px] overflow-hidden border border-[var(--md-sys-color-outline)]/10 hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1"
        onclick={() => (window.location.href = "/museums")}
    >
        <div class="h-56 overflow-hidden relative">
            <img
                src="https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=800"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt="Museum"
            />
            <div
                class="absolute bottom-4 right-4 bg-[var(--md-sys-color-tertiary-container)] rounded-xl px-3 py-1 text-xs font-bold text-[var(--md-sys-color-on-tertiary-container)] shadow-sm"
            >
                Featured
            </div>
        </div>
        <div class="p-8">
            <h3
                class="text-2xl font-normal text-[var(--md-sys-color-on-surface)] mb-2 group-hover:text-[var(--md-sys-color-primary)] transition-colors"
            >
                Top 25 Museums
            </h3>
            <p
                class="text-[var(--md-sys-color-on-surface-variant)] text-base leading-relaxed mb-6"
            >
                Curated collection of the most prestigious heritage sites in
                India. Explore history like never before.
            </p>
            <span
                class="inline-flex items-center text-[var(--md-sys-color-primary)] font-medium hover:underline group-hover:translate-x-1 transition-transform"
                >Explore collection <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-5 h-5 ml-1"
                    ><path
                        fill-rule="evenodd"
                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                        clip-rule="evenodd"
                    /></svg
                ></span
            >
        </div>
    </div>

    <!-- Dashboard Card -->
    <div
        class="bg-[var(--md-sys-color-primary-container)]/30 rounded-[32px] overflow-hidden border border-transparent hover:border-[var(--md-sys-color-primary)]/20 hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1"
        onclick={() => (window.location.href = "/dashboard")}
    >
        <div
            class="h-56 overflow-hidden relative flex items-center justify-center"
        >
            <div
                class="w-24 h-24 rounded-full bg-[var(--md-sys-color-primary-container)] flex items-center justify-center text-[var(--md-sys-color-on-primary-container)] shadow-inner transform group-hover:scale-110 transition-transform duration-500"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-10 h-10"
                    ><path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    /></svg
                >
            </div>
        </div>
        <div class="p-8">
            <h3
                class="text-2xl font-normal text-[var(--md-sys-color-on-surface)] mb-2"
            >
                Your Wishlist
            </h3>
            <p
                class="text-[var(--md-sys-color-on-surface-variant)] text-base leading-relaxed mb-6"
            >
                Access your saved places and reviews. Plan your next cultural
                trip completely free.
            </p>
            <span
                class="text-[var(--md-sys-color-primary)] font-medium hover:underline"
                >View saved</span
            >
        </div>
    </div>

    <!-- Quiz Card -->
    <div
        class="bg-[var(--md-sys-color-tertiary-container)]/30 rounded-[32px] overflow-hidden border border-transparent hover:border-[var(--md-sys-color-tertiary)]/20 hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1"
        onclick={() => (window.location.href = "/quiz")}
    >
        <div
            class="h-56 overflow-hidden relative flex items-center justify-center"
        >
            <div
                class="w-24 h-24 rounded-full bg-[var(--md-sys-color-tertiary-container)] flex items-center justify-center text-[var(--md-sys-color-on-tertiary-container)] shadow-inner transform group-hover:rotate-12 transition-transform duration-500"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-10 h-10"
                    ><path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                    /></svg
                >
            </div>
        </div>
        <div class="p-8">
            <h3
                class="text-2xl font-normal text-[var(--md-sys-color-on-surface)] mb-2"
            >
                Knowledge Quiz
            </h3>
            <p
                class="text-[var(--md-sys-color-on-surface-variant)] text-base leading-relaxed mb-6"
            >
                How well do you know Indian history? Take a quick 10-question
                quiz.
            </p>
            <span
                class="text-[var(--md-sys-color-tertiary)] font-medium hover:underline"
                >Start quiz</span
            >
        </div>
    </div>
</div>
