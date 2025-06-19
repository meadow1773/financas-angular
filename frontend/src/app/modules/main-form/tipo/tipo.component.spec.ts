import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoTransacoesComponent } from './tipo.component';

describe('GrupoTransacoesComponent', () => {
  let component: GrupoTransacoesComponent;
  let fixture: ComponentFixture<GrupoTransacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoTransacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoTransacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
