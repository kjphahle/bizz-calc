import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTitleComponent } from './info-title.component';

describe('InfoTitleComponent', () => {
  let component: InfoTitleComponent;
  let fixture: ComponentFixture<InfoTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoTitleComponent]
    });
    fixture = TestBed.createComponent(InfoTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
