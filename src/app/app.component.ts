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

  messagesApiUrl = '';
  personalityApiUrl = '';
  acceptanceApiUrl = '';

  showAdmin = false;

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

  onUpdateUrls() {
    this.messageService.updateMessagesApiUrl(this.messagesApiUrl || 'https://bankruntime8.ecosystem.ai/invocations');
    this.messageService.updatePersonalityApiUrl(this.personalityApiUrl || 'https://bankruntime2.ecosystem.ai/invocations');
    this.messageService.updateAcceptanceApiUrl(this.acceptanceApiUrl || 'https://bankruntime8.ecosystem.ai/response');
    this.success = 'API URLs updated successfully';
  }
}
