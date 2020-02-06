import { Component, Input } from '@angular/core';
import { MinStatisticCard } from 'app/shared/models/minStatisticCard';


@Component( {
  selector: 'app-min-statistic-card',
  templateUrl: './min-statistic-card.component.html',
  styleUrls: [ './min-statistic-card.component.scss' ]
} )
export class MinStatisticCardComponent {
  dateArray = [ 'allGoals', 'allTasks', 'allIdeas' ];

  @Input( 'stat' ) stat: MinStatisticCard;
  @Input( 'registrationDate' ) registrationDate: string;
}
