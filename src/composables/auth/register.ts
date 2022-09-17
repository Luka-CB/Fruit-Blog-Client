import { ref } from "vue";
import axios, { AxiosError } from "axios";

interface userData {
  username: string | "";
  email: string | "";
  password: string | "";
}

export default () => {
  const success = ref(false);
  const error = ref(null);
  const loading = ref(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const register = async (userData: userData) => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.post(
        `${process.env.VUE_APP_BASE_URL}/api/users/register`,
        userData,
        config
      );

      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        loading.value = false;
        success.value = true;
      }
    } catch (er) {
      const err = er as AxiosError;
      loading.value = false;
      error.value =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
    }
  };

  return { success, error, loading, register };
};
