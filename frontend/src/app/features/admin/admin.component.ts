import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MovieService } from '../../../../services/movie.service';
import { SeriesService } from '../../../../services/series.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  movies: any[] = [];
  series: any[] = [];

  movie = {
    title: '',
    summary: '',
    genre: '',
    year: '',
    duration: '',
    rating: '',
    image: '',
    trailer: ''
  };

  serie = {
    title: '',
    summary: '',
    genre: '',
    year: '',
    duration: '',
    rating: '',
    image: '',
    trailer: ''
  };

  constructor(
    private movieService: MovieService,
    private seriesService: SeriesService
  ) {}

  ngOnInit() {
    this.loadMovies();
    this.loadSeries();
  }

  loadMovies() {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
      },
      error: (err) => {
        console.error('Error loading movies:', err);
      }
    });
  }

  loadSeries() {
    this.seriesService.getSeries().subscribe({
      next: (data) => {
        this.series = data;
      },
      error: (err) => {
        console.error('Error loading series:', err);
      }
    });
  }

  createMovie() {
    if (
      !this.movie.title ||
      !this.movie.summary ||
      !this.movie.genre ||
      !this.movie.duration ||
      !this.movie.image ||
      !this.movie.trailer ||
      this.movie.year === '' ||
      this.movie.rating === ''
    ) {
      alert('Fill all movie fields correctly');
      return;
    }

    this.movieService.createMovie(this.movie).subscribe({
      next: () => {
        alert('Movie added successfully');

        this.loadMovies();

        this.movie = {
          title: '',
          summary: '',
          genre: '',
          year: '',
          duration: '',
          rating: '',
          image: '',
          trailer: ''
        };
      },
      error: (err) => {
        console.error('Error creating movie:', err);
      }
    });
  }

  createSerie() {
    if (
      !this.serie.title ||
      !this.serie.summary ||
      !this.serie.genre ||
      !this.serie.duration ||
      !this.serie.image ||
      !this.serie.trailer ||
      this.serie.year === '' ||
      this.serie.rating === ''  
    ) {
      alert('Fill all series fields correctly');
      return;
    }

    this.seriesService.createSerie(this.serie).subscribe({
      next: () => {
        alert('Series added successfully');

        this.loadSeries();

        this.serie = {
          title: '',
          summary: '',
          genre: '',
          year: '',
          duration: '',
          rating: '',
          image: '',
          trailer: ''
        };
      },
      error: (err) => {
        console.error('Error creating series:', err);
      }
    });
  }

  deleteMovie(id: string) {
    this.movieService.deleteMovie(id).subscribe({
      next: () => {
        this.loadMovies();
      },
      error: (err) => {
        console.error('Error deleting movie:', err);
      }
    });
  }

  deleteSerie(id: string) {
    this.seriesService.deleteSerie(id).subscribe({
      next: () => {
        this.loadSeries();
      },
      error: (err) => {
        console.error('Error deleting series:', err);
      }
    });
  }
}