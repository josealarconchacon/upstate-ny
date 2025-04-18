import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Town } from '../../core/model/town';

@Component({
  selector: 'app-featured-towns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-towns.component.html',
  styleUrls: ['./featured-towns.component.scss'],
})
export class FeaturedTownsComponent implements OnInit {
  @Input() featuredTowns: Town[] = [];

  private defaultPlaceholder = './assets/images/placeholder.jpg';

  ngOnInit(): void {
    this.preloadTownImages();
  }

  getImagePath(imagePath: string): string {
    if (!imagePath) {
      return this.defaultPlaceholder;
    }

    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }

    if (imagePath.startsWith('./assets/') || imagePath.startsWith('/assets/')) {
      return imagePath;
    }

    if (!imagePath.includes('/')) {
      return `./assets/images/${imagePath}`;
    }

    if (imagePath.startsWith('../images/')) {
      return `./assets/${imagePath.substring(3)}`;
    }

    return this.defaultPlaceholder;
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    if (imgElement) {
      imgElement.src = this.defaultPlaceholder;
    }
  }

  private preloadTownImages(): void {
    // Preload images for featured towns
    this.featuredTowns.forEach((town) => {
      if (town.images) {
        const img = new Image();
        img.src = this.getImagePath(town.images);
      }
    });
  }

  hasSocialMedia(socialMedia: any, platform: string): boolean {
    return (
      socialMedia &&
      socialMedia[platform] !== null &&
      socialMedia[platform] !== ''
    );
  }
}
