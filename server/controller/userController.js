import userModel from "../model/userModel.js";
import User from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    const userData = new User(req.body);

    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }

    const savedData = await userData.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAll = async (req, res) => {
  try {
    const userData = await userModel.find();
    if (!userData) {
      return res.status(404).json({ msg: "users data not found!" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status((404).json({ msg: "User Not found" }));
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status((401).json({ msg: "User Not found" }));
    }

    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({msg: "User Updated Successfully"});
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status((404).json({ msg: "User Not found" }));
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "User Successfully Deleted!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


export const deleteAllUsers = async (req, res) => {
  try {
    // Note: This is a hypothetical implementation to delete all users
    await User.deleteMany({});
    res.status(200).json({ msg: "All users successfully deleted" });
  } catch (error) {
    console.error("Error deleting all users:", error);
    res.status(500).json({ error: "Server error" });
  }
};

