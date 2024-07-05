import { Component } from '@angular/core';
import { ActionButtonComponent } from '../action-button/action-button.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [ActionButtonComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

}
