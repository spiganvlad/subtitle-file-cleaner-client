import { Component, EventEmitter, Output, ViewChild, ElementRef } from "@angular/core";
import { DropFileDirective } from "../directives/drop-file.directive";

@Component({
    selector: "app-drag-and-drop",
    templateUrl: "./drag-and-drop.component.html",
    styleUrls: ["drag-and-drop.component.css"],
    imports: [DropFileDirective],
    standalone: true
})
export class DragAndDropComponent {
    @Output()
    private fileReceivedEvent = new EventEmitter<FileList>();

    public fileReceived(files: FileList) {
        this.fileReceivedEvent.emit(files);
    }

    public fileSelected(e: Event): void {
        const element = e.currentTarget as HTMLInputElement;

        let files = element.files
        if (files !== null && files.length !== 0) {
            this.fileReceived(files);
        }
    }
    
    //#region Hidden input trigger area
    @ViewChild("fileInput", { static: false })
    private fileInputRef: ElementRef | undefined;

    public triggerFileInputClick() {
        const input = this.fileInputRef?.nativeElement as HTMLInputElement;
        input.click();
    }
    //#endregion
    
    //#region Style area
    @ViewChild("dropBox", { static: false })
    private dropBoxRef: ElementRef | undefined;

    private calmStyle: string = "dropbox-calm-state";
    private activeStyle: string = "dropbox-active-state";

    private setCalmStyle() {
        const dropBox = this.dropBoxRef?.nativeElement as Element;
        dropBox.classList.remove(this.activeStyle);
        dropBox.classList.add(this.calmStyle);
    }

    private setActiveStyle() {
        const dropBox = this.dropBoxRef?.nativeElement as Element;
        dropBox.classList.remove(this.calmStyle);
        dropBox.classList.add(this.activeStyle);
    }

    public dragEnter(e: DragEvent): void {
        e.preventDefault();
        e.stopPropagation();
        
        if (this.currentContainsRelated(e)) {
            return;
        }

        this.setActiveStyle()
    }

    public dragLeave(e: DragEvent): void {
        e.preventDefault();
        e.stopPropagation();

        if (this.currentContainsRelated(e)) {
            return;
        }
            
        this.setCalmStyle();
    }

    public drop(e: Event): void {
        e.preventDefault();
        e.stopPropagation();

        this.setCalmStyle();
    }

    private currentContainsRelated(e: DragEvent): boolean {
        const currentElement = e.currentTarget as Element;
        const relatedElement = e.relatedTarget as Element;

        return currentElement.contains(relatedElement);
    }
    //#endregion
}
