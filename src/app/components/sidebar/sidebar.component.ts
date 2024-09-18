import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ITask } from '../../types/type';
import { TaskService } from '../../services/task.service';
import { SidebarTaskItemComponent } from '../sidebar-task-item/sidebar-task-item.component';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, SidebarTaskItemComponent, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  service = inject(TaskService);
  modalService = inject(ModalService);
  tasks: ITask[] = [];

  ngOnInit(): void {
    this.service.tasks$.subscribe(tasksData => {
      this.tasks = tasksData;
    })
  }
  onOpen() {
    this.modalService.onToggleOpen();
  }

}
