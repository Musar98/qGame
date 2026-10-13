import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageHeaderComponent } from '../../../src/app/pageheader/page-header.component';

describe('PageHeaderComponent', () => {
  let fixture: ComponentFixture<PageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageHeaderComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the brand heading and a valid nav list', () => {
    const heading: HTMLElement | null = fixture.nativeElement.querySelector('h1');
    expect(heading?.textContent).toContain('qGame');

    const links: HTMLAnchorElement[] = Array.from(fixture.nativeElement.querySelectorAll('nav a'));
    expect(links.length).toBeGreaterThan(0);
    expect(fixture.nativeElement.querySelector('nav ul')).toBeTruthy();
  });
});
