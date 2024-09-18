import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../types/type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sub-task-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sub-task-create.component.html',
  styleUrl: './sub-task-create.component.css'
})
export class SubTaskCreateComponent {
  service = inject(TaskService);
  @Input() parentTask!: ITask;
  @Output() editTask = new EventEmitter();

  // using form to create task
  taskForm: FormGroup = new FormGroup({
    id: new FormControl(Date.now()),
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl(new Date()),
    isCompleted: new FormControl(false),
    children: new FormControl([]),
  });

  ngOnInit() {
    // if (this.task) {
    //   this.taskForm.patchValue({
    //     id: this.task.id,
    //     title: this.task.title,
    //     description: this.task.description,
    //     date: this.task.date,
    //     isCompleted: this.task.isCompleted,
    //     children: this.task.children
    //   });
    // }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.service.addSubTask(this.parentTask?.id, this.taskForm.value);
      this.taskForm.reset();
      this.editTask.emit();
    }
  }
}
