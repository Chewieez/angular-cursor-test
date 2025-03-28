import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPriorityBadgeComponent } from './task-priority-badge.component';

describe('TaskPriorityBadgeComponent', () => {
  let component: TaskPriorityBadgeComponent;
  let fixture: ComponentFixture<TaskPriorityBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskPriorityBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskPriorityBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
