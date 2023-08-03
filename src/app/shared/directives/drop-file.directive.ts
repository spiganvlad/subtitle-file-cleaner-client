import { Directive, HostListener, Output, EventEmitter } from "@angular/core";

@Directive({
    selector: "[dropFile]",
    standalone: true
})
export class DropFileDirective {
    @Output()
    public fileDropedEvent = new EventEmitter<FileList>();

    private fileDroped(files: FileList): void {
        this.fileDropedEvent.emit(files);
    }

    @HostListener("dragover", ['$event'])
    public dragOver(e: Event): void {
        e.preventDefault();
        e.stopPropagation();
    }

    @HostListener("drop", ["$event"])
    public drop(e: DragEvent): void {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer?.files;
        if (files !== undefined && files.length !== 0) {
            this.fileDroped(files);
        }
    }
}