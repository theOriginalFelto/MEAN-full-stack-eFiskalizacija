import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpstiPodaciComponent } from './opsti-podaci.component';

describe('OpstiPodaciComponent', () => {
  let component: OpstiPodaciComponent;
  let fixture: ComponentFixture<OpstiPodaciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpstiPodaciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpstiPodaciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
