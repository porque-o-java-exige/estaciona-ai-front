import { Component, computed, input } from '@angular/core';

export type chipVariant = 'attribute' | 'rating' | 'distance' | 'chat' | 'parking-spots' | 'reservation-filter' | 'status'

const variantIcon:Record<chipVariant, string[]> = {
  attribute: [],
  rating: ['star-icon.svg', 'star-icon.svg', 'star-icon.svg', 'star-icon.svg', 'star-icon.svg'],
  distance: ['distance-icon.svg'],
  chat: ['chat-icon.svg'],
  "parking-spots": [],
  "reservation-filter": [],
  status: []
}

@Component({
  selector: 'app-chip',
  imports: [],
  templateUrl: './chip.html',
  styleUrl: './chip.scss',
})
export class Chip {  
  
  variant = input<chipVariant>('attribute')
 
  iconPaths = computed(() => {
    const files = variantIcon[this.variant()] ?? []
    return files.map(file => `/assets/icons/${file}`) 
  })
 
  text = input.required<string>()
  subtext = input<string>('')

  isActive = input<boolean>(false)

  isReservationFilterActive = computed(() => {
    return this.variant() === 'reservation-filter' && this.isActive()
  })

  isPendingOrDone = input<boolean>(false)

  isStatusPendingOrDone = computed(() => {
    return this.variant() === 'status' && this.isPendingOrDone()
  })

}
