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

  public isDarkMode = false;
  public isLeftPanelOpen = true;

  // Servidor OpenStreetMap oficial
  private readonly mapStyle: maplibregl.StyleSpecification = {
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

  private readonly defaultCenter: [number, number] = [-46.6576, -23.5883];

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  // 1. Método initMap ATUALIZADO (Substitua o antigo por este)
  private initMap(): void {
    if (!this.mapContainer?.nativeElement) return;

    this.map = new maplibregl.Map({
      container: this.mapContainer.nativeElement,
      style: this.mapStyle,
      center: this.defaultCenter,
      zoom: 11, // Zoom ajustado para visualizar a Grande SP como no Figma
      attributionControl: { compact: true }
    });

    this.map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');

    this.map.on('load', () => {
      this.map?.resize();
      // Executa os novos elementos visuais assim que o mapa carrega
      this.adicionarRaioDeBusca();
      this.adicionarPinosEstacionamento();
    });
  }

  // 2. Desenha o círculo de raio centralizado (Novo método)
  private adicionarRaioDeBusca(): void {
    if (!this.map) return;

    this.map.addSource('area-busca', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-46.6576, -23.5883]
        },
        properties: {}
      }
    });

    this.map.addLayer({
      id: 'area-busca-circle',
      type: 'circle',
      source: 'area-busca',
      paint: {
        'circle-radius': 90,
        'circle-color': '#000000',
        'circle-opacity': 0.04,
        'circle-stroke-width': 1.5,
        'circle-stroke-color': '#333333'
      }
    });
  }

  // 3. Adiciona os pinos amarelos de estacionamento (Novo método)
  private adicionarPinosEstacionamento(): void {
    const pontos: [number, number][] = [
      [-46.6576, -23.5883], // Centro SP
      [-46.6333, -23.5505], // Mooca / Brás
      [-46.6800, -23.5700], // Pinheiros
      [-46.6200, -23.6000], // Ipiranga
      [-46.5333, -23.4667], // Guarulhos
      [-46.5261, -23.6761], // São Bernardo
      [-46.3200, -23.5300]  // Mogi / Leste
    ];

    pontos.forEach((coord) => {
      if (!this.map) return;
      new maplibregl.Marker({ color: '#EAB308' }) // Amarelo do Figma
        .setLngLat(coord)
        .addTo(this.map);
    });
  }

  public toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
  }

  public toggleLeftPanel(): void {
    this.isLeftPanelOpen = !this.isLeftPanelOpen;
    setTimeout(() => this.map?.resize(), 350);
  }
}