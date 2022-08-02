<template>
  <section
    class="relative w-full px-8 text-gray-700 bg-white body-font"
    data-tails-scripts="//unpkg.com/alpinejs"
  >
    <div
      class="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl"
    >
      <router-link
        to="/"
        class="relative z-10 flex items-center w-auto text-2xl font-extrabold leading-none text-black select-none"
        >Roumain vs Gaulois.
      </router-link>

      <div
        class="relative z-10 inline-flex items-center space-x-3 md:ml-5 lg:justify-end"
      >
        <router-link
          class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none"
          to="/login"
          >Se connecter
        </router-link>
        <span class="inline-flex rounded-md shadow-sm">
          <router-link
            class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            to="/signup"
            >Créer un compte
          </router-link>
        </span>
      </div>
    </div>
  </section>
</template>
