import { ref } from "vue";
import axios, { AxiosError } from "axios";

interface likeIFace {
  id: string;
}

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

const like = ref({} as likeIFace);
export const useFetchUserLike = () => {
  const loading = ref(false);
  const isLiked = ref(false);

  const fetchUserLike = async (postId: string | "") => {
    loading.value = true;
    isLiked.value = false;

    try {
      const { data } = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/likes/fetchuserlike/${postId}`,
        config
      );

      if (data) {
        loading.value = false;
        isLiked.value = true;
        like.value = data;
      }
    } catch (er) {
      const err = er as AxiosError;
      loading.value = false;
      isLiked.value = false;
      console.log(err.response && err.message);
    }
  };

  return { loading, isLiked, like, fetchUserLike };
};
