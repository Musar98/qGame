import { Component, ChangeDetectionStrategy } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.component.css',
})
export class AppComponent {
  gameStarted = false;
  username = '';
  categoryId?: number;
  questionCount = 50;
  readonly categories: Category[] = FALLBACK_CATEGORIES;
  readonly questionCountOptions = [10, 20, 30, 40, 50];

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
