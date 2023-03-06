import mongoose from "mongoose";
import User from "../models/auth.js";

export const getAllUsers = async(req, res) => {
    try {
        const allUsers = await User.find();
        const allUsersDetails = [];
        allUsers.forEach((users) => {
           allUsersDetails.push({_id: users._id, name: users.name, about: users.about, tags: users.tags, joinedOn: users.joinedOn}) 
        });
        res.status(200).json(allUsersDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { name, about, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: "Profile unavialable!!" });
    }

    try {
        const updatedProfile = await User.findByIdAndUpdate(id, { $set: { name: name, about: about, tags: tags } }, { new: true });
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(405).json({ message: error.message });
    }
}

export const follow = async (req, res) => {
    const currentUserId = req.userId;
    const friendId = req.params.id;
    try {
      const updatedUser = await users.findByIdAndUpdate(
        currentUserId,
        {
          $addToSet: { followings: friendId },
        },
        { new: true }
      );
      await users.findByIdAndUpdate(
        friendId,
        {
          $addToSet: { followers: currentUserId },
        },
        { new: true }
      );
      const { password, ...user_data } = updatedUser._doc;
      res.status(200).json(user_data);
    } catch (error) {
      res.status(500).json(error);
    }
};
  
export const unfollow = async (req, res) => {
    const currentUserId = req.userId;
    const friendId = req.params.id;
    try {
      const updatedUser = await users.findByIdAndUpdate(
        currentUserId,
        {
          $pull: { followings: friendId },
        },
        { new: true }
      );
      await users.findByIdAndUpdate(
        friendId,
        {
          $pull: { followers: currentUserId },
        },
        { new: true }
      );
      const { password, ...user_data } = updatedUser._doc;
      res.status(200).json(user_data);
    } catch (error) {
      res.status(500).json(error);
    }
};