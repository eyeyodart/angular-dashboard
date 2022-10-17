import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiloDialogFormComponent } from './silo-dialog-form.component';

describe('SiloDialogFormComponent', () => {
  let component: SiloDialogFormComponent;
  let fixture: ComponentFixture<SiloDialogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiloDialogFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiloDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
