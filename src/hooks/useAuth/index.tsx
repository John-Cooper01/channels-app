import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { db } from '../../utils/firebase';
import { collection, doc, addDoc, setDoc } from 'firebase/firestore';
import { SubmitHandler } from 'react-hook-form';
import {
  isInfo,
  isLogin,
  isLogout,
} from '../../features/featureUser/userSlice';
import { useReduxDispatch } from '../useReduxDispath';
import { FormDataRegisterUser, FormData } from './types';

export function useAuth() {
  const userDocRef = collection(db, 'users');
  //const { isAuth } = useReduxSelector(state => state.user);
  const dispatch = useReduxDispatch();
  const navigate = useNavigate();

  const registerUser: SubmitHandler<FormDataRegisterUser> = async data => {
    try {
      const userInfo = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      //const userDoc = await collection(db, 'users');

      await addDoc(userDocRef, {
        name: data.username,
        email: userInfo.user.email,
        userId: userInfo.user.uid,
        createdUp: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const loginEmailAndPassword: SubmitHandler<FormData> = async data => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate('/');
      console.log('Login com sucesso');
    } catch (error) {
      console.log(error);
    }
  };

  const LoginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userInfoGoogle = await signInWithPopup(auth, provider);
      const docRef = await doc(db, 'users', userInfoGoogle.user.uid);

      setDoc(
        docRef,
        {
          name: userInfoGoogle.user.displayName,
          email: userInfoGoogle.user.email,
          userId: userInfoGoogle.user.uid,
          createdUp: new Date(),
        },
        { merge: true },
      );
      navigate('/');
      dispatch(isLogin(true));
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const Logout = async () => {
    signOut(auth)
      .then(() => {
        dispatch(isLogout(false));
        navigate('/login');
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const userId = user.uid;
        //const userEmail = user.email;
        dispatch(isInfo(userId));
      }
    });
    return () => {
      console.log('Usuario offline');
    };
  }, []);

  return { registerUser, loginEmailAndPassword, LoginGoogle, Logout };
}
