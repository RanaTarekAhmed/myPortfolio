# Ground Truth: Copilot Experiment - Contact Form Bug

## Intentional Bug
The `initContactForm` function in `projectjs.js` has been modified to silently return when required fields (name, email, or message) are missing, instead of displaying an error message to the user.

## Affected File(s)
- `projectjs.js`

## Root Cause
In the `initContactForm` submit handler, the validation check for missing fields:
```javascript
if (!name || !email || !message)
  return showFormStatus(formStatus, "All fields are required", "error");
```
was changed to:
```javascript
if (!name || !email || !message)
  return;
```
This prevents the `showFormStatus` function from being called, leaving the `formStatus` element empty and the user without feedback.

## Expected Correct Behavior
When a user attempts to submit the contact form without filling in all required fields, the form should not be submitted, and an error message ("All fields are required") should be displayed in the `#formStatus` element with the CSS class `error`.

## Correct Fix
The logic should be restored so that `showFormStatus` is called with the appropriate error message and type when validation fails.

## Test that should pass after the fix
The test `should show error when name is missing` in `contact.test.js` should pass.
