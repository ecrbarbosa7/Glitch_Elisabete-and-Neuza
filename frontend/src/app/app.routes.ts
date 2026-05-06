import { Routes } from '@angular/router';

/*Estos componentes representan las páginas principales de la aplicación.*/

import { HomeComponent } from './features/home/home.component';
import { FilmesComponent } from './features/filmes/filmes.component';
import { SeriesComponent } from './features/series/series.component';
import { FavoritosComponent } from './features/favoritos/favoritos.component';


/*Las rutas de Angular controlan la navegación entre páginas.*/

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
    component: FavoritosComponent
  }

];