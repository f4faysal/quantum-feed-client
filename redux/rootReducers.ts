import { baseApi } from "./api/baseApi";
import mainModal from "./features/modal/modalSlice";
import setUser from "./features/user/userSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  modal: mainModal,
  user: setUser,
};
