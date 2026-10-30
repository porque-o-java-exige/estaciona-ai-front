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

  // Servidor global padrão OpenStreetMap
  private readonly lightStyle: maplibregl.StyleSpecification = {
    version: 8,
    sources: {
      'osm-tiles': {
        type: 'raster',
        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '&copy; OpenStreetMap contributors'
      }
    },
    layers: [{ id: 'osm-layer', type: 'raster', source: 'osm-tiles', minzoom: 0, maxzoom: 19 }]
  };

  // Servidor estático escuro via CARTO
  private readonly darkStyle: maplibregl.StyleSpecification = {
    version: 8,
    sources: {
      'carto-dark': {
        type: 'raster',
        tiles: ['https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '&copy; OpenStreetMap &copy; CARTO'
      }
    },
    layers: [{ id: 'dark-layer', type: 'raster', source: 'carto-dark', minzoom: 0, maxzoom: 19 }]
  };

  private readonly defaultCenter: [number, number] = [-46.6576, -23.5883];

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private initMap(): void {
    if (!this.mapContainer?.nativeElement) return;

    const initialStyle = this.isDarkMode ? this.darkStyle : this.lightStyle;

    this.map = new maplibregl.Map({
      container: this.mapContainer.nativeElement,
      style: initialStyle,
      center: this.defaultCenter,
      zoom: 15,
      pitch: 0,
      bearing: 0,
      attributionControl: { compact: true }
    });

    this.map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');

    this.map.on('load', () => {
      this.map?.resize();
    });
  }

  public toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.map) {
      const selectedStyle = this.isDarkMode ? this.darkStyle : this.lightStyle;
      this.map.setStyle(selectedStyle);
    }
  }

  public toggleLeftPanel(): void {
    this.isLeftPanelOpen = !this.isLeftPanelOpen;
    setTimeout(() => this.map?.resize(), 350);
  }
}