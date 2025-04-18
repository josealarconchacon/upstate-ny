import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../core/model/experience';

@Component({
  selector: 'app-popular-experiences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popular-experiences.component.html',
  styleUrls: ['./popular-experiences.component.scss'],
})
export class PopularExperiencesComponent {
  @Input() experiences: Experience[] = [];

  getImagePath(imagePath: string): string {
    return imagePath || './assets/images/placeholder.jpg';
  }

  hasSocialMedia(socialMedia: any, platform: string): boolean {
    return (
      socialMedia &&
      socialMedia[platform] !== null &&
      socialMedia[platform] !== ''
    );
  }
}
