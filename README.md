#Users Management Module

A modern, high-performance Users Directory built with **React**, **TypeScript**, and **Redux Toolkit**. This project focuses on clean architecture, responsive design, and seamless user experience.

## Installation & Setup
1. Clone the repo:
   ```bash
   1-git clone https://github.com/menna1210/ERP-user-management-module.git
 2- npm install
 3- npm run dev 


##  Tech Stack
- **Frontend:** React 18 (Vite)
- **Language:** TypeScript (Strict Type Safety)
- **State Management:** Redux Toolkit (Slices & Async Thunks)
- **Styling:** Tailwind CSS (Mobile-First Design)
- **Animations:** Framer Motion
- **Icons:** Custom SVG Icons

## Key Features
- **Data Fetching:** Integration with DummyJSON API to fetch user records.
- **Dynamic Search:** Real-time filtering by Name and Email.
- **City Filtering:** Advanced dropdown filter to categorize users by city.
- **Sorting:** Ability to sort users alphabetically by Name or Email.
- **Dark Mode:** Fully functional Dark/Light theme with system persistence.
- **Pagination:** Custom pagination logic to handle large datasets smoothly.
- **Responsive UI:** Elegant Card-based layout that works on all screen sizes.
- **User Details:** Detailed view of each user in a smooth, animated modal.

##  Project Structure
- `src/store/`: Redux logic and user slices.
- `src/hooks/`: Custom hooks for Dark Mode and Filtering logic.
- `src/components/`: Reusable UI components (Cards, Modals, Shared).
- `src/types/`: TypeScript interfaces for data consistency.

##Technical Decisions Taken
- TypeScript for Type Safety: Used TypeScript to ensure data consistency, especially when dealing with API responses, reducing runtime errors.

- Redux Toolkit (State Management): Chosen for managing global state (users list, loading states, and selected user) to ensure a predictable data flow and easy debugging.

- Tailwind CSS (Utility-First): Used for rapid UI development and maintaining a consistent design system with full support for Dark Mode.

- Native SVG Icons: Opted for manual SVG paths (Heroicons) instead of external libraries to minimize the bundle size and improve page load performance (Lighthouse score).

- Custom Hooks: Created useDarkMode and useUserFilters to keep the components clean and separate the logic from the UI (Separation of Concerns).

- Framer Motion: Integrated for smooth modal transitions and card hover effects to provide a premium feel.

##Assumptions Made
-API Availability: The project assumes the dummyjson.com API is accessible and returns the user data in the expected format.

-Pagination Logic: Since the API provides a large number of users, client-side pagination was implemented (6 users per page) to enhance readability.

-Persistence: Assumed the user prefers their theme choice (Dark/Light) to be saved, so localStorage was used to persist the theme across sessions.