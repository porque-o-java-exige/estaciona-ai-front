import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
  activeTab = 'geral';

  setTab(tab: string) {
    this.activeTab = tab;
  }
}
