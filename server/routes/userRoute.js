import express from "express";
import { create, deleteAllUsers, deleteUser, getAll, getOne, update } from "../controller/userController.js";

const router = express.Router();

// Define routes using appropriate HTTP methods and paths
router.post("/create", create); // POST request to create a new user
router.get("/getall", getAll); // GET request to fetch all users
router.get("/getone/:id", getOne); // GET request to fetch a single user by ID
router.put("/update/:id", update); // PUT request to update a user by ID
router.delete("/delete/:id", deleteUser); // DELETE request to delete a user by ID
router.delete("/deleteall", deleteAllUsers); // DELETE request to delete all users

export default router;
