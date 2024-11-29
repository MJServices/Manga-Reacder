import { connect } from './DBConfig';
import User from '../models/user.model';

// Define the UserType interface
interface UserType {
  _id: string;
  username: string;
  email: string;
  firstName?: string; // Optional field for user's first name
  lastName?: string;  // Optional field for user's last name
  role: string;       // User's role (e.g., "admin", "user")
  createdAt: Date;    // Creation timestamp
  updatedAt: Date;    // Last update timestamp
  isActive: boolean;   // Indicates if the user is active
  profilePictureUrl?: string; // Optional field for profile picture URL
}

// Define the UpdateUser Params interface
interface UpdateUserParams {
  id: string;
  username?: string; // Optional username
  email?: string;    // Optional email
}

export async function updateUser (params: UpdateUserParams): Promise<UserType> {
  await connect(); // Ensure the database is connected

  const { id, username, email } = params;

  if (!id) {
    throw new Error('User  ID is required');
  }

  // Validate the ID format
  if (!isValidObjectId(id)) {
    throw new Error('Invalid User ID format');
  }

  // Construct the update object
  const updateFields: Partial<UserType> = {};

  if (username) {
    updateFields.username = username;
  }

  if (email) {
    updateFields.email = email;
  }

  // If neither username nor email is provided, throw an error
  if (Object.keys(updateFields).length === 0) {
    throw new Error('At least one of username or email must be provided for update');
  }

  const updatedUser: any  = await User.findByIdAndUpdate(id, { $set: updateFields }, { new: true, lean: true });

  if (!updatedUser ) {
    throw new Error(`User  with ID: ${id} not found`);
  }

  // Ensure the returned object matches UserType
  return {
    _id: updatedUser._id.toString(),
    username: updatedUser.username,
    email: updatedUser.email,
    firstName: updatedUser.firstName || "", // Default to empty string if undefined
    lastName: updatedUser.lastName || "",     // Default to empty string if undefined
    role: updatedUser.role || "user",          // Default to "user" if undefined
    createdAt: updatedUser.createdAt,
    updatedAt: updatedUser.updatedAt,
    isActive: updatedUser.isActive !== undefined ? updatedUser .isActive : true,
    profilePictureUrl: updatedUser.profilePictureUrl || null, // Default to null if undefined
  } as UserType;
}

// Example validation function
function isValidObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id); // Basic check for MongoDB ObjectId format
}