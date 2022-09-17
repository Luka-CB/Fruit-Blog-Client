import { ref } from "vue";
import axios, { AxiosError } from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const useCreateComment = () => {
  const loading = ref(false);
  const error = ref(null);
  const success = ref(false);

  const createComment = async (id: string | "", comment: string | "") => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.post(
        `/api/comments/create?postId=${id}`,
        { comment },
        config
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

  return { loading, error, success, createComment };
};

export const useCreateReply = () => {
  const loading = ref(false);
  const success = ref(false);
  const error = ref(null);

  const createReply = async (reply: string | "", id: string | "") => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.post(
        `/api/comments/replies/create?commentId=${id}`,
        { reply },
        config
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
          : err.response;
    }
  };

  return { loading, success, error, createReply };
};
