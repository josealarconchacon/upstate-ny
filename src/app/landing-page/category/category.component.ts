import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  @Input() categories: string[] = ['hike', 'art', 'explore', 'food'];

  getCategoryIcon(category: string): string {
    switch (category.toLowerCase()) {
      case 'hike':
        return 'bi-tree fs-1';
      case 'art':
        return 'bi-palette fs-1';
      case 'explore':
        return 'bi-compass fs-1';
      case 'food':
        return 'bi-cup-hot fs-1';
      default:
        return 'bi-compass fs-1';
    }
  }

  getCategoryDescription(category: string): string {
    switch (category.toLowerCase()) {
      case 'hike':
        return 'Discover scenic trails and outdoor adventures';
      case 'art':
        return 'Explore galleries, museums, and cultural experiences';
      case 'explore':
        return 'Find hidden gems and unique destinations';
      case 'food':
        return 'Taste local cuisine and culinary delights';
      default:
        return 'Discover amazing experiences';
    }
  }
}
