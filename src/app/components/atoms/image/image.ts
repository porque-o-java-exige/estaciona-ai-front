import { Component, input } from '@angular/core';

@Component({
  selector: 'app-image',
  standalone: true,
  templateUrl: './image.html',
  styleUrl: './image.scss',
  host: {
    '[style.width]': 'hostWidth()',
    '[style.height]': 'hostHeight()',
  },
})
export class Image {
  src = input.required<string>();
  alt = input<string>('');
  width = input<string | number>('100%');
  height = input<string | number>('100%');
  loading = input<'eager' | 'lazy'>('lazy');
  objectFit = input<'cover' | 'contain'>('cover');
  fetchPriority = input<'high' | 'low' | 'auto'>('auto');

  hostWidth = (): string => {
    const width = this.width();
    return typeof width === 'number' ? `${width}px` : width;
  };

  hostHeight = (): string => {
    const height = this.height();
    return typeof height === 'number' ? `${height}px` : height;
  };
}
