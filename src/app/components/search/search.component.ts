import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../types/type';
import { TaskCardComponent } from '../task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [TaskCardComponent, CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  services = inject(TaskService);
  tasks: ITask[] = [];
  filteredTasks: ITask[] = [];
  searchValue: string = '';

  ngOnInit(): void {
    this.services.tasks$.subscribe(data => {
      this.tasks = data;
      this.filteredTasks = this.tasks;
    });
  }

  onSearch(): void {
    const searchQuery = this.searchValue.toLowerCase();
    this.filteredTasks = this.tasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
}
