import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getRedirectUrl } from "../../utils/auth";
import { motion } from "framer-motion";
import { useGoogleLogin } from '@react-oauth/google';

const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // If new user, create profile
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'user',
          createdAt: new Date().toISOString(),
          phoneVerified: false
        });
      }

      const userData = userSnap.exists() ? userSnap.data() : { phoneVerified: false };
      const redirectUrl = getRedirectUrl() || '/';

      if (!userData.phoneVerified) {
        navigate('/phone-verification', { state: { returnUrl: redirectUrl } });
      } else {
        navigate(redirectUrl);
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      setError(error.message);
    }
  };

  const handleGoogleSuccess = async (tokenResponse) => {
    // Handle the token response here
  };

  const googleLogin = useGoogleLogin({
    onSuccess: tokenResponse => handleGoogleSuccess(tokenResponse),
    onError: error => console.log('Login Failed:', error),
    flow: 'auth-code',
    popup: false // Change this to false to use redirect flow instead of popup
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Please sign in to continue</p>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 py-3 px-4 rounded-lg hover:bg-gray-50 transition duration-200"
        >
          <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 mt-4 text-center"
          >
            {error}
          </motion.p>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button 
              onClick={() => navigate('/signup')}
              className="text-pink-600 font-medium hover:text-pink-700"
            >
              Sign Up
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
