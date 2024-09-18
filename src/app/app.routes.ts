import { Routes } from '@angular/router';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,

    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'home',
                component: AddTaskComponent,
                canActivate: [authGuard]
            },
            {
                path: 'view/:id',
                component: ViewTaskComponent,
                canActivate: [authGuard]

            },
            {
                path: 'search',
                component: SearchComponent,
                canActivate: [authGuard]

            },

        ]
    }
];
