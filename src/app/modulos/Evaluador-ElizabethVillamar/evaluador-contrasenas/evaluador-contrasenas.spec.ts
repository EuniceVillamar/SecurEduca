import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluadorContrasenas } from './evaluador-contrasenas';

describe('EvaluadorContrasenas', () => {
  let component: EvaluadorContrasenas;
  let fixture: ComponentFixture<EvaluadorContrasenas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluadorContrasenas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluadorContrasenas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
