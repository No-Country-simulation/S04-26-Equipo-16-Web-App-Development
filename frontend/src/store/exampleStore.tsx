import {create} from 'zustand';

type ExampleStore = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears:number) => void;
}

export const useExampleStore = create<ExampleStore>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({bears: state.bears + 1})),
  removeAllBears: () => set({bears: 0}),
  updateBears: (newBears) => set({bears: newBears}),
}));