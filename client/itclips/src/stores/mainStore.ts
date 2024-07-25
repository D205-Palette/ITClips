import { create } from "zustand";

interface Article {
  list: {
    pk: number;
    image: string;
    bookmarks: object[];
    title: string;
    bookmark_list_tags: string[];
    description: string;
    bookmark_list_like: number;
  };
  bookmarks : {
      title: string,
      url: string,
      description: string,
      bookmark_like: number,
      category: string,
      tags: string[],
    }[],
  
  }

const mainStore = create<Article>((set) => ({
  list: {
    pk: 1,
    image: "이미지 주소",
    bookmarks: [{ url: "www.naver.com" }, { url: "www.google.com" }],
    title: "생성된 리스트_01",
    bookmark_list_tags: ["JAVA", "FE"],
    description: "리스트에 관한 설명",
    bookmark_list_like: 5,
  },
  bookmarks : [
    {
      title: "네이버",
      url: "www.naver.com",
      description: "북마크에 관한 설명",
      bookmark_like: 3,
      category: '카테고리1',
      tags:['FE','JAVA']
    },
    {
      title: "구글",
      url: "www.google.com",
      description: "북마크에 관한 설명",
      bookmark_like: 4,
      category: '카테고리2',
      tags:['BE','Python']
    },
    {
      title: "유튜브",
      url: "www.youtube.com",
      description: "북마크에 관한 설명",
      bookmark_like: 10,
      category: '카테고리3',
      tags:['FE','JAVA']
    },]
}
));

export default mainStore;
