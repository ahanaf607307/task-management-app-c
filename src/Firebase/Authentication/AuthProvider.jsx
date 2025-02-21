import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../../Hook/AxiosPublic/AxiosPublic";
import auth from "../firebase.init";

const provider = new GoogleAuthProvider();
export const AuthContext = createContext({});
const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login In With Google
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // Logout User
  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInf = {
          email: currentUser?.email,
        };
        axiosPublic.post("/jwt", userInf).then((res) => {
          if(res.data) {
            localStorage.setItem("access-token", res.data);
            console.log('live',res.data);
            setUser(currentUser);
            setLoading(false);
            console.log("current user -------->", currentUser);
          } 
        });
  
      }
      else {
        localStorage.removeItem("access-token");
        setLoading(false);
        console.log("current user -------->", currentUser);
      }
    });
    return () => {
      unSubscribe();
      console.log("user logged out ");
    };
  }, []);
  const userInfo = {
    user,
    setUser,
    googleLogin,
    loading,
    setLoading,
    logoutUser,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
