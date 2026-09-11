import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../components/atoms/input/input';
import { Button } from '../../components/atoms/button/button';
import { Chip } from '../../components/atoms/chip/chip';
import { Avatar } from '../../components/atoms/avatar/avatar';
import { Badge } from '../../components/atoms/badge/badge';
import { Icon } from '../../components/atoms/icon/icon';
import { Label } from '../../components/atoms/label/label';
import { Toggle } from '../../components/atoms/toggle/toggle';
import { Checkbox } from '../../components/atoms/checkbox/checkbox';
import { Calendar } from '../../components/atoms/calendar/calendar';
import { GarageCard } from '../../components/atoms/garage-card/garage-card';
import { ComponentData } from '../../interfaces/component-data.interface';
import { COMPONENTS_DATA } from '../../interfaces/component-data.generated';
import { COMPONENT_DOCS } from './component-docs';

@Component({
  selector: 'app-component-detail',
  imports: [CommonModule, InputComponent, Button, Chip, Avatar, Badge, Icon, Label, Toggle, Checkbox, Calendar, GarageCard],
  templateUrl: './component-detail.html',
  styleUrl: './component-detail.scss'
})
export class ComponentDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  component: ComponentData | null = null;
  
  ngOnInit(): void {
    const componentId = this.route.snapshot.paramMap.get('id');
    this.component = COMPONENTS_DATA.find(c => c.id === componentId) || null;
    
    if (!this.component) {
      this.router.navigate(['/']);
    }
  }
  
  goBack(): void {
    this.router.navigate(['/']);
  }

  hasDoc(): boolean {
    return !!this.component && !!COMPONENT_DOCS[this.component.id];
  }

  downloadDoc(): void {
    if (!this.component) {
      return;
    }

    const content = COMPONENT_DOCS[this.component.id];
    if (!content) {
      return;
    }

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.component.id.toUpperCase()}.md`;
    link.click();

    URL.revokeObjectURL(url);
  }
}
