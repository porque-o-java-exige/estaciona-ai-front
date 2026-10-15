import { Component } from '@angular/core';

@Component({
  selector: 'app-logotype',
  imports: [],
  template: `
    <div class="logo-wrapper">
      <img draggable="false" src="/assets/icons/logo-icon.svg" alt="estaciona ai logo">
      <h1>Estaciona Ai</h1>
    </div>
  `,
  styles: `
  .logo-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 2px;

            h1 {
                font-family: "Fugaz One", sans-serif;
                
                font-size: 32px;
                font-weight: 400;
                text-shadow: 4px 0 0 #00C0FF;
                font-style: italic;
                text-transform: uppercase;
            }

        }
`,
})
export class Logotype { }
