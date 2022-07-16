import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagaciniIKaseComponent } from './magacini-i-kase.component';

describe('MagaciniIKaseComponent', () => {
  let component: MagaciniIKaseComponent;
  let fixture: ComponentFixture<MagaciniIKaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagaciniIKaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagaciniIKaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
