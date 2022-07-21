import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
  id: string;
  name: string;
  bio?: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
}

export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

interface CommunityState {
  mySnippets: CommunitySnippet[];
  currentCommunity: Community;
}

export const defaultCommunity: Community = {
  id: "",
  creatorId: "",
  name: "",
  numberOfMembers: 0,
  imageURL: "",
  privacyType: "public",
};

const defaultCommunityState: CommunityState = {
  mySnippets: [],
  currentCommunity: defaultCommunity,
};

export const communityState = atom<CommunityState>({
  key: "communityState",
  default: defaultCommunityState,
});
