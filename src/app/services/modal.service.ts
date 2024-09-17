import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  // here we use behavioursubject to ensure that the modal visibility 
  private modalSubject = new BehaviorSubject<boolean>(false);
  modalState = this.modalSubject.asObservable();

  constructor() { }

  onToggleOpen(): void {
    this.modalSubject.next(!this.modalSubject.getValue());
  }
}
