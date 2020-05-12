import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../game.service';

@Component({
  selector: 'app-crash',
  templateUrl: './crash.component.html',
  styleUrls: ['./crash.component.scss'],
})
export class CrashComponent implements OnInit {
  timeToNewRound: number;
  rate: string;

  private subscriptions: Subscription = new Subscription();

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.timeToNewRound = this.gameService.timeToNewRound / 1000;
    this.rate = this.gameService.round.rate;

    this.subscriptions.add(
      this.gameService.timeToNewRoundChange.subscribe((timeToNewRound) => {
        this.timeToNewRound = timeToNewRound / 1000;
      })
    );

    this.subscriptions.add(
      this.gameService.rateChange.subscribe((rate) => {
        this.rate = rate;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

// rate = '';

// private subscriptions: Subscription = new Subscription();

// constructor(private gameService: GameService) { }

// ngOnInit(): void {
//   this.timeToNewRound = this.gameService.timeToNewRound;
//   this.subscriptions.add(
//     this.gameService.rateChange.subscribe((rate) => {
//       this.rate = rate;
//     })
//   );
// }

// ngOnDestroy() {
//   this.subscriptions.unsubscribe();
// }
