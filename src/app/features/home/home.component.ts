import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ConverterType } from "src/app/core/model/converter-type.enum";

@Component({
    selector: "app-home-page",
    templateUrl: "./home.component.html",
    imports: [RouterModule]
})
export default class HomeComponent { 
    public ConverterType = ConverterType;
}
