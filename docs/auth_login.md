# User Authentication Setup Checklist

Here's the plan for setting up user authentication and information storage:

## 1. Sign-up and Sign-in Flow

*   [ ] **Email Existence Check:** When a user signs up, use `fetchSignInMethodsForEmail` from Firebase Auth to check if the email is already registered.
*   [ ] **Conditional Logic:**
    *   If the email exists, switch the view to the sign-in form and pre-fill the email address.
    *   If the email doesn't exist, proceed with creating a new user using `createUserWithEmailAndPassword`.
*   [ ] **Sign-in:**
    *   Implement sign-in with `signInWithEmailAndPassword`.
    *   Handle incorrect password errors by showing a message to the user.
*   [ ] **UI/UX:**
    *   Ensure the UI smoothly transitions between sign-up and sign-in states.
    *   Provide clear feedback to the user (e.g., "Email already in use, please sign in").

## 2. Social Logins (Google/Apple)

*   [ ] **Integrate Google Sign-In:** Use `signInWithPopup` with `GoogleAuthProvider` for Google login.
*   [ ] **Integrate Apple Sign-In:** (If required) Use `signInWithPopup` with `OAuthProvider('apple.com')`.
*   [ ] **User Profile:** On successful social login, check if a user profile exists in Firestore. If not, create one.

## 3. Password Reset

*   [ ] **"Forgot Password?" Link:** Add a "Forgot Password?" link to the login view.
*   [ ] **Reset Flow:**
    *   When the user clicks the link, show a form to enter their email.
    *   Use `sendPasswordResetEmail` from Firebase Auth to send a password reset link.
*   [ ] **User Feedback:** Inform the user that a password reset email has been sent.

## 4. User Information Storage (Firestore)

*   [ ] **User Collection:** Create a `users` collection in Firestore to store additional user information.
*   [ ] **Document Structure:** Each document in the `users` collection will be keyed by the user's UID from Firebase Auth. It can store information like:
    *   `email`
    *   `displayName`
    *   `createdAt`
    *   Other application-specific data.
*   [ ] **Data Sync:**
    *   When a user signs up, create a corresponding document in the `users` collection.
    *   When a user's profile information changes (e.g., they update their name), update the document in Firestore.

## 5. State Management

*   [ ] **Authentication State:** Use `onAuthStateChanged` to listen for changes in the user's authentication state and update the application's UI accordingly.
*   [ ] **User Data:** Create a context or a global state management solution (like Zustand or Redux) to provide user data throughout the application.
