import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

interface DarkMode {
  isDark:boolean
  changeMode: (setting:string) => void
}

const darkModeStore = create<DarkMode>((set) => ({
  isDark:(localStorage.getItem("theme")==='light'? false : true),
  changeMode: (setting) => set((state) => ({isDark : (setting==='light'? false : true)})),
}));

export default darkModeStore