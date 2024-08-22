import axios, { AxiosResponse } from 'axios';
import { SERVER_DOMAIN } from '../constants/contants';

export interface User {
  id: number;
  username: string;
  profile_pic: string;
  bio: string | null;
  nickname: string;
  instagram: string | null;
  you_tube: string | null;
  facebook: string | null;
}

export interface Like {
  id: number;
  reciever_id: number;
  sender_id: number;
}

export interface Video {
  id: number;
  user_id: number;
  profile_pic: string;
  description: string;
  video: string;
  thum: string;
  gif: string | null;
  view: number;
  section: string | null;
  sound_id: number | null;
  privacy_type: string;
  allow_comments: boolean;
  allow_duet: boolean;
  block: boolean;
  duet_video_id: number | null;
  old_video_id: number | null;
  duration: number | null;
  promote: boolean;
  allow_stitch: boolean;
  like: number;
  comment: number;
  shared: number;
  diamond_value: number | null;
  video_topic: string | null;
  video_durations: string | null;
  title: string;
  remix_video_id: number | null;
  created: string;
  user: User;
  likes: Like[];
}

export interface GetVideoResponse {
  success: boolean;
  message: string;
  videos: Video[];
  totalVideos: number;
  currentPage: number;
  pageSize: number;
}


export interface FakeUser {
  id: number;
  uuid: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  ip: string;
  macAddress: string;
  website: string;
  image: string;
}

export interface GetUserResponse {
  status: string;
  code: number;
  total: number;
  data: FakeUser[];
}


const getUsers = async (pageSize: number): Promise<AxiosResponse<GetUserResponse>> => {
  const url = `${SERVER_DOMAIN}/api/v1/users?_quantity=${pageSize}`;
  try {
    const result = await axios.get<GetUserResponse>(url);
    return result;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};



const getVideo = async (page: number, pageSize: number): Promise<AxiosResponse<GetVideoResponse>> => {
  const url = `${SERVER_DOMAIN}/videos/userAllVideos?page=${page}&pageSize=${pageSize}`;
  try {
    const result = await axios.get<GetVideoResponse>(url);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  getVideo,
  getUsers
};
