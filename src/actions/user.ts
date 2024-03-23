import axios from "axios";

export const getUserById = async (userId: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${userId}`
  );

  if (response.status === 404) {
    return null;
  }

  return response.data;
};

export const getUserByEmail = async (email: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/email/${email}`
  );

  if (response.status === 404) {
    return null;
  }

  return response.data;
};

export const createUser = async (data: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`,
    data
  );

  return response.data;
};
