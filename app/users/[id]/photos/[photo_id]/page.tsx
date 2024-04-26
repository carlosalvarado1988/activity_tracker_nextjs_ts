import React from "react";

interface Props {
  params: { photo_id: string };
}

const UserPhotoId = ({ params: { photo_id } }: Props) => {
  return <div>UserPhotoId: {photo_id}</div>;
};

export default UserPhotoId;
