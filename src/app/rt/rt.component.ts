import { Component } from '@angular/core';
import {GameScreenComponent} from "../gamescreen/game-screen.component";
import {NgIf} from "@angular/common";
import {PageFooterComponent} from "../pagefooter/page-footer.component";
import {PageHeaderComponent} from "../pageheader/page-header.component";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-rt',
  standalone: true,
    imports: [
        GameScreenComponent,
        NgIf,
        PageFooterComponent,
        PageHeaderComponent,
        ReactiveFormsModule
    ],
  templateUrl: './rt.component.html',
  styleUrl: './rt.component.css'
})
export class RtComponent {

}
