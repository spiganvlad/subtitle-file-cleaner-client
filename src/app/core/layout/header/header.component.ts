import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ConverterType } from "../../model/converter-type.enum";


@Component({
    selector: "app-layout-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
    imports: [FormsModule, RouterLink],
    standalone: true
})
export class HeaderComponent {
    public fileId: string | undefined;
    public ConverterType = ConverterType;
}
