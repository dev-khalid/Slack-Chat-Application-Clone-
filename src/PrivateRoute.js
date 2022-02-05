import './Firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import React ,{useEffect,useState} from 'react'; 

export default function PrivateRoute({ children }) {
  //useAuth hook.
  const [currentUser,setCurrentUser] = useState(); 
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user); 
          // ...
        } else {
          // User is signed out
          // ...
          console.log('kare call korche');
          return <Navigate to="/login" />;
        }
      });
    return unsubscribe();
  });
  return currentUser ? children : <Navigate to="/login" />;
}
