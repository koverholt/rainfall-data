import { Component } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rainfall-data';

  rainfall_amounts: any;
  list_of_sites: any;
  site: any;
  location: any;
  previous_1_hour: any;
  previous_3_hours: any;
  previous_6_hours: any;
  previous_24_hours: any;
  since_midnight: any;
  one_day_ago: any;
  two_days_ago: any;
  three_days_ago: any;
  four_days_ago: any;
  five_day_total: any;
  thirty_day_total: any;
  this_month: any;
  this_year: any;
  last_year: any;
  selected_site: any;

  // Trigger a change when a different site is selected
  changeSite() {
    window.location.href = "https://rainfall.koverholt.com/?site=" + this.selected_site;;
  };

  constructor() {

    // URL parameters
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);
    var input_site = Number(params.get("site")) || 2959

    // Request
    var input = { "site": input_site };
    var xhr = new XMLHttpRequest();
    var self = this;
    xhr.open("POST", "https://rainfall-data-67ugd5bjtq-uc.a.run.app");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(input));

    xhr.onload = function () {
      var data = JSON.parse(this.response)
      self.rainfall_amounts = data.rainfall_amounts[0]
      self.list_of_sites = data.list_of_sites
      self.site = self.rainfall_amounts["site"]
      self.location = self.rainfall_amounts["location"]
      self.previous_1_hour = self.rainfall_amounts["Previous 1 hour"]
      self.previous_3_hours = self.rainfall_amounts["Previous 3 hours"]
      self.previous_6_hours = self.rainfall_amounts["Previous 6 hours"]
      self.previous_24_hours = self.rainfall_amounts["Previous 24 hours"]
      self.since_midnight = self.rainfall_amounts["Since midnight"]
      self.one_day_ago = self.rainfall_amounts["1 day ago"]
      self.two_days_ago = self.rainfall_amounts["2 days ago"]
      self.three_days_ago = self.rainfall_amounts["3 days ago"]
      self.four_days_ago = self.rainfall_amounts["4 days ago"]
      self.five_day_total = self.rainfall_amounts["5 day total"]
      self.thirty_day_total = self.rainfall_amounts["30 day total"]
      self.this_month = self.rainfall_amounts["This month"]
      self.this_year = self.rainfall_amounts["This year"]
      self.last_year = self.rainfall_amounts["Last year"]

      var xValue = ["Previous 1 hour", "Previous 3 hours", "Previous 6 hours", "Previous 24 hours", "Since midnight", "1 day ago", "2 days ago", "3 days ago", "4 days ago", "5 day total"]
      var yValue = [self.previous_1_hour, self.previous_3_hours, self.previous_6_hours, self.previous_24_hours, self.since_midnight, self.one_day_ago, self.two_days_ago, self.three_days_ago, self.four_days_ago, self.five_day_total]
      var maxYValue = Math.max(...yValue)

      const canvas = <HTMLCanvasElement>document.getElementById('myChart');
      const ctx = canvas.getContext('2d');
      var myBarChart = new Chart(ctx!, {
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
            backgroundColor: 'rgb(50, 115, 220)',
            borderColor: 'rgb(3, 87, 255)',
            data: [
              self.previous_1_hour,
              self.previous_3_hours,
              self.previous_6_hours,
              self.previous_24_hours,
              self.since_midnight,
              self.one_day_ago,
              self.two_days_ago,
              self.three_days_ago,
              self.four_days_ago,
              self.five_day_total
            ]
          }]
        },

        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: { display: false },
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
  }
}
