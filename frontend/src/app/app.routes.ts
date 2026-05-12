import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { FilmesComponent } from './features/filmes/filmes.component';
import { SeriesComponent } from './features/series/series.component';
import { FavoritosComponent } from './features/favoritos/favoritos.component';

import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
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
    component: FavoritosComponent
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