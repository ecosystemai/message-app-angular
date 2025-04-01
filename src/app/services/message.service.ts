import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // admin option to update these
  private messagesApiUrl = 'https://bankruntime8.ecosystem.ai/invocations'; // Messages API endpoint
  private personalityApiUrl = 'https://bankruntime2.ecosystem.ai/invocations'; // Personality API endpoint
  private acceptanceApiUrl = 'https://bankruntime8.ecosystem.ai/response'; // Acceptance API endpoint

  constructor(private http: HttpClient) { }

  updateMessagesApiUrl(url: string) {
    this.messagesApiUrl = url;
  }

  updatePersonalityApiUrl(url: string) {
    this.personalityApiUrl = url;
  }

  updateAcceptanceApiUrl(url: string) {
    this.acceptanceApiUrl = url;
  }

  // Fetch personality based on customer number
  private fetchPersonality(customerNumber: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      campaign: 'spend_personality',
      subcampaign: 'api',
      channel: 'app',
      customer: customerNumber,
      userid: 'angular',
      numberoffers: 1,
      params: JSON.stringify({})
    };
    return this.http.post<any>(this.personalityApiUrl, body, { headers })
      .pipe(
        map(response => {
          const personality = response.final_result[0]?.result_full?.trait;
          if (!personality) {
            throw new Error('Personality not found in response');
          }
          console.log(`Personality for customer ${customerNumber}: ${personality}`);
          return personality;
        }),
        catchError(error => {
          console.error('Error fetching personality:', error);
          return throwError(() => new Error('Error fetching personality'));
        })
      );
  }

  // Fetch messages using the retrieved personality
  fetchMessages(customerNumber: string): Observable<any> {
    console.log(`Fetching messages for customer ${customerNumber}`);
    return this.fetchPersonality(customerNumber).pipe(
      switchMap(personality => {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = {
          campaign: 'budget_messages',
          subcampaign: 'none',
          channel: 'app',
          customer: 'none',
          userid: 'none',
          numberoffers: 4,
          params: JSON.stringify({
            input: ['contextual_variable_one', 'contextual_variable_two'],
            value: [personality, '']
          })
        };
        return this.http.post<any>(this.messagesApiUrl, body, { headers });
      }),
      catchError(error => {
        console.error('Error fetching messages:', error);
        return throwError(() => new Error('Error fetching messages'));
      })
    );
  }

  // Send acceptance of a message to the acceptance API
  acceptMessage(uuid: string, offerName: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      uuid: uuid,
      offers_accepted: [{ offer_name: offerName }],
      channel_name: 'app'
    };
    return this.http.post<any>(this.acceptanceApiUrl, body, { headers })
      .pipe(
        catchError(error => {
          console.error('Error sending acceptance:', error);
          return throwError(() => new Error('Error sending acceptance'));
        })
      );
  }
}
