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

  messagesApiUrl = 'https://bankruntime8.ecosystem.ai/invocations';
  personalityApiUrl = 'https://bankruntime2.ecosystem.ai/invocations';
  acceptanceApiUrl = 'https://bankruntime8.ecosystem.ai/response';

  showAdmin = false;
  customer_explanation = '';

  constructor(private messageService: MessageService) { }

  onFetchMessages(): void {
    if (!this.customerNumber) {
      this.error = 'Customer number is required';
      return;
    }
    this.error = null;
    this.success = null;
    this.messageService.fetchMessages(this.customerNumber).subscribe({
      next: (response) => {
        this.messages = response.messages.final_result.map((item: any) => ({
          offer: item.result.offer,
          uuid: item.result.uuid,
          offerName: item.result.offer_name
        }));
        // add this if generative engine added additional details
        this.customer_explanation = response.personality.additional_details;
      },
      error: (err) => {
        this.error = err.message;
        console.error(err);
      }
    });
  }

  onAcceptMessage(message: any): void {
    this.error = null;
    this.success = null;
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
    this.messageService.updateMessagesApiUrl(this.messagesApiUrl);
    this.messageService.updatePersonalityApiUrl(this.personalityApiUrl);
    this.messageService.updateAcceptanceApiUrl(this.acceptanceApiUrl);
    this.success = 'API URLs updated successfully';
  }
}
