# Making API Calls with Axios

## Why is it useful to create a reusable Axios instance?

Setting up a reusable Axios instance keeps API configuration centralised. Rather than explicitly defining the base URL, timeouts, and headers for every individual call, the instance handles these details automatically. This removes redundant code.

## How does intercepting requests help with authentication?

Because interceptors execute just before a request leaves the app, they offer a highly reliable place to integrate authentication. In this setup, the interceptor fetches a stored token directly from `expo-secure-store` and attaches it as a Bearer token within the `Authorization` header. Approaching it this way extracts auth logic entirely from individual API calls. The token is applied by default whenever it is needed.

## What happens if an API request times out, and how can you handle it?

Axios handles network timeouts by rejecting the promise with an `ECONNABORTED` error. `loginUser` catches the error and returns `{ ok: false, error: "Request timed out" }`. The UI then displays that message.
