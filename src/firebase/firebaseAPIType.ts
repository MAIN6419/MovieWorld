import { Timestamp } from "firebase/firestore";

export interface IUserData {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export interface IReviewData {
  id: string;
  uid: string;
  rating: number;
  contents: string;
  createdAt: Timestamp;
  spoiler: boolean;
  isBlock: boolean;
  reportCount: number;
  reviewer: string;
  reviewerImg: string;
  editSpoiler: boolean;
}
