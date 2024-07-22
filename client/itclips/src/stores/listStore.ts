import { create } from "zustand";

interface Article {
  image:string;
  bookmarks: object[];
  title: string;
  bookmark_list_tags: string[];
  description: string;
  bookmark_list_like: number;
}

const listStore = create<Article>((set) => ({
  image:"이미지 주소",
  bookmarks:[{url:'www.naver.com'}, {url:'www.google.com'}],
  title: "생성된 리스트_01",
  bookmark_list_tags: ["JAVA", "FE"],
  description: "리스트에 관한 설명",
  bookmark_list_like: 5 ,
}));

export default listStore