<script lang="ts">
  import { Navbar, NavBrand, Card, DarkMode, Alert, Input } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { Bar } from "svelte-chartjs";
  import { page } from "$app/stores";
  import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

  Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

  Chart.defaults.backgroundColor = "#AAAAAA";
  Chart.defaults.borderColor = "#AAAAAA";
  Chart.defaults.color = "#AAAAAA";

  var data = {};
  var site = "";
  var selected = "";
  var listOfSites: any = [];
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

  // Get URL parameters
  const input_site = Number($page.url.searchParams.get("site") ?? "2959");

  onMount(async () => {
    // API request
    const response = await fetch("https://rainfall-data-67ugd5bjtq-uc.a.run.app", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ site: input_site }),
    });

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
    console.log(listOfSites);

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

<Navbar let:hidden let:toggle color="form">
  <NavBrand>
    <span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
      Central Texas Rainfall Totals
    </span>
  </NavBrand>
  <DarkMode />
</Navbar>

<div class="container mx-auto">
  <div class="align-center placement-center flex p-4 text-xl text-sky-800 dark:text-sky-400">
    <div class="m-auto mx-1">Showing rainfall from the</div>
    <div class="m-auto mx-1">
      <Input
        type="text"
        placeholder={location}
        list="sitelist"
        bind:value={selected}
        on:change={() =>
          (window.location.href = "https://rainfall.koverholt.com/?site=" + selected)}
      />
      <datalist id="sitelist" name="sitelist">
        {#each listOfSites as site}
          <option value={site.site} label={site.location} />
        {/each}
      </datalist>
    </div>
    <div class="m-auto mx-1">LCRA Hydromet weather gauge</div>
  </div>

  <div class="flex p-2 text-center">
    <div class="w-0 grow">
      <Card>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {sinceMidnight} in
        </h5>
        <p class="font-normal leading-tight text-gray-700 dark:text-gray-400">Today</p>
      </Card>
    </div>
    <div class="w-0 grow">
      <Card>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {fiveDayTotal} in
        </h5>
        <p class="font-normal leading-tight text-gray-700 dark:text-gray-400">Last 5 days</p>
      </Card>
    </div>
    <div class="w-0 grow">
      <Card>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {thisYear} in
        </h5>
        <p class="font-normal leading-tight text-gray-700 dark:text-gray-400">This year</p>
      </Card>
    </div>
  </div>

  <div class="flex p-2 text-center">
    <div class="w-0 grow">
      <Card>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {oneDayAgo} in
        </h5>
        <p class="font-normal leading-tight text-gray-700 dark:text-gray-400">Yesterday</p>
      </Card>
    </div>
    <div class="w-0 grow">
      <Card>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {thirtyDayTotal} in
        </h5>
        <p class="font-normal leading-tight text-gray-700 dark:text-gray-400">Last 30 days</p>
      </Card>
    </div>
    <div class="w-0 grow">
      <Card>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {lastYear} in
        </h5>
        <p class="font-normal leading-tight text-gray-700 dark:text-gray-400">Last year</p>
      </Card>
    </div>
  </div>

  {#if fiveDayTotal == 0 && location}
    <div class="min-w-full px-20 py-6">
      <Alert border color="yellow" class="text-xl">No rainfall in the past five days 😭</Alert>
    </div>
  {:else}
    <div class="chart-container pt-6" style="margin: auto; height: 45vh; width: 85vw;}">
      <Bar {data} {options} />
    </div>
  {/if}
</div>
