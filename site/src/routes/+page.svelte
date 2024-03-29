<script lang="ts">
  import { Alert, Card, Input, Button, Popover } from "flowbite-svelte";
  import { Navbar, NavBrand, DarkMode } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { Bar } from "svelte-chartjs";
  import { page } from "$app/stores";
  import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
  import { InformationCircle } from "svelte-heros-v2";

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
  var rainYoY = 0;
  var rainMoY = 0;
  var start = new Date();
  var diff = 0;
  var oneDay = 0;
  var currentDay = 0;
  var currentYear = 0;
  var numDaysInYear = 0;
  var percentYearComplete = 0;

  // Chart options
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

  const input_site = Number($page.url.searchParams.get("site") ?? "2959");

  onMount(async () => {
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

    var now = new Date();
    start = new Date(now.getFullYear(), 0, 0);
    diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
    oneDay = 1000 * 60 * 60 * 24;
    currentDay = Math.floor(diff / oneDay);
    currentYear = now.getFullYear();
    numDaysInYear = (currentYear % 4 === 0 && currentYear % 100 > 0) || currentYear % 400 == 0 ? 366 : 365;
    percentYearComplete = Math.round((currentDay / numDaysInYear) * 100);
    rainYoY = Math.round((thisYear / lastYear) * 100);
    rainMoY = Math.round((thisMonth / thisYear) * 100);

    // Chart data
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

<Navbar color="form" class="py-4">
  <NavBrand href="#">
    <span class="self-center whitespace-nowrap pl-4 text-xl font-semibold dark:text-white lg:pl-0 lg:text-2xl">
      Central Texas Rainfall Totals
    </span>
  </NavBrand>
  <div class="flex lg:space-x-0 lg:space-x-2">
    <div>
      <Button id="facts" class="!p-2" color="primary">
        <InformationCircle class="text-gray-400" />
      </Button>
      <Popover
        style="custom"
        arrow={false}
        defaultClass="py-3 px-6"
        class="w-96 bg-gray-50 text-sm dark:bg-gray-800"
        title="Fun facts from rainfall data"
        color="white"
        placement="bottom-end"
        triggeredBy="#facts"
        trigger="hover"
      >
        <ul class="list-inside list-disc space-y-0.5 pb-1 text-sky-600 dark:text-sky-400">
          <li>We are {percentYearComplete}% of the way through the year</li>
          <li>So far, we've had {rainYoY}% of last year's rainfall</li>
          <li>{rainMoY}% of this year's rain fell in the last 30 days</li>
        </ul>
      </Popover>
    </div>
    <div><DarkMode /></div>
  </div>
</Navbar>

<main>
  <div class="container mx-auto">
    <div class="align-center placement-center flex p-4 text-center text-sm text-sky-800 dark:text-sky-400 lg:text-xl">
      <div class="m-auto mx-1">Showing rainfall from the</div>
      <div class="m-auto mx-1">
        <Input
          type="text"
          placeholder={location}
          list="sitelist"
          bind:value={selected}
          on:change={() => (window.location.href = "https://rainfall.koverholt.com/?site=" + selected)}
        />
        <datalist id="sitelist" name="sitelist">
          {#each listOfSites as site}
            <option value={site.site} label={site.location} />
          {/each}
        </datalist>
      </div>
      <div class="m-auto mx-1"><a href="https://hydromet.lcra.org">LCRA Hydromet weather gauge</a></div>
    </div>

    <div class="flex space-x-4 p-2 text-center lg:space-x-0">
      <div class="w-0 grow">
        <Card>
          {#if !location}
            <div class="mx-auto items-center justify-items-center">
              <div>
                <div role="status" class="max-w-sm animate-pulse">
                  <div class="mb-4 h-4 w-12 rounded-full bg-gray-200 dark:bg-gray-700 md:h-6 md:w-20 md:w-48" />
                  <div class="mb-2.5 h-3 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700 md:h-4" />
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          {:else}
            <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white lg:text-2xl">
              {sinceMidnight} in
            </h5>
            <p class="text-sm font-normal leading-tight text-gray-700 dark:text-gray-400 lg:text-base">Today</p>
          {/if}
        </Card>
      </div>
      <div class="w-0 grow">
        <Card>
          {#if !location}
            <div class="mx-auto items-center justify-items-center">
              <div>
                <div role="status" class="max-w-sm animate-pulse">
                  <div class="mb-4 h-4 w-12 rounded-full bg-gray-200 dark:bg-gray-700 md:h-6 md:w-20 md:w-48" />
                  <div class="mb-2.5 h-3 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700 md:h-4" />
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          {:else}
            <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white lg:text-2xl">
              {fiveDayTotal} in
            </h5>
            <p class="text-sm font-normal leading-tight text-gray-700 dark:text-gray-400 lg:text-base">Last 5 days</p>
          {/if}
        </Card>
      </div>
      <div class="w-0 grow">
        <Card>
          {#if !location}
            <div class="mx-auto items-center justify-items-center">
              <div>
                <div role="status" class="max-w-sm animate-pulse">
                  <div class="mb-4 h-4 w-12 rounded-full bg-gray-200 dark:bg-gray-700 md:h-6 md:w-20 md:w-48" />
                  <div class="mb-2.5 h-3 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700 md:h-4" />
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          {:else}
            <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white lg:text-2xl">
              {thisYear} in
            </h5>
            <p class="text-sm font-normal leading-tight text-gray-700 dark:text-gray-400 lg:text-base">This year</p>
          {/if}
        </Card>
      </div>
    </div>

    <div class="flex space-x-2 p-2 text-center lg:space-x-0">
      <div class="w-0 grow">
        <Card>
          {#if !location}
            <div class="mx-auto items-center justify-items-center">
              <div>
                <div role="status" class="max-w-sm animate-pulse">
                  <div class="mb-4 h-4 w-12 rounded-full bg-gray-200 dark:bg-gray-700 md:h-6 md:w-20 md:w-48" />
                  <div class="mb-2.5 h-3 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700 md:h-4" />
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          {:else}
            <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white lg:text-2xl">
              {oneDayAgo} in
            </h5>
            <p class="text-sm font-normal leading-tight text-gray-700 dark:text-gray-400 lg:text-base">Yesterday</p>
          {/if}
        </Card>
      </div>
      <div class="w-0 grow">
        <Card>
          {#if !location}
            <div class="mx-auto items-center justify-items-center">
              <div>
                <div role="status" class="max-w-sm animate-pulse">
                  <div class="mb-4 h-4 w-12 rounded-full bg-gray-200 dark:bg-gray-700 md:h-6 md:w-20 md:w-48" />
                  <div class="mb-2.5 h-3 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700 md:h-4" />
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          {:else}
            <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white lg:text-2xl">
              {thirtyDayTotal} in
            </h5>
            <p class="text-sm font-normal leading-tight text-gray-700 dark:text-gray-400 lg:text-base">Last 30 days</p>
          {/if}
        </Card>
      </div>
      <div class="w-0 grow">
        <Card>
          {#if !location}
            <div class="mx-auto items-center justify-items-center">
              <div>
                <div role="status" class="max-w-sm animate-pulse">
                  <div class="mb-4 h-4 w-12 rounded-full bg-gray-200 dark:bg-gray-700 md:h-6 md:w-20 md:w-48" />
                  <div class="mb-2.5 h-3 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700 md:h-4" />
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          {:else}
            <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white lg:text-2xl">
              {lastYear} in
            </h5>
            <p class="text-sm font-normal leading-tight text-gray-700 dark:text-gray-400 lg:text-base">Last year</p>
          {/if}
        </Card>
      </div>
    </div>

    {#if !location}
      <div
        class="mx-auto grid max-h-[45vh] w-[70vw] grid-cols-1 grid-rows-1 items-center justify-items-center pr-[0vw] pt-8 md:pr-[7vw] md:pt-6"
      >
        <div
          role="status"
          class="min-h-[30vh] min-w-[60vw] max-w-[60vw] animate-pulse rounded border border-gray-200 p-0 shadow dark:border-gray-700 md:min-h-[40vh]"
        >
          <div class="mt-10 flex h-full items-baseline space-x-2 px-2 md:mt-56 md:space-x-10 md:px-4">
            <div class="h-4 w-6 bg-gray-200 dark:bg-gray-700 md:h-4 md:w-24" />
            <div class="h-8 w-6 bg-gray-200 dark:bg-gray-700 md:h-8 md:w-24" />
            <div class="h-12 w-6 bg-gray-200 dark:bg-gray-700 md:h-12 md:w-24" />
            <div class="h-32 w-6 bg-gray-200 dark:bg-gray-700 md:h-32 md:w-24" />
            <div class="h-40 w-6 bg-gray-200 dark:bg-gray-700 md:h-40 md:w-24" />
            <div class="h-20 w-6 bg-gray-200 dark:bg-gray-700 md:h-20 md:w-24" />
            <div class="h-32 w-6 bg-gray-200 dark:bg-gray-700 md:h-32 md:w-24" />
            <div class="h-40 w-6 bg-gray-200 dark:bg-gray-700 md:h-40 md:w-24" />
            <div class="h-52 w-6 bg-gray-200 dark:bg-gray-700 md:h-52 md:w-24" />
            <div class="h-56 w-6 bg-gray-200 dark:bg-gray-700 md:h-56 md:w-24" />
          </div>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    {:else if fiveDayTotal == 0 && location}
      <div class="mx-20 px-4 py-6">
        <Alert border color="yellow" class="p-4 pl-8 text-xl">No rainfall in the past five days 😭</Alert>
      </div>
    {:else}
      <div class="mx-auto grid h-[45vh] w-[70vw] grid-cols-1 grid-rows-1 pr-[8vw] pt-6">
        <div class="chart-container">
          <Bar {data} {options} />
        </div>
      </div>
    {/if}
  </div>
</main>
