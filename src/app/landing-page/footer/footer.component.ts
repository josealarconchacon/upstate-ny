import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Output() subscribe = new EventEmitter<string>();
  email: string = '';

  onSubscribe(): void {
    if (this.email) {
      this.subscribe.emit(this.email);
      this.email = ''; // Clear the input after submission
    }
  }
}
