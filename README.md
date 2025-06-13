# Fast Note Chrome Extension

Fast Note is a lightweight and efficient Chrome extension designed to help you quickly jot down and manage notes directly in your browser. With a clean and intuitive interface, Fast Note ensures that your ideas are always just a click away.

## Features

- **Quick Note-Taking**: Create, edit, and delete notes effortlessly.
- **Copy to Clipboard**: Easily copy notes to your clipboard with a single click.
- **Persistent Storage**: Your notes are saved locally and persist across browser sessions.
- **Responsive Design**: Optimized for all screen sizes, ensuring a seamless experience.
- **Customizable UI**: Built with Tailwind CSS for a modern and customizable interface.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/psudocode/fast-note-chrome.git
   ```
2. Navigate to the project directory:
   ```bash
   cd fast-note-chrome
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the project:
   ```bash
   npm run build
   ```
5. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" in the top-right corner.
   - Click "Load unpacked" and select the `dist` folder from the project directory.

## Development

To start the development server with hot reloading:

```bash
npm run dev
```

## Tech Stack

- **Framework**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Context API
- **Utilities**: Custom hooks and utility functions

## Folder Structure

```
src/
├── app/                # Main application entry
├── components/         # Reusable UI components
├── contexts/           # Context API for state management
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
```

## TODO: Notes Sync with Account

- [ ] Implement user authentication and account management.
- [ ] Create a backend API for syncing notes with user accounts.
- [ ] Add functionality to save notes to the user's account.
- [ ] Implement real-time syncing between devices.
- [ ] Ensure secure data transmission and storage.
- [ ] Add a UI to manage account settings and sync status.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Built with ❤️ by Ahmad Awdiyanto at [Boojoog](https://boojoog.com).
- Powered by modern web technologies.
