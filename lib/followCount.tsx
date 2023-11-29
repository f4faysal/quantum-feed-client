"use clint";

import { useFollowCountQuery } from "@/redux/api/authApi";

interface followCountProps {
  username: string;
}

const FollowCount: React.FC<followCountProps> = ({ username }) => {
  const { data, isLoading } = useFollowCountQuery(username);

  return <p className="">{data || 0}</p>;
};

export default FollowCount;
