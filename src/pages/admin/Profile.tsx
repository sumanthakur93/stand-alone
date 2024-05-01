import { FC, useState } from "react";
import useMe from "../../hooks/useMe";
import Navbar from "../../components/Navbar";
import { getImageUrl } from "../../utils/getImageUrl";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import axios from "axios";
import { updateProfilePhotoIdApi } from "../../api";
import handleError from "../../utils/handleError";

interface ProfileProps {}

const Profile: FC<ProfileProps> = ({}) => {
  const me = useMe();
  const [isLoading, setIsLoading] = useState(false);

  async function handlePicture(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) {
      alert("Please select an image");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("flag", "false");
    try {
      setIsLoading(true);
      const { data } = await axios<{ fileId: string }>({
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/api/file/upload`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await updateProfilePhotoIdApi({ profilePhotoId: data.fileId });
      window.location.reload();
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="homeBg h-screen">
      <Navbar me={me} />
      <div
        style={{
          background:
            "linear-gradient(180.03deg, rgba(217, 217, 217, 0.74) 2.4%, rgba(217, 217, 217, 0.43) 99.98%)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.7)",
          marginTop: "2rem",
        }}
        className="flex items-center space-x-3 p-3"
      >
        <img
          src={getImageUrl(
            me?.profilePhotoId
              ? `${import.meta.env.VITE_API_URL}/api/file/get/${
                  me?.profilePhotoId
                }`
              : null,
            me?.name
          )}
          alt="user_avatar"
          className="w-14 h-14 rounded-full"
        />
        <div>
          <p className="capitalize font-bold text-xl">Name: {me?.name}</p>
          <p className="font-medium text-sm">Email: {me?.email}</p>
        </div>
      </div>
      <div
        style={{
          background:
            "linear-gradient(180.03deg, rgba(217, 217, 217, 0.74) 2.4%, rgba(217, 217, 217, 0.43) 99.98%)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.7)",
          marginTop: "2rem",
        }}
        className="flex items-center space-x-3 p-3"
      >
        <Label htmlFor="picture">Change Profile Picture</Label>
        <Input
          id="picture"
          type="file"
          accept="image/*"
          onChange={handlePicture}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default Profile;
