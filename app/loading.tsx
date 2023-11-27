import { ClipLoader } from "react-spinners";
export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className=" h-screen w-screen flex justify-center items-center ">
      <ClipLoader color="lightblue" size={80} />
    </div>
  );
}
