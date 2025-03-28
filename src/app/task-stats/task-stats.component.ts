import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-stats.component.html',
  styleUrl: './task-stats.component.scss'
})
export class TaskStatsComponent {
  constructor(private taskService: TaskService) {}

  // Expose signals for template
  get stats() {
    return this.taskService.stats;
  }

  get tasks() {
    return this.taskService.tasks;
  }

  // Computed values for priority counts
  highPriorityCount = computed(() =>
    this.tasks().filter(t => t.priority === 'high').length
  );

  mediumPriorityCount = computed(() =>
    this.tasks().filter(t => t.priority === 'medium').length
  );

  lowPriorityCount = computed(() =>
    this.tasks().filter(t => t.priority === 'low').length
  );
}
