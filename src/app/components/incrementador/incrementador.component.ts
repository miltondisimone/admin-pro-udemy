import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() leyenda = 'Leyenda';
  @Input() progreso = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  cambiarValor(valor?: number) {
    if (valor) {
      this.progreso += valor;
    }

    if ( this.progreso > 100 ) {
      this.progreso = 100;
    }

    if ( this.progreso < 0) {
      this.progreso = 0;
    }

    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }
}
