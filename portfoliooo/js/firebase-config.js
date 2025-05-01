// Firebase Configuration for Contact Form
// Joshua Santelices - Cyberpunk Portfolio

// Your web app's Firebase configuration - need to replace with your own Firebase project details
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const db = firebase.firestore();

// Function to save message to Firebase
function saveMessageToDatabase(name, email, message) {
  return db.collection("messages").add({
    name: name,
    email: email,
    message: message,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then((docRef) => {
    console.log("Message saved with ID: ", docRef.id);
    return {
      success: true,
      id: docRef.id
    };
  })
  .catch((error) => {
    console.error("Error adding message: ", error);
    return {
      success: false,
      error: error
    };
  });
}
