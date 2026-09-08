import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../components/atoms/input/input';
import { ComponentData } from '../../interfaces/component-data.interface';
import { COMPONENTS_DATA } from '../../interfaces/component-data.generated';

@Component({
  selector: 'app-home',
  imports: [InputComponent, CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomePage {
  private router = inject(Router);
  
  searchQuery = '';
  selectedIndex = 0;
  
  get filteredComponents(): ComponentData[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      return COMPONENTS_DATA; // Mostra todos os componentes quando a busca está vazia
    }
    // Busca apenas pelo nome do componente, não pela descrição
    return COMPONENTS_DATA.filter(component => 
      component.name.toLowerCase().includes(query)
    );
  }
  
  onSearchChange(value: string): void {
    this.searchQuery = value;
    this.selectedIndex = 0; // Reset selection when search changes
  }
  
  handleKeyDown(event: KeyboardEvent): void {
    const components = this.filteredComponents.slice(0, 5);
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, components.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
        break;
      case 'Enter':
        event.preventDefault();
        if (components[this.selectedIndex]) {
          this.navigateToComponent(components[this.selectedIndex].id);
        }
        break;
      case 'Escape':
        this.searchQuery = '';
        this.selectedIndex = 0;
        break;
    }
  }
  
  navigateToComponent(componentId: string): void {
    this.searchQuery = '';
    this.selectedIndex = 0;
    this.router.navigate(['/component', componentId]);
  }
}
