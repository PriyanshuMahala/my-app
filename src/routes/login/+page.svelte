<script lang="ts">
    import { enhance } from "$app/forms";
    let { form } = $props();

    let isRegister = $state(false);
</script>

<div class="flex items-center justify-center min-h-[calc(100vh-160px)] py-12">
    <div
        class="w-full max-w-[450px] bg-white rounded-lg border border-[#dadce0] p-10 lg:p-12"
    >
        <div class="text-center mb-10">
            <div class="inline-block mb-4">
                <span class="text-2xl font-medium tracking-tight text-gray-600"
                    >Digital<span class="font-bold text-gray-900">Museum</span
                    ></span
                >
            </div>
            <h2 class="text-2xl font-normal text-[#202124] mb-2">
                {isRegister ? "Create your Google Account" : "Sign in"}
            </h2>
            <p class="text-[#202124] text-base">
                {isRegister
                    ? "to continue to DigitalMuseum"
                    : "to continue to DigitalMuseum"}
            </p>
        </div>

        <form
            method="POST"
            action="?/{isRegister ? 'register' : 'login'}"
            use:enhance
            class="space-y-6"
        >
            <div class="space-y-5">
                <div class="relative pt-2">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        required
                        placeholder=" "
                        class="peer h-10 w-full border border-[#dadce0] rounded px-3 text-[#202124] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 outline-none transition-all placeholder-transparent"
                    />
                    <label
                        for="username"
                        class="absolute left-3 -top-2.5 bg-white px-1 text-xs text-[#1a73e8] transition-all
                       peer-placeholder-shown:text-base peer-placeholder-shown:text-[#5f6368] peer-placeholder-shown:top-2
                       peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#1a73e8] pointer-events-none"
                    >
                        Username
                    </label>
                </div>

                <div class="relative pt-2">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        placeholder=" "
                        class="peer h-10 w-full border border-[#dadce0] rounded px-3 text-[#202124] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 outline-none transition-all placeholder-transparent"
                    />
                    <label
                        for="password"
                        class="absolute left-3 -top-2.5 bg-white px-1 text-xs text-[#1a73e8] transition-all
                       peer-placeholder-shown:text-base peer-placeholder-shown:text-[#5f6368] peer-placeholder-shown:top-2
                       peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#1a73e8] pointer-events-none"
                    >
                        Password
                    </label>
                </div>
            </div>

            <div class="flex items-center justify-between pt-4">
                <button
                    type="button"
                    class="text-sm font-medium text-[#1a73e8] hover:bg-[#f6fafe] px-2 py-1.5 rounded transition-colors"
                    onclick={() => (isRegister = !isRegister)}
                >
                    {isRegister ? "Sign in instead" : "Create account"}
                </button>
                <button
                    type="submit"
                    class="bg-[#1a73e8] hover:bg-[#1557b0] text-white px-6 py-2 rounded font-medium text-sm shadow-sm transition-all"
                >
                    {isRegister ? "Next" : "Next"}
                </button>
            </div>
        </form>
    </div>
</div>
