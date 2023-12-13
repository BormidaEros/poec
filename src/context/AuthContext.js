
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

// Creación de un contexto para la autenticación
const authContext = createContext();

// Hook  para acceder al contexto de autenticación
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

// Proveedor de autenticación que envuelve la aplicación
export function AuthProvider({ children }) {
  // Estados para el usuario y el estado de carga
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Funciones de autenticación utilizando Firebase
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => signOut(auth);

  const resetPassword = async (email) => sendPasswordResetEmail(auth, email);

  // Efecto para manejar cambios en la autenticación
  useEffect(() => {
    // Escuchar cambios en la autenticación con Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log({ currentUser });
      setUser(currentUser);
      setLoading(false);
    });

    // Limpiar el efecto al desmontar el componente
    return () => unsubscribe();
  }, []);

  // Proporcionar el contexto de autenticación a los componentes descendientes
  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
}