import { Component, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { ITask } from '../../types/type';
import { CommonModule, DatePipe } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [DatePipe, RouterLink, CommonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  @Input() item!: ITask
  @Input() sNo!: number
  service = inject(TaskService)
  // deleting the task
  onDelete(e: Event, id: number) {
    e.stopPropagation();
    this.service.onDeleteTask(id)
  }
  onTaskToggle(e: Event, id: number) {
    e.stopPropagation();
    this.service.onToggleTaskComplete(id)
  }
}
