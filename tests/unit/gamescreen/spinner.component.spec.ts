import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from '../../../src/app/gamescreen/spinner/spinner.component';

describe('SpinnerComponent', () => {
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render a decorative loader', () => {
    const loader: HTMLElement | null = fixture.nativeElement.querySelector('.loader');
    expect(loader).toBeTruthy();
    expect(loader?.getAttribute('aria-hidden')).toBe('true');
  });
});
