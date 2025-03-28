import { Injectable, computed, signal } from '@angular/core';
import { Task } from './task-manager/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // Writable signal for tasks
  tasks = signal<Task[]>([]);

  // Writable signal for filter
  filter = signal<'all' | 'active' | 'completed'>('all');

  // Writable signal for priority filter
  priorityFilter = signal<'all' | 'low' | 'medium' | 'high'>('all');

  // Computed signal for filtered tasks
  filteredTasks = computed(() => {
    return this.tasks().filter(task => {
      const matchesStatus = this.filter() === 'all' ||
        (this.filter() === 'active' && !task.completed) ||
        (this.filter() === 'completed' && task.completed);

      const matchesPriority = this.priorityFilter() === 'all' ||
        task.priority === this.priorityFilter();

      return matchesStatus && matchesPriority;
    });
  });

  // Computed signal for task statistics
  stats = computed(() => {
    const total = this.tasks().length;
    const completed = this.tasks().filter(task => task.completed).length;
    const active = total - completed;

    return {
      total,
      completed,
      active,
      completionRate: total === 0 ? 0 : (completed / total) * 100
    };
  });

  // Methods to manipulate tasks
  addTask(title: string, priority: Task['priority'] = 'medium'): void {
    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      priority,
      createdAt: new Date()
    };

    this.tasks.update(tasks => [...tasks, newTask]);
  }

  toggleTask(id: number): void {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  deleteTask(id: number): void {
    this.tasks.update(tasks => tasks.filter(task => task.id !== id));
  }

  updateTaskPriority(id: number, priority: Task['priority']): void {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, priority } : task
      )
    );
  }

  // Getter for all tasks
  getTasks() {
    return this.tasks();
  }

  // Getter for filtered tasks
  getFilteredTasks() {
    return this.filteredTasks();
  }

  // Getter for stats
  getStats() {
    return this.stats();
  }

  // Getter for filters
  getFilter() {
    return this.filter();
  }

  getPriorityFilter() {
    return this.priorityFilter();
  }
}
