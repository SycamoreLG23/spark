/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  UserCredential,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = createContext<{
  user: null | User;
  loading: boolean;
  error: null | string;
  setLoading: (value: boolean) => void;
  setError: (error: null | string) => void;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  loginWithGoogle: () => Promise<UserCredential>;
  resetPassword: (email: string) => Promise<void>;
}>({
  user: null,
  loading: true,
  error: null,
  setLoading: () => {},
  setError: () => {},
  createUser: () => Promise.resolve({} as UserCredential),
  login: () => Promise.resolve({} as UserCredential),
  loginWithGoogle: () => Promise.resolve({} as UserCredential),
  resetPassword: () => Promise.resolve(),
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = (props: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<null | User>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const createUser = async (email: string, password: string) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      return userCredential;
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      setError(null);
      const userCredential = await signInWithPopup(auth, googleProvider);
      setLoading(false);
      return userCredential;
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      return userCredential;
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        loading: loading,
        error: error,
        setLoading,
        setError,
        createUser,
        login,
        loginWithGoogle,
        resetPassword,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
