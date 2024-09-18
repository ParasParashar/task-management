import { Component, Input } from '@angular/core';
import { ITask } from '../../types/type';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-task-item',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar-task-item.component.html',
  styleUrl: './sidebar-task-item.component.css'
})
export class SidebarTaskItemComponent {
  @Input() task!: ITask

}
