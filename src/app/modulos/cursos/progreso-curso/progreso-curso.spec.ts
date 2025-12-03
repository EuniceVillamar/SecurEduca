import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresoCurso } from './progreso-curso';

describe('ProgresoCurso', () => {
  let component: ProgresoCurso;
  let fixture: ComponentFixture<ProgresoCurso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgresoCurso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgresoCurso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
