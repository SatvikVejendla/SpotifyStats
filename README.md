# Spotify Stats App

SpotifyStats is a web application that provides users with insights and statistics about their Spotify listening habits. By connecting to the Spotify API, users can view detailed analytics about their most played tracks, artists, genres, and more.

---

## Table of Contents

- [Features](#features)
- [Preview](#preview)
- [Inspiration](#inspiration)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Features

- **Most Listened Stats**: View details on your most listened tracks/artists over given time periods
- **Responsive Design**: A fully responsive site that can operate seamlessly for smaller viewports, ensuring a smooth user experience on any device.
- **Vanilla JS**: Uses no external libraries aside from React and React-Router, providing a lightweight and efficient user experience.
- **Express Backend**: Connects to an external [backend Node.JS server](https://github.com/SatvikVejendla/SpotifyStatsBackend/tree/main)
- **MySQL Database**: Authentication tokens are stored on a local MySQL server for retention of user data

---

## Preview

![App Preview](https://github.com/SatvikVejendla/SpotifyStats/blob/main/screenshots/spotifyapp.gif)

---

## Inspiration

This project was meant to be a challenging project for me to incorporate various different services into a singular coherent application. The task was to create a responsive website that combined:
- React.JS frontend
- Express backend
- MySQL database

I have previously worked with each of these individually but this is my first time making them interact with each other for one overall purpose. Whenever a new user logs in to the website, the React server requests the backend to authorize the user, which connects to the MySQL database to access/modify the relevant access tokens and returns them to the website for processing.

This was my first time working on creating a responsive website that would function on smaller viewports as well, so it was a little bit challenging. In addition, the Spotify API rate limit proved as a challenge as I would have to conserve my API requests carefully.

---

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/SatvikVejendla/SpotifyStats.git
    cd SpotifyStats
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Edit the start of [App.js](https://github.com/SatvikVejendla/SpotifyStats/blob/main/src/App.js) to
   ```sh
   let client_id=your_client_id;
   let client_secret=your_client_secret;
   ```
   or create a `.env` file in the root directory and add your Spotify API credentials:
    ```sh
    SPOTIFY_CLIENT_ID=your_client_id
    SPOTIFY_CLIENT_SECRET=your_client_secret
    SPOTIFY_REDIRECT_URI=your_redirect_uri
    ```

    *Note: The second option will require some additional configuration in the App.js file.*

5. **Run the application**:
    ```sh
    npm start
    ```

---

## Usage

1. **Connect Your Spotify Account**:
   Open the application and log in with your [Spotify developer account](https://developer.spotify.com/) to grant the necessary permissions.

2. **Authorize App**:
   You will need to edit the app in your developer portal to your app by using the respective client tokens and authorizing your redirect_uri.

3. **Create MySQL Database**:
   Download the [MySQL server client](https://dev.mysql.com/downloads/installer/) and set up a local server (more details in the [server README](https://github.com/SatvikVejendla/SpotifyStatsBackend/blob/main/README.md).
   
4. **Set up Backend server**:
   This website works in conjunction with a [backend Express server](https://github.com/SatvikVejendla/SpotifyStatsBackend/tree/main) which has to be run simultaneously.

5. **View Your Stats**:
   Navigate through the app to explore various statistics about your listening habits.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- Inspired by various Spotify statistics tracking applications such as [stats.fm](https://stats.fm/).

---
