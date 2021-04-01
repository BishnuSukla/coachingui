import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  @Input() public removeItem: string;
  @Output() removeConfirmationEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  sendConfirmation(value: string) {
    this.removeConfirmationEvent.emit(value);
    $('#confirmModal').modal('hide');
  }

}
