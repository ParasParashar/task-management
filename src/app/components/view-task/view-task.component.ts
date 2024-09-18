import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../types/type';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { CreateTaskComponent } from "../create-task/create-task.component";

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [CommonModule, CreateTaskComponent, DatePipe],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.css'
})

export class ViewTaskComponent implements OnInit {
  service = inject(TaskService);
  activeRouter = inject(ActivatedRoute);
  isEdit: boolean = false;
  task: ITask | undefined = undefined;
  tasksSubscription!: Subscription;

  ngOnInit() {
    // gettng the task id
    const taskId = +this.activeRouter.snapshot.params['id']
    // subscribe to task updates
    this.tasksSubscription = this.service.tasks$.subscribe(tasks => {
      // Find the specific task by ID
      this.task = tasks.find(task => task.id === taskId);
    });



  }

  // unsubscribe from task updates
  ngOnDestroy() {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }

  onDelete(e: Event, id: number) {
    e.stopPropagation();
    this.service.onDeleteTask(id)
  }
  onTaskToggle(e: Event, id: number) {
    e.stopPropagation();
    this.service.onToggleTaskComplete(id)
  }
  onEdit() {
    this.isEdit = !this.isEdit;
  }
  onEditClose() {
    this.isEdit = false
  }
}
