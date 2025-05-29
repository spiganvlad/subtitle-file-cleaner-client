import { Component, Input } from "@angular/core";
import { FileInfo } from "./file-info.model";
import { StorageCapacityPipe } from "../pipes/storage-capacity.pipe";

@Component({
    selector: "app-file-info",
    templateUrl: "./file-info.component.html",
    styleUrls: ["./file-info.component.css"],
    imports: [StorageCapacityPipe]
})
export class FileInfoComponent {
    @Input("file")
    public file: FileInfo | undefined;
}
