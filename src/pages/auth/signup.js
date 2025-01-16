// SignUp.js
import React, { useState } from "react";
import { auth, db } from "../../firebase"; // Correct import statement
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions

const SignUp = ({ switchToSignIn }) => {
  const [error, setError] = useState("");

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      // Create user document with default role
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user"
      });
      // Handle successful sign-up
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <button
          onClick={handleGoogleSignUp}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Sign Up with Google
        </button>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        <p className="mt-6 text-center">
          Already have an account?{" "}
          <button onClick={switchToSignIn} className="text-blue-500 hover:underline">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
