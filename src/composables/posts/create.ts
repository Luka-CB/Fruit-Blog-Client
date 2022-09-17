import { ref } from "vue";
import axios, { AxiosError } from "axios";

interface postData {
  title: string | "";
  body: string | "";
}

export default () => {
  const loading = ref(false);
  const success = ref(false);
  const error = ref(null);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const createPost = async (postData: postData) => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.post(
        `${process.env.VUE_APP_BASE_URL}/api/posts/create`,
        postData,
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

  return { loading, success, error, createPost };
};
