import {create} from 'zustand';


const useStore = create((set) => ({
    heros:[],
    addHeroState: (hero) => {
        set((state) => ({ heros: [...state.heros, hero] }))
    },
    resetBattle: ()=> set(()=>({heros: []})),
}))

export default useStore;