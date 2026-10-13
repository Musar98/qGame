import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageFooterComponent } from './pagefooter/page-footer.component';
import { PageHeaderComponent } from './pageheader/page-header.component';
import { GameScreenComponent } from './gamescreen/game-screen.component';
import { FALLBACK_CATEGORIES } from './categories.constants';
import type { Category } from './services/types';

@Component({
  selector: 'app-root',
  imports: [PageFooterComponent, PageHeaderComponent, GameScreenComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  gameStarted = false;
  username = '';
  categoryId?: number;
  readonly categories: Category[] = FALLBACK_CATEGORIES;

  isFormValid(): boolean {
    return this.username.trim().length > 0;
  }

  startGame(): void {
    if (this.isFormValid()) {
      this.username = this.username.trim();
      this.gameStarted = true;
    }
  }

  onEnterKey(): void {
    this.startGame();
  }
}
