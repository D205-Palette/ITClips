import { boolean } from "yup";
import { create } from "zustand";

interface Article {
  lists: {
    id: number;
    image: string;
    bookmarks: object[];
    title: string;
    bookmark_list_tags: string[];
    description: string;
    bookmark_list_like: number;
    isCompleted:boolean;  // 이거 로드맵일때만 사용
  }[];
  bookmarks : {
      id:number,
      title: string,
      url: string,
      description: string,
      bookmark_like: number,
      category: string,
      tags: string[],
    }[],
    roadmaps : {
      image: string,
      title:  string,
      // bookmark_list_tags:;
      description:string ,
      roadmap_like:number,
      percentage: number,
    }[];
  
  }

const mainStore = create<Article>((set) => ({
  lists: [{
    id: 1,
    image: "이미지 주소",
    bookmarks: [{ url: "www.naver.com" }, { url: "www.google.com" }],
    title: "생성된 리스트_01",
    bookmark_list_tags: ["JAVA", "FE"],
    description: "리스트에 관한 설명",
    bookmark_list_like: 5,
    isCompleted:true
  },
  {
    id: 1,
    image: "이미지 주소",
    bookmarks: [{ url: "www.naver.com" }, { url: "www.google.com" }],
    title: "생성된 리스트_01",
    bookmark_list_tags: ["JAVA", "FE"],
    description: "리스트에 관한 설명",
    bookmark_list_like: 5,
    isCompleted:true,
  },
  {
    id: 1,
    image: "이미지 주소",
    bookmarks: [{ url: "www.naver.com" }, { url: "www.google.com" }],
    title: "생성된 리스트_01",
    bookmark_list_tags: ["JAVA", "FE"],
    description: "리스트에 관한 설명",
    bookmark_list_like: 5,
    isCompleted:false
  },],
  bookmarks : [
    {
      id:1,
      title: "네이버",
      url: "www.naver.com",
      description: "북마크에 관한 설명",
      bookmark_like: 3,
      category: '카테고리1',
      tags:['FE','JAVA']
    },
    {
      id:2,
      title: "구글",
      url: "www.google.com",
      description: "북마크에 관한 설명",
      bookmark_like: 4,
      category: '카테고리2',
      tags:['BE','Python']
    },
    {
      id:3,
      title: "유튜브",
      url: "www.youtube.com",
      description: "북마크에 관한 설명",
      bookmark_like: 10,
      category: '카테고리3',
      tags:['FE','JAVA']
    },],
    roadmaps:[
      {
        image: "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
        title:  '나의 로드맵 01',
        // bookmark_list_tags:;
        description:"로드맵에 관한 설명" ,
        roadmap_like:3,
        percentage: 58.1,
      },
      {
        image: 'https://cdn.pixabay.com/photo/2017/07/31/17/12/water-2559064_1280.jpg',
        title:  '나의 로드맵 01',
        // bookmark_list_tags:;
        description:"로드맵에 관한 설명" ,
        roadmap_like:3,
        percentage: 14.7,
      },
      {
        image: 'https://cdn.pixabay.com/photo/2017/08/27/15/38/surfing-2686450_1280.jpg',
        title:  '나의 로드맵 01',
        // bookmark_list_tags:;
        description:"로드맵에 관한 설명" ,
        roadmap_like:3,
        percentage: 100,
      }
    ]
}
));

export default mainStore;
