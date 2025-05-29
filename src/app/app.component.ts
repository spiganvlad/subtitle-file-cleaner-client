import { Component } from '@angular/core';
import { HeaderComponent } from './core/layout/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [HeaderComponent, RouterOutlet, FooterComponent]
})
export class AppComponent {
  title = 'subtitle-file-cleaner-client';
}
