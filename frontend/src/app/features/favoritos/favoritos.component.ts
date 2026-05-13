import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../../services/auth.services';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent {

  favorites: any[] = [];

  constructor(
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.auth.getFavorites().subscribe({
      next: (res) => {
        console.log('Favorites from backend:', res);

        this.favorites = [...(res.favorites || [])];

        console.log('Favorites loaded:', this.favorites.length);

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading favorites:', err);
      }
    });
  }

  removeFavorite(item: any) {
    this.auth.removeFavorite(item.title).subscribe({
      next: (res) => {
        this.favorites = [...(res.favorites || [])];

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error removing favorite:', err);
      }
    });
  }
}