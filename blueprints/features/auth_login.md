# BLUEPRINT: Authentication & Login

## Flow Checklist
1.  **Email Check:** Use `fetchSignInMethodsForEmail`.
    * *Exists?* -> Show Password Field.
    * *New?* -> Show Registration Form.
2.  **Social Auth:** Google Sign-In via `signInWithPopup`.
3.  **Database Sync (Crucial):**
    * On *any* successful login/signup, check Cloud SQL `users` table.
    * If missing, create row with default `pilot_metrics`.

## UI/UX
* Must use **Void Black** background and **PFD Cyan** accents.
* Smooth transitions between "Enter Email" and "Enter Password" states.
