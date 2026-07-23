# Understanding Focus Bear Key Libraries

## What is the purpose of Redux-Persist, and why is it useful?

Redux Persist automatically saves selected Redux you choose to persistent storage and restores its state when the application restarts. This is useful because it allows the user to maintain their login session, settings, login progress. A good use case might be for saving a continuous focus timer when the application is restarted. The package also reduces start up state flickering, unnecessary network calls, and allows the application to use the last known data offline until a new synchronisation occurs.

## How does react-native-background-fetch differ from a normal timer?

Regular JavaScript timers such as setTimeout & setInterval run within the JavaScript runtime and are paused or terminated when the operating system pauses your application. In contrast, react-native-background-fetch can register a (headless Android) task with the OS Job/Work Scheduler at minimum every 15minuets. iOS is more restricted and varied in its implementation. So the system itself wakes up the app at battery-friendly intervals to run a short background job, and then freezes it again. It is therefore designed for opportunistic background synchronization rather than precise, continuous countdowns.

## Why does Focus Bear use Auth0 instead of handling authentication manually?

Focus Bear uses Auth0 for the authentication flow because it provides expert security knowledge, dedicated infrastructure and up-to-date security research. Building you own tools can it costly and time consuming. Auth0 provides a turnkey solution with social connectivity, no password flow, anomaly detection, and JWT tokens. This narrows security, meets App Store requirements such as logging in with Apple, and allows the team to focus on core product functionality rather than maintaining authentication infrastructure.

## How does PostHog help improve the user experience in Focus Bear?

PostHog shows the team how users naturally navigate your app, giving you an idea of the strengths and weaknesses in your app's design. When a user opens the app, the tool starts recording the actions and events the user makes and how they engage with key features, providing deeper insights into user movement. This information is useful for app improvement feedback and iteration, it gives more direct and detailed feedback that a user might not have the time to provide.

## What’s the difference between Sentry and PostHog, and when would you use each?

Sentry is an error-monitoring and crash-reporting tool for capturing errors or build failures. It has details info and logging when an error occurs so you can inspect the stacktrace, breadcrumbs, device context. It is use full for understanding user bug reports or for rapid responses when critical failures happen. PostHog is a product-analytics platform that tracks user behavior, actions, and general use of your app. It answers the question of what the user is doing vs how the app is breaking. The user cage for Sentry is in stability and debugging and you would use PostHog when you want to understand usage patterns and improve the experience.

## How does react-native-localize work, and how does it interact with i18next?

react-native-localize works by reading the device’s native settings and passed on the users the preferred language preference, country, timezone, and related information. The package provide listeners for when those values change for instant response if a user changes their settings. On startup the app typically calls its APIs to find the best available language, then passes that language code to i18next’s changeLanguage method. i18next loads the matching translation resources and react-i18next re-renders the UI with the correct strings.

## If you had to remove one library and replace it with an alternative, which one would you choose and why?

If I had to pick an alternative for a single library I might suggest an alternative for @rneui/themed React Native Elements and use NativewindUI and a component library instead. The alternative library provides great templates and UI components that are easy to use and feel responsive. Based on tailwind wild it easy to customize and highly reusable.
