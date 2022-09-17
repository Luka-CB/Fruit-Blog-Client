import { ref } from "vue";
import axios, { AxiosError } from "axios";
import { userFromLocalStorage } from "../auth/user";
import { format, formatDistanceToNow } from "date-fns";

const { userInfo } = userFromLocalStorage();

interface postIFace {
  _id: string;
  status: string;
  comments: string[];
  likes: string[];
  title: string;
  body: string;
  likedAt: string;
  createdAt: string;
  updateddAt: string;
}

export const useFetchAllPosts = () => {
  const count = ref(0);
  const loading = ref(false);
  const posts = ref([]);
  const error = ref(null);

  interface queries {
    searchQuery: string | "";
    sort: string | "";
  }

  const fetchAllPosts = async (queries: queries) => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.get(
        `/api/posts/fetchall?searchQ=${queries.searchQuery}&sort=${queries.sort}`
      );

      if (data) {
        const newData = data.posts.map((post: postIFace) => {
          const time = formatDistanceToNow(new Date(post.createdAt));
          const users = post.likes.map(
            (p: any) => p.author === userInfo.value.id
          );
          let isLiked;
          if (users.includes(true)) {
            isLiked = true;
          } else {
            isLiked = false;
          }
          return { ...post, createdAt: time, isLiked };
        });
        loading.value = false;
        posts.value = newData;
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

  return { loading, error, posts, count, fetchAllPosts };
};

const post = ref({} as postIFace);
export const useFetchOnePost = () => {
  const loading = ref(false);
  const error = ref(null);

  const fetchOnePost = async (id: string | string[]) => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.get(`/api/posts/fetchone/${id}`);

      if (data) {
        const newData = {
          ...data,
          createdAt: format(new Date(data.createdAt), "dd/MM/yyyy"),
        };
        loading.value = false;
        post.value = newData;
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

  return { loading, error, post, fetchOnePost };
};

export const useFetchSomePosts = () => {
  const loading = ref(false);
  const posts = ref([]);

  const fetchSomePosts = async (id: string | "") => {
    loading.value = true;

    try {
      const { data } = await axios.get(`/api/posts/fetchsome?postId=${id}`);

      if (data) {
        const newData = data.map((post: postIFace) => {
          const time = format(new Date(post.createdAt), "dd/MM/yyyy");
          const users = post.likes.map(
            (p: any) => p.author === userInfo.value.id
          );
          let isLiked;
          if (users.includes(true)) {
            isLiked = true;
          } else {
            isLiked = false;
          }
          return { ...post, createdAt: time, isLiked };
        });
        loading.value = false;
        posts.value = newData;
      }
    } catch (er) {
      const err = er as AxiosError;
      loading.value = false;
      console.log(err.message);
    }
  };

  return { loading, posts, fetchSomePosts };
};

const latestPost = ref({} as postIFace);
export const useFetchLatestPost = () => {
  const loading = ref(false);
  const error = ref(null);

  const fetchLatestPost = async () => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.get("/api/posts/latest");

      if (data) {
        const newData = {
          ...data,
          createdAt: format(new Date(data.createdAt), "dd/MM/yyyy"),
        };
        loading.value = false;
        latestPost.value = newData;
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

  return { loading, error, latestPost, fetchLatestPost };
};

const likedPosts = ref([{} as postIFace]);
const likedPostCount = ref(0);
export const useFetchLikedPosts = () => {
  const displayLikedPosts = ref([{} as postIFace]);
  const loading = ref(false);
  const error = ref(null);

  const fetchLikedPosts = async () => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.get("/api/posts/fetchliked");

      if (data) {
        const posts = data.posts.sort((a: postIFace, b: postIFace) => {
          const x = a.likedAt;
          const y = b.likedAt;

          if (x < y) {
            return 1;
          }
          if (x > y) {
            return -1;
          }
          return 0;
        });
        const newData = posts.map((post: postIFace) => {
          const time = format(new Date(post.createdAt), "dd/MM/yyyy");
          const likeTime = formatDistanceToNow(new Date(post.likedAt));
          const postBody = post.body.substring(0, 650);

          return {
            ...post,
            createdAt: time,
            likedAt: likeTime,
            body: postBody,
          };
        });
        loading.value = false;
        displayLikedPosts.value = newData.slice(0, 2);
        likedPosts.value = newData;
        likedPostCount.value = data.count;
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

  return {
    loading,
    error,
    displayLikedPosts,
    likedPosts,
    likedPostCount,
    fetchLikedPosts,
  };
};

export const useFetchDraftPosts = () => {
  const posts = ref([{} as postIFace]);
  const count = ref(0);
  const loading = ref(false);
  const error = ref(null);

  const fetchDraftPosts = async () => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.get("/api/posts/fetchdraft");

      if (data) {
        const newData = data.posts.map((post: postIFace) => {
          const time = format(new Date(post.createdAt), "dd/MM/yyyy");

          return { ...post, createdAt: time };
        });
        loading.value = false;
        posts.value = newData;
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

  return { loading, error, posts, count, fetchDraftPosts };
};
