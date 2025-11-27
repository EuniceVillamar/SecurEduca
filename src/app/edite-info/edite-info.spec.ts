import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInfo } from './edite-info';

describe('EditarInfo', () => {
  let component: EditarInfo;
  let fixture: ComponentFixture<EditarInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
