export interface Astrologer {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  experience: number;
  rating: number;
  reviews: number;
  price: number;
  language: string;
  status: 'online' | 'busy' | 'away';
  bio: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'success' | 'pending' | 'failed';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'astrologer';
  text: string;
  timestamp: string;
}
