<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    let { text } = $props();

    let isPlaying = $state(false);
    let synth: SpeechSynthesis;
    let utterance: SpeechSynthesisUtterance;
    let isSupported = $state(false);

    onMount(() => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            isSupported = true;
            synth = window.speechSynthesis;
            utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "en-US";
            utterance.onend = () => {
                isPlaying = false;
            };
            utterance.onerror = () => {
                isPlaying = false;
            };
        }
    });

    onDestroy(() => {
        if (synth && isPlaying) {
            synth.cancel();
        }
    });

    function togglePlay() {
        if (!isSupported) return;

        if (isPlaying) {
            synth.cancel();
            isPlaying = false;
        } else {
            synth.cancel(); // creating fresh utterance is safer cross-browser
            utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "en-US";
            // Try to find a good English voice
            const voices = synth.getVoices();
            const preferredVoice =
                voices.find((v) => v.lang.includes("en-GB")) ||
                voices.find((v) => v.lang.includes("en-US"));
            if (preferredVoice) utterance.voice = preferredVoice;

            utterance.onend = () => (isPlaying = false);
            synth.speak(utterance);
            isPlaying = true;
        }
    }
</script>

{#if isSupported}
    <button
        onclick={togglePlay}
        class="flex items-center gap-2 bg-[var(--md-sys-color-tertiary-container)] hover:bg-[var(--md-sys-color-tertiary-container)]/80 text-[var(--md-sys-color-on-tertiary-container)] px-4 py-2 rounded-full transition-all active:scale-95 shadow-sm"
        aria-label={isPlaying ? "Stop Audio Guide" : "Play Audio Guide"}
    >
        {#if isPlaying}
            <div class="flex items-center gap-1 h-4">
                <div
                    class="w-1 bg-current animate-[sound_0.5s_ease-in-out_infinite]"
                ></div>
                <div
                    class="w-1 bg-current animate-[sound_0.5s_ease-in-out_infinite_0.1s] h-3"
                ></div>
                <div
                    class="w-1 bg-current animate-[sound_0.5s_ease-in-out_infinite_0.2s]"
                ></div>
                <div
                    class="w-1 bg-current animate-[sound_0.5s_ease-in-out_infinite_0.1s] h-3"
                ></div>
            </div>
            <span class="text-sm font-medium">Listening...</span>
        {:else}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-5 h-5"
            >
                <path
                    d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 2.75 2.75 0 010-11.668.75.75 0 011.06-1.06z"
                />
                <path
                    d="M16.463 8.288a.75.75 0 011.06 0 2.25 2.25 0 010 7.424.75.75 0 01-1.06-1.06 3.75 3.75 0 000-5.304.75.75 0 010-1.06z"
                />
            </svg>
            <span class="text-sm font-medium">Audio Guide</span>
        {/if}
    </button>
{/if}

<style>
    @keyframes sound {
        0%,
        100% {
            height: 4px;
        }
        50% {
            height: 16px;
        }
    }
</style>
