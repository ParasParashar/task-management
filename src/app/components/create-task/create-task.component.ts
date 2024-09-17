import { Component, inject } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  // using service
  service = inject(TaskService);
  modalService = inject(ModalService);

  // using form to create task
  taskForm: FormGroup = new FormGroup({
    id: new FormControl(Date.now()),
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl(new Date()),
    isCompleted: new FormControl(false),
  });

  onSubmit() {
    if (this.taskForm.valid) {
      this.service.onAddTask(this.taskForm.value);
      this.taskForm.reset();
      this.modalService.onToggleOpen();

    }
  }

}
