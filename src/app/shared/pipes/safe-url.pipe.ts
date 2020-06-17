import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({ name: 'safeUrl' })
export class SafeUrlPipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {}

  public transform(value: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }
}
