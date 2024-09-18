import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTaskItemComponent } from './sidebar-task-item.component';

describe('SidebarTaskItemComponent', () => {
  let component: SidebarTaskItemComponent;
  let fixture: ComponentFixture<SidebarTaskItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarTaskItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarTaskItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
