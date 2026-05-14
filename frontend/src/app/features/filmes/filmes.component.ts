import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MovieService } from '../../../../services/movie.service';

@Component({
  selector: 'app-filmes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.css']
})
export class FilmesComponent implements OnInit {

  movies: any[] = [];
  selectedMovie: any;

  constructor(
    private sanitizer: DomSanitizer,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data;
      this.selectedMovie = data[0];
    });
  }

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