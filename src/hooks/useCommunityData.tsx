import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../atoms/authModalAtom";
import {
  Community,
  CommunitySnippet,
  communityState,
} from "../atoms/communitiesAtom";
import { auth, firestore } from "../firebase/clientApp";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    // is the user signed in?
    // if not => open auth model
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }

    joinCommunity(communityData);
  };

  const getMySnippets = async () => {
    setLoading(true);
    try {
      // get user snippets
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );

      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }));
      // console.log("snippets", snippets);
    } catch (error: any) {
      console.log("getMySnippets error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const joinCommunity = async (communityData: Community) => {
    // batch writes
    setLoading(true);
    try {
      const batch = writeBatch(firestore);
      // create a new communitySnippets
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      };
      const communitySnippetDocRef = doc(
        firestore,
        `users/${user?.uid}/communitySnippets`,
        communityData.id
      );
      batch.set(communitySnippetDocRef, newSnippet);

      // update the noOfMembers by (+1)
      const communityDocRef = doc(firestore, "communities", communityData.id);
      batch.update(communityDocRef, {
        numberOfMembers: increment(1),
      });

      await batch.commit();
      // update recoil state -> communityState.mySnippets
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log("joinCommunity error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const leaveCommunity = async (communityId: string) => {
    // batch writes
    setLoading(true);
    try {
      const batch = writeBatch(firestore);
      // delete communitySnippets from user
      const communitySnippetDocRef = doc(
        firestore,
        `users/${user?.uid}/communitySnippets`,
        communityId
      );
      batch.delete(communitySnippetDocRef);
      // update the noOfMembers by (-1)
      // update the noOfMembers by (+1)
      const communityDocRef = doc(firestore, "communities", communityId);
      batch.update(communityDocRef, {
        numberOfMembers: increment(-1),
      });

      await batch.commit();
      // update recoil state -> communityState.mySnippets
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (error: any) {
      console.log("leaveCommunity error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) {
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [],
      }));
      return;
    }
    getMySnippets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return {
    // datas and functions
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
    error,
  };
};
export default useCommunityData;
