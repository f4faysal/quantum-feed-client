import { formatDistanceToNowStrict } from "date-fns";

import { useCallback, useMemo } from "react";

import { useRouter } from "next/navigation";
import Avatar from "../Avatar";

interface CommentItemProps {
  data: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ data = {} }) => {
  const router = useRouter();

  const goToUser = useCallback(
    (ev: any) => {
      ev.stopPropagation();

      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div
      className="
        border-b-[1px] 
        border
        p-5 
        cursor-pointer 
        hover:bg-white
        transition
      "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data?.user?.profileImage} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="
               
                font-semibold 
                cursor-pointer 
                hover:underline
            "
            >
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            "
            >
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className=" mt-1">{data.body}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
