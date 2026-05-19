import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SeriesService } from '../../../../services/series.service';
import { AuthService } from '../../../../services/auth.services';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent implements OnInit {
  series: any[] = [];
  selectedSerie: any = null;
  favorites: any[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private seriesService: SeriesService,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSeries();

    if (this.isLoggedIn()) {
      this.loadFavorites();
    }
  }

  loadSeries(): void {
    this.seriesService.getSeries().subscribe({
      next: (data) => {
        this.series = data;

        if (data && data.length > 0) {
          this.selectedSerie = data[0];
        }

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading series:', err);
      }
    });
  }

  loadFavorites(): void {
  this.auth.getFavorites().subscribe({
    next: (res) => {
      this.favorites = res.favorites || [];
      this.cdr.detectChanges();
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
        this.cdr.detectChanges();
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
      this.cdr.detectChanges();
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