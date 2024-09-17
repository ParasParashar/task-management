import { Component, inject, OnInit } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';
import { ITask } from '../../types/type';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CreateTaskComponent, CommonModule, TaskCardComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit {
  service = inject(TaskService);
  modalService = inject(ModalService);
  tasks: ITask[] = [];
  // initialise on component mount
  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.service.getTasks();
  }

  onRefreshTask() {
    this.loadTasks();
  }
  // opent the modal
  onOpenModal() {
    this.modalService.onToggleOpen();
  }
}
