import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTamañoLetra]',
})
export class TamañoLetraDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Establece el tamaño de letra en 20px al inicializar la directiva
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '80px');
  }
}
