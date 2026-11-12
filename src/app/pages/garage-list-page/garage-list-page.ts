import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../components/atoms/button/button';
import { Chip } from '../../components/atoms/chip/chip';
import { GarageCard } from '../../components/molecules/garage-card/garage-card';
import { Footer } from '../../components/organisms/footer/footer';
import { GarageItem } from '../../interfaces';
import { GarageService } from '../../services/garage.service';

@Component({
  selector: 'app-garage-list-page',
  standalone: true,
  imports: [RouterLink, Button, Chip, GarageCard, Footer],
  templateUrl: './garage-list-page.html',
  styleUrl: './garage-list-page.scss',
})
export class GarageListPage {
  private readonly garageService = inject(GarageService);

  garages = this.garageService.filteredGarages;
  filterOptions = this.garageService.filterOptions;
  activeFilter = this.garageService.activeFilter;
  searchQuery = this.garageService.searchQuery;
  selectedGarageId = this.garageService.selectedGarageId;

  onSelectFilter = (filter: string): void => {
    this.garageService.setActiveFilter(filter);
  };

  onClearFilters = (): void => {
    this.garageService.setSearchQuery('');
    this.garageService.setActiveFilter('Todas');
  };

  onSelectGarage = (garage: GarageItem): void => {
    this.garageService.selectGarage(garage.id);
  };
}

