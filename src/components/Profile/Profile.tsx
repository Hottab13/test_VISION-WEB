import React from "react";
import PostInfo from "./PostInfo/PostsInfo";

type ProfilePropsDataType = {
  isOwner: boolean;
};
const Profile: React.FC<ProfilePropsDataType> = (props) => {
  return (
    <div >
      <PostInfo isOwner={props.isOwner} />
    </div>
  );
};

export default Profile;
