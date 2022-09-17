import { ref } from "vue";
import axios, { AxiosError } from "axios";

interface likeIFace {
  id: string;
}
const like = ref({} as likeIFace);
export const useFetchUserLike = () => {
  const loading = ref(false);
  const isLiked = ref(false);

  const fetchUserLike = async (postId: string | "") => {
    loading.value = true;
    isLiked.value = false;

    try {
      const { data } = await axios.get(`/api/likes/fetchuserlike/${postId}`);

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
