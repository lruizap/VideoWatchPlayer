# Video Watch Player - VIDEXT Junior Technical Test

This project is a video player application built with **Next.js**, **TailwindCSS**, **ShadCN**, and **tRPC**. The goal is to meet the functional requirements of a video player, allowing users to watch videos, count views and likes, and display a list of available videos.

## Technologies Used

- Next.js**: React framework with full-stack capabilities (frontend and backend in a single project).
- TypeScript**: JavaScript superset that adds static typing.
- tRPC**: Tool for making type-safe API calls between client and server.
- TailwindCSS**: CSS framework for fast and responsive design.
- ShadCN**: Used to create consistent UI components.
  
## Key Features

- Video player page.
- REST API built with tRPC to retrieve and store data.
- Views and likes counter for each video.
- List of videos available for viewing.
- Navigation between pages using Next.js native routing system.
- Error handling and loading states.
- Styling with TailwindCSS.

## Prerequisites

- Node.js** (version 14 or higher).
- npm** or **yarn** as dependency manager.

## Project Setup

Follow these steps to run the project in your local environment.

### 1. Clone the Repository

````bash
git clone https://github.com/lruizap/video-watch-player.git
cd video-watch-player
````

### 2. Install Dependencies

Run the following command to install all necessary project dependencies:

````bash
npm install
````

### 3. Configure TailwindCSS

TailwindCSS is already configured in the project with the `tailwind.config.js` file and the `globals.css` style file. If you want to customise the configuration further, you can modify these files.

### 4. Running the Project in Development

To start the Next.js development server (which includes both frontend and backend):

````bash
npm run dev
````

This will bring up the application at `http://localhost:3000`.

### tRPC

- The backend logic is handled by tRPC, located in `src/server/api.ts`.
- The tRPC endpoints are exposed through `src/pages/api/api/trpc/[trpc].ts`.

### Frontend

- The video list and player are located in `src/pages/index.tsx`.
- The data is retrieved using `trpc` in the frontend to facilitate communication with the backend without the need for additional fetch APIs.

## Additional Features

### Load State and Error Handling

Load states (`isLoading`) and basic error handling have been implemented on the frontend to allow the application to correctly handle timeouts when querying the API and handle possible errors in responses.

## Extra Points

- The application includes a simple design, but can be easily customised with the TailwindCSS classes.
- You can add advanced controls to the player, such as playback speed and fullscreen, for extra points.

## Credits

Developed as part of a technical test for **VIDEXT**.
