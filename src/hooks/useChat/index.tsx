import { useState } from 'react';
import { db } from '../../utils/firebase';
import { auth } from '../../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, addDoc } from 'firebase/firestore';
import { useReduxDispatch } from '../useReduxDispath';
import { SubmitHandler } from 'react-hook-form';
import {
  isCreateChat,
  isHandleChat,
} from '../../features/featureChat/chatSlice';

interface FormDataCreate {
  nameChat: string;
}

interface FormDataSend {
  body: string;
}

export function useChat() {
  const [msg, setMsg] = useState();
  console.log(msg, 'msg');
  const chatCollectionRef = collection(db, 'chat');
  //const { isAuth } = useReduxSelector(state => state.user);
  const dispatch = useReduxDispatch();

  const createChat: SubmitHandler<FormDataCreate> = async data => {
    try {
      await onAuthStateChanged(auth, user => {
        if (user) {
          addDoc(chatCollectionRef, {
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

  const handleChat = (id: string) => {
    const chatRef = doc(chatCollectionRef, id);
    const b = getDoc(chatRef);
    const listChats: any = [];
    b.then(res => {
      if (res.exists()) {
        const data = res.data();
        listChats.push({
          chatName: data.name,
          messages: data.messages.map((m: any) => {
            return {
              body: m.body,
              createdUp: m.timestampUp,
              idUser: m.userId,
            };
          }),
        });
        //setMsg(listChats);
        dispatch(isHandleChat(listChats));
        console.log(listChats, 'listChats');
      } else {
        console.log('Chat nao existe');
      }
    }).catch(error => {
      console.log(error, 'error');
    });
  };

  return { createChat, sendMessage, handleChat };
}
