var input = {"site": 2959};

var xhr = new XMLHttpRequest();
xhr.open("POST", "https://us-central1-koverholt-apps-304316.cloudfunctions.net/rainfall-data");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(JSON.stringify(input));

xhr.onload = function () {
  var data = JSON.parse(this.response)
  var previous_1_hour = data["Previous 1 hour"]
  var previous_3_hours = data["Previous 3 hours"]
  var previous_6_hours = data["Previous 6 hours"]
  var previous_24_hours = data["Previous 24 hours"]
  var since_midnight = data["Since midnight"]
  var one_day_ago = data["1 day ago"]
  var two_days_ago = data["2 days ago"]
  var three_days_ago = data["3 days ago"]
  var four_days_ago = data["4 days ago"]
  var five_day_total = data["5 day total"]

  var app = new Vue({
    el: '#app',
    data: {
      five_day_total: five_day_total,
    }
  })

  var xValue = ["Previous 1 hour", "Previous 3 hours", "Previous 6 hours", "Previous 24 hours", "Since midnight", "1 day ago", "2 days ago", "3 days ago", "4 days ago", "5 day total"]
  var yValue = [previous_1_hour, previous_3_hours, previous_6_hours, previous_24_hours, since_midnight, one_day_ago, two_days_ago, three_days_ago, four_days_ago, five_day_total]
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
              "5 day total"
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
                  five_day_total
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

}
