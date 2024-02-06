import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PageFooterComponent} from "./pagefooter/page-footer.component";
import {PageHeaderComponent} from "./pageheader/page-header.component";
import {CommonModule} from "@angular/common";
import {GameScreenComponent} from "./gamescreen/game-screen.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PageFooterComponent, PageHeaderComponent, CommonModule, GameScreenComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  gameStarted: boolean = false;
  topic: string = '';
  username: string = '';

  isFormValid(): boolean {
    //todo when topics introduced
    // return this.topic !== '' && this.username !== '';
    return this.username !== ''
  }

  startGame(): void {
    if (this.isFormValid()) {
      this.gameStarted = true;
    }
  }

  onEnterKey(): void {
    if (this.isFormValid()) {
      this.startGame();
    }
  }

}
