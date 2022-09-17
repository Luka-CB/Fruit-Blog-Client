import { ref } from "vue";
import axios, { AxiosError } from "axios";

export const useDeleteComment = () => {
  const loading = ref(false);
  const success = ref(false);
  const error = ref(null);

  const deleteComment = async (id: string | "") => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.delete(
        `${process.env.VUE_APP_BASE_URL}/api/comments/delete/${id}`
      );

      if (data) {
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

  return { loading, success, error, deleteComment };
};

export const useDeleteReply = () => {
  const loading = ref(false);
  const success = ref(false);
  const error = ref(null);

  const deleteReply = async (id: string | "") => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.delete(
        `${process.env.VUE_APP_BASE_URL}/api/comments/replies/delete/${id}`
      );

      if (data) {
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

  return { loading, success, error, deleteReply };
};
