import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GarageCard } from '../../components/molecules/garage-card/garage-card';
import { Footer } from '../../components/organisms/footer/footer';
import { GarageItem } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import { GarageService } from '../../services/garage.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, GarageCard, Footer],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private readonly authService = inject(AuthService);
  private readonly garageService = inject(GarageService);

  user = this.authService.currentUser;
  garages = this.garageService.homeGarages;
  selectedGarageId = this.garageService.selectedGarageId;

  firstName = computed(() => {
    const fullName = this.user().name.trim();
    return fullName.split(' ')[0] || 'Motorista';
  });

  activePinGarage = computed(() =>
    this.garageService.getGarageById(this.selectedGarageId())
  );

  onSelectGarage = (garage: GarageItem): void => {
    this.garageService.selectGarage(garage.id);
  };
}
