import {create} from 'zustand';


const useStore = create((set) => ({
    heros:[],
    listHeros:[],
    addHeroState: (hero) => {
        set((state) => ({ heros: [...state.heros, hero] }))
    },
    addListHeroState: (list) => {
        set(() => ({ listHeros: list }))
    },
    resetBattle: ()=> set(()=>({heros: []})),
}))

export default useStore;