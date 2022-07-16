import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLogovanComponent } from './admin-logovan.component';

describe('AdminLogovanComponent', () => {
  let component: AdminLogovanComponent;
  let fixture: ComponentFixture<AdminLogovanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLogovanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLogovanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
