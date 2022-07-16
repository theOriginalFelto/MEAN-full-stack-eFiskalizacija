import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZiroRacuniComponent } from './ziro-racuni.component';

describe('ZiroRacuniComponent', () => {
  let component: ZiroRacuniComponent;
  let fixture: ComponentFixture<ZiroRacuniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZiroRacuniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZiroRacuniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
