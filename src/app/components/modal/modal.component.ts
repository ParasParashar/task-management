import { Component, inject, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  isOpen = false;
  service = inject(ModalService);
  private subscription!: Subscription;

  // this is work on component is mount
  ngOnInit(): void {
    // here we subscible th observable when component is initialized
    this.subscription = this.service.modalState.subscribe(state => {
      this.isOpen = state;
    });
  }

  // this is work on computed is unmount
  ngOnDestroy(): void {
    if (this.subscription) {
      // here we un-subscible th observable when component is initialized
      this.subscription.unsubscribe();
    }
  }

  onToggle(): void {
    this.service.onToggleOpen();
  }
}
