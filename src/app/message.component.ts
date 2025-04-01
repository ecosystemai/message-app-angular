// import {MessageService} from "./services/message.service";
//
// export class MessageComponent {
//   customerNumber = '';
//   messages: any[] = [];
//   error: string | null = null;
//   success: string | null = null;
//
//   // Admin-editable URLs
//   messagesApiUrl = '';
//   personalityApiUrl = '';
//   acceptanceApiUrl = '';
//
//   constructor(private messageService: MessageService) {}
//
//   onFetchMessages() {
//     this.success = null;
//     this.error = null;
//     this.messageService.fetchMessages(this.customerNumber).subscribe({
//       next: (data) => {
//         this.messages = data.final_result || [];
//         this.success = 'Messages fetched successfully';
//       },
//       error: (err) => {
//         this.error = err.message || 'Error occurred';
//       }
//     });
//   }
//
//   onAcceptMessage(message: any) {
//     this.messageService.acceptMessage(message.uuid, message.offer).subscribe({
//       next: () => {
//         this.success = `Accepted message: ${message.offer}`;
//       },
//       error: (err) => {
//         this.error = err.message || 'Error accepting message';
//       }
//     });
//   }
//
//   onUpdateUrls() {
//     this.messageService.updateMessagesApiUrl(this.messagesApiUrl);
//     this.messageService.updatePersonalityApiUrl(this.personalityApiUrl);
//     this.messageService.updateAcceptanceApiUrl(this.acceptanceApiUrl);
//     this.success = 'API URLs updated successfully';
//   }
// }
