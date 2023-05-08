<script>
  import { onMount } from "svelte";
  import { Bar } from "svelte-chartjs";
  import {
    Chart,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from "chart.js";

  Chart.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  );

  var data = {};
  var site = "";
  var listOfSites = [];
  var location = "";
  var lastOneHour = 0;
  var lastThreeHours = 0;
  var lastSixHours = 0;
  var lastTwentyFourHours = 0;
  var sinceMidnight = 0;
  var oneDayAgo = 0;
  var twoDaysAgo = 0;
  var threeDaysAgo = 0;
  var fourDaysAgo = 0;
  var fiveDayTotal = 0;
  var thirtyDayTotal = 0;
  var thisMonth = 0;
  var thisYear = 0;
  var lastYear = 0;

  let options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          suggestedMin: 0,
        },
        title: {
          display: true,
          text: "Rainfall Amount (in)",
        },
      },
    },
  };

  onMount(async () => {
    const response = await fetch(
      "https://rainfall-data-67ugd5bjtq-uc.a.run.app",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site: 2959 }),
      }
    );

    const res = await response.json();
    listOfSites = res.list_of_sites;
    site = res.rainfall_amounts[0]["site"];
    location = res.rainfall_amounts[0]["location"];
    lastOneHour = res.rainfall_amounts[0]["Previous 1 hour"];
    lastThreeHours = res.rainfall_amounts[0]["Previous 3 hours"];
    lastSixHours = res.rainfall_amounts[0]["Previous 6 hours"];
    lastTwentyFourHours = res.rainfall_amounts[0]["Previous 24 hours"];
    sinceMidnight = res.rainfall_amounts[0]["Since midnight"];
    oneDayAgo = res.rainfall_amounts[0]["1 day ago"];
    twoDaysAgo = res.rainfall_amounts[0]["2 days ago"];
    threeDaysAgo = res.rainfall_amounts[0]["3 days ago"];
    fourDaysAgo = res.rainfall_amounts[0]["4 days ago"];
    fiveDayTotal = res.rainfall_amounts[0]["5 day total"];
    thirtyDayTotal = res.rainfall_amounts[0]["30 day total"];
    thisMonth = res.rainfall_amounts[0]["This month"];
    thisYear = res.rainfall_amounts[0]["This year"];
    lastYear = res.rainfall_amounts[0]["Last year"];

    data = {
      labels: [
        "Last 1 hour",
        "Last 3 hours",
        "Last 6 hours",
        "Last 24 hours",
        "Since midnight",
        "1 day ago",
        "2 days ago",
        "3 days ago",
        "4 days ago",
        "5 day total",
      ],
      datasets: [
        {
          label: "Rainfall Amount",
          backgroundColor: "#0ea5e9",
          borderColor: "#0ea5e9",
          color: "#0ea5e9",
          data: [
            lastOneHour,
            lastThreeHours,
            lastSixHours,
            lastTwentyFourHours,
            sinceMidnight,
            oneDayAgo,
            twoDaysAgo,
            threeDaysAgo,
            fourDaysAgo,
            fiveDayTotal,
          ],
        },
      ],
    };
  });
</script>

<main class="min-h-screen bg-gray-50">
  <nav
    class="border-gray-200 bg-[#a3cef1] dark:border-gray-700 dark:bg-gray-800"
  >
    <div
      class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4"
    >
      <span
        class="self-center whitespace-nowrap text-2xl font-semibold text-gray-800 dark:text-white"
      >
        Central Texas Rainfall Totals
      </span>
    </div>
  </nav>

  <!-- TODO: Make the logic for this dropdown work -->
  <div class="m-4 -mb-1 ml-10 mt-2 p-4 text-xl text-gray-800">
    Showing rainfall from the
    <button
      id="dropdownSearchButton"
      data-dropdown-toggle="dropdownSearch"
      data-dropdown-placement="bottom"
      class="inline-flex items-center rounded-lg bg-[#a3cef1] px-4 py-1.5 text-center text-sm font-medium text-gray-800 hover:bg-[#6096ba] focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="button"
      >Marble Falls 4 WSW <svg
        class="ml-2 h-4 w-4"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        /></svg
      ></button
    >
    <div
      id="dropdownSearch"
      class="z-10 hidden w-60 rounded-lg bg-white shadow dark:bg-gray-700"
    >
      <div class="p-3">
        <label for="input-group-search" class="sr-only">Search</label>
        <div class="relative">
          <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          >
            <svg
              class="h-5 w-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              ><path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              /></svg
            >
          </div>
          <input
            type="text"
            id="input-group-search"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search locations"
          />
        </div>
      </div>
      <ul
        class="h-96 overflow-y-auto px-3 pb-3 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownSearchButton"
      >
        {#each listOfSites as site}
          <li>
            <div
              class="flex items-center rounded pl-2 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <label
                for="checkbox-item-12"
                class="ml-2 w-full rounded py-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >{site.location}</label
              >
            </div>
          </li>
        {/each}
      </ul>
    </div>
    LCRA Hydromet weather gauge
  </div>

  <section class="dark:bg-gray-900">
    <div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-2">
      <div class="mb-2 grid gap-8 md:grid-cols-3 lg:mb-2">
        <div
          class="place-content-center items-center rounded-lg bg-[#a3cef1] shadow dark:border-gray-700 dark:bg-gray-800 sm:flex"
        >
          <div class="p-5">
            <h3
              class="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {sinceMidnight} in
            </h3>
            <span class="text-gray-700 dark:text-gray-400"> Today </span>
          </div>
        </div>
        <div
          class="place-content-center items-center rounded-lg bg-[#a3cef1] shadow dark:border-gray-700 dark:bg-gray-800 sm:flex"
        >
          <div class="p-5">
            <h3
              class="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {fiveDayTotal} in
            </h3>
            <span class="text-gray-700 dark:text-gray-400"> Last 5 days </span>
          </div>
        </div>
        <div
          class="place-content-center items-center rounded-lg bg-[#a3cef1] shadow dark:border-gray-700 dark:bg-gray-800 sm:flex"
        >
          <div class="p-5">
            <h3
              class="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {thisYear} in
            </h3>
            <span class="text-gray-700 dark:text-gray-400"> This year </span>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-2">
      <div class="mb-2 grid gap-8 md:grid-cols-3 lg:mb-2">
        <div
          class="place-content-center items-center rounded-lg bg-[#a3cef1] shadow dark:border-gray-700 dark:bg-gray-800 sm:flex"
        >
          <div class="p-5">
            <h3
              class="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {oneDayAgo} in
            </h3>
            <span class="text-gray-700 dark:text-gray-400"> Yesterday </span>
          </div>
        </div>
        <div
          class="place-content-center items-center rounded-lg bg-[#a3cef1] shadow dark:border-gray-700 dark:bg-gray-800 sm:flex"
        >
          <div class="p-5">
            <h3
              class="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {thirtyDayTotal} in
            </h3>
            <span class="text-gray-700 dark:text-gray-400"> Last 30 days </span>
          </div>
        </div>
        <div
          class="place-content-center items-center rounded-lg bg-[#a3cef1] shadow dark:border-gray-700 dark:bg-gray-800 sm:flex"
        >
          <div class="p-5">
            <h3
              class="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {lastYear} in
            </h3>
            <span class="text-gray-700 dark:text-gray-400"> Last year </span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- TODO: Add banner when all rainfall amounts are zero -->
  <div
    class="chart-container pt-6"
    style="margin: auto; height: 45vh; width: 85vw;}"
  >
    <Bar {data} {options} />
  </div>
</main>
