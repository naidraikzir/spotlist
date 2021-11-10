## How To

Register an app on spotify to get a Client ID here [https://developer.spotify.com/dashboard](https://developer.spotify.com/dashboard).

On the dashboard, open the edit settings and add `http://localhost:3000` as Redirect URIs

On Spotify Dashboard, copy the Client ID of the app that is just created

Copy `.env.example` to `.env`

Paste the Client ID into the `.env` file as value of `VITE_CLIENT_ID`

Run `npm install`

Run `npm run dev`
