export interface IUpdateUserInput {
  name: string;
  email: string;
  phone: string;
}

export interface IChangePasswordInput {
  currentPassword: string;
  password: string;
  rePassword: string;
}

// PUT /users/updateMe returns the updated user
export interface IUpdateUserResponse {
  message: string;
  user?: { name: string; email: string; role?: string };
}

// PUT /users/changeMyPassword returns a new token
export interface IChangePasswordResponse {
  message: string;
  token?: string;
}
