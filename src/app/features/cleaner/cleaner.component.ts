import { Component } from "@angular/core";
import { NgIf } from "@angular/common";

@Component({
    selector: "app-cleaner-page",
    templateUrl: "./cleaner.component.html",
    styleUrls: ["./cleaner.component.css"],
    imports: [NgIf],
    standalone: true
})
export class CleanerComponent { public value = true; }
