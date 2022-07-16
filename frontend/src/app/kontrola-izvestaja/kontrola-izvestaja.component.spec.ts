import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KontrolaIzvestajaComponent } from './kontrola-izvestaja.component';

describe('KontrolaIzvestajaComponent', () => {
  let component: KontrolaIzvestajaComponent;
  let fixture: ComponentFixture<KontrolaIzvestajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KontrolaIzvestajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KontrolaIzvestajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
