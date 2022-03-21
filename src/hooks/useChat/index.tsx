import { db } from '../../utils/firebase';
import { auth } from '../../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { useReduxDispatch } from '../useReduxDispath';
import { SubmitHandler } from 'react-hook-form';
import { isCreateChat, isHandleChat } from '../../store/chat/chatSlice';
import { v4 as uuid } from 'uuid';
import { useReduxSelector } from '../useReduxSelector';
import { FormDataCreate, FormDataSend } from './types';

export function useChat() {
  const chatCollectionRef = collection(db, 'chat');
  const dispatch = useReduxDispatch();
  const {
    chat: { chatMessage },
    user: { userInfo },
  } = useReduxSelector(state => state);

  const createChat: SubmitHandler<FormDataCreate> = async data => {
    try {
      await onAuthStateChanged(auth, user => {
        if (user) {
          addDoc(chatCollectionRef, {
            uid: uuid(),
            userId: user.uid,
            name: data.createChannel,
            createdUp: new Date(),
            messages: [],
            usersId: [user.uid],
          });
          dispatch(isCreateChat(true));
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
      const chatRef = doc(chatCollectionRef, chatMessage.id);
      updateDoc(chatRef, {
        messages: arrayUnion({
          uid: uuid(),
          chatId: chatMessage.id,
          userId: userInfo.id,
          message: data.body,
          createdUp: new Date(),
          username: userInfo.email,
        }),
      });
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const handleChatAll = async (id: string) => {
    const chatRef = doc(chatCollectionRef, id);
    updateDoc(chatRef, {
      usersId: arrayUnion(userInfo.id),
    });
  };

  const handleChat = async (id: string) => {
    const chatRef = doc(chatCollectionRef, id);
    const res = await getDoc(chatRef);

    if (res.exists()) {
      const data = res.data();
      dispatch(
        isHandleChat({
          id: res.id,
          uid: data.uid,
          chatName: data.name,
          messages: [],
        }),
      );
    } else {
      console.log('Chat nao existe');
    }
  };

  return { createChat, sendMessage, handleChatAll, handleChat };
}
