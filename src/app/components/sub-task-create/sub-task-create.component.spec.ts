import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTaskCreateComponent } from './sub-task-create.component';

describe('SubTaskCreateComponent', () => {
  let component: SubTaskCreateComponent;
  let fixture: ComponentFixture<SubTaskCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubTaskCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubTaskCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
