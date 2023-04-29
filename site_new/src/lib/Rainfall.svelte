<script>
  import { onMount } from 'svelte';
  import { Bar } from 'svelte-chartjs'
  import {Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js';
  Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

  var data = {};
  var options = {};
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
  var thisYear = 0;
  var lastYear = 0;
  var location = "";

  onMount(async () => {
    const response = await fetch("https://rainfall-data-67ugd5bjtq-uc.a.run.app", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({site: 2959})
    });

    const res = await response.json();
    lastOneHour = res.rainfall_amounts[0]["Last 1 hour"]
    lastThreeHours = res.rainfall_amounts[0]["Last 3 hours"]
    lastSixHours = res.rainfall_amounts[0]["Last 6 hours"]
    lastTwentyFourHours = res.rainfall_amounts[0]["Last 24 hours"]
    sinceMidnight = res.rainfall_amounts[0]["Since midnight"]
    oneDayAgo = res.rainfall_amounts[0]["1 day ago"]
    twoDaysAgo = res.rainfall_amounts[0]["2 days ago"]
    threeDaysAgo = res.rainfall_amounts[0]["3 days ago"]
    fourDaysAgo = res.rainfall_amounts[0]["4 days ago"]
    fiveDayTotal = res.rainfall_amounts[0]["5 day total"]
    thirtyDayTotal = res.rainfall_amounts[0]["30 day total"]
    thisYear = res.rainfall_amounts[0]["This year"]
    lastYear = res.rainfall_amounts[0]["Last year"]
    location = res.rainfall_amounts[0]["location"]

    data = {
      labels: ["Last 1 hour", "Last 3 hours", "Last 6 hours", "Last 24 hours", "Since midnight", "1 day ago", "2 days ago", "3 days ago", "4 days ago", "5 day total"],
      datasets: [{
        label: "Rainfall Amount",
          backgroundColor: "#0ea5e9",
          borderColor: "#0ea5e9",
          color: "#0ea5e9",
          data: [lastOneHour, lastThreeHours, lastSixHours, lastTwentyFourHours, sinceMidnight, oneDayAgo, twoDaysAgo, threeDaysAgo, fourDaysAgo, fiveDayTotal]
      }],
    }

    let options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
            ticks: {
              suggestedMin: 0
            },
            title: {
              display: true,
              text: "Rainfall Amount (in)"
            }
          }
      }
    }
  })
</script>

<div class="min-h-screen pt-5 bg-gray-800 text-gray-100">
	<div>
		<main>
			<div class="container mx-auto space-y-16">
				<section>
          <div class="pb-4 -mb-2 bg-sky-900 rounded-2xl p-6">
            <h2 class="text-4xl font-bold text-gray-50 pb-3">Central Texas Rainfall Totals</h2>
            <span class="block mb-2 text-small font-medium tracking-widest text-sky-300">Showing rainfall from the {location} <a href="https://hydromet.lcra.org/">LCRA Hydromet</a> weather gauge</span>
          </div>
					<div class="grid gap-6 my-6 lg:grid-cols-3 lg:text-center">
						<div class="flex flex-col p-6 -mb-2 space-y-4 rounded-2xl bg-gray-900">
							<div class="flex items-center justify-center m-auto flex-shrink-0 w-48 h-12 text-xl font-bold rounded-full bg-sky-300 text-gray-900">
                {sinceMidnight} in
              </div>
							<p class="text-xl font-semibold">
							  Since midnight
							</p>
						</div>
						<div class="flex flex-col p-6 -mb-2 space-y-4 rounded-2xl bg-gray-900">
							<div class="flex items-center justify-center m-auto flex-shrink-0 w-48 h-12 text-xl font-bold rounded-full bg-sky-300 text-gray-900">
                {fiveDayTotal} in
              </div>
							<p class="text-xl font-semibold">
							  Last 5 days
							</p>
						</div>
						<div class="flex flex-col p-6 -mb-2 space-y-4 rounded-2xl bg-gray-900">
							<div class="flex items-center justify-center m-auto flex-shrink-0 w-48 h-12 text-xl font-bold rounded-full bg-sky-300 text-gray-900">
                {thisYear} in
              </div>
							<p class="text-xl font-semibold">
								This year
							</p>
						</div>
					</div>
          <div class="grid gap-6 my-6 lg:grid-cols-3 lg:text-center">
						<div class="flex flex-col p-6  space-y-4 rounded-2xl bg-gray-900">
							<div class="flex items-center justify-center m-auto flex-shrink-0 w-48 h-12 text-xl font-bold rounded-full bg-sky-300 text-gray-900">
                {oneDayAgo} in
              </div>
							<p class="text-xl font-semibold">
							  Yesterday
							</p>
						</div>
						<div class="flex flex-col p-6  space-y-4 rounded-2xl bg-gray-900">
							<div class="flex items-center justify-center m-auto flex-shrink-0 w-48 h-12 text-xl font-bold rounded-full bg-sky-300 text-gray-900">
                {thirtyDayTotal} in
              </div>
							<p class="text-xl font-semibold">
							  Last 30 days
							</p>
						</div>
						<div class="flex flex-col p-6  space-y-4 rounded-2xl bg-gray-900">
							<div class="flex items-center justify-center m-auto flex-shrink-0 w-48 h-12 text-xl font-bold rounded-full bg-sky-300 text-gray-900">
                {lastYear} in
              </div>
							<p class="text-xl font-semibold">
								Last year
							</p>
						</div>
					</div>
          <div class="pb-4 bg-sky-100 rounded-2xl p-6 flex grow-1" style="margin: auto; height: 35vh">
            <Bar data={data} options={options} />
          </div>
				</section>
			</div>
		</main>
	</div>
</div>
