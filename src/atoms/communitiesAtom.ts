import { Timestamp } from "firebase/firestore";

export interface Community {
  id: string;
  name: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
}
