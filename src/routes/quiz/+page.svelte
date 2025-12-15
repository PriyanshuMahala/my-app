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
        <!-- Google Form Style Header -->
        <div
            class="bg-white rounded-t-lg border-t-8 border-t-purple-600 border-x border-b border-gray-200 shadow-sm p-8 mb-6 relative"
        >
            <h1 class="text-3xl font-medium text-[#202124] mb-2">
                Heritage Quiz
            </h1>
            <p class="text-[#5f6368] text-sm">
                Test your knowledge about Indian Museums and History.
            </p>
            <div
                class="absolute top-0 right-0 p-4 text-xs text-gray-500 font-medium tracking-wide"
            >
                QUESTION {currentQuestion + 1} OF {questions.length}
            </div>
        </div>

        <!-- Question Card -->
        <div
            class="bg-white rounded-lg border border-gray-200 shadow-sm p-8 mb-6 relative hover:shadow-md transition-shadow"
        >
            <div class="mb-8">
                <h2
                    class="text-lg font-medium text-[#202124] leading-relaxed select-none"
                >
                    {questions[currentQuestion].question}
                </h2>
                {#if isAnswered}
                    <p
                        class="mt-2 text-sm font-medium {questions[
                            currentQuestion
                        ].options[selectedOption!] ===
                        questions[currentQuestion].options[
                            questions[currentQuestion].answer
                        ]
                            ? 'text-green-600'
                            : 'text-red-600'}"
                    >
                        {questions[currentQuestion].options[selectedOption!] ===
                        questions[currentQuestion].options[
                            questions[currentQuestion].answer
                        ]
                            ? "Correct answer"
                            : "Wrong answer"}
                    </p>
                {/if}
            </div>

            <div class="space-y-3">
                {#each questions[currentQuestion].options as option, index}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                    <div
                        class="group flex items-center p-3 rounded-[4px] cursor-pointer transition-colors border border-transparent
            {!isAnswered ? 'hover:bg-gray-100' : ''}
            {isAnswered && index === questions[currentQuestion].answer
                            ? 'bg-green-50 border-green-200'
                            : ''}
            {isAnswered &&
                        index === selectedOption &&
                        index !== questions[currentQuestion].answer
                            ? 'bg-red-50 border-red-200'
                            : ''}"
                        onclick={() => !isAnswered && selectOption(index)}
                        role="radio"
                        aria-checked={selectedOption === index}
                        tabindex="0"
                    >
                        <!-- Radio Circle -->
                        <div
                            class="h-5 w-5 rounded-full border-2 flex items-center justify-center mr-4 transition-colors
                {selectedOption === index
                                ? 'border-purple-600'
                                : 'border-[#5f6368]'}
                {isAnswered && index === questions[currentQuestion].answer
                                ? '!border-green-600'
                                : ''}
                {isAnswered &&
                            index === selectedOption &&
                            index !== questions[currentQuestion].answer
                                ? '!border-red-600'
                                : ''}
            "
                        >
                            {#if selectedOption === index || (isAnswered && index === questions[currentQuestion].answer)}
                                <div
                                    class="h-2.5 w-2.5 rounded-full
                        {isAnswered &&
                                    index === questions[currentQuestion].answer
                                        ? 'bg-green-600'
                                        : ''}
                        {isAnswered &&
                                    index !== questions[currentQuestion].answer
                                        ? 'bg-red-600'
                                        : ''}
                        {!isAnswered ? 'bg-purple-600' : ''}
                    "
                                ></div>
                            {/if}
                        </div>

                        <span class="text-[#3c4043] font-medium text-base"
                            >{option}</span
                        >
                    </div>
                {/each}
            </div>

            <!-- Progress Line -->
            <div
                class="absolute bottom-0 left-0 w-full h-1 bg-gray-100 rounded-b-lg overflow-hidden"
            >
                <div
                    class="h-full bg-purple-600 transition-all duration-300"
                    style="width: {((currentQuestion + 1) / questions.length) *
                        100}%"
                ></div>
            </div>
        </div>
    {:else}
        <!-- Result Card -->
        <div
            class="bg-white rounded-lg border-t-8 border-t-purple-600 border border-gray-200 shadow-sm p-12 text-center"
            in:fly={{ y: 20 }}
        >
            <h2 class="text-4xl font-normal text-[#202124] mb-4">
                Quiz Completed
            </h2>

            <div class="inline-block p-6 rounded-full bg-purple-50 mb-6">
                <span class="text-5xl font-medium text-purple-600">{score}</span
                >
                <span class="text-xl text-purple-400">/{questions.length}</span>
            </div>

            <p class="text-[#5f6368] text-lg mb-8">
                {#if score === questions.length}
                    Outstanding! You are a true historian.
                {:else if score >= questions.length / 2}
                    Good job! You know your Indian heritage well.
                {:else}
                    Keep exploring! There is so much more to discover.
                {/if}
            </p>

            <div class="flex justify-center gap-4">
                <button
                    onclick={restartQuiz}
                    class="text-purple-600 font-medium hover:bg-purple-50 px-6 py-2 rounded text-sm transition-colors"
                    >Try again</button
                >
                <a
                    href="/museums"
                    class="bg-purple-600 text-white font-medium hover:bg-purple-700 px-6 py-2 rounded text-sm shadow-sm transition-colors"
                    >Explore Museums</a
                >
            </div>
        </div>
    {/if}
</div>
