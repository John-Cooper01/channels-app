import { db } from '../../utils/firebase';
import { auth } from '../../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useReduxDispatch } from '../useReduxDispath';
import { SubmitHandler } from 'react-hook-form';
import { isCreateChat } from '../../features/featureChat/chatSlice';

interface FormDataCreate {
  nameChat: string;
}

interface FormDataSend {
  body: string;
}

export function useChat() {
  const usersCollectionRef = collection(db, 'chat');
  //const { isAuth } = useReduxSelector(state => state.user);
  const dispatch = useReduxDispatch();

  const createChat: SubmitHandler<FormDataCreate> = async data => {
    try {
      await onAuthStateChanged(auth, user => {
        if (user) {
          addDoc(usersCollectionRef, {
            userId: user.uid,
            name: data.nameChat,
            createdUp: new Date(),
            messages: [],
            usersId: [user.uid],
          });
          dispatch(isCreateChat(true));
        } else {
          console.log('error');
        }
      });
      dispatch(isCreateChat(false));
      console.log('Canal cirado com sucesso');
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage: SubmitHandler<FormDataSend> = async data => {
    try {
      console.log('sendMessage', data.body);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return { createChat, sendMessage };
}
