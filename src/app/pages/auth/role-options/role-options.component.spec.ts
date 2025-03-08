import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleOptionsComponent } from './role-options.component';

describe('RoleOptionsComponent', () => {
  let component: RoleOptionsComponent;
  let fixture: ComponentFixture<RoleOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
