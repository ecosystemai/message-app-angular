import { Component } from '@angular/core';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'message-app';
  customerNumber: string = '';
  messages: any[] = [];
  error: string | null = null;
  success: string | null = null;

  constructor(private messageService: MessageService) { }

  onFetchMessages(): void {
    if (!this.customerNumber) {
      this.error = 'Customer number is required';
      return;
    }
    this.error = null; // Clear previous errors
    this.success = null; // Clear previous success messages
    this.messageService.fetchMessages(this.customerNumber).subscribe({
      next: (response) => {
        this.messages = response.final_result.map((item: any) => ({
          offer: item.result.offer,
          uuid: item.result.uuid,
          offerName: item.result.offer_name
        }));
      },
      error: (err) => {
        this.error = err.message;
        console.error(err);
      }
    });
  }

  onAcceptMessage(message: any): void {
    this.error = null; // Clear previous errors
    this.success = null; // Clear previous success messages
    this.messageService.acceptMessage(message.uuid, message.offerName).subscribe({
      next: () => {
        this.success = 'Message accepted successfully';
      },
      error: (err) => {
        this.error = err.message;
        console.error(err);
      }
    });
  }
}
