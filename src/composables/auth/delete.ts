import { ref } from "vue";
import axios, { AxiosError } from "axios";

export const useDeleteAccount = () => {
  const success = ref(false);
  const error = ref(null);
  const loading = ref(false);

  const deleteAccount = async () => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.delete(
        `${process.env.VUE_APP_BASE_URL}/api/users/delete`
      );

      if (data) {
        loading.value = false;
        localStorage.removeItem("userInfo");
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

  return { success, error, loading, deleteAccount };
};

export const useDeleteAccountByAdmin = () => {
  const success = ref(false);
  const error = ref(null);
  const loading = ref(false);

  const adminDeleteAccount = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await axios.delete(
        `${process.env.VUE_APP_BASE_URL}/api/users/admin/delete/${id}`
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

  return { success, error, loading, adminDeleteAccount };
};
