import { ref } from "vue";
import axios, { AxiosError } from "axios";
import { format } from "date-fns";

interface userIFace {
  _id: string;
  isAdmin: boolean;
  comments: string[];
  likes: string[];
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface lsUserIFace {
  id: string;
  username: string;
  isAdmin: boolean;
}

const user = ref({} as userIFace);
const userInfo = ref({} as lsUserIFace);

export const useFetchUser = () => {
  const loading = ref(false);
  const error = ref(null);

  const fetchUser = async () => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/users/current`
      );

      if (data) {
        const newData = {
          ...data,
          createdAt: format(new Date(data.createdAt), "dd/MM/yyyy"),
        };
        loading.value = false;
        user.value = newData;
      }
    } catch (er) {
      const err = er as AxiosError;
      error.value =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
    }
  };

  return { loading, error, user, fetchUser };
};

const users = ref<userIFace[]>([]);
const count = ref(0);
export const useFetchUsers = () => {
  const loading = ref(false);
  const error = ref(null);
  const paginationData = ref({});

  interface queryIFace {
    searchQ: string | "";
    sort: string | "";
    page: number;
  }

  const fetchUsers = async (queries: queryIFace) => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/users/fetchall?searchQ=${queries.searchQ}&sort=${queries.sort}&page=${queries.page}`
      );

      if (data) {
        const newUsers = data.users.docs.map((user: userIFace) => {
          const time = format(new Date(user.createdAt), "dd/MM/yyyy");
          return { ...user, createdAt: time };
        });
        loading.value = false;
        users.value = newUsers;
        count.value = data.count;
        paginationData.value = {
          totalDocs: data.users.totalDocs,
          totalPages: data.users.totalPages,
          page: data.users.page,
          prevPage: data.users.prevPage,
          nextPage: data.users.nextPage,
        };
      }
    } catch (er) {
      const err = er as AxiosError;
      error.value =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
    }
  };

  return { loading, error, users, count, paginationData, fetchUsers };
};

export const userFromLocalStorage = () => {
  userInfo.value = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") || "")
    : {};

  return { userInfo };
};
