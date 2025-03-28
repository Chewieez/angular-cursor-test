import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-priority-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-priority-badge.component.html',
  styleUrl: './task-priority-badge.component.scss'
})
export class TaskPriorityBadgeComponent {
  // Using input() to create a Signal input
  priority = input<'low' | 'medium' | 'high'>('medium');

  // Computed Signal for the badge color
  badgeColor = computed(() => {
    switch (this.priority()) {
      case 'low':
        return '#2e7d32';
      case 'medium':
        return '#ef6c00';
      case 'high':
        return '#c62828';
      default:
        return '#6c757d';
    }
  });

  // Computed Signal for the background color
  backgroundColor = computed(() => {
    switch (this.priority()) {
      case 'low':
        return '#e8f5e9';
      case 'medium':
        return '#fff3e0';
      case 'high':
        return '#ffebee';
      default:
        return '#f8f9fa';
    }
  });
}
