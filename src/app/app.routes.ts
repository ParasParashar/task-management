import { Routes } from '@angular/router';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        pathMatch: 'full',
        children: [
            {
                path: '',
                component: AddTaskComponent
            }
        ]
    }
];
