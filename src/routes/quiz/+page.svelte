<script lang="ts">
    import { fade, fly } from "svelte/transition";

    const questions = [
        {
            question: "Which represents the 'Veiled Rebecca' sculpture?",
            options: [
                "National Museum, New Delhi",
                "Salar Jung Museum, Hyderabad",
                "Indian Museum, Kolkata",
                "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya, Mumbai",
            ],
            answer: 1,
        },
        {
            question: "Where is the oldest museum in India located?",
            options: ["Mumbai", "Chennai", "Kolkata", "New Delhi"],
            answer: 2,
        },
        {
            question: "Which museum houses the 'Didarganj Yakshi'?",
            options: [
                "Bihar Museum",
                "Patna Museum",
                "National Museum",
                "Mathura Museum",
            ],
            answer: 1,
        },
        {
            question: "The 'Calico Museum' is famous for?",
            options: ["Sculptures", "Coins", "Textiles", "paintings"],
            answer: 2,
        },
        {
            question: "Which museum is dedicated to the Partition of India?",
            options: [
                "Partition Museum, Amritsar",
                "National Museum",
                "Victoria Memorial",
                "War Memorial",
            ],
            answer: 0,
        },
        {
            question: "Where can you find the 'Fairy Queen' engine?",
            options: [
                "Heritage Transport Museum",
                "National Rail Museum",
                "Visvesvaraya Museum",
                "HAL Aerospace Museum",
            ],
            answer: 1,
        },
        {
            question: "Which museum is located in the 'Land of Black Magic'?",
            options: [
                "Don Bosco Museum",
                "Mayong Central Museum",
                "Tribal Museum",
                "Napier Museum",
            ],
            answer: 1,
        },
        {
            question:
                "The 'Shankar's International Dolls Museum' is located in?",
            options: ["New Delhi", "Mumbai", "Bangalore", "Pune"],
            answer: 0,
        },
        {
            question: "Where is the 'Naval Aviation Museum' situated?",
            options: ["Kochi", "Vishakhapatnam", "Goa", "Mumbai"],
            answer: 2,
        },
        {
            question:
                "Which museum was formerly known as Prince of Wales Museum?",
            options: [
                "Victoria Memorial",
                "Indian Museum",
                "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya",
                "Salar Jung Museum",
            ],
            answer: 2,
        },
    ];

    let currentQuestion = $state(0);
    let score = $state(0);
    let showResult = $state(false);
    let selectedOption = $state<number | null>(null);
    let isAnswered = $state(false);

    function selectOption(index: number) {
        if (isAnswered) return;
        selectedOption = index;
        isAnswered = true;

        if (index === questions[currentQuestion].answer) {
            score++;
        }

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                selectedOption = null;
                isAnswered = false;
            } else {
                showResult = true;
            }
        }, 1500);
    }

    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        showResult = false;
        selectedOption = null;
        isAnswered = false;
    }
</script>

<div class="max-w-3xl mx-auto py-12 px-4" in:fade>
    {#if !showResult}
        <!-- Header -->
        <div
            class="bg-[var(--md-sys-color-surface)] rounded-t-[32px] border-b border-[var(--md-sys-color-outline)]/20 shadow-sm p-8 mb-6 relative overflow-hidden"
        >
            <div
                class="absolute top-0 left-0 w-full h-2 bg-[var(--md-sys-color-tertiary)]"
            ></div>
            <h1
                class="text-3xl font-normal text-[var(--md-sys-color-on-surface)] mb-2"
            >
                Heritage Quiz
            </h1>
            <p class="text-[var(--md-sys-color-on-surface-variant)] text-sm">
                Test your knowledge about Indian Museums and History.
            </p>
            <div
                class="absolute top-8 right-8 px-4 py-1.5 rounded-full bg-[var(--md-sys-color-secondary-container)] text-xs text-[var(--md-sys-color-on-secondary-container)] font-bold tracking-wide"
            >
                QUESTION {currentQuestion + 1} OF {questions.length}
            </div>
        </div>

        <!-- Question Card -->
        <div
            class="bg-[var(--md-sys-color-surface)] rounded-[32px] border border-[var(--md-sys-color-outline)]/20 shadow-lg p-10 mb-6 relative hover:shadow-xl transition-all duration-300"
        >
            <div class="mb-10">
                <h2
                    class="text-2xl font-normal text-[var(--md-sys-color-on-surface)] leading-relaxed select-none"
                >
                    {questions[currentQuestion].question}
                </h2>
                {#if isAnswered}
                    <div in:fly={{ y: 10, duration: 300 }}>
                        <p
                            class="mt-4 text-sm font-bold inline-block px-3 py-1 rounded-lg {questions[
                                currentQuestion
                            ].options[selectedOption!] ===
                            questions[currentQuestion].options[
                                questions[currentQuestion].answer
                            ]
                                ? 'bg-[var(--md-sys-color-tertiary-container)] text-[var(--md-sys-color-on-tertiary-container)]'
                                : 'bg-[var(--md-sys-color-error-container)] text-[var(--md-sys-color-on-error-container)]'}"
                        >
                            {questions[currentQuestion].options[
                                selectedOption!
                            ] ===
                            questions[currentQuestion].options[
                                questions[currentQuestion].answer
                            ]
                                ? "Correct answer"
                                : "Wrong answer"}
                        </p>
                    </div>
                {/if}
            </div>

            <div class="space-y-4">
                {#each questions[currentQuestion].options as option, index}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                    <div
                        class="group flex items-center p-4 rounded-xl cursor-pointer transition-all border border-transparent relative overflow-hidden
            {!isAnswered
                            ? 'hover:bg-[var(--md-sys-color-surface-variant)]/30 active:scale-[0.99]'
                            : ''}
            {isAnswered && index === questions[currentQuestion].answer
                            ? 'bg-[var(--md-sys-color-tertiary-container)] border-[var(--md-sys-color-tertiary)]/20'
                            : ''}
            {isAnswered &&
                        index === selectedOption &&
                        index !== questions[currentQuestion].answer
                            ? 'bg-[var(--md-sys-color-error-container)] border-[var(--md-sys-color-error)]/20'
                            : ''}
            {!isAnswered ? 'bg-[var(--md-sys-color-surface-variant)]/10' : ''}"
                        onclick={() => !isAnswered && selectOption(index)}
                        role="radio"
                        aria-checked={selectedOption === index}
                        tabindex="0"
                    >
                        <!-- Radio Circle -->
                        <div
                            class="h-6 w-6 rounded-full border-2 flex items-center justify-center mr-5 transition-colors shrink-0
                {selectedOption === index
                                ? 'border-[var(--md-sys-color-tertiary)]'
                                : 'border-[var(--md-sys-color-outline)]'}
                {isAnswered && index === questions[currentQuestion].answer
                                ? '!border-[var(--md-sys-color-tertiary)]'
                                : ''}
                {isAnswered &&
                            index === selectedOption &&
                            index !== questions[currentQuestion].answer
                                ? '!border-[var(--md-sys-color-error)]'
                                : ''}
            "
                        >
                            {#if selectedOption === index || (isAnswered && index === questions[currentQuestion].answer)}
                                <div
                                    class="h-3 w-3 rounded-full
                        {isAnswered &&
                                    index === questions[currentQuestion].answer
                                        ? 'bg-[var(--md-sys-color-tertiary)]'
                                        : ''}
                        {isAnswered &&
                                    index !== questions[currentQuestion].answer
                                        ? 'bg-[var(--md-sys-color-error)]'
                                        : ''}
                        {!isAnswered ? 'bg-[var(--md-sys-color-tertiary)]' : ''}
                    "
                                ></div>
                            {/if}
                        </div>

                        <span
                            class="text-[var(--md-sys-color-on-surface)] font-medium text-lg"
                            >{option}</span
                        >
                    </div>
                {/each}
            </div>

            <!-- Progress Line -->
            <div
                class="absolute bottom-0 left-0 w-full h-1.5 bg-[var(--md-sys-color-surface-variant)]/30 overflow-hidden rounded-b-[32px]"
            >
                <div
                    class="h-full bg-[var(--md-sys-color-tertiary)] transition-all duration-300 ease-out"
                    style="width: {((currentQuestion + 1) / questions.length) *
                        100}%"
                ></div>
            </div>
        </div>
    {:else}
        <!-- Result Card -->
        <div
            class="bg-[var(--md-sys-color-surface)] rounded-[32px] border border-[var(--md-sys-color-outline)]/20 shadow-xl p-16 text-center"
            in:fly={{ y: 20 }}
        >
            <h2
                class="text-4xl font-normal text-[var(--md-sys-color-on-surface)] mb-8"
            >
                Quiz Completed
            </h2>

            <div
                class="inline-flex items-center justify-center w-40 h-40 rounded-full bg-[var(--md-sys-color-tertiary-container)] mb-8 shadow-inner"
            >
                <div class="text-center">
                    <span
                        class="block text-6xl font-medium text-[var(--md-sys-color-on-tertiary-container)]"
                        >{score}</span
                    >
                    <span
                        class="text-lg text-[var(--md-sys-color-on-tertiary-container)] opacity-70"
                        >/{questions.length}</span
                    >
                </div>
            </div>

            <p
                class="text-[var(--md-sys-color-on-surface-variant)] text-xl mb-12 max-w-lg mx-auto leading-relaxed"
            >
                {#if score === questions.length}
                    Outstanding! You are a true historian.
                {:else if score >= questions.length / 2}
                    Good job! You know your Indian heritage well.
                {:else}
                    Keep exploring! There is so much more to discover.
                {/if}
            </p>

            <div class="flex justify-center gap-6">
                <button
                    onclick={restartQuiz}
                    class="text-[var(--md-sys-color-primary)] font-bold hover:bg-[var(--md-sys-color-primary-container)]/30 px-8 py-3 rounded-full transition-colors"
                    >Try again</button
                >
                <a
                    href="/museums"
                    class="bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] font-bold hover:shadow-lg hover:bg-[var(--md-sys-color-primary)]/90 px-8 py-3 rounded-full transition-all active:translate-y-px"
                    >Explore Museums</a
                >
            </div>
        </div>
    {/if}
</div>
