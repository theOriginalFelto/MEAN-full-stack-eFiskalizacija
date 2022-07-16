import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledArtikalaComponent } from './pregled-artikala.component';

describe('PregledArtikalaComponent', () => {
  let component: PregledArtikalaComponent;
  let fixture: ComponentFixture<PregledArtikalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledArtikalaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledArtikalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
