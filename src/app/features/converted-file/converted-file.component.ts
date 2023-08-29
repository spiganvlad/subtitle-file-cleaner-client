import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FileInfoComponent } from "src/app/shared/file-info/file-info.component";
import { ConvertedFileService } from "src/app/core/services/converted-file.service";
import { ConvertedFile } from "src/app/core/model/converted-files.model";

@Component({
    selector: "app-converted-file-page",
    templateUrl: "./converted-file.component.html",
    imports: [FormsModule, NgIf, FileInfoComponent],
    providers: [ConvertedFileService],
    standalone: true
})
export class ConvertedFileComponent implements OnInit {
    public convertedFile: ConvertedFile | undefined;

    constructor(
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly convertedFileService: ConvertedFileService
    ) { }

    ngOnInit(): void {
        this.activatedRoute.queryParams
            .subscribe(params => {
                this.getFile(params);
            });
    }

    private getFile(params: Params): void {
        const guidId = params["id"];

        if (guidId === undefined) {
            return;
        }

        const x = <string>guidId;
        if (x.length !== 36) {
            return;
        }

        this.convertedFileService.get(guidId)
            .subscribe(convertedFile => { this.convertedFile = convertedFile; console.log(convertedFile); });
    }

    public downloadFile(): void {
        if (this.convertedFile === undefined) {
            return;
        }

        this.convertedFileService.downloadContent(this.convertedFile.id)
            .subscribe(arrayBuffer => {  
                const blob = new Blob([arrayBuffer], { type: "application/octet-stream" });
                
                const downloadLink = document.createElement("a");
                downloadLink.href = window.URL.createObjectURL(blob);
                
                if (this.convertedFile !== undefined) {
                    downloadLink.setAttribute('download', this.convertedFile.name);
                }
                
                downloadLink.dispatchEvent(new MouseEvent("click"));
            });
    }

    public deleteFile(): void {
        if (this.convertedFile !== undefined) {
            this.convertedFileService.delete(this.convertedFile.id)
                .subscribe(_ => this.router.navigate(["/"]));
        }
    }

    //#region File name editing
    public isEditing: boolean = false;
    public editName: string | undefined;

    public toggleEditing(): void {
        this.isEditing = !this.isEditing;

        if (this.isEditing) {
            this.editName = this.convertedFile?.name;
        }
    }

    public saveEditing(): void {
        if (this.convertedFile !== undefined && this.editName !== undefined) {
            this.convertedFileService.updateName(this.convertedFile.id, this.editName)
                .subscribe(convertedFile => {
                    this.convertedFile = convertedFile;
                    this.isEditing = false;
                });
        }
    }
    //#endregion
}
