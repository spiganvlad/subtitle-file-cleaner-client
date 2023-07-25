import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./core/layout/header/header.component";
import { FooterComponent } from "./core/layout/footer/footer.component";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    HeaderComponent,
    FooterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
