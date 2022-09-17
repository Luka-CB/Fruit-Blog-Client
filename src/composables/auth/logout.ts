import { ref } from "vue";
import axios from "axios";

export default () => {
  const loading = ref<boolean>(false);
  const success = ref<boolean>(false);

  const logout = async () => {
    loading.value = true;

    try {
      const { data } = await axios.get(
        `${process.env.VUE_APP_BASE_URL}/api/users/logout`
      );

      if (data) {
        localStorage.removeItem("userInfo");
        loading.value = false;
        success.value = true;
      }
    } catch (error) {
      loading.value = false;
      console.log(error);
    }
  };

  return { loading, success, logout };
};
