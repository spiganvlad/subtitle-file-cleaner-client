import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ConverterType } from "src/app/core/model/converter-type.enum";

@Component({
    selector: "app-home-page",
    templateUrl: "./home.component.html",
    imports: [RouterModule],
    standalone: true
})
export class HomeComponent { 
    public ConverterType = ConverterType;
}
