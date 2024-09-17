import { Injectable } from '@angular/core';
import { ITask } from '../types/type';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: ITask[] = [];
  constructor() {
    const prevTask = localStorage.getItem('tasks');
    if (prevTask) {
      this.tasks = JSON.parse(prevTask);
      console.log('tasks:', this.tasks);
    }
  };
  getTasks(): ITask[] {
    return this.tasks;
  }
  onAddTask(task: ITask) {
    this.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  onDeleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(this.tasks)); localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
