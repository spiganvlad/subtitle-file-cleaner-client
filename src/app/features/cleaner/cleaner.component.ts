import { Component, OnInit } from "@angular/core";
import { NgIf } from "@angular/common";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DragAndDropComponent } from "src/app/shared/drag-and-drop/drag-and-drop.component";
import { AdditionalOptionsComponent } from "src/app/shared/additional-options/additional-options.component";
import { FileInfoComponent } from "src/app/shared/file-info/file-info.component";
import { ConvertedFileService } from "src/app/core/services/converted-file.service";
import { ConverterType } from "src/app/core/model/converter-type.enum";
import { Converter } from "src/app/core/model/converter.model";
import { OptionList } from "src/app/core/model/option-list.model";

@Component({
    selector: "app-cleaner-page",
    templateUrl: "./cleaner.component.html",
    imports: [NgIf, DragAndDropComponent, AdditionalOptionsComponent,
    FileInfoComponent],
    providers: [ToastrService, ConvertedFileService],
    standalone: true
})
export class CleanerComponent implements OnInit { 
    public converter: Converter | undefined;
    public optionList: OptionList | undefined;

    constructor(
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly notifier: ToastrService,
        private readonly convertedFileService: ConvertedFileService
    ) { }

    public ngOnInit(): void {
        this.activatedRoute.queryParams
            .subscribe(params => {
                this.defineCleaner(params);
            });
    }

    private defineCleaner(params: Params): void {
        let type = params["type"];

        if (type === undefined) {
            return;
        }

        const converterType: ConverterType = +type;
        if (Number.isNaN(converterType)) {
            return;
        }

        Object.values(ConverterType).forEach(converter => {
            if (converter == converterType) {
                this.converter = new Converter(ConverterType[converterType], converterType);
            }
        });
    }

    public convertFile(): void {
        if (this.converter === undefined) {
            return;
        }

        if (this.converter.file === undefined) {
            this.notifier.error("No file to convert selected");
            return;
        }
        
        this.convertedFileService.create(this.converter, this.optionList)
            .subscribe({
                next: convertedFile => this.router.navigate(["/converted"], { queryParams: { id: convertedFile.id } }),
                error: (error: Error) => this.notifier.error(error.message)
            });
    }

    public receiveFile(files: FileList): void {
        if (files.length === 0 || this.converter === undefined) {
            return;
        }

        const file: File = files[0];

        const extension = "." + this.converter.name.toLowerCase();
        if (!file.name.endsWith(extension)) {
            this.notifier.error("File extension must be " + extension);
            return;
        }

        if (file.size > 1_000_000) {
            this.notifier.error("The file cannot be larger than 1 megabyte");
            return;
        }

        this.converter.file = file; 
    }

    public optionsChaned(optionList: OptionList): void {
        this.optionList = optionList;
    }
}
