import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import * as maplibregl from 'maplibre-gl';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [],
  templateUrl: './mapa.html',
  styleUrl: './mapa.scss',
})
export class Mapa implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') private mapContainer!: ElementRef<HTMLDivElement>;
  private map: maplibregl.Map | null = null;

  public isDarkMode = true;
  public isLeftPanelOpen = true;

  // Configuração nativa de estilo Escuro sem dependência externa
  private readonly darkStyle: maplibregl.StyleSpecification = {
    version: 8,
    sources: {
      'carto-dark': {
        type: 'raster',
        tiles: ['https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '&copy; OpenStreetMap &copy; CARTO'
      }
    },
    layers: [{ id: 'carto-dark-layer', type: 'raster', source: 'carto-dark', minzoom: 0, maxzoom: 19 }]
  };

  // Configuração nativa de estilo Claro sem dependência externa
  private readonly lightStyle: maplibregl.StyleSpecification = {
    version: 8,
    sources: {
      'osm-light': {
        type: 'raster',
        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '&copy; OpenStreetMap contributors'
      }
    },
    layers: [{ id: 'osm-light-layer', type: 'raster', source: 'osm-light', minzoom: 0, maxzoom: 19 }]
  };

  private readonly defaultCenter: [number, number] = [-46.6576, -23.5883];

  ngAfterViewInit(): void {
    this.initMap(this.darkStyle);
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private initMap(style: maplibregl.StyleSpecification): void {
    if (!this.mapContainer?.nativeElement) return;

    if (this.map) {
      this.map.remove();
    }

    this.map = new maplibregl.Map({
      container: this.mapContainer.nativeElement,
      style: style,
      center: this.defaultCenter,
      zoom: 15,
      pitch: 0,
      bearing: 0,
      attributionControl: { compact: true }
    });

    this.map.on('load', () => {
      this.map?.resize();
    });

    this.map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');
  }

  public toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    const selectedStyle = this.isDarkMode ? this.darkStyle : this.lightStyle;
    this.initMap(selectedStyle);
  }

  public toggleLeftPanel(): void {
    this.isLeftPanelOpen = !this.isLeftPanelOpen;
  }
}