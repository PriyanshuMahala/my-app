<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  import { fade, fly } from "svelte/transition";

  import { onMount } from "svelte";

  let { data, children } = $props();

  let user = $derived(data.user);
  let isMobileMenuOpen = $state(false);
  let isDarkMode = $state(false);

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function closeMobileMenu() {
    isMobileMenuOpen = false;
  }

  function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  onMount(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      isDarkMode = true;
      document.documentElement.classList.add("dark");
    } else {
      isDarkMode = false;
      document.documentElement.classList.remove("dark");
    }
  });
</script>

<div
  class="min-h-screen bg-[var(--md-sys-color-background)] text-[var(--md-sys-color-on-background)] font-sans selection:bg-[var(--md-sys-color-primary-container)] selection:text-[var(--md-sys-color-on-primary-container)] transition-colors duration-300"
>
  <!-- Floating Navbar Island -->
  <div
    class="fixed top-4 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none"
  >
    <nav
      class="w-full max-w-4xl bg-[var(--md-sys-color-surface-container-high)]/80 backdrop-blur-xl shadow-lg border border-[var(--md-sys-color-outline)]/10 rounded-full px-2 pl-6 py-2 flex items-center justify-between pointer-events-auto transition-all duration-300 hover:shadow-xl hover:bg-[var(--md-sys-color-surface-container-high)]/95"
    >
      <div class="flex items-center gap-2">
        <button
          onclick={toggleMobileMenu}
          class="p-2 rounded-full hover:bg-[var(--md-sys-color-on-surface)]/10 transition-colors text-[var(--md-sys-color-on-surface)] md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <a
          href="/"
          class="flex items-center gap-2 pr-4"
          onclick={closeMobileMenu}
        >
          <span
            class="text-xl font-bold tracking-tight text-[var(--md-sys-color-on-surface)]"
          >
            Digi<span class="text-[var(--md-sys-color-primary)]">Museum</span>
          </span>
        </a>
      </div>

      <div class="flex items-center gap-1">
        <div class="hidden md:flex items-center gap-1 mr-2">
          <a
            href="/"
            class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden group"
            class:text-[var(--md-sys-color-on-surface)]={$page.url.pathname !==
              "/"}
            class:font-bold={$page.url.pathname === "/"}
            class:text-[var(--md-sys-color-primary)]={$page.url.pathname ===
              "/"}
            class:bg-[var(--md-sys-color-primary-container)]={$page.url
              .pathname === "/"}
          >
            <div
              class="absolute inset-0 bg-[var(--md-sys-color-on-surface)]/5 opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
            Home
          </a>
          <a
            href="/museums"
            class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden group"
            class:text-[var(--md-sys-color-on-surface)]={!$page.url.pathname.startsWith(
              "/museums",
            )}
            class:font-bold={$page.url.pathname.startsWith("/museums")}
            class:text-[var(--md-sys-color-primary)]={$page.url.pathname.startsWith(
              "/museums",
            )}
            class:bg-[var(--md-sys-color-primary-container)]={$page.url.pathname.startsWith(
              "/museums",
            )}
          >
            <div
              class="absolute inset-0 bg-[var(--md-sys-color-on-surface)]/5 opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
            Museums
          </a>
          <a
            href="/explore"
            class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden group"
            class:text-[var(--md-sys-color-on-surface)]={$page.url.pathname !==
              "/explore"}
            class:font-bold={$page.url.pathname === "/explore"}
            class:text-[var(--md-sys-color-primary)]={$page.url.pathname ===
              "/explore"}
            class:bg-[var(--md-sys-color-primary-container)]={$page.url
              .pathname === "/explore"}
          >
            <div
              class="absolute inset-0 bg-[var(--md-sys-color-on-surface)]/5 opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
            Explore
          </a>
          <a
            href="/quiz"
            class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden group"
            class:text-[var(--md-sys-color-on-surface)]={$page.url.pathname !==
              "/quiz"}
            class:font-bold={$page.url.pathname === "/quiz"}
            class:text-[var(--md-sys-color-primary)]={$page.url.pathname ===
              "/quiz"}
            class:bg-[var(--md-sys-color-primary-container)]={$page.url
              .pathname === "/quiz"}
          >
            <div
              class="absolute inset-0 bg-[var(--md-sys-color-on-surface)]/5 opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
            Quiz
          </a>
        </div>

        <button
          onclick={toggleDarkMode}
          class="p-2.5 rounded-full hover:bg-[var(--md-sys-color-on-surface)]/10 transition-colors text-[var(--md-sys-color-on-surface-variant)]"
          aria-label="Toggle Dark Mode"
        >
          {#if isDarkMode}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          {:else}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          {/if}
        </button>

        {#if user}
          <a
            href="/dashboard"
            class="flex items-center justify-center h-10 w-10 ml-2 rounded-full bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] font-bold shadow-sm hover:ring-2 hover:ring-[var(--md-sys-color-primary-container)] transition-all"
            title="Dashboard"
          >
            {user.username.charAt(0).toUpperCase()}
          </a>
        {:else}
          <a
            href="/login"
            class="ml-2 bg-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-primary)]/90 text-[var(--md-sys-color-on-primary)] px-5 py-2 rounded-full font-medium text-sm shadow-sm transition-all hover:shadow-md whitespace-nowrap"
            >Sign in</a
          >
        {/if}
      </div>
    </nav>
  </div>

  <!-- Mobile Menu Drawer -->
  {#if isMobileMenuOpen}
    <div class="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        class="fixed inset-0 bg-gray-600/75 transition-opacity backdrop-blur-sm"
        onclick={closeMobileMenu}
        role="button"
        tabindex="0"
        onkeydown={(e) => {
          if (e.key === "Escape" || e.key === "Enter" || e.key === " ")
            closeMobileMenu();
        }}
        in:fade={{ duration: 200 }}
        out:fade={{ duration: 200 }}
      ></div>

      <div
        class="fixed inset-y-0 left-0 z-40 w-full max-w-xs bg-[var(--md-sys-color-surface)] shadow-xl flex flex-col"
        in:fly={{ x: -300, duration: 300 }}
        out:fly={{ x: -300, duration: 300 }}
      >
        <div
          class="px-6 pt-5 pb-6 flex items-center justify-between border-b border-[var(--md-sys-color-outline)]/20"
        >
          <div class="flex items-center gap-2">
            <span
              class="text-xl font-medium tracking-tight text-[var(--md-sys-color-on-surface)]"
              >Digital<span class="font-bold text-[var(--md-sys-color-primary)]"
                >Museum</span
              ></span
            >
          </div>
          <button
            onclick={closeMobileMenu}
            class="rounded-full p-2 text-gray-500 hover:bg-gray-100 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <a
            href="/"
            onclick={closeMobileMenu}
            class="block px-4 py-3 rounded-lg text-base font-medium transition-colors {$page
              .url.pathname === '/'
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-50'}">Home</a
          >
          <a
            href="/museums"
            onclick={closeMobileMenu}
            class="block px-4 py-3 rounded-lg text-base font-medium transition-colors {$page.url.pathname.startsWith(
              '/museums',
            )
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-50'}">Museums</a
          >
          <a
            href="/quiz"
            onclick={closeMobileMenu}
            class="block px-4 py-3 rounded-lg text-base font-medium transition-colors {$page
              .url.pathname === '/quiz'
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-50'}">Heritage Quiz</a
          >
          <a
            href="/dashboard"
            onclick={closeMobileMenu}
            class="block px-4 py-3 rounded-lg text-base font-medium transition-colors {$page
              .url.pathname === '/dashboard'
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-50'}">My Dashboard</a
          >
        </div>

        <div class="p-4 border-t border-gray-100 bg-gray-50">
          {#if user}
            <div class="flex items-center gap-3 px-4 py-2">
              <div
                class="h-10 w-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold"
              >
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Signed in as</p>
                <p class="text-sm font-bold text-gray-700">{user.username}</p>
              </div>
            </div>
          {:else}
            <a
              href="/login"
              onclick={closeMobileMenu}
              class="block w-full text-center bg-[#1a73e8] text-white px-4 py-3 rounded-lg font-medium shadow-sm"
              >Sign In / Register</a
            >
          {/if}
        </div>
      </div>
    </div>
  {/if}

  <main class="max-w-[1280px] mx-auto px-4 sm:px-6 pt-24 pb-12">
    {@render children()}
  </main>
</div>
