import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from '../../src/app/app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the game title', () => {
    const heading: HTMLElement | null = fixture.nativeElement.querySelector('.intro h2');
    expect(heading?.textContent).toContain('The Fiddy Question Game');
  });

  describe('isFormValid', () => {
    it('should be invalid when the username is empty', () => {
      component.username = '';
      expect(component.isFormValid()).toBe(false);
    });

    it('should be invalid when the username is only whitespace', () => {
      component.username = '   ';
      expect(component.isFormValid()).toBe(false);
    });

    it('should be valid when a username is entered', () => {
      component.username = ' Ada ';
      expect(component.isFormValid()).toBe(true);
    });
  });

  describe('startGame', () => {
    it('should not start the game when the form is invalid', () => {
      component.username = '';
      component.startGame();
      expect(component.gameStarted).toBe(false);
    });

    it('should start the game and trim the username when valid', () => {
      component.username = '  Ada  ';
      component.startGame();
      expect(component.gameStarted).toBe(true);
      expect(component.username).toBe('Ada');
    });
  });

  it('should disable the Start button when the username is blank', () => {
    component.username = '';
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector(
      '.start-form button[type="submit"]',
    );
    expect(button.disabled).toBe(true);
  });

  it('should list categories alphabetically in the select', () => {
    const options: HTMLOptionElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('#category option'),
    );
    const names = options.map((option) => option.textContent?.trim() ?? '');
    const categoryNames = names.slice(1); // skip "Any Category"
    expect(categoryNames.length).toBeGreaterThan(0);
    expect([...categoryNames].sort((a, b) => a.localeCompare(b))).toEqual(categoryNames);
  });
});
