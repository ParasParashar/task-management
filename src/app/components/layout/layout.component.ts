import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { ModalComponent } from '../modal/modal.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CreateTaskComponent, ModalComponent, SidebarComponent, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isSidebarOpen = false;
  router = inject(Router)

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  onLogout() {
    localStorage.removeItem('login-data');
    this.router.navigateByUrl('/login');
  }

}
