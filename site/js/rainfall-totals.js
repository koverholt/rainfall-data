/*
 URL parameters
*/

var param = new Vue({
  created()
  {
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);
    window.value = params.get("site");
  },
});

/*
 Query
*/

var input_site = window.value || 2959
var input = {"site": parseInt(input_site)};
var xhr = new XMLHttpRequest();
xhr.open("POST", "https://us-central1-koverholt-apps-304316.cloudfunctions.net/rainfall-data");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(JSON.stringify(input));

xhr.onload = function () {
  var data = JSON.parse(this.response)
  var rainfall_amounts = JSON.parse(data.rainfall_amounts)
  var list_of_sites = JSON.parse(data.list_of_sites)
  var site = rainfall_amounts["site"]
  var location = rainfall_amounts["location"]
  var previous_1_hour = rainfall_amounts["Previous 1 hour"]
  var previous_3_hours = rainfall_amounts["Previous 3 hours"]
  var previous_6_hours = rainfall_amounts["Previous 6 hours"]
  var previous_24_hours = rainfall_amounts["Previous 24 hours"]
  var since_midnight = rainfall_amounts["Since midnight"]
  var one_day_ago = rainfall_amounts["1 day ago"]
  var two_days_ago = rainfall_amounts["2 days ago"]
  var three_days_ago = rainfall_amounts["3 days ago"]
  var four_days_ago = rainfall_amounts["4 days ago"]
  var five_day_total = rainfall_amounts["5 day total"]
  var thirty_day_total = rainfall_amounts["30 day total"]
  var this_month = rainfall_amounts["This month"]
  var this_year = rainfall_amounts["This year"]
  var last_year = rainfall_amounts["Last year"]

  var app = new Vue({
    el: '#app',
    data: {
      site: site,
      location: location,
      five_day_total: five_day_total,
      one_day_ago: one_day_ago,
      since_midnight: since_midnight,
      this_month: this_month,
      this_year: this_year,
      last_year: last_year,
      list_of_sites: list_of_sites
    }
  })

  var xValue = ["Previous 1 hour", "Previous 3 hours", "Previous 6 hours", "Previous 24 hours", "Since midnight", "1 day ago", "2 days ago", "3 days ago", "4 days ago", "5 day total", "30 day total"]
  var yValue = [previous_1_hour, previous_3_hours, previous_6_hours, previous_24_hours, since_midnight, one_day_ago, two_days_ago, three_days_ago, four_days_ago, five_day_total, thirty_day_total]
  var maxYValue = Math.max(...yValue)

  var ctx = document.getElementById('myChart').getContext('2d');
  var myBarChart = new Chart(ctx, {
      type: 'bar',

      data: {
          labels: ["Last 1 hour",
              "Last 3 hours",
              "Last 6 hours",
              "Last 24 hours",
              "Since midnight",
              "1 day ago",
              "2 days ago",
              "3 days ago",
              "4 days ago",
              "5 day total",
              "30 day total"
          ],
          datasets: [{
              label: 'Rainfall Amount',
              backgroundColor: 'rgb(3, 87, 255)',
              borderColor: 'rgb(3, 87, 255)',
              data: [previous_1_hour,
                  previous_3_hours,
                  previous_6_hours,
                  previous_24_hours,
                  since_midnight,
                  one_day_ago,
                  two_days_ago,
                  three_days_ago,
                  four_days_ago,
                  five_day_total,
                  thirty_day_total
              ]
          }]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              suggestedMin: 0,
            },
            scaleLabel: {
              display: true,
              labelString: 'Rainfall Amount (in)'
            },
          }]
        },
      }

  });

  Chart.scaleService.updateScaleDefaults('linear', {
    ticks: {
        min: 0
    }
  });

  Chart.defaults.global.defaultFontSize = 13;

  // Trigger a change when a different site is selected
  $("#sitelist").change(function(){
    var selected_site = parseInt($('#sitelist').find(":selected").val());
    new_url = "https://rainfall.koverholt.com/?site=" + selected_site;
    window.location.href = new_url;
    });

}
