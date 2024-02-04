import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PagefooterComponent} from "./pagefooter/pagefooter.component";
import {PageheaderComponent} from "./pageheader/pageheader.component";
import {CommonModule} from "@angular/common";
import {GamescreenComponent} from "./gamescreen/gamescreen.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PagefooterComponent, PageheaderComponent, CommonModule, GamescreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  gameStarted: boolean = false;

  startGame() {
    this.gameStarted = true;
    console.log(this.gameStarted)
  }
}
