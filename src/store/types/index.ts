export interface listChatsProps {
  idChat: string;
  idUser: string;
  name: string;
  date: string;
}

export interface FormDataChannel {
  nameChat: string;
}

export interface FormDataRegisterUser {
  username?: string;
  email: string;
  password: string;
}

export interface ChatAllProps {
  idChat: string;
  name: string;
  date: string;
}

export interface FormDataLoginPage {
  email: string;
  password: string;
}
