import { ref } from "vue";
import axios from "axios";

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

export const useDeleteLike = () => {
  const loading = ref(false);
  const success = ref(false);

  const deleteLike = async (id: string | "") => {
    loading.value = true;

    try {
      const { data } = await axios.delete(
        `${process.env.VUE_APP_BASE_URL}/api/likes/delete/${id}`,
        config
      );

      if (data) {
        loading.value = false;
        success.value = true;
      }
    } catch (error) {
      loading.value = false;
      console.log(error);
    }
  };

  return { loading, success, deleteLike };
};

export const useUnlikePost = () => {
  const loading = ref(false);
  const success = ref(false);

  const unlikePost = async (id: string | "") => {
    loading.value = true;

    try {
      const { data } = await axios.delete(
        `${process.env.VUE_APP_BASE_URL}/api/likes/unlike/${id}`,
        config
      );

      if (data) {
        loading.value = false;
        success.value = true;
      }
    } catch (error) {
      loading.value = false;
      console.log(error);
    }
  };

  return { loading, success, unlikePost };
};
