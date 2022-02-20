export interface Creator {
    nickname: string;
    phone: string;
    id: string;
  }
  
  export interface User {
    nickname: string;
    phone: string;
    id: string;
  }
  
  export interface Creator2 {
    nickname: string;
    phone: string;
    id: string;
  }
  
  export interface Message {
    message: string;
    creator: Creator2;
    id: string;
    data: string;
  }
  
  export interface Chats {
    title: string;
    imageUrl: string;
    creator: Creator;
    id: string;
    users: User[];
    messages: Message[];
  }