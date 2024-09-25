# Prueba técnica Junior - VIDEXT

# Technical Test

Create a video watch player

## Technologies Used

- NextJS 15 [[https://nextjs.org/docs](https://nextjs.org/docs)]
- Tailwind [[https://tailwindcss.com/](https://tailwindcss.com/)]
- Shadcn (a utility-first CSS framework) [[https://ui.shadcn.com/](https://ui.shadcn.com/)]
- tRPC (@trpc/server for backend & @trpc/client for frontend) [[https://trpc.io/](https://trpc.io/)]
- Typescript

## Requirements

### Functional Requirements

1. Video player page
2. There must be an API endpoint that allows the app to retrieve stored data. 
3. Use TailwindCSS for styling the application with the help of ShadCN for UI interfaces consistent with design requirements.
4. Implement tRPC to facilitate type-safe API calls between the client and server.
5. Video player watch count 
6. Video player like count
7. The user should be able to see a list with different videos and watch them in the video player

### Technical Requirements

- Build a NextJS app from scratch
- Setup Tailwind CSS and use ShadCN where is appropiate
- Construct tRPC API routes within the Next.js app which exposes at least two endpoints:
    - One endpoint to retrieve the app data.
    - Another endpoint to store the data.
- Use server actions to handle server side requests
- Use Next.js app native routing to navigate between pages and components.
- Implement error handling and loading states for API calls.
- Write simple documentation in a [README.md](http://readme.md/) file, explaining how to set up and run the application locally.

### Bonus points

- Good design
- Advanced controls on the video player (speed, timeline, full screen, etc)

## Expected Deliverables

### Minimum

- A repository with a Next.js application that meets the functional requirements.
- A [README.md](http://readme.md/) file describing the setup instructions, how to run the app, and how to test the API calls.

### Evaluation Criteria

- Code quality and readability
- Proper use of React and Next.js features (e.g., server-side rendering, data fetching).
- Component design and reusability.
- Styling accuracy and use of TailwindCSS classes.
- Effective use of tRPC for type-safe APIs.
- Ease of setup and completeness of documentation.