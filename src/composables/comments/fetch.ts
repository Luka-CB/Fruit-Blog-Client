import { ref } from "vue";
import axios, { AxiosError } from "axios";
import { formatDistanceToNow } from "date-fns";

const comments = ref([]);

export const useFetchAllComments = () => {
  const loading = ref(false);
  const error = ref(null);
  const count = ref(0);

  const fetchAll = async (id: string | "") => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/comments/fetchall?postId=${id}`
      );

      interface commentIFace {
        body: string;
        author: string;
        post: string;
        replies: string[];
        createdAt: string;
        updatedAt: string;
      }

      if (data) {
        const commentsFormated = data.comments.map((comm: commentIFace) => {
          const time = formatDistanceToNow(new Date(comm.createdAt));
          return { ...comm, createdAt: time };
        });
        loading.value = false;
        comments.value = commentsFormated;
        count.value = data.count;
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

  return { loading, error, comments, count, fetchAll };
};

const replies = ref([]);
export const useFetchAllReplies = () => {
  const loading = ref(false);
  const error = ref(null);
  const count = ref(0);

  const fetchAllReplies = async (id: string | "") => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/comments/replies/fetchall/${id}`
      );

      interface repliesIFace {
        reply: string;
        author: string;
        comment: string;
        createdAt: string;
        updatedAt: string;
      }

      if (data) {
        const repliesFormated = data.replies.map((reply: repliesIFace) => {
          const time = formatDistanceToNow(new Date(reply.createdAt));
          return { ...reply, createdAt: time };
        });
        loading.value = false;
        replies.value = repliesFormated;
        count.value = data.count;
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

  return { loading, error, replies, count, fetchAllReplies };
};
