import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageFooterComponent } from '../../../src/app/pagefooter/page-footer.component';

describe('PageFooterComponent', () => {
  let fixture: ComponentFixture<PageFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageFooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageFooterComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should credit the trivia provider with a safe external link', () => {
    const link: HTMLAnchorElement | null = fixture.nativeElement.querySelector('footer a');
    expect(link?.href).toContain('opentdb.com');
    expect(link?.target).toBe('_blank');
    expect(link?.rel).toContain('noopener');
  });
});
