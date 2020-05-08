import { NgModule } from "@angular/core";
import { ContentModule } from "../../components/content/content.module";
import { VerticalLayout1Component } from "./layout-1.component";

@NgModule({
  declarations: [
    VerticalLayout1Component,
  ],
  imports: [
    ContentModule,
  ],
  exports: [
    VerticalLayout1Component,
  ],
})
export class VerticalLayout1Module
{
}
