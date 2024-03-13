import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", loadComponent: () => import("./features/home/home.component").then(m => m.HomeComponent) },
  { path: "cleaner", loadComponent: () => import("./features/cleaner/cleaner.component").then(m => m.CleanerComponent) },
  { path: "converted", loadComponent: () => import("./features/converted-file/converted-file.component").then(m => m.ConvertedFileComponent) },
  { path: "**", pathMatch: "full", loadComponent: () => import("./features/page-not-found/page-not-found.component").then(m => m.PageNotFoundComponene) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
