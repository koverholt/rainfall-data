<script>
  import { onMount } from 'svelte';
  import { Bar } from 'svelte-chartjs'
  import Card from '@smui/card';
  import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

  Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

  var data = {};
  var site = "";
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

  onMount(async () => {
    const response = await fetch("https://rainfall-data-67ugd5bjtq-uc.a.run.app", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({site: 2959})
    });

    const res = await response.json();
    site = res.rainfall_amounts[0]["site"]
    location = res.rainfall_amounts[0]["location"]
    lastOneHour = res.rainfall_amounts[0]["Previous 1 hour"]
    lastThreeHours = res.rainfall_amounts[0]["Previous 3 hours"]
    lastSixHours = res.rainfall_amounts[0]["Previous 6 hours"]
    lastTwentyFourHours = res.rainfall_amounts[0]["Previous 24 hours"]
    sinceMidnight = res.rainfall_amounts[0]["Since midnight"]
    oneDayAgo = res.rainfall_amounts[0]["1 day ago"]
    twoDaysAgo = res.rainfall_amounts[0]["2 days ago"]
    threeDaysAgo = res.rainfall_amounts[0]["3 days ago"]
    fourDaysAgo = res.rainfall_amounts[0]["4 days ago"]
    fiveDayTotal = res.rainfall_amounts[0]["5 day total"]
    thirtyDayTotal = res.rainfall_amounts[0]["30 day total"]
    thisMonth = res.rainfall_amounts[0]["This month"]
    thisYear = res.rainfall_amounts[0]["This year"]
    lastYear = res.rainfall_amounts[0]["Last year"]

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
  })
</script>

Central Texas Rainfall Totals
Showing rainfall from the Marble Falls 4 WSW LCRA Hydromet weather gauge

{sinceMidnight} in
Today

{fiveDayTotal} in
Last 5 days

{thisYear} in
This year

{oneDayAgo} in
Yesterday

{thirtyDayTotal} in
Last 30 days

{lastYear} in
Last year

<Bar data={data} options={options} />
