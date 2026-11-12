import {
  Component,
  computed,
  ElementRef,
  input,
  OnDestroy,
  output,
  signal,
   viewChild,
} from '@angular/core';
import { Button } from '../../atoms/button/button';

@Component({
  selector: 'app-pix-payment-card',
  standalone: true,
  imports: [Button],
  templateUrl: './pix-payment-card.html',
  styleUrl: './pix-payment-card.scss',
})
export class PixPaymentCard implements OnDestroy {
  amount = input.required<number>();
  pixCode = input.required<string>();

  cancelConfirmed = output<void>();
  paymentConfirmed = output<void>();

  cancelDialogRef = viewChild<ElementRef<HTMLDialogElement>>('cancelDialog');
  toastPopoverRef = viewChild<ElementRef<HTMLElement>>('toastPopover');

  codeCopied = signal<boolean>(false);
  private toastTimerId: ReturnType<typeof setTimeout> | null = null;

  formattedAmount = computed(() =>
    this.amount().toFixed(2).replace('.', ',')
  );

  onCopyPixCode = async (): Promise<void> => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(this.pixCode());
      }
    } catch {
      // Clipboard API fallback handled via visual state
    }

    this.codeCopied.set(true);
    const popoverEl = this.toastPopoverRef()?.nativeElement as
      | (HTMLElement & { showPopover?: () => void; hidePopover?: () => void })
      | undefined;

    if (popoverEl && typeof popoverEl.showPopover === 'function') {
      try {
        popoverEl.showPopover();
      } catch {
        // Already open
      }
    }

    if (this.toastTimerId) {
      clearTimeout(this.toastTimerId);
    }

    this.toastTimerId = setTimeout(() => {
      this.hideToast();
    }, 3000);
  };

  hideToast = (): void => {
    this.codeCopied.set(false);
    const popoverEl = this.toastPopoverRef()?.nativeElement as
      | (HTMLElement & { hidePopover?: () => void })
      | undefined;

    if (popoverEl && typeof popoverEl.hidePopover === 'function') {
      try {
        popoverEl.hidePopover();
      } catch {
        // Already hidden
      }
    }
  };

  onOpenCancelModal = (): void => {
    const dialog = this.cancelDialogRef()?.nativeElement;
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
    }
  };

  onDialogClose = (): void => {
    const dialog = this.cancelDialogRef()?.nativeElement;
    if (!dialog) {
      return;
    }
    const action = dialog.returnValue;
    dialog.returnValue = '';

    if (action === 'confirm-cancel') {
      this.cancelConfirmed.emit();
    }
  };

  ngOnDestroy(): void {
    if (this.toastTimerId) {
      clearTimeout(this.toastTimerId);
    }
  }
}

