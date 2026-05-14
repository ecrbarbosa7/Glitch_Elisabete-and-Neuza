import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MovieService } from '../../../../services/movie.service';
import { AuthService } from '../../../../services/auth.services';

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
  favorites: any[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private movieService: MovieService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data;
      this.selectedMovie = data[0];
    });

    if (this.isLoggedIn()) {
      this.loadFavorites();
    }
  }

  loadFavorites() {
    this.auth.getFavorites().subscribe({
      next: (res) => {
        this.favorites = res.favorites || [];
      },
      error: (err) => {
        console.error('Error loading favorites:', err);
      }
    });
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  goToRegister() {
    this.router.navigate(['/register']);
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
    if (!this.isLoggedIn()) {
      this.goToRegister();
      return;
    }

    if (this.isFavorite(item)) {
      this.auth.removeFavorite(item.title).subscribe({
        next: (res) => {
          this.favorites = res.favorites || [];
        },
        error: (err) => {
          console.error('Error removing favorite:', err);
        }
      });

      return;
    }

    this.auth.addFavorite({
      ...item,
      type: 'movie'
    }).subscribe({
      next: (res) => {
        this.favorites = res.favorites || [];
      },
      error: (err) => {
        console.error('Error adding favorite:', err);
      }
    });
  }

  isFavorite(item: any) {
    if (!this.isLoggedIn()) {
      return false;
    }

    return this.favorites.some(
      (fav: any) => fav.title === item.title
    );
  }
}