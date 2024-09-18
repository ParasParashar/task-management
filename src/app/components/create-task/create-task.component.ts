import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { ITask } from '../../types/type';
@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit {
  // using service
  service = inject(TaskService);
  modalService = inject(ModalService);
  @Input() task: ITask | null = null;
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
    if (this.task) {
      this.taskForm.patchValue({
        id: this.task.id,
        title: this.task.title,
        description: this.task.description,
        date: this.task.date,
        isCompleted: this.task.isCompleted,
        children: this.task.children
      });
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      if (this.task) {
        this.service.onUpdateTask(this.taskForm.value);
        this.editTask.emit();
      } else {
        this.service.onAddTask(this.taskForm.value);
        this.modalService.onToggleOpen();
      }

      this.taskForm.reset();
    }
  }

}
