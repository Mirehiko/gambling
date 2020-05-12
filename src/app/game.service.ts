import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Round } from './round';
import { User } from './user';
import { USERS } from './mock-user';
import { newArray } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() {
    this.rateSource.next('0.0');
    this.timeToNewRoundSource.next(this.roundCooldown);
    this.usersInRound = USERS.slice();
    this.usersInRoundSource.next(this.usersInRound);
    this.isRegisteredSource.next(false);
    this.prepareNewRound();
  }

  roundCooldown = 1000 * 10;
  timeToResults = 1000 * 5;
  round: Round;
  prepareInterval: any;
  roundInterval: any;
  resInterval: any;
  userName: string;

  isRegisteredSource = new BehaviorSubject<any>({});
  isRegisteredChange = this.isRegisteredSource.asObservable();

  endedRoundsSource = new BehaviorSubject<any>({});
  endedRoundsChange = this.endedRoundsSource.asObservable();
  endedRounds: Round[] = [];

  timeToNewRoundSource = new BehaviorSubject<any>({});
  timeToNewRoundChange = this.timeToNewRoundSource.asObservable();
  timeToNewRound = this.roundCooldown;

  rateSource = new BehaviorSubject<any>({});
  rateChange = this.rateSource.asObservable();

  usersInRoundSource = new BehaviorSubject<any>({});
  usersInRoundChange = this.usersInRoundSource.asObservable();
  usersInRound = USERS.slice();

  prepareNewRound() {
    this.timeToNewRoundSource.next(this.roundCooldown);
    this.timeToNewRound = this.roundCooldown;
    this.round = {
      isPrepare: true,
      isActive: false,
      isEnded: false,
      rate: '0.0',
      users: [],
    };

    this.usersInRound = this.cloneArray(USERS.slice());
    this.usersInRoundSource.next(this.usersInRound);

    this.prepareInterval = setInterval(() => {
      this.timeToNewRound -= 1000;
      this.timeToNewRoundSource.next(this.timeToNewRound);

      if (this.timeToNewRound === 0) {
        clearInterval(this.prepareInterval);
        this.startNewRound();
      }
    }, 1000);
  }

  startNewRound() {
    this.round.isPrepare = false;
    this.round.isActive = true;
    console.log('Round begin!', this.usersInRound);
    this.roundInterval = setInterval(() => {
      this.calcRate();
      this.checkScore();
      if (this.isNeedToEndRound() || +this.round.rate >= 5) {
        clearInterval(this.roundInterval);
        this.showResults();
      }
    }, 1000);
  }

  closeRound() {
    this.round.isActive = false;
    this.round.isEnded = true;
    console.log('Round ended!');
    this.checkScore();
    this.round.users = this.cloneArray(this.usersInRound.slice());

    this.endedRounds.push(this.round);
    this.endedRoundsSource.next(this.endedRounds);
    this.rateSource.next('0.0');
    this.isRegisteredSource.next(false);
  }

  checkScore() {
    for (const user of this.usersInRound) {
      if (this.round.isActive) {
        if (user.rate <= this.round.rate) {
          user.isWin = true;
          user.prize = +(user.bet * +user.rate).toFixed(1);
        }
      } else if (this.round.isEnded) {
        if (user.rate <= this.round.rate) {
          user.isWin = true;
          user.prize = +(user.bet * +user.rate).toFixed(1);
        } else {
          user.isLose = true;
        }
      }
    }
    this.usersInRoundSource.next(this.usersInRound);
  }

  calcRate() {
    this.round.rate = (+this.round.rate + 0.1).toFixed(1);
    this.rateSource.next(this.round.rate);
  }

  showResults() {
    this.closeRound();
    console.log('Results:', this.endedRounds);
    this.resInterval = setTimeout(() => {
      this.prepareNewRound();
      clearInterval(this.resInterval);
    }, this.timeToResults);
  }

  addUserToRound(user) {
    if (this.round.isPrepare) {
      this.usersInRound.push(user);
      this.usersInRoundSource.next(this.usersInRound);
      this.isRegisteredSource.next(true);
      this.round.users = this.cloneArray(this.usersInRound.slice());
      console.log('Ставка сделана');
    } else {
      console.log('Идет игра! Дождитесь следующего раунда');
    }
  }

  isNeedToEndRound(): boolean {
    return this.randomInteger(0, 10) === 7;
  }

  randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  cloneArray(arr) {
    const res = [];
    for (const i of arr) {
      res.push(this.copy(i));
    }
    return res;
  }

  copy(mainObj) {
    const objCopy = {}; // objCopy will store a copy of the mainObj
    let key;

    for (key in mainObj) {
      objCopy[key] = mainObj[key]; // copies each property to the objCopy object
    }
    return objCopy;
  }

  getRoundsByUser(user) {
    const res = [];
    for (const round of this.endedRounds) {
      for (const cuser of round.users) {
        if (cuser.name === user) {
          res.push(cuser);
        }
      }
    }
    return res;
  }
}
