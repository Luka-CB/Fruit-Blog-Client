import { ref } from "vue";
import axios from "axios";

export const useDeleteLike = () => {
  const loading = ref(false);
  const success = ref(false);

  const deleteLike = async (id: string | "") => {
    loading.value = true;

    try {
      const { data } = await axios.delete(`/api/likes/delete/${id}`);

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
      const { data } = await axios.delete(`/api/likes/unlike/${id}`);

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
