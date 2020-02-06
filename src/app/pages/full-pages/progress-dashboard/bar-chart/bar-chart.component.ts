import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from "app/shared/models/chart";
import * as Chartist from 'chartist';

@Component( {
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: [ './bar-chart.component.scss' ]
} )
//, OnChanges
export class BarChartComponent implements OnInit, OnChanges {
  @Input( 'chart' ) chart: Chartist.IChartistData;
  @Input( 'isCollapsed' ) isCollapsed: boolean;
  barChart: Chart = {
    type: 'Bar',
    data: this.chart,
    options: {
      seriesBarDistance: 21,
      axisX: {
        showGrid: false, offset: 100
      },
      axisY: {
        scaleMinSpace: 30,
      },
    },
  }
  ngOnInit() {
    this.barChart.data = this.chart;
  }

  ngOnChanges( changes: SimpleChanges ) {
    if ( changes[ 'chart' ] ) {
      this.barChart.data = changes[ 'chart' ].currentValue
    }
    if ( changes[ 'isCollapsed' ] && changes[ 'isCollapsed' ].currentValue == false ) {
      this.barChart.data = {
        labels: this.chart.labels,
        series: this.chart.series
      };
    }
  }
}
