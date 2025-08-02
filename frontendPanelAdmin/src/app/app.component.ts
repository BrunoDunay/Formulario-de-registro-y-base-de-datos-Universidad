import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AllRegistersComponent } from './all-registers/all-registers.component';
import { FistViewTableComponent } from './fist-view-table/fist-view-table.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, AllRegistersComponent, FistViewTableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'diplomado';
}
