import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../game.service';
import { User } from '../user';

@Component({
  selector: 'app-bet-user',
  templateUrl: './bet-user.component.html',
  styleUrls: ['./bet-user.component.scss'],
})
export class BetUserComponent implements OnInit {
  user: User;
  // user;

  rates = ['1.2', '2.2', '3.0', '4.0', '5.0'];
  inGame = false;

  private subscriptions: Subscription = new Subscription();

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.getUser();

    this.subscriptions.add(
      this.gameService.isRegisteredChange.subscribe((isRegistered) => {
        this.inGame = isRegistered;
        if (!this.inGame) {
          this.user.bet = 0;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  chooseRate(evt, rate) {
    const target = evt.target;
    console.log(target, rate, target.checked);
    if (target.checked) {
      this.user.rate = rate;
    }
  }

  makeBet() {
    // Если не в игре то пробуем принять участие
    if (!this.inGame) {
      this.gameService.addUserToRound(this.gameService.copy(this.user));
    } else if (this.inGame && this.gameService.round.isActive) {
      console.log('Идет игра! Дождитесь следующего раунда');
    } else {
      console.log('Вы уже сделали ставку');
    }
  }

  getUser() {
    this.user = {
      id: 1,
      name: 'Some User',
      avatar: '../assets/avatar.png',
      prize: 0,
      bet: 0,
      rate: '1.2',
      isWin: false,
      isLose: false,
    };
    this.gameService.userName = this.user.name;
  }
}
