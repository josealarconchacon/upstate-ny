import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturedTownsComponent } from './featured-towns/featured-towns.component';
import { PopularExperiencesComponent } from './popular-experiences/popular-experiences.component';
import { FooterComponent } from './footer/footer.component';
import { CategoryComponent } from './category/category.component';
import { Town, Place } from '../core/model/town';
import { Experience } from '../core/model/experience';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FeaturedTownsComponent,
    PopularExperiencesComponent,
    FooterComponent,
    CategoryComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  towns: Town[] = [];
  featuredTowns: Town[] = [];
  allTowns: Town[] = [];
  experiences: Experience[] = [];
  searchQuery: string = '';
  searchSuggestions: string[] = [];
  activeTab: string = 'destinations';

  seasons = [
    { value: 'spring', label: 'Spring' },
    { value: 'summer', label: 'Summer' },
    { value: 'fall', label: 'Fall' },
    { value: 'winter', label: 'Winter' },
  ];

  durations = [
    { value: 'weekend', label: 'Weekend Getaway' },
    { value: 'week', label: 'Week Long' },
    { value: 'extended', label: 'Extended Stay' },
  ];

  popularDestinations = [
    'Lake Placid',
    'Saratoga Springs',
    'Cooperstown',
    'Hudson Valley',
    'Adirondacks',
    'Finger Lakes',
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadTowns();
  }

  private loadTowns() {
    this.http.get<Town[]>('./assets/data/upstate-ny-full.json').subscribe({
      next: (data) => {
        this.towns = data.map((town) => ({
          ...town,
          rating: this.getRandomRating(),
          reviewCount: this.getRandomReviewCount(),
        }));

        this.featuredTowns = [
          this.towns.find((town) => town.name === 'Beacon')!,
          this.towns.find((town) => town.name === 'Saratoga Springs')!,
          this.towns.find((town) => town.name === 'Woodstock')!,
          this.towns.find((town) => town.name === 'New Paltz')!,
        ].filter(Boolean);

        this.allTowns = this.towns.filter(
          (town) =>
            !this.featuredTowns.some((featured) => featured?.id === town.id)
        );

        this.generateExperiences();
      },
      error: (error) => {
        console.error('Error loading towns:', error);
      },
    });
  }

  private generateExperiences() {
    const allPlaces: Place[] = [];

    this.towns.forEach((town) => {
      if (town.places && town.places.length > 0) {
        allPlaces.push(...town.places);
      }
    });

    this.experiences = allPlaces
      .filter((place) => place.images && place.images.trim() !== '')
      .map((place) => {
        const town = this.towns.find(
          (t) => t.places && t.places.some((p) => p.id === place.id)
        );

        return {
          id: place.id,
          title: place.name,
          image: place.images,
          location: town ? town.name : 'Upstate NY',
          type: place.type,
          website: place.website,
        };
      })
      .slice(0, 6);
  }

  getPlaceholderImage(): string {
    return './assets/images/placeholder.jpg';
  }

  getImagePath(imagePath: string): string {
    return imagePath || this.getPlaceholderImage();
  }

  private getRandomRating(): number {
    return +(Math.random() * 2 + 3).toFixed(1);
  }

  private getRandomReviewCount(): number {
    return Math.floor(Math.random() * 500) + 50;
  }

  onSearch(): void {
    console.log('Searching for:', this.searchQuery);
  }

  onSubscribe(email: string): void {
    console.log('Subscribing email:', email);
  }

  hasSocialMedia(socialMedia: any, platform: string): boolean {
    return (
      socialMedia &&
      socialMedia[platform] !== null &&
      socialMedia[platform] !== ''
    );
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.toLowerCase();

    if (value.length > 2) {
      this.searchSuggestions = this.popularDestinations
        .filter((dest) => dest.toLowerCase().includes(value))
        .slice(0, 5);
    } else {
      this.searchSuggestions = [];
    }
  }

  selectSuggestion(suggestion: string): void {
    this.searchQuery = suggestion;
    this.searchSuggestions = [];
  }

  selectDestination(destination: string | Town): void {
    if (typeof destination === 'string') {
      this.searchQuery = destination;
    } else {
      this.searchQuery = destination.name;
    }
    this.searchSuggestions = [];
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
