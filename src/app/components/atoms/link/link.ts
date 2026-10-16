import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-link',
  imports: [RouterLink],
  template: `
  <a routerLink="{{ route() }}" href=" {{ href() }} ">{{ content() }}</a>
  `,
  styles: `
  @use '../../../../styles/variables' as *;

  a {
        font-size: 18px;

        text-decoration: underline;
        color: $clr-blue-600;
        transition: all 200ms;
        
        @media(min-width: 700px) {
          text-decoration: none;  

            &:hover {
                color: $clr-blue-1000;
                text-decoration: underline;
            }
        }

    }
  `,
})
export class Link {

  route = input.required<string>()
  href = input<string>('')
  content = input.required<string>()

}
