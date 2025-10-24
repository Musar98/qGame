import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { PageFooterComponent } from "./pagefooter/page-footer.component";
import { PageHeaderComponent } from "./pageheader/page-header.component";
import { CommonModule } from "@angular/common";
import { GameScreenComponent } from "./gamescreen/game-screen.component";
import { FormsModule } from "@angular/forms";
import { OpenTriviaApiService } from "./services/open-trivia-api.service";
import { Category } from "./services/Types";

@Component({
    selector: "app-root",
    imports: [
        RouterOutlet,
        PageFooterComponent,
        PageHeaderComponent,
        CommonModule,
        GameScreenComponent,
        FormsModule,
    ],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
    providers: [OpenTriviaApiService]
})
export class AppComponent {
  gameStarted: boolean = false;
  category: string = "";
  username: string = "";
  categories: Category[] = [
    { id: 9, name: "General Knowledge" },
    { id: 10, name: "Entertainment: Books" },
    { id: 11, name: "Entertainment: Film" },
    { id: 12, name: "Entertainment: Music" },
    { id: 13, name: "Entertainment: Musicals & Theatres" },
    { id: 14, name: "Entertainment: Television" },
    { id: 15, name: "Entertainment: Video Games" },
    { id: 16, name: "Entertainment: Board Games" },
    { id: 17, name: "Science & Nature" },
    { id: 18, name: "Science: Computers" },
    { id: 19, name: "Science: Mathematics" },
    { id: 20, name: "Mythology" },
    { id: 21, name: "Sports" },
    { id: 22, name: "Geography" },
    { id: 23, name: "History" },
    { id: 24, name: "Politics" },
    { id: 25, name: "Art" },
    { id: 26, name: "Celebrities" },
    { id: 27, name: "Animals" },
    { id: 28, name: "Vehicles" },
    { id: 29, name: "Entertainment: Comics" },
    { id: 30, name: "Science: Gadgets" },
    { id: 31, name: "Entertainment: Japanese Anime & Manga" },
    { id: 32, name: "Entertainment: Cartoon & Animations" },
  ].sort((current, next) => current.name.localeCompare(next.name));

  isFormValid(): boolean {
    //todo when topics introduced
    // return this.topic !== '' && this.username !== '';
    return this.username !== "";
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
