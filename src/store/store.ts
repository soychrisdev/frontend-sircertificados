import { create } from "zustand";
import { DataSlice, createDataSlice } from "./slice/dataSlice";

export const useAppStore = create<DataSlice>()(
    (...a) => ({
        ...createDataSlice(...a),
    }),
);
