import { Injectable, computed, signal } from '@angular/core';
import { Task } from './task-manager/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // Writable signals
  tasks = signal<Task[]>([]);
  filter = signal<'all' | 'active' | 'completed'>('all');
  priorityFilter = signal<'all' | 'low' | 'medium' | 'high'>('all');

  // Computed signals for filtered tasks
  filteredTasks = computed(() => {
    let filtered = this.tasks();

    // Apply status filter
    if (this.filter() !== 'all') {
      filtered = filtered.filter(task =>
        this.filter() === 'completed' ? task.completed : !task.completed
      );
    }

    // Apply priority filter
    if (this.priorityFilter() !== 'all') {
      filtered = filtered.filter(task => task.priority === this.priorityFilter());
    }

    return filtered;
  });

  // Computed signal for stats
  stats = computed(() => {
    const tasks = this.tasks();
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    const completionRate = total === 0 ? 0 : (completed / total) * 100;

    return {
      total,
      completed,
      active,
      completionRate
    };
  });

  // Computed signals for priority counts
  lowPriorityCount = computed(() =>
    this.tasks().filter(task => task.priority === 'low').length
  );

  mediumPriorityCount = computed(() =>
    this.tasks().filter(task => task.priority === 'medium').length
  );

  highPriorityCount = computed(() =>
    this.tasks().filter(task => task.priority === 'high').length
  );

  // Methods to manipulate tasks
  addTask(title: string, priority: 'low' | 'medium' | 'high' = 'medium'): void {
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

  updateTaskPriority(id: number, priority: 'low' | 'medium' | 'high'): void {
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
