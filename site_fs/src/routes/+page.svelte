<script lang="ts">
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte'
  import { DarkMode } from 'flowbite-svelte';
</script>

<Navbar let:hidden let:toggle color="form">
  <NavBrand>
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      Central Texas Rainfall Totals
    </span>
  </NavBrand>
  <DarkMode />
</Navbar>

<div class="container mx-auto">

  <p class="text-sky-800 dark:text-sky-400 p-4">
    Show rainfall from the Marble Falls 4 WSW LCRA Hydromet weather gauge
  </p>

  <div class="flex items-center justify-center text-center p-4">
    <div class="grow">
      <p class="text-sky-800 dark:text-sky-400">
        0 in<br />
        Today
      </p>
    </div>
    <div class="grow">
      <p class="text-sky-800 dark:text-sky-400">
        1.44 in<br />
        Last 5 days
      </p>
    </div>
    <div class="grow">
      <p class="text-sky-800 dark:text-sky-400">
        6.94 in<br />
        This year
      </p>
    </div>
  </div>

  <div class="flex items-center justify-center text-center p-4">
    <div class="grow">
      <p class="text-sky-800 dark:text-sky-400">
        1.44 in<br />
        Yesterday
      </p>
    </div>
    <div class="grow">
      <p class="text-sky-800 dark:text-sky-400">
        3.69 in<br />
        Last 30 days
      </p>
    </div>
    <div class="grow">
      <p class="text-sky-800 dark:text-sky-400">
        17.08 in<br />
        Last year
      </p>
    </div>
  </div>












</div>
