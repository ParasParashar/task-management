import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../types/type';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { CreateTaskComponent } from "../create-task/create-task.component";
import { SubTaskCreateComponent } from "../sub-task-create/sub-task-create.component";
import { TaskCardComponent } from "../task-card/task-card.component";

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [CommonModule, CreateTaskComponent, DatePipe, SubTaskCreateComponent, TaskCardComponent],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.css'
})

export class ViewTaskComponent implements OnInit {
  service = inject(TaskService);
  activeRouter = inject(ActivatedRoute);
  router = inject(Router);
  isEdit: boolean = false;
  task: ITask | undefined = undefined;
  tasksSubscription!: Subscription;
  isSubTask: boolean = false;

  ngOnInit() {
    // Subscribe to route parameter changes
    this.tasksSubscription = this.activeRouter.params.subscribe(params => {
      this.updateTask();
    });
  }

  // Method to find and update the task based on route parameters
  private updateTask() {
    const taskId = +this.activeRouter.snapshot.params['id'];
    this.service.tasks$.subscribe(tasks => {
      this.task = this.service.findSpecificTask(taskId);
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
    this.router.navigateByUrl('/')
  }
  // for the task
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
  // for the sub task
  onToggleSubTask() {
    this.isSubTask = !this.isSubTask
  }
  onSubTaskClose() {
    this.onToggleSubTask()

  }
}