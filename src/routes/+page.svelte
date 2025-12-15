<script lang="ts">
    import { fade, fly } from "svelte/transition";
</script>

<div
    class="flex flex-col items-center justify-center py-16 text-center"
    in:fade={{ duration: 300 }}
>
    <div class="mb-8">
        <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
            alt="Google Style Logo"
            class="h-24 hidden"
        />
        <h1
            class="text-[5rem] font-medium tracking-tight leading-none text-gray-800"
        >
            <span class="text-[#4285f4]">M</span><span class="text-[#ea4335]"
                >u</span
            ><span class="text-[#fbbc05]">s</span><span class="text-[#4285f4]"
                >e</span
            ><span class="text-[#34a853]">u</span><span class="text-[#ea4335]"
                >m</span
            >
        </h1>
    </div>

    <div class="w-full max-w-2xl px-4">
        <div class="relative group">
            <div
                class="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-5 h-5 text-gray-400 group-focus-within:text-blue-500"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                </svg>
            </div>
            <input
                type="text"
                class="w-full bg-white border border-gray-200 rounded-full py-4 pl-14 pr-12 text-lg shadow-sm hover:shadow-md focus:shadow-md focus:outline-none transition-shadow"
                placeholder="Search for museums in India"
                onkeydown={(e) =>
                    e.key === "Enter" && (window.location.href = "/museums")}
            />
            <div
                class="absolute inset-y-0 right-0 pr-6 flex items-center gap-3"
            >
                <button
                    class="text-blue-500 hover:text-blue-600"
                    aria-label="Voice Search"
                >
                    <svg viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor"
                        ><path
                            d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"
                        /><path
                            d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"
                        /></svg
                    >
                </button>
                <button
                    class="text-blue-500 hover:text-blue-600"
                    aria-label="Image Search"
                >
                    <svg viewBox="0 0 24 24" class="h-6 w-6" fill="currentColor"
                        ><path
                            d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-4 5h14l-5-7z"
                        /></svg
                    >
                </button>
            </div>
        </div>

        <div class="mt-8 flex justify-center gap-4">
            <a
                href="/museums"
                class="bg-[#f8f9fa] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-sm text-[#3c4043] px-6 py-2.5 rounded text-sm font-medium transition-all"
                >Google Search</a
            >
            <a
                href="/quiz"
                class="bg-[#f8f9fa] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-sm text-[#3c4043] px-6 py-2.5 rounded text-sm font-medium transition-all"
                >I'm Feeling Lucky</a
            >
        </div>
    </div>
</div>

<div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Material 3 Card -->
    <div
        class="bg-white rounded-[24px] overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group cursor-pointer"
        onclick={() => (window.location.href = "/museums")}
    >
        <div class="h-48 overflow-hidden relative">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Indian_Museum_Kolkata.jpg/1200px-Indian_Museum_Kolkata.jpg"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Museum"
            />
            <div
                class="absolute bottom-4 right-4 bg-white/90 backdrop-blur rounded-lg px-2 py-1 text-xs font-bold text-gray-700 shadow-sm"
            >
                Top Stories
            </div>
        </div>
        <div class="p-6">
            <h3
                class="text-xl font-medium text-[#202124] mb-2 group-hover:text-[#1a73e8] transition-colors"
            >
                Top 25 Museums
            </h3>
            <p class="text-[#5f6368] text-sm leading-relaxed mb-4">
                Curated collection of the most prestigious heritage sites in
                India.
            </p>
            <span class="text-[#1a73e8] text-sm font-medium hover:underline"
                >Read more</span
            >
        </div>
    </div>

    <!-- Material 3 Card -->
    <div
        class="bg-white rounded-[24px] overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group cursor-pointer"
        onclick={() => (window.location.href = "/dashboard")}
    >
        <div
            class="h-48 overflow-hidden relative bg-blue-50 flex items-center justify-center"
        >
            <div
                class="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-8 h-8"
                    ><path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    /></svg
                >
            </div>
        </div>
        <div class="p-6">
            <h3
                class="text-xl font-medium text-[#202124] mb-2 group-hover:text-[#1a73e8] transition-colors"
            >
                Your Wishlist
            </h3>
            <p class="text-[#5f6368] text-sm leading-relaxed mb-4">
                Access your saved places and reviews. Plan your next cultural
                trip completely free.
            </p>
            <span class="text-[#1a73e8] text-sm font-medium hover:underline"
                >View saved</span
            >
        </div>
    </div>

    <!-- Material 3 Card -->
    <div
        class="bg-white rounded-[24px] overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group cursor-pointer"
        onclick={() => (window.location.href = "/quiz")}
    >
        <div
            class="h-48 overflow-hidden relative bg-yellow-50 flex items-center justify-center"
        >
            <div
                class="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-8 h-8"
                    ><path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                    /></svg
                >
            </div>
        </div>
        <div class="p-6">
            <h3
                class="text-xl font-medium text-[#202124] mb-2 group-hover:text-[#1a73e8] transition-colors"
            >
                Knowledge Quiz
            </h3>
            <p class="text-[#5f6368] text-sm leading-relaxed mb-4">
                How well do you know Indian history? Take a quick 10-question
                quiz.
            </p>
            <span class="text-[#1a73e8] text-sm font-medium hover:underline"
                >Start quiz</span
            >
        </div>
    </div>
</div>
