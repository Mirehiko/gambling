import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../game.service';
import { USERS } from '../mock-user';

@Component({
  selector: 'app-gamer-list',
  templateUrl: './gamer-list.component.html',
  styleUrls: ['./gamer-list.component.scss'],
})
export class GamerListComponent implements OnInit {
  gamers = USERS;

  private subscriptions: Subscription = new Subscription();
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.getUsers();
    this.subscriptions.add(
      this.gameService.usersInRoundChange.subscribe((users) => {
        this.gamers = users;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getUsers() { }
}
