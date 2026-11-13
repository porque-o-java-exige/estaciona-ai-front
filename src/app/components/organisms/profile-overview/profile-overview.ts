import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Avatar } from '../../atoms/avatar/avatar';
import { UserResponse } from '../../../interfaces';

@Component({
  selector: 'app-profile-overview',
  standalone: true,
  imports: [RouterLink, Avatar],
  templateUrl: './profile-overview.html',
  styleUrl: './profile-overview.scss',
})
export class ProfileOverview {
  user = input.required<UserResponse>();
  vehicleCount = input.required<number>();
  garageCount = input.required<number>();

  editProfile = output<void>();
  rechargeWallet = output<void>();

  formatBalance = (value: number): string => value.toFixed(2).replace('.', ',');
}
