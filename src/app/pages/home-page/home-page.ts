import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Input } from '../../components/atoms/input/input';
import { GarageCard } from '../../components/molecules/garage-card/garage-card';
import { GarageMap } from '../../components/organisms/garage-map/garage-map';
import { Footer } from '../../components/organisms/footer/footer';
import { GarageItem } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import { GarageService } from '../../services/garage.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, FormsModule, Input, GarageCard, GarageMap, Footer],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private readonly authService = inject(AuthService);
  private readonly garageService = inject(GarageService);

  user = this.authService.currentUser;
  garages = this.garageService.homeGarages;
  selectedGarageId = this.garageService.selectedGarageId;
  searchQuery = this.garageService.searchQuery;

  firstName = computed(() => {
    const fullName = this.user().name.trim();
    return fullName.split(' ')[0] || 'Motorista';
  });

  onSelectGarage = (garage: GarageItem): void => {
    this.garageService.selectGarage(garage.id);
  };

  onSearch = (query: string): void => {
    this.garageService.setSearchQuery(query);
  };
}
