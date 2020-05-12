import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../game.service';

@Component({
  selector: 'app-prevgames',
  templateUrl: './prevgames.component.html',
  styleUrls: ['./prevgames.component.scss']
})
export class PrevgamesComponent implements OnInit {

  prevRounds: any[];

  private subscriptions: Subscription = new Subscription();

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.gameService.endedRoundsChange.subscribe((prevRounds) => {
        // this.prevRounds = prevRounds;
        // this.prevRounds = prevRounds.users;
        this.prevRounds = this.gameService.getRoundsByUser(this.gameService.userName);
        console.log(this.prevRounds);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
