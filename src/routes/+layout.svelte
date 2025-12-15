<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";

  let { data, children } = $props();

  let user = $derived(data.user);
</script>

<div
  class="min-h-screen bg-[#f8f9fa] text-[#202124] font-sans selection:bg-blue-100 selection:text-blue-900"
>
  <nav
    class="sticky top-0 z-50 bg-white shadow-sm px-4 py-2 flex items-center justify-between border-b border-gray-100/50"
  >
    <div class="flex items-center gap-2">
      <button
        class="p-3 rounded-full hover:bg-gray-100 transition-colors text-gray-500 lg:hidden"
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
      <a href="/" class="flex items-center gap-2 px-2">
        <span class="text-[22px] font-medium tracking-tight text-gray-600"
          >Digital<span class="font-bold text-gray-900">Museum</span></span
        >
      </a>
    </div>

    <div
      class="hidden md:flex items-center bg-[#f1f3f4] rounded-full px-1 py-1 lg:w-[480px] w-96 mx-4 transition-shadow focus-within:shadow-md focus-within:bg-white border border-transparent focus-within:border-gray-200"
    >
      <div class="pl-4 pr-2 text-gray-500">
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
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search museums, artifacts..."
        class="w-full bg-transparent border-none focus:ring-0 text-base placeholder-gray-500 h-10 outline-none"
      />
    </div>

    <div class="flex items-center gap-2 md:gap-3">
      <a
        href="/"
        class="hidden md:flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
        class:bg-blue-50={$page.url.pathname === "/"}
        class:text-blue-700={$page.url.pathname === "/"}>Home</a
      >
      <a
        href="/museums"
        class="hidden md:flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
        class:bg-blue-50={$page.url.pathname.startsWith("/museums")}
        class:text-blue-700={$page.url.pathname.startsWith("/museums")}
        >Museums</a
      >
      <a
        href="/quiz"
        class="hidden md:flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
        class:bg-blue-50={$page.url.pathname === "/quiz"}
        class:text-blue-700={$page.url.pathname === "/quiz"}>Quiz</a
      >

      <div class="w-px h-6 bg-gray-200 mx-1 hidden md:block"></div>

      {#if user}
        <a
          href="/dashboard"
          class="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-gray-100 transition-colors group"
        >
          <div
            class="h-8 w-8 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold"
          >
            {user.username.charAt(0).toUpperCase()}
          </div>
          <span class="text-sm font-medium text-gray-700 pr-2 hidden sm:block"
            >{user.username}</span
          >
        </a>
      {:else}
        <a
          href="/login"
          class="bg-[#1a73e8] hover:bg-[#1557b0] text-white px-6 py-2 rounded-md font-medium text-sm shadow-sm transition-colors"
          >Sign in</a
        >
      {/if}
    </div>
  </nav>

  <main class="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
    {@render children()}
  </main>
</div>
