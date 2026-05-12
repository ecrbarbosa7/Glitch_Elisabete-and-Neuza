import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent {

  favorites: any[] = [];

  ngOnInit() {
    this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  removeFavorite(item: any) {
    this.favorites = this.favorites.filter(
      fav => fav.title !== item.title
    );

    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}