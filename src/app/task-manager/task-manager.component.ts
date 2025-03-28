import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from './task.interface';
import { TaskService } from '../task.service';
import { TaskPriorityBadgeComponent } from '../task-priority-badge/task-priority-badge.component';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskPriorityBadgeComponent],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss'
})
export class TaskManagerComponent {
  // Signal properties
  filteredTasks;
  stats;
  filter;
  priorityFilter;

  constructor(private taskService: TaskService) {
    // Initialize signals in constructor
    this.filteredTasks = this.taskService.filteredTasks;
    this.stats = this.taskService.stats;
    this.filter = this.taskService.filter;
    this.priorityFilter = this.taskService.priorityFilter;
  }

  addTask(title: string) {
    if (!title.trim()) return;
    this.taskService.addTask(title);
  }

  addTaskWithPriority(input: HTMLInputElement, select: HTMLSelectElement) {
    if (!input.value.trim()) return;
    this.taskService.addTask(input.value, select.value as 'low' | 'medium' | 'high');
    input.value = '';
  }

  toggleTask(id: number) {
    this.taskService.toggleTask(id);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  onPriorityChange(event: Event, taskId: number) {
    const select = event.target as HTMLSelectElement;
    this.taskService.updateTaskPriority(taskId, select.value as 'low' | 'medium' | 'high');
  }
}
