import { ref } from "vue";
import axios, { AxiosError } from "axios";

export default () => {
  const loading = ref(false);
  const success = ref(false);
  const error = ref(null);

  const deletePost = async (id: string | "") => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.delete(`/api/posts/delete/${id}`);

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

  return { loading, success, error, deletePost };
};
