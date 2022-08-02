<script setup>
import NavBar from "../components/NavBar.vue";
import Banner from "../components/Banner.vue";
</script>

<template>
  <!-- Navigation bar -->
  <NavBar />
  <!-- Banner -->
  <section class="bg-white">
    <div
      class="w-full px-5 py-6 mx-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16 max-w-7xl"
    >
      <!-- Featured Post -->
      <Banner />
    </div>
  </section>

  <!-- Footer -->
  <section class="text-gray-700 bg-white body-font">
    <div
      class="container flex flex-col items-center px-8 py-8 mx-auto max-w-7xl sm:flex-row"
    ></div>
  </section>
</template>
