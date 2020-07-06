import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  Chart
} from 'chart.js';

interface ChartDataModel {
  label: string;
  background: string;
  percentage: number
}

@Component({
  selector: 'active-user-chart',
  templateUrl: './active-user.chart.html',
  styleUrls: ['./active-user.chart.scss']
})

export class ActiveUserChart {
  constructor () {}
  protected doughnutData: Object = {};
  @ViewChild('doughnutChart') private chart: ElementRef;
  private statusDataValue: any;

  @Input('chartData') set statusData (value: any) {
    this.statusDataValue = value;
    this.updateChart(this.statusDataValue);
  }
  get statusData (): any {
      return this.statusDataValue;
  }

  protected chartData: Array<ChartDataModel>;

  public ngOnInit (): void {}

  private updateChart (chartData: any): void {
    this.chartData = [{
      label: 'Signed up Users',
      background: this.getRandomColor(),
      percentage: chartData.totalCount
    },
    {
      label: 'Active Users',
      background: this.getRandomColor(),
      percentage: chartData.onlineCount
    }];

    console.log(chartData);
    this.doughnutData = new Chart(this.chart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.chartData.map(a => a.label),
        datasets: [{
          backgroundColor: this.chartData.map(a => a.background),
          data: this.chartData.map(a => a.percentage),
          datalabels: {
            anchor: 'end'
          }
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            backgroundColor: function (context): any {
              return context.dataset.backgroundColor;
            },
            borderColor: 'white',
            borderRadius: 25,
            borderWidth: 1,
            color: 'white',
            font: {
              weight: 'bold'
            },
            formatter: Math.round
          }
        },
        legend: {
          display: true
        }
      }
    });
  }

  private getRandomColor (): string {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
