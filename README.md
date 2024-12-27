# WhatsApp Web-like Application

## Overview
This application mimics WhatsApp Web, featuring real-time messaging with offline capabilities. Built with React.js, InstantDB, and local storage support via a custom hook, the app ensures smooth functionality both online and offline.

## Features
- **Contact List**: View available contacts.
- **Real-Time Chat**: Send and receive messages in real time.
- **Offline Support**: View and send messages offline; data syncs when online.
- **Responsive Design**: Adapts seamlessly to different screen sizes.

## Core Technologies
- **React.js**
- **InstantDB** (Real-time database)
- **IndexedDB** (Offline storage)
- **React Hooks** (`useState`, `useEffect`, `useReducer`, and custom hooks)

## How to Set Up and Run

### Prerequisites
- Node.js >= 16.x
- NPM or Yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-name/whatsapp-clone.git
   cd whatsapp-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (if needed):
   - Configure InstantDB app ID in the code.

4. Start the application:
   ```bash
   npm start
   ```

### Build for Production
```bash
npm run build
```

## Design Choices
- **State Management**: Used React Context and `useReducer` for global state handling, ensuring scalability.
- **Local Storage**: A custom hook (`useOffline`) ensures seamless offline functionality by syncing data with localStorage.
- **Styling**: CSS Modules for scoped styles, ensuring no style leakage across components.

## Challenges Faced
1. **Syncing Local and Remote Data**: Balancing offline-first capabilities with real-time database sync required thoughtful state management.
2. **Responsiveness**: Achieving a consistent look across screen sizes was challenging but addressed using CSS Flexbox.

## How It Works
1. **Select a User**: Log in as one of the two users.
2. **Select a Contact**: Choose a contact from the sidebar to initiate a chat.
3. **Send Messages**: Messages are sent in real time when online, with offline fallback syncing later.

## Demo
You can find the deployed version of the app https://fotoowl-assignment.vercel.app/

## Future Enhancements
- Add Context for managing global state.
- Implement useReducer for better state control.
- Add push notifications for new messages.

