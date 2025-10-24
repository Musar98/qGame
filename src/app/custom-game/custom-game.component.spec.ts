import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomGame } from './custom-game.component';

describe('CustomGameComponent', () => {
  let component: CustomGame;
  let fixture: ComponentFixture<CustomGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomGame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
