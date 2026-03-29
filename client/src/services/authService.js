import API from "../utils/api";

export const registerUser = async (data) => {
  try {
    const res = await API.post("/auth/register", data);
    return res.data;
  } catch (err) {
    console.log(err.response?.data); // 👈 shows backend error
    throw err;
  }
};

export const loginUser = async (data) => {
  try {
    const res = await API.post("/auth/login", data);
    return res.data;
  } catch (err) {
    console.log(err.response?.data);
    throw err;
  }
};