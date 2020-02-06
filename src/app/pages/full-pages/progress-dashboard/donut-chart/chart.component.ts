import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Chart } from '../../../../shared/models/chart';

@Component( {
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: [ './chart.component.scss' ]
} )
export class ChartComponent implements OnInit {
  @Input( 'chart' ) chart: any;
  @Input( 'isCollapsed' ) isCollapsed: boolean;

  setValue: number;
  doneValue: number;
  overdueValue: number;
  upcomingValue: number;
  donutChart: Chart = {
    type: "Pie",
    data: {
      series: [],
    },
    options: {
      donut: true,
      startAngle: 0,
    },
    events: {
      draw( data: any ): void {
        if ( data.type === 'label' ) {
          if ( data.index === 0 ) {
            data.element.attr( {
              dx: data.element.root().width() / 2,
              dy: data.element.root().height() / 2
            } );
          } else {
            data.element.remove();
          }
        }
      }
    }
  };


  ngOnInit() {

    this.setValue = this.chart.series[ 2 ].value;
    this.doneValue = this.chart.series[ 3 ].value;
    this.overdueValue = this.chart.series[ 0 ].value;
    this.upcomingValue = this.chart.series[ 1 ].value;

    const dataChart = { ... this.chart };
    dataChart.series = dataChart.series.filter( s => s.name !== 'Set' );
    this.donutChart.data = {
      series: dataChart.series.filter( s => s.name !== 'Set' ),
      labels: []
    }


    this.donutChart.options = {
      donut: true,
      startAngle: 0,
      labelInterpolationFnc: ( value ) => {
        var total = dataChart.series.reduce( function ( prev, series ) {
          return prev + series.value;
        }, 0 );
        return total;
      }
    }
  }


  // ngOnChanges( changes: SimpleChanges ) {
  //   console.log( 'OnChange' );
  //   console.log( changes );
  //   if ( changes[ 'isCollapsed' ] && changes[ 'isCollapsed' ].currentValue == false ) {
  //     console.log( 'yes' );
  //     const dataChart = { ... this.chart };
  //     dataChart.series = dataChart.series.filter( s => s.name !== 'Set' );
  //     this.donutChart.data = {
  //       series: dataChart.series.filter( s => s.name !== 'Set' ),
  //       labels: []
  //     }


  //     this.donutChart.options = {
  //       donut: true,
  //       startAngle: 0,
  //       labelInterpolationFnc: ( value ) => {
  //         var total = dataChart.series.reduce( function ( prev, series ) {
  //           return prev + series.value;
  //         }, 0 );
  //         return total;
  //       }
  //     }
  //   }
  // }
}
