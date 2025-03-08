import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizzappsComponent } from './bizzapps.component';

describe('BizzappsComponent', () => {
  let component: BizzappsComponent;
  let fixture: ComponentFixture<BizzappsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BizzappsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BizzappsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});