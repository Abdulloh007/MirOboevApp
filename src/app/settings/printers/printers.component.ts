import { Component, OnInit } from '@angular/core';
import { Printer } from 'src/app/interfaces/Printer';

@Component({
  selector: 'app-printers',
  templateUrl: './printers.component.html',
  styleUrls: ['./printers.component.scss'],
})
export class PrintersComponent implements OnInit {
  printerList: Printer[] = []
  newPrinter: Printer = {
    name: '',
    host: '',
    port: 0
  }
  showPrinter: boolean = false

  constructor() { }

  ngOnInit() {
    this.printerList = JSON.parse(localStorage.getItem('printers') || '[]')
  }

  handleRefresh(e: any) {
    this.printerList = JSON.parse(localStorage.getItem('printers') || '[]')
    e.target.complete();
  }

  savePrinter() {
    if (this.printerList.find(printer => (printer.name !== this.newPrinter.name && printer.host !== this.newPrinter.host) ) || this.printerList.length === 0) {
      this.printerList.push(this.newPrinter)
    } 
    localStorage.setItem('printers', JSON.stringify(this.printerList))
    this.newPrinter = {
      name: '',
      host: '',
      port: 0
    }
    this.setShowPrinter(false)
  }

  // editPrinter(printer: Printer) {
  //   this.newPrinter = printer
  //   this.setShowPrinter(true)
  // }

  setShowPrinter(isOpen: boolean) {
    this.showPrinter = isOpen
    this.printerList = JSON.parse(localStorage.getItem('printers') || '[]')
  }
  
  deletePrinter(printer: Printer) {
    this.printerList = this.printerList.filter(item => item !== printer)
    localStorage.setItem('printers', JSON.stringify(this.printerList))
    this.printerList = JSON.parse(localStorage.getItem('printers') || '[]')
  }
}
