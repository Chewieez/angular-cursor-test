import { Component } from '@angular/core';
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
  // Signal properties
  stats;
  lowPriorityCount;
  mediumPriorityCount;
  highPriorityCount;

  constructor(private taskService: TaskService) {
    // Initialize signals in constructor
    this.stats = this.taskService.stats;
    this.lowPriorityCount = this.taskService.lowPriorityCount;
    this.mediumPriorityCount = this.taskService.mediumPriorityCount;
    this.highPriorityCount = this.taskService.highPriorityCount;
  }
}
