import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink, Router } from "@angular/router";
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

    constructor(private readonly router: Router) {}

    public search() {
        if (this.fileId === undefined || this.fileId.length === 0) {
            return;
        }

        this.router.navigate(["/converted"], { queryParams: { id: this.fileId }})
    }
}
