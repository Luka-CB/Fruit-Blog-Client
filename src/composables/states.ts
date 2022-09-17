import { ref } from "vue";

const commentModal = ref(false);
const replyModal = ref(false);
const configCommentModal = ref(false);
const configReplyModal = ref(false);
const successMsg = ref(false);
const configUser = ref(false);
const mobileNavigation = ref(false);

export default () => {
  const toggleCommentModal = (value: boolean) => (commentModal.value = value);

  const toggleReplyModal = (value: boolean) => (replyModal.value = value);

  const toggleConfigCommnetModal = (value: boolean) =>
    (configCommentModal.value = value);

  const toggleConfigReplyModal = (value: boolean) =>
    (configReplyModal.value = value);

  const toggleSuccessMsg = (value: boolean) => (successMsg.value = value);

  const toggleConfigUser = (value: boolean) => (configUser.value = value);

  const toggleMobileNavigation = (value: boolean) =>
    (mobileNavigation.value = value);

  return {
    commentModal,
    toggleCommentModal,
    replyModal,
    toggleReplyModal,
    configCommentModal,
    toggleConfigCommnetModal,
    configReplyModal,
    toggleConfigReplyModal,
    successMsg,
    toggleSuccessMsg,
    configUser,
    toggleConfigUser,
    mobileNavigation,
    toggleMobileNavigation,
  };
};
