import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from './task.interface';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss'
})
export class TaskManagerComponent {
  constructor(private taskService: TaskService) {
    effect(() => {
      console.log('Tasks updated:', this.taskService.getTasks());
      console.log('Current stats:', this.taskService.getStats());
    });
  }

  // Methods to manipulate tasks
  addTask(title: string, priority: Task['priority'] = 'medium'): void {
    this.taskService.addTask(title, priority);
  }

  addTaskWithPriority(input: HTMLInputElement, select: HTMLSelectElement): void {
    const title = input.value;
    const priority = select.value as Task['priority'];
    this.addTask(title, priority);
    input.value = '';
  }

  toggleTask(id: number): void {
    this.taskService.toggleTask(id);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }

  updateTaskPriority(id: number, priority: Task['priority']): void {
    this.taskService.updateTaskPriority(id, priority);
  }

  onPriorityChange(event: Event, taskId: number): void {
    const select = event.target as HTMLSelectElement;
    const priority = select.value as Task['priority'];
    this.updateTaskPriority(taskId, priority);
  }

  // Expose signals for template
  get filteredTasks() {
    return this.taskService.filteredTasks;
  }

  get stats() {
    return this.taskService.stats;
  }

  get filter() {
    return this.taskService.filter;
  }

  get priorityFilter() {
    return this.taskService.priorityFilter;
  }
}
