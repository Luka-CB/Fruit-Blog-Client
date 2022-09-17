import { ref } from "vue";
import axios, { AxiosError } from "axios";

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

export const useUpdateComment = () => {
  const loading = ref(false);
  const success = ref(false);
  const error = ref(null);

  const updateComment = async (id: string | "", body: string | "") => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.put(
        `${process.env.VUE_APP_BASE_URL}/api/comments/update/${id}`,
        { body },
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

  return { loading, success, error, updateComment };
};

export const useUpdateReply = () => {
  const loading = ref(false);
  const success = ref(false);
  const error = ref(null);

  const updateReply = async (id: string | "", reply: string | "") => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.put(
        `${process.env.VUE_APP_BASE_URL}/api/comments/replies/update/${id}`,
        { reply },
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

  return { loading, success, error, updateReply };
};
