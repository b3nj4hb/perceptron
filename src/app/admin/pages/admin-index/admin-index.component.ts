import { Component } from '@angular/core';
import { TitleSectionComponent } from '../../components/title-section/title-section.component';
import { PageLayoutComponent } from '../../layouts/page-layout/page-layout.component';
import { ActionButtonComponent } from '../../components/action-button/action-button.component';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-admin-index',
  standalone: true,
  imports: [
    TitleSectionComponent,
    PageLayoutComponent,
    ActionButtonComponent,
    TableComponent
  ],
  templateUrl: './admin-index.component.html',
  styleUrl: './admin-index.component.scss'
})
export class AdminIndexComponent {

}
