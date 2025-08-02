import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { FormComponent } from "./form/form.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'diplomado';
}
