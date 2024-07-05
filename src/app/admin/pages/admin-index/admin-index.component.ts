import { Component } from '@angular/core';
import { TitleSectionComponent } from '../../components/title-section/title-section.component';

@Component({
  selector: 'app-admin-index',
  standalone: true,
  imports: [
    TitleSectionComponent
  ],
  templateUrl: './admin-index.component.html',
  styleUrl: './admin-index.component.scss'
})
export class AdminIndexComponent {

}
