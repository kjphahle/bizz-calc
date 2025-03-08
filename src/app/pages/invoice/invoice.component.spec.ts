import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceComponent } from './invoice.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('InvoiceComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        InvoiceComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(InvoiceComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Invoice'`, () => {
    const fixture = TestBed.createComponent(InvoiceComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Invoice');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(InvoiceComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('Invoice app is running!');
  });
});
