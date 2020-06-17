import { NgModule } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { IncludesPipe } from './includes.pipe';
import { MapPipe } from './map.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { SafeUrlPipe } from './safe-url.pipe';

const pipes = [SafeHtmlPipe, SafeUrlPipe, FilterPipe, IncludesPipe, MapPipe];

@NgModule({
  declarations: [...pipes],
  exports: [...pipes],
})
export class PipeModule {}
