"use server";

import { connect } from './DBConfig';
import User from '../models/user.model';

// Define a type for the user object with additional fields
interface UserType {
  _id: string;
  username: string;
  email: string;
  role: string; 
}

export async function getUser (id: string): Promise<UserType> {
  await connect(); // Ensure the database is connected

  if (!id) {
    throw new Error('User  ID is required');
  }

  // Validate the ID format
  if (!isValidObjectId(id)) {
    throw new Error('Invalid User ID format');
  }

  const user: any = await User.findById(id).lean();

  // Check if user exists and has all required fields
  if (!user || !user._id || !user.username || !user.email) {
    throw new Error(`User  with ID: ${id} not found or missing required fields`);
  }

  // Since we know the user has the required fields, we can return it as UserType
  return {
    _id: user._id.toString(),
    username: user.username,
    email: user.email,
    role: user.role || "user",      
  } as UserType;
}

// Example validation function
function isValidObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id); // Basic check for MongoDB ObjectId format
}