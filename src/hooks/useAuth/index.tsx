import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { db } from '../../utils/firebase';
import { doc, setDoc } from 'firebase/firestore';
import {
  isInfo,
  isLogin,
  isLogout,
} from '../../features/featureUser/userSlice';
import { useReduxDispatch } from '../useReduxDispath';
//import { LoginProps } from './types';

export function useAuth() {
  //const { isAuth } = useReduxSelector(state => state.user);
  const dispatch = useReduxDispatch();

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<any>({} as any);

  async function Login({ email, password }: any) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log('12', user);
      if (user) {
        setUserInfo({
          uid: user.uid,
          email: user.email,
        });
        //dispatch(isLogin());
        navigate('/');
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  }

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
      await navigate('/');
      await dispatch(isLogin(true));
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

  const openChat = async () => {
    try {
      // const queryChats = await query(
      //   usersCollectionRef,
      //   where('usersId', 'array-contains', userId),
      // );
      // const querySnapshot = await getDocs(queryChats);
      // const unsubscribe = onSnapshot(usersCollectionRef, snapshot => {
      //   const chatIds = snapshot.docs.map(doc => doc.id);
      // });
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const userId = user.uid;
        //const userEmail = user.email;
        dispatch(isInfo(userId));
      }
    });
  }, []);

  return { Login, Logout, LoginGoogle };
}
