export interface listChatsProps {
  idChat: string;
  idUser: string;
  name: string;
}

export interface listChats extends listChatsProps {
  date: string;
}

export interface FormDataChannel {
  createChannel: string;
}

export interface FormDataRegisterUser {
  username?: string;
  email: string;
  password: string;
}

export interface ChatAllProps {
  idChat: string;
  name: string;
}

export interface FormDataLoginPage {
  email: string;
  password: string;
}
