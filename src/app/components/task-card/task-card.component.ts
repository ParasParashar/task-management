import { Component, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { ITask } from '../../types/type';
import { DatePipe } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  @Input() item!: ITask
  @Input() sNo!: number
  @Output() isRefresh = new EventEmitter<any>();
  service = inject(TaskService)
  onDelete(id: number) {
    this.service.onDeleteTask(id)
    this.isRefresh.emit();
  }
}
