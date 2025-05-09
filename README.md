# Countries Explorer

A React application that consumes data from the REST Countries API to display information about countries around the world.

## Features

- View a list of all countries with basic information
- Search for countries by name
- Filter countries by region or language
- View detailed information about a specific country
- User authentication with session management
- Save favorite countries
- Responsive design with dark mode support

## Technologies Used

- **Frontend**: React with functional components
- **Framework**: Next.js
- **Language**: TypeScript
- **CSS Framework**: Tailwind CSS with shadcn/ui components
- **Session Management**: Context API with localStorage
- **Testing**: Jest and React Testing Library
- **Hosting**: Vercel

## API Integration

The application uses the following REST Countries API endpoints:

- `GET /all` - To fetch all countries
- `GET /name/{name}` - To search countries by name
- `GET /region/{region}` - To filter countries by region
- `GET /alpha/{code}` - To get detailed information about a specific country
- `GET /alpha?codes={codes}` - To fetch multiple countries by their codes (for border countries)

## Setup and Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-username/countries-explorer.git
cd countries-explorer
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Testing

The application includes comprehensive unit and integration tests using Jest and React Testing Library.

To run the tests:

\`\`\`bash
npm test
\`\`\`

To run tests in watch mode:

\`\`\`bash
npm run test:watch
\`\`\`

To generate a coverage report:

\`\`\`bash
npm run test:coverage
\`\`\`

## Deployment

The application is deployed on Vercel. You can access it at [https://countries-explorer.vercel.app](https://countries-explorer.vercel.app)

## Project Structure

- `app/`: Next.js app router pages
- `components/`: Reusable UI components
- `context/`: Context providers for state management
- `hooks/`: Custom React hooks
- `lib/`: Utility functions
- `__tests__/`: Test files

## Challenges and Solutions

### API Integration
- **Challenge**: Handling different API endpoints and combining filters
- **Solution**: Created a flexible fetching mechanism that adapts to different filter combinations

### State Management
- **Challenge**: Managing user authentication and favorites across the application
- **Solution**: Implemented a Context API solution with localStorage persistence

### Testing
- **Challenge**: Mocking API calls and testing asynchronous components
- **Solution**: Used Jest mocks for fetch and created comprehensive test utilities

## Hosted Link

- https://af-2-beryl.vercel.app

](https://af-2-beryl.vercel.app)
