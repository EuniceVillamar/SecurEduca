import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsejosRecomendaciones } from './consejos-recomendaciones';

describe('ConsejosRecomendaciones', () => {
  let component: ConsejosRecomendaciones;
  let fixture: ComponentFixture<ConsejosRecomendaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsejosRecomendaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsejosRecomendaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
