<script lang="ts">
    import { enhance } from "$app/forms";
    let { form } = $props();

    let isRegister = $state(false);
</script>

<div
    class="flex items-center justify-center min-h-[calc(100vh-160px)] py-12 px-4"
>
    <div
        class="w-full max-w-[480px] bg-[var(--md-sys-color-surface-container-low)] rounded-[32px] p-8 md:p-12 shadow-xl border border-[var(--md-sys-color-outline)]/10"
    >
        <div class="text-center mb-10">
            <div class="inline-block mb-6">
                <span
                    class="text-3xl font-medium tracking-tight text-[var(--md-sys-color-on-surface)]"
                    >Digital<span
                        class="font-bold text-[var(--md-sys-color-primary)]"
                        >Museum</span
                    ></span
                >
            </div>
            <h2
                class="text-3xl font-normal text-[var(--md-sys-color-on-surface)] mb-3"
            >
                {isRegister ? "Create Account" : "Welcome Back"}
            </h2>
            <p class="text-[var(--md-sys-color-on-surface-variant)] text-base">
                {isRegister
                    ? "Join to save your favorite museums"
                    : "Sign in to continue to your dashboard"}
            </p>
        </div>

        {#if form?.incorrect}
            <div
                class="bg-[var(--md-sys-color-error-container)] text-[var(--md-sys-color-on-error-container)] px-4 py-3 rounded-xl mb-6 flex items-center gap-2"
                role="alert"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-5 h-5"
                >
                    <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                    />
                </svg>
                <span class="font-medium"
                    >Wrong credentials. Please try again.</span
                >
            </div>
        {/if}

        {#if form?.taken}
            <div
                class="bg-[var(--md-sys-color-error-container)] text-[var(--md-sys-color-on-error-container)] px-4 py-3 rounded-xl mb-6 flex items-center gap-2"
                role="alert"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-5 h-5"
                >
                    <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                    />
                </svg>
                <span class="font-medium"
                    >Username already taken. Try another.</span
                >
            </div>
        {/if}

        <form
            method="POST"
            action="?/{isRegister ? 'register' : 'login'}"
            use:enhance
            class="space-y-6"
        >
            <div class="space-y-5">
                <div class="relative group">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        required
                        placeholder=" "
                        class="peer w-full bg-[var(--md-sys-color-surface-variant)]/30 border border-[var(--md-sys-color-outline)]/20 rounded-xl px-4 py-3.5 text-[var(--md-sys-color-on-surface)] focus:border-[var(--md-sys-color-primary)] focus:ring-2 focus:ring-[var(--md-sys-color-primary)]/20 outline-none transition-all placeholder-transparent"
                    />
                    <label
                        for="username"
                        class="absolute left-4 -top-2.5 bg-[var(--md-sys-color-surface-container-low)] px-1 text-xs text-[var(--md-sys-color-primary)] transition-all
                       peer-placeholder-shown:text-base peer-placeholder-shown:text-[var(--md-sys-color-on-surface-variant)] peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4
                       peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[var(--md-sys-color-primary)] pointer-events-none"
                    >
                        Username
                    </label>
                </div>

                <div class="relative group">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        placeholder=" "
                        class="peer w-full bg-[var(--md-sys-color-surface-variant)]/30 border border-[var(--md-sys-color-outline)]/20 rounded-xl px-4 py-3.5 text-[var(--md-sys-color-on-surface)] focus:border-[var(--md-sys-color-primary)] focus:ring-2 focus:ring-[var(--md-sys-color-primary)]/20 outline-none transition-all placeholder-transparent"
                    />
                    <label
                        for="password"
                        class="absolute left-4 -top-2.5 bg-[var(--md-sys-color-surface-container-low)] px-1 text-xs text-[var(--md-sys-color-primary)] transition-all
                       peer-placeholder-shown:text-base peer-placeholder-shown:text-[var(--md-sys-color-on-surface-variant)] peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-4
                       peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[var(--md-sys-color-primary)] pointer-events-none"
                    >
                        Password
                    </label>
                </div>
            </div>

            <div
                class="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4"
            >
                <button
                    type="button"
                    class="text-sm font-medium text-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-primary-container)]/20 px-4 py-2.5 rounded-full transition-colors"
                    onclick={() => {
                        isRegister = !isRegister;
                        form = null;
                    }}
                >
                    {isRegister ? "Already have an account?" : "Create account"}
                </button>
                <button
                    type="submit"
                    class="bg-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-primary)]/90 text-[var(--md-sys-color-on-primary)] px-8 py-2.5 rounded-full font-bold text-sm shadow-md transition-all hover:shadow-lg w-full sm:w-auto"
                >
                    {isRegister ? "Sign Up" : "Sign In"}
                </button>
            </div>
        </form>
    </div>
</div>
