import { ref } from "vue";
import axios, { AxiosError } from "axios";

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

export const useUpdatePost = () => {
  const loading = ref(false);
  const success = ref(false);
  const error = ref(null);

  const updatePost = async (id: string | "", body: any, title: string | "") => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.put(
        `${process.env.VUE_APP_BASE_URL}/api/posts/update/${id}`,
        { body, title },
        config
      );

      if (data) {
        (loading.value = false), (success.value = true);
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

  return { loading, success, error, updatePost };
};

export const useUpdatePostStatus = () => {
  const loading = ref(false);
  const success = ref(false);
  const error = ref(null);

  const updateStatus = async (id: string | "") => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.put(
        `${process.env.VUE_APP_BASE_URL}/api/posts/update/status/${id}`,
        config
      );

      if (data) {
        (loading.value = false), (success.value = true);
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

  return { loading, success, error, updateStatus };
};
