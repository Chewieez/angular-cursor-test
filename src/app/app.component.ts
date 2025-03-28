import { Component } from '@angular/core';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { TaskStatsComponent } from './task-stats/task-stats.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskManagerComponent, TaskStatsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-cursor-test';
}

