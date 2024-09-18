import { Routes } from '@angular/router';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { SearchComponent } from './components/search/search.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: AddTaskComponent
            },
            {
                path: 'view/:id',
                component: ViewTaskComponent
            },
            {
                path: 'search',
                component: SearchComponent
            },

        ]
    }
];
