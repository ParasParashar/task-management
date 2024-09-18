import { Injectable } from '@angular/core';
import { ITask } from '../types/type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: ITask[] = [];
  // this is used to keep track of changes in the task 
  private tasksSubject = new BehaviorSubject<ITask[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {
    const prevTask = localStorage.getItem('tasks');
    if (prevTask) {
      this.tasks = JSON.parse(prevTask);
      // here we initialize the the initial tasks
      this.tasksSubject.next(this.tasks);
      console.log('tasks:', this.tasks);
    }
  };



  onAddTask(task: ITask) {
    this.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    // emiting updated tasks
    this.tasksSubject.next(this.tasks);

  }
  onDeleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(this.tasks)); localStorage.setItem('tasks', JSON.stringify(this.tasks));
    // emiting updated tasks
    this.tasksSubject.next(this.tasks);
  }
  onUpdateTask(newTask: ITask): void {
    this.tasks = this.tasks.map(task => task.id === newTask.id ? newTask : task)
    localStorage.setItem('tasks', JSON.stringify(this.tasks)); localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('tasks', JSON.stringify(this.tasks)); localStorage.setItem('tasks', JSON.stringify(this.tasks));
    // emiting updated tasks
    this.tasksSubject.next(this.tasks);
  }
  onToggleTaskComplete(taskId: number) {
    this.tasks = this.tasks.map((task) => task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks)); localStorage.setItem('tasks', JSON.stringify(this.tasks));
    // emiting updated tasks
    this.tasksSubject.next(this.tasks);
  }
}
