import { boolean } from "yup";
import { create } from "zustand";

interface Article {

roadmap : {
  id: number,
  userId: number,
  userName: string,
  title: string,
  description: string,
  createdAt: string,
  image: string,
  isPublic: number,
  stepList: 
    {
      id: number,
      roadmapId: number,
      bookmarkListResponseDTO: {
        id: number,
        title: string,
        description: string,
        bookmarkCount: number,
        likeCount: number,
        image:
        string,
        tags: string[],
        users: number[],
      },
      check: number,
      order: number,
    }[],
  commentList: 
    {
      id: number,
      comment: string,
      userId: number,
      userName: string,
      createdAt:string,
      roadmapId: number,
    }[],
  likeCnt: number,
};
  
changeCheckbox: (index:string) => void 


}


const roadmapStore = create<Article>((set) => ({
     roadmap : {
        id: 1,
        userId: 1,
        userName: "UserOne",
        title: "First Roadmap",
        description: "This is the description for the first roadmap",
        createdAt: "2024-07-24T05:41:26",
        image:
          "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
        isPublic: 1,
        stepList: [
          {
            id: 1,
            roadmapId: 1,
            bookmarkListResponseDTO: {
              id: 1,
              title: "My First Bookmark List",
              description: "This is a description for the first bookmark list",
              bookmarkCount: 0,
              likeCount: 1,
              image:
                "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
              tags: [],
              users: [],
            },
            check: 0,
            order: 1,
          },
          {
            id: 2,
            roadmapId: 1,
            bookmarkListResponseDTO: {
              id: 3,
              title: "UserOne Second Bookmark List",
              description: "This is a description for UserOne's second bookmark list",
              bookmarkCount: 0,
              likeCount: 1,
              image:
                "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
              tags: [],
              users: [],
            },
            check: 1,
            order: 2,
          },
          {
            id: 2,
            roadmapId: 1,
            bookmarkListResponseDTO: {
              id: 3,
              title: "UserOne Second Bookmark List",
              description: "This is a description for UserOne's second bookmark list",
              bookmarkCount: 0,
              likeCount: 1,
              image:
                "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
              tags: [],
              users: [],
            },
            check: 1,
            order: 2,
          },
        ],
        commentList: [
          {
            id: 1,
            comment: "This is a comment on the first roadmap by UserOne",
            userId: 1,
            userName: "UserOne",
            createdAt: "2024-07-24T05:41:26",
            roadmapId: 1,
          },
          {
            id: 2,
            comment: "This is a comment on the first roadmap by Admin",
            userId: 2,
            userName: "AdminUser",
            createdAt: "2024-07-24T05:41:26",
            roadmapId: 1,
          },
        ],
        likeCnt: 2,
      } ,

      changeCheckbox: (index) => set((state) => state)
    }),

     
    //   hangeCategory: (category) => set((state) => ({whatCategory :  (state.whatCategory === category ? '' : category)})),
)


export default roadmapStore;
