import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Simulaciones } from './simulaciones';

describe('Simulaciones', () => {
  let component: Simulaciones;
  let fixture: ComponentFixture<Simulaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Simulaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Simulaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
