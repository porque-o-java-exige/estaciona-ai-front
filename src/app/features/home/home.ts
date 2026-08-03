import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, AfterViewInit {
  private map: L.Map | undefined;
  showBottomSheet = false;
  selectedGarage: any = null;

  garages = [
    { id: 1, name: 'Estacionamento Central', address: 'Av. Paulista, 1000', lat: -23.55052, lng: -46.633308, price: 'R$15', spaces: 2, rating: 4.8, distance: '0.2 km', image: 'https://images.unsplash.com/photo-1604063154562-678077b9bdfb?auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'Vaga Segura 24h', address: 'Rua Augusta, 500', lat: -23.555, lng: -46.635, price: 'R$10', spaces: 1, rating: 4.5, distance: '0.5 km', image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'Garagem do João', address: 'Rua da Consolação, 200', lat: -23.548, lng: -46.628, price: 'R$8', spaces: 5, rating: 4.9, distance: '0.8 km', image: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=400&q=80' }
  ];

  constructor(private zone: NgZone) {}

  ngOnInit() {
    // Fix leaflet marker issues in Angular
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      zoomControl: false
    }).setView([-23.55052, -46.633308], 14); // São Paulo

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap © CARTO'
    }).addTo(this.map);

    // Mock markers
    this.garages.forEach(g => {
      // Custom div icon for the price markers
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `<div class="marker-pin"><i class="ph-fill ph-map-pin"></i><span class="badge">${g.spaces}</span></div>`,
        iconSize: [30, 42],
        iconAnchor: [15, 42]
      });

      L.marker([g.lat, g.lng], { icon: customIcon })
        .addTo(this.map!)
        .on('click', () => {
          this.zone.run(() => {
            this.selectedGarage = g;
            this.showBottomSheet = true;
          });
        });
    });

    // Draw the blue circle like in the design
    L.circle([-23.55052, -46.633308], {
      color: '#1e52a5',
      fillColor: '#1e52a5',
      fillOpacity: 0.15,
      radius: 800
    }).addTo(this.map);
  }

  closeSheet() {
    this.showBottomSheet = false;
  }
}
