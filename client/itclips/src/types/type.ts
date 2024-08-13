type UserInfo = {
    id?: number 
    email?: string 
    password?: string 
    nickname?: string
    profileImage?: any
    createdAt?: string
    updatedAt?: string
    birth?: string
    job?: string
    gender?: boolean
    bio?: string;
    refreshToken?: string
    role?: string
    darkMode?: boolean
    provider?: any
    bookmarkLists?: any[]
    groups?: any[]
    userTags?: any[]
    roadmapList?: any[]
    roadmapLikeList?: any[]
    bookmarkListComments?: any[]
    bookmarkListLikes?: any[]
    bookmarkListScraps?: any[]
    bookmarkLikes?: any[]
    bookmarkReports?: any[]
    bookmarkListReports?: any[]
    followings?: any[]
    followers?: any[]
    roleKey?: string
    image?: string
  }
  
  export type { UserInfo };