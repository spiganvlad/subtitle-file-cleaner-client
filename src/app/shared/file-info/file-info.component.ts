import { Component, Input } from "@angular/core";
import { StorageCapacityPipe } from "../pipes/storage-capacity.pipe";

@Component({
    selector: "app-file-info",
    templateUrl: "./file-info.component.html",
    styleUrls: ["./file-info.component.css"],
    imports: [StorageCapacityPipe],
    standalone: true
})
export class FileInfoComponent {
    @Input("file")
    public file: File | undefined;
}
