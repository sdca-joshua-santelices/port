# Joshua Santelices - Cyberpunk Portfolio

A cyberpunk-themed portfolio website with neon glow effects, glassmorphism, and animations.

## Features

- Cyberpunk aesthetic with neon blue/violet color scheme
- Dark/Light mode toggle
- Responsive design for all devices
- Animated smokey trail cursor effect
- Interactive tech stack showcase
- Certificate gallery with modal viewer
- Contact form with Firebase database integration
- Smooth page transitions and animations

## Pages

- **Home**: Profile introduction with typewriter effect
- **About**: Bio and education timeline
- **Tech Stack**: Skills and technologies
- **Certificates**: Showcase of certifications
- **Contact**: Contact form and social links

## Setting Up Firebase for Contact Form

The contact form is configured to store messages in a Firebase Firestore database. Follow these steps to set up your own Firebase project:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the steps to create a new project
3. Once your project is created, click on "Web" to add a web app to your project
4. Register your app with a nickname (e.g., "Portfolio Contact Form")
5. Copy the Firebase configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

6. Open the file `/js/firebase-config.js` and replace the placeholder configuration with your own
7. In the Firebase console, go to "Firestore Database" and click "Create database"
8. Start in test mode for development (you can set up security rules later)
9. Create a collection named "messages" (it will be created automatically when the first message is sent)

Now your contact form should successfully save messages to your Firebase database!

## Customization

### Colors

You can customize the color scheme by editing the CSS variables in `css/style.css`. The main colors are:

- `--primary-color`: Main neon color (currently #14efff - neon blue)
- `--secondary-color`: Secondary neon color (currently #a239ff - neon purple)
- `--accent-color`: Accent color (currently #ff2975 - neon pink)

### Profile

Update your profile information in each HTML file:

1. Replace `assets/images/profile.png` with your own profile picture
2. Update the name, title, and descriptions in each page
3. Update social media links in the contact page

## Credits

- Fonts: [Orbitron](https://fonts.google.com/specimen/Orbitron) and [Share Tech Mono](https://fonts.google.com/specimen/Share+Tech+Mono)
- Icons: [Font Awesome](https://fontawesome.com/)
- Animations: [AOS](https://michalsnik.github.io/aos/)
- Bootstrap 5 framework

## License

MIT License
