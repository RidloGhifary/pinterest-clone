import clientPromise from "../mongodb/connect";

export async function UpdateProfile(data: any) {
  const client = clientPromise;
  const db = client.db("web");
  const { username, bio, profile_link, profilePictureUrl, email } = data;

  const user = await db.collection("users").findOne({ email: email });

  if (!user) {
    return {
      status: 400,
      error: true,
      message: "User not found",
    };
  }

  await db.collection("users").updateOne(
    { _id: user._id },
    {
      $set: {
        username: username || user.username,
        bio: bio || "",
        profile_picture: profilePictureUrl,
        profile_link: profile_link || "",
        updatedAt: new Date(),
      },
    },
  );

  return {
    status: 200,
    error: false,
    message: "Profile updated successfully",
  };
}
