import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { FilmesComponent } from './features/filmes/filmes.component';
import { SeriesComponent } from './features/series/series.component';
import { FavoritosComponent } from './features/favoritos/favoritos.component';
import { AdminComponent } from './features/admin/admin.component';
import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';

import { authGuard } from './auth.guard';
import { adminGuard } from './admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'movies',
    component: FilmesComponent
  },
  {
    path: 'series',
    component: SeriesComponent
  },
  {
  path: 'favorites',
  component: FavoritosComponent,
  canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];