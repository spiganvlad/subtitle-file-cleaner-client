import { Routes } from "@angular/router";

export const routes: Routes = [
    { path: "", loadComponent: () => import("./features/home/home.component") },
    { path: "cleaner", loadComponent: () => import("./features/cleaner/cleaner.component") },
    { path: "converted", loadComponent: () => import("./features/converted-file/converted-file.component") },
    { path: "**", pathMatch: "full", loadComponent: () => import("./features/page-not-found/page-not-found.component") }
];