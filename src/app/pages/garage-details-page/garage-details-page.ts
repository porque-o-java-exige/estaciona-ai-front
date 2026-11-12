import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Button } from '../../components/atoms/button/button';
import { Chip } from '../../components/atoms/chip/chip';
import { Footer } from '../../components/organisms/footer/footer';
import { BookingService } from '../../services/booking.service';
import { GarageService } from '../../services/garage.service';

@Component({
  selector: 'app-garage-details-page',
  standalone: true,
  imports: [RouterLink, Button, Chip, Footer],
  templateUrl: './garage-details-page.html',
  styleUrl: './garage-details-page.scss',
})
export class GarageDetailsPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly garageService = inject(GarageService);
  private readonly bookingService = inject(BookingService);

  garageId = signal<string | null>(null);
  reservationAdded = signal<boolean>(false);

  garage = computed(() => this.garageService.getGarageById(this.garageId()));

  spotsRemainingText = computed(() => {
    const spots = this.garage().remainingSpots;
    return `${spots} ${spots === 1 ? 'vaga restante' : 'vagas restantes'}`;
  });

  reviewsSubtext = computed(() => `(${this.garage().reviewsCount})`);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const id = params.get('id') ?? this.route.snapshot.paramMap.get('id');
      if (id) {
        this.garageId.set(id);
        this.garageService.selectGarage(id);
      }
    });
  }

  onOpenChat = (): void => {
    this.router.navigate(['/chat'], {
      queryParams: { garageId: this.garage().id },
    });
  };

  onAddToBooking = (): void => {
    this.reservationAdded.set(true);
    this.bookingService.addBookingFromGarage(this.garage());
    this.router.navigate(['/booking'], {
      queryParams: { garageId: this.garage().id },
    });
  };
}

