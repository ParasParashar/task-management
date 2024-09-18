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
  private updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks)); localStorage.setItem('tasks', JSON.stringify(this.tasks));
    // emiting updated tasks
    this.tasksSubject.next(this.tasks);
  }



  onAddTask(task: ITask) {
    this.tasks.push(task);
    this.updateLocalStorage();
  }

  private deleteTaskRecursive(tasks: ITask[], taskId: number): ITask[] {
    return tasks
      .filter(task => task.id !== taskId)
      .map(task => ({
        ...task,
        children: this.deleteTaskRecursive(task.children || [], taskId)
      }));
  }

  onDeleteTask(taskId: number) {
    this.tasks = this.deleteTaskRecursive(this.tasks, taskId);
    this.updateLocalStorage(); // Update the local storage and notify subscribers
  }

  // Recursive function to update a task
  private updateTaskRecursive(tasks: ITask[], newTask: ITask): ITask[] {
    return tasks.map(task => {
      if (task.id === newTask.id) {
        return newTask;
      }
      return {
        ...task,
        children: this.updateTaskRecursive(task.children || [], newTask)
      };
    });
  }

  onUpdateTask(newTask: ITask): void {
    this.tasks = this.updateTaskRecursive(this.tasks, newTask);
    this.updateLocalStorage();
  }

  // fucntion to toggle task status
  private toggleTaskCompleteRecursive(tasks: ITask[], taskId: number): ITask[] {
    return tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return {
        ...task,
        children: this.toggleTaskCompleteRecursive(task.children || [], taskId)
      };
    });
  }

  onToggleTaskComplete(taskId: number) {
    this.tasks = this.toggleTaskCompleteRecursive(this.tasks, taskId);
    this.updateLocalStorage();
  }


  private addSubTaskRecursive(tasks: ITask[], parentId: number, subTask: ITask): ITask[] {
    return tasks.map(task => {
      // If the current task is the parent task
      if (task.id === parentId) {
        return {
          ...task,
          children: [...(task.children || []), subTask]
        };
      }
      // Otherwise, recursively add the subtask to the children of the current task
      return {
        ...task,
        children: this.addSubTaskRecursive(task.children || [], parentId, subTask)
      };
    });
  }

  // Pfuncion to add sub task
  addSubTask(parentId: number, subTask: ITask) {
    this.tasks = this.addSubTaskRecursive(this.tasks, parentId, subTask);
    this.updateLocalStorage();
  }

  findSpecificTask(taskId: number, tasks: ITask[] = this.tasks): ITask | undefined {
    for (const task of tasks) {
      if (task.id === taskId) {
        return task;
      }
      if (task.children && task.children.length > 0) {
        // Recursive call to check in children
        const foundTask = this.findSpecificTask(taskId, task.children);
        if (foundTask) {
          return foundTask;
        }
      }
    }
    return undefined;
  }
  // funciont to flater the task
  flattenTasks(tasks: ITask[]): ITask[] {
    let result: ITask[] = [];

    tasks.forEach(task => {
      result.push(task);
      if (task.children) {
        result = result.concat(this.flattenTasks(task.children));
      }
    });

    return result;
  }

}
