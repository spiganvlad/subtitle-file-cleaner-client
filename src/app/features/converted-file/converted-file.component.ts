import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FileInfoComponent } from "src/app/shared/file-info/file-info.component";
import { ConvertedFileService } from "src/app/core/services/converted-file.service";
import { ConvertedFile } from "src/app/core/model/converted-files.model";

@Component({
    selector: "app-converted-file-page",
    templateUrl: "./converted-file.component.html",
    imports: [FormsModule, NgIf, FileInfoComponent],
    providers: [ToastrService, ConvertedFileService],
    standalone: true
})
export class ConvertedFileComponent implements OnInit {
    public convertedFile: ConvertedFile | undefined;

    constructor(
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly notifier: ToastrService,
        private readonly convertedFileService: ConvertedFileService
    ) { }

    ngOnInit(): void {
        this.activatedRoute.queryParams
            .subscribe(params => {
                this.getFile(params);
            });
    }

    private getFile(params: Params): void {
        const guidIdParam = params["id"];

        if (guidIdParam === undefined) {
            this.notifier.error("Id must be specified");
            return;
        }

        const guidId = guidIdParam as string;
        if (guidId.length !== 36) {
            this.notifier.error("Invalid id format");
            return;
        }

        this.convertedFileService.get(guidId)
            .subscribe({
                next: convertedFile => this.convertedFile = convertedFile,
                error: (error: Error) => this.notifier.error(error.message)
            });
    }

    public downloadFile(): void {
        if (this.convertedFile === undefined) {
            return;
        }

        this.convertedFileService.downloadContent(this.convertedFile.id)
            .subscribe({
                next: arrayBuffer => {  
                    const blob = new Blob([arrayBuffer], { type: "application/octet-stream" });
                    
                    const downloadLink = document.createElement("a");
                    downloadLink.href = window.URL.createObjectURL(blob);
                    
                    if (this.convertedFile !== undefined) {
                        downloadLink.setAttribute('download', this.convertedFile.name);
                    }
                    
                    downloadLink.dispatchEvent(new MouseEvent("click"));
                },
                error: (error: Error) => this.notifier.error(error.message)
            });
    }

    public deleteFile(): void {
        if (this.convertedFile !== undefined) {
            this.convertedFileService.delete(this.convertedFile.id)
                .subscribe({
                    next: _ => this.router.navigate(["/"]),
                    error: (error: Error) => this.notifier.error(error.message)
                });
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
                .subscribe({
                    next: convertedFile => {
                        this.convertedFile = convertedFile;
                        this.isEditing = false;
                    },
                    error: (error: Error) => this.notifier.error(error.message)
                });
        }
    }
    //#endregion
}
