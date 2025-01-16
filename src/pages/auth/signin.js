import React, { useState } from "react";
import { auth, db } from "../../firebase"; // Correct import statement
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions

const SignIn = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      setUser(user); // Set user info to state

      // Create or update user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setUser(null); // Clear user info
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {user ? (
          <div>
            <h1 className="text-2xl font-bold mb-6 text-center">Welcome, {user.displayName}</h1>
            <button
              onClick={handleSignOut}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-6 text-center">Please Sign In</h1>
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Sign in with Google
            </button>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
