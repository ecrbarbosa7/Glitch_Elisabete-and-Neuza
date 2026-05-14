import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { AuthService } from '../../../../services/auth.services';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent {

  constructor(
    private sanitizer: DomSanitizer,
    private auth: AuthService,
    private router: Router
  ) {}

  favorites: any[] = [];

  series = [
    {
      title: 'Severance',
      summary: 'Employees discover dark secrets behind a mysterious work-life separation procedure.',
      genre: 'Sci-Fi',
      year: 2022,
      duration: '2 Seasons',
      rating: 8.7,
      image: 'https://i.pinimg.com/736x/10/dd/d4/10ddd4b1754ece422f20b54cdba3174d.jpg',
      trailer: 'https://www.youtube.com/embed/xEQP4VVuyrY'
    },
    {
      title: 'The OA',
      summary: 'A blind woman returns after years missing with her sight restored and a strange story.',
      genre: 'Mystery',
      year: 2016,
      duration: '2 Seasons',
      rating: 7.8,
      image: 'https://i.pinimg.com/736x/16/67/26/166726d0b3a732e15f40d09e572a2082.jpg',
      trailer: 'https://www.youtube.com/embed/DvHJtez2IlY'
    },
    {
      title: 'Silo',
      summary: 'People live in a giant underground silo while hiding the truth about the outside world.',
      genre: 'Sci-Fi',
      year: 2023,
      duration: '2 Seasons',
      rating: 8.1,
      image: 'https://i.pinimg.com/1200x/56/d0/77/56d0771443a9da60d6a5749a62073182.jpg',
      trailer: 'https://www.youtube.com/embed/8ZYhuvIv1pA'
    },
    {
      title: 'Foundation',
      summary: 'A group of exiles tries to save humanity as a galactic empire begins to collapse.',
      genre: 'Sci-Fi',
      year: 2021,
      duration: '2 Seasons',
      rating: 7.6,
      image: 'https://i.pinimg.com/736x/cd/e4/a4/cde4a4adfebc70178a95ae236de2d7cf.jpg',
      trailer: 'https://www.youtube.com/embed/X4QYV5GTz7c'
    },
    {
      title: 'Black Mirror',
      summary: 'Dark stories explore the dangerous connection between technology and human behavior.',
      genre: 'Sci-Fi',
      year: 2011,
      duration: '6 Seasons',
      rating: 8.7,
      image: 'https://i.pinimg.com/736x/3f/da/6c/3fda6c5c9529b188a839145d3dabb7ed.jpg',
      trailer: 'https://www.youtube.com/embed/jDiYGjp5iFg'
    },
    {
      title: 'The Peripheral',
      summary: 'A young woman discovers a hidden connection to a futuristic virtual world.',
      genre: 'Sci-Fi',
      year: 2022,
      duration: '1 Season',
      rating: 8.0,
      image: 'https://i.pinimg.com/736x/48/8a/34/488a343990e18fde5fa47642f7a15167.jpg',
      trailer: 'https://www.youtube.com/embed/bRdkRQzcrrc'
    }
  ];

  selectedSerie = this.series[0];

  ngOnInit() {
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

  selectSerie(serie: any) {
    this.selectedSerie = serie;
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
      type: 'series'
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