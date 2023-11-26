import { baseApi } from "./api/baseApi";
import mainModal from "./features/modal/modalSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  modal: mainModal,
};
