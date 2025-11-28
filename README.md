# RideBuddy - College Cab Sharing Platform

A React.js frontend for a college-focused cab sharing platform that integrates with Uber. This platform allows students to find cab partners and book rides together, helping them save money on transportation costs.

## Features

- **Student Authentication**: College email verification (.edu.in domains)
- **Ride Booking**: Simple booking flow with route selection
- **Group Matching**: Find and connect with fellow students going the same way
- **Payment Processing**: UPI and card payment options
- **Group Management**: Manage ride groups, communicate with partners
- **Admin Panel**: For managing bookings, groups, and commissions
- **Real-time Updates**: Live group formation progress
- **Mobile Responsive**: Works on all device sizes

## Tech Stack

- **Frontend**: React.js with Hooks
- **Routing**: React Router
- **State Management**: Context API
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

## Pages

1. **Landing Page** - Introduction to the platform
2. **Authentication** - Student registration and login
3. **Dashboard** - Main user interface with bookings
4. **Booking Flow** - Multi-step ride booking process
5. **Group Management** - Manage ride groups and communication
6. **Admin Panel** - Administrative interface

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd ride-buddy
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/        # React components
├── contexts/          # React context providers
├── services/          # API service files
├── utils/             # Utility functions
├── App.jsx           # Main application component
├── main.jsx          # Entry point
├── index.css         # Global styles
└── App.css           # App-specific styles
```

## Development

This project uses:
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Context API** for state management

## Future Enhancements

- Integration with Uber API for real ride booking
- Real-time messaging between group members
- Push notifications for ride updates
- Map integration for live ride tracking
- Analytics dashboard for admin panel

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.