import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaCurso } from './tarjeta-curso';

describe('TarjetaCurso', () => {
  let component: TarjetaCurso;
  let fixture: ComponentFixture<TarjetaCurso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaCurso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaCurso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
