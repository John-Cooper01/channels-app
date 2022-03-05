export interface listChatsProps {
  idChat: string;
  idUser: string;
  name: string;
  index?: number;
}

export interface FormDataChannel {
  nameChat: string;
}

export interface FormDataRegisterUser {
  username?: string;
  email: string;
  password: string;
}
