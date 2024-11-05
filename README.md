# ecosystem.Ai Runtime MessageApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.8.

## Prerequisites

Before running this application, ensure that the following ecosystem.Ai modules are installed and operational:

- **Spend Personality Module**: Analyzes customer spending behaviors to determine their spending personality.

- **Budget Messaging Module**: Delivers personalized budget-related messages to users based on their spending personality.

For installation and configuration details, refer to the [ecosystem.Ai documentation](https://developer.ecosystem.ai/docs/modules/spend_personality).

## Application Overview

The application consists of two main parts:

1. **Component**: Handles user interactions and displays messages.

2. **Service**: Manages communication with backend APIs to fetch personality data and corresponding messages.

### Component: `AppComponent`

Located at `src/app/app.component.ts`, this component:

- Provides an input field for the user to enter their customer number.

- Includes a button to fetch personalized messages based on the entered customer number.

- Displays the fetched messages and provides an option to accept each message.

**Key Methods:**

- `onFetchMessages()`: Invoked when the user clicks the "Fetch Messages" button. It calls the `fetchMessages` method from the `MessageService` to retrieve messages.

- `onAcceptMessage(message: any)`: Called when the user accepts a message. It sends the acceptance to the backend using the `acceptMessage` method from the `MessageService`.

### Service: `MessageService`

Located at `src/app/services/message.service.ts`, this service:

- Communicates with backend APIs to fetch personality data and messages.

- Sends acceptance of messages to the backend.

**Key Methods:**

- `fetchPersonality(customerNumber: string)`: Fetches the spending personality of the customer based on their customer number.

- `fetchMessages(customerNumber: string)`: Retrieves personalized messages for the customer using their spending personality.

- `acceptMessage(messagePayload: any)`: Sends the acceptance of a message to the backend.

## Development Server

To start the development server, run:

```bash
ng serve
```

Then, navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any of the source files.

## Code Scaffolding

To generate a new component, run:

```bash
ng generate component component-name
```

You can also use `ng generate` to create other Angular constructs such as directives, pipes, services, classes, guards, interfaces, enums, and modules. For example:

```bash
ng generate service service-name
```

## Build

To build the project, run:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build:

```bash
ng build --prod
```

## Running Unit Tests

To execute the unit tests via [Karma](https://karma-runner.github.io), run:

```bash
ng test
```

## Running End-to-End Tests

To execute end-to-end tests via a platform of your choice, first add a package that implements end-to-end testing capabilities. For example, to use [Protractor](http://www.protractortest.org/), run:

```bash
ng add @angular/localize
ng e2e
```

## Configuring API Endpoints

The application interacts with several backend services. The default server URLs are configured in the `MessageService` class located at `src/app/services/message.service.ts`. Depending on your setup, you may need to replace these URLs with the appropriate endpoints for your environment.

**Default API Endpoints:**

- **Messages API:** `http://localhost:8097/invocations`
- **Personality API:** `http://localhost:8092/invocations`
- **Acceptance API:** `http://localhost/response`

**To Update the Endpoints:**

1. Open `src/app/services/message.service.ts`.
2. Locate the following lines:

   ```typescript
   private messagesApiUrl = 'http://localhost:8097/invocations';
   private personalityApiUrl = 'http://localhost:8092/invocations';
   private acceptanceApiUrl = 'http://localhost/response';
   ```

3. Replace the URLs with the appropriate endpoints for your environment.

**Example:**

```typescript
private messagesApiUrl = 'http://your-server-address:port/invocations';
private personalityApiUrl = 'http://your-server-address:port/invocations';
private acceptanceApiUrl = 'http://your-server-address:port/response';
```

Ensure that the backend services are running and accessible at the specified URLs.

## Further Help

For more information on the Angular CLI, use:

```bash
ng help
```

Or refer to the [Angular CLI Overview and Command Reference](https://angular.io/cli) page. 
