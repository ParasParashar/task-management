import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CreateTaskComponent, ModalComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
