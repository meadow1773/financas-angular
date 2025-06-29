import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaEsperaComponent } from './tela-espera.component';

describe('TelaEsperaComponent', () => {
  let component: TelaEsperaComponent;
  let fixture: ComponentFixture<TelaEsperaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaEsperaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaEsperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
