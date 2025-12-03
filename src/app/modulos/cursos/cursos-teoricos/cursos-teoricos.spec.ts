import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursosTeoricos } from './cursos-teoricos';

describe('CursosTeoricos', () => {
  let component: CursosTeoricos;
  let fixture: ComponentFixture<CursosTeoricos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursosTeoricos],
    }).compileComponents();

    fixture = TestBed.createComponent(CursosTeoricos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
