import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-filmes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.css']
})
export class FilmesComponent {

  
  constructor(private sanitizer: DomSanitizer) {}

  movies = [
  {
    title: 'The Matrix',
    summary: 'A hacker discovers that reality is a simulation controlled by machines.',
    genre: 'Cyberpunk',
    year: 1999,
    duration: '2h 16m',
    rating: 8.7,
    image: 'https://i.pinimg.com/736x/be/51/51/be51519ad8c447770d8f3985e3a6bfce.jpg',

    trailer: 'https://www.youtube.com/embed/vKQi3bBA1y8'
},

  {
    title: 'Interstellar',
    summary: 'A team travels through space in search of a new home for humanity.',
    genre: 'Sci-Fi',
    year: 2014,
    duration: '2h 49m',
    rating: 8.6,
    image: 'https://i.pinimg.com/736x/1f/c9/33/1fc9333403a78e182b3921db0974f070.jpg',
    
    trailer: 'https://www.youtube.com/embed/2LqzF5WauAw'

  },

  {
    title: 'Blade Runner 2049',
    summary: 'A young blade runner uncovers a secret that could change society forever.',
    genre: 'Sci-Fi',
    year: 2017,
    duration: '2h 44m',
    rating: 8.0,
    image: 'https://i.pinimg.com/736x/28/93/01/28930196d273cc39439ea877b21b8e2d.jpg',

trailer: 'https://www.youtube.com/embed/geFtxCSz8xI'
  },

  {
    title: 'Inception',
    summary: 'A thief enters people’s dreams to steal and manipulate ideas.',
    genre: 'Sci-Fi',
    year: 2010,
    duration: '2h 28m',
    rating: 8.8,
    image: 'https://i.pinimg.com/736x/7c/35/88/7c35881dc97da007e19f0b989685c888.jpg',

trailer: 'https://www.youtube.com/embed/8hP9D6kZseM'
  },

  {
    title: 'Arrival',
    summary: 'A linguist tries to communicate with mysterious alien visitors.',
    genre: 'Sci-Fi',
    year: 2016,
    duration: '1h 56m',
    rating: 7.9,
    image: 'https://i.pinimg.com/736x/80/af/49/80af4920508780e3b7517989295591c3.jpg',

    trailer: 'https://www.youtube.com/embed/ZLO4X6UI8OY'
  },

  {
    title: 'Ex Machina',
    summary: 'A programmer tests the intelligence of a humanoid AI robot.',
    genre: 'Sci-Fi',
    year: 2014,
    duration: '1h 48m',
    rating: 7.7,
    image: 'https://i.pinimg.com/736x/96/89/67/9689672b578a09e69340937d7587628a.jpg',

   trailer: 'https://www.youtube.com/embed/qSwobe3uIII'
  }
];


  selectedMovie = this.movies[0];

  selectMovie(movie: any) {
    this.selectedMovie = movie;
  }
  getStars(rating: number) {
  return '★'.repeat(Math.floor(rating / 2));
} 
  sanitizeUrl(url: string) {
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}

  toggleFavorite(item: any) {

    const favorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );

    const exists = favorites.find(
      (fav: any) => fav.title === item.title
    );

    if (exists) {

      const updated = favorites.filter(
        (fav: any) => fav.title !== item.title
      );

      localStorage.setItem(
        'favorites',
        JSON.stringify(updated)
      );

    } else {

      favorites.push(item);

      localStorage.setItem(
        'favorites',
        JSON.stringify(favorites)
      );
    }
  }
   isFavorite(item: any) {

  const favorites = JSON.parse(
    localStorage.getItem('favorites') || '[]'
  );

  return favorites.some(
    (fav: any) => fav.title === item.title
  );
}
}

