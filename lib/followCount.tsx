"use clint";

import { useFollowCountQuery } from "@/redux/api/authApi";

interface followCountProps {
  username: string;
}

const FollowCount: React.FC<followCountProps> = ({ username }) => {
  const { data, isLoading } = useFollowCountQuery(username);

  if (isLoading) return <div>Loading...</div>;

  return <p className="">{data}</p>;
};

export default FollowCount;
