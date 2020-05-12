import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MenuComponent } from "./menu/menu.component";
import { GamerListComponent } from "./gamer-list/gamer-list.component";
import { CrashComponent } from "./crash/crash.component";
import { BetUserComponent } from "./bet-user/bet-user.component";
import { PrevgamesComponent } from './prevgames/prevgames.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    GamerListComponent,
    CrashComponent,
    BetUserComponent,
    PrevgamesComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
