# Task Timer Application Specification

## 1. Overview

The Task Timer is a single-page web application designed to help users track time spent on various tasks. Users can create multiple timers, each with a unique name, and control them individually. The application is persistent, meaning the state of all timers is saved in the browser's local storage, ensuring that timers continue to track time and are not lost when the page is reloaded or the browser is closed.

## 2. Functional Requirements

### 2.1. Timer Management

-   **Add Timer**: Users can add a new task timer.
    -   An input field is provided for the task name, with placeholder text "Enter new task name...".
    -   An "Add Task" button is available next to the input field.
    -   The "Add Task" button is disabled if the input field is empty or contains only whitespace.
    -   Upon clicking "Add Task," a new timer entry is added to the list, the input field is cleared, and the timer starts running immediately.
-   **Remove Timer**: Each timer has a "Remove" button that permanently deletes the timer from the list.
-   **Data Persistence**: All timer data (ID, name, running state, start time, accumulated time) is automatically saved to the browser's `localStorage`.
    -   When the application is opened, it loads the saved timers.
    -   Timers that were running when the page was closed will correctly calculate and display the elapsed time upon reopening.

### 2.2. Timer State and Controls

Each timer entry displays its state and provides controls for manipulation.

-   **Display**:
    -   **Task Name**: The user-defined name of the task.
    -   **Elapsed Time**: A running clock displaying the total elapsed time in `hh:mm:ss` format, updating every second.
-   **Controls**:
    -   **Start/Stop Button**: A toggle button to control the timer's running state.
        -   If the timer is running, the button shows "Stop" and pauses the timer.
        -   If the timer is paused, the button shows "Start" and resumes the timer.
    -   **Reset Button**: Resets the timer's accumulated time to `00:00:00`.
        -   If the timer was running, it continues running from zero.
        -   If the timer was paused, it remains paused at zero.
    -   **Time Adjustment Buttons**:
        -   A `+10m` button adds 10 minutes to the timer's total elapsed time.
        -   A `-10m` button subtracts 10 minutes from the timer's total elapsed time. The elapsed time cannot be negative (it clamps at `00:00:00`).

### 2.3. User Interface (UI) Behavior

-   **Initial State**: When the app is opened for the first time or when no timers exist, a message is displayed indicating that the list is empty and prompting the user to add a task.
-   **Timer List**:
    -   Timers are displayed in a vertical list.
    -   Running timers are visually distinguished from paused timers (e.g., with a green background).
    -   The list is sorted to show currently running timers at the top.

## 3. UI/UX Design

-   **Layout**: A clean, responsive, single-page layout with centered content. It should be aesthetically pleasing and functional on desktop, tablet, and mobile devices.
-   **Header**: A prominent header with the application title ("Task Timer") and a descriptive subtitle ("Track your time, effortlessly.").
-   **Color Palette**:
    -   **Running Timer**: A green accent color to indicate an active state.
    -   **Paused Timer**: A neutral gray color.
    -   **Buttons**: Distinct colors for different actions (e.g., yellow/green for Start/Stop, blue for Reset, red for Remove) to enhance usability.
-   **Typography**: Use of a clean, sans-serif font (like Inter) for general UI text and a monospaced font (like Roboto Mono) for the timer display to prevent jitter as digits change.
-   **Feedback**: Interactive elements like buttons should have clear hover and focus states to provide visual feedback to the user.

## 4. Technical Specification

-   **Framework**: React 18+
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS, loaded via CDN for rapid, utility-first styling.
-   **State Management**:
    -   React Hooks (`useState`, `useEffect`, `useCallback`, `useMemo`).
    -   A central custom hook, `useTimers`, encapsulates all logic for timer state management and `localStorage` synchronization. This promotes separation of concerns and reusability.
-   **Execution Environment**: The application runs entirely client-side in the browser. It uses an `importmap` to load React dependencies from a CDN, requiring no local build step.
-   **Data Storage**:
    -   `localStorage` is used for persistence.
    -   The entire array of timers is serialized to a JSON string and stored under a single key (`react-timers-list`).

## 5. File Structure

```
.
├── index.html              # Main HTML entry point, includes CDN links and root div.
├── index.tsx               # Renders the React application into the DOM.
├── App.tsx                 # Main application component, manages layout and renders timers.
├── metadata.json           # Application metadata.
├── types.ts                # TypeScript type definitions (e.g., TimerState).
├── components/
│   └── TimerItem.tsx       # Component for displaying and controlling a single timer.
└── hooks/
    └── useTimers.ts        # Custom hook for all timer state logic and persistence.
```
