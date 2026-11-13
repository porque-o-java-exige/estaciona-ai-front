import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Image } from '../../atoms/image/image';
import { GarageService } from '../../../services/garage.service';

@Component({
  selector: 'app-garage-map',
  standalone: true,
  imports: [RouterLink, Image],
  templateUrl: './garage-map.html',
  styleUrl: './garage-map.scss',
})
export class GarageMap {
  private readonly garageService = inject(GarageService);

  garages = this.garageService.homeGarages;
  selectedGarageId = this.garageService.selectedGarageId;

  activePinGarage = computed(() => {
    const selectedId = this.selectedGarageId();
    return selectedId ? this.garageService.getGarageById(selectedId) : null;
  });

  onSelectGarage = (id: string): void => {
    this.garageService.selectGarage(id);
  };
}
