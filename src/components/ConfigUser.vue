<template>
  <div v-show="configUser" @click.self="hideEditModal" class="config-user-bg">
      <div class="config-user-container">
          <loader-small v-if="editLoading" />

          <div @click="hideEditModal" class="close-btn">
              <i class="fas fa-times-circle"></i>
          </div>
          <div class="del-user">
              <h3>Delete <span>{{data.username}}</span></h3>
              <span id="middle">>>>>>></span>
              <div @click="showDelWarning = true" class="del-btn"><i class="fas fa-trash-alt"></i></div>
          </div>
          <hr>
          <div class="upd-user">
              <form @submit.prevent="submitHandler">
                  <div class="input-box">
                      <label>Username</label>
                      <input type="text" placeholder="Update Username" v-model="username">
                  </div>
                  <div class="input-box">
                      <label>Email</label>
                      <input type="email" placeholder="Update Email" v-model="email">
                  </div>
                  <div class="input-checkbox">
                      <label>Make Admin</label>
                      <input type="checkbox" v-model="isAdmin" >
                  </div>

                  <div class="upd">
                    <button type="submit" class="btn">Update User</button>
                  </div>
              </form>
          </div>

          <div v-show="showDelWarning" @click.self="showDelWarning = false" class="del-warning-bg">
              <div class="del-warning-container">
                  <loader-small v-if="delLoading" />

                  <p>You're about to delete <span>{{data.username}}'s Account.</span> Are you sure?</p>
                  <div class="btns">
                      <div @click="deleteUserHandler" class="yes"><strong>Yes</strong></div>
                      <div @click="showDelWarning = false" class="no"><strong>No</strong></div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from "vue"; 
import useStates from '../composables/states'  
import {useEditAccountByAdmin} from '../composables/auth/update'
import {useDeleteAccountByAdmin} from '../composables/auth/delete'
import {useFetchUsers} from '../composables/auth/user'
import LoaderSmall from '../components/LoaderSmall.vue'

export default defineComponent({
    name: 'ConfigUser',
    props: ['data'],
    components: {LoaderSmall},
    setup(props) {

        const username = ref('')
        const email = ref('')
        const isAdmin = ref(null)
        const showDelWarning = ref(false)

        const {configUser, toggleConfigUser} = useStates()

        const {
            loading: editLoading,
            success: editSuccess,
            editAccount
        } = useEditAccountByAdmin()

        const {
            loading: delLoading,
            success: delSuccess,
            adminDeleteAccount
        } = useDeleteAccountByAdmin()

        const {fetchUsers} = useFetchUsers()

        watchEffect(() => {
            if (props.data) {
                username.value = props.data.username,
                email.value = props.data.email,
                isAdmin.value = props.data.isAdmin
            }
        })

        const hideEditModal = () => toggleConfigUser(false)

        const submitHandler = async () => {
            await editAccount({
                id: props.data.id,
                username: username.value,
                email: email.value,
                isAdmin: isAdmin.value
            })

            if (editSuccess.value) {
                hideEditModal()
                fetchUsers({
                    searchQ: props.data.searchQ,
                    sort: props.data.sort,
                    page: props.data.page
                })
            }
        }

        const deleteUserHandler = async () => {
            await adminDeleteAccount(props.data.id)

            if (delSuccess.value) {
                showDelWarning.value = false
                hideEditModal()
                fetchUsers({
                    searchQ: props.data.searchQ,
                    sort: props.data.sort,
                    page: props.data.page
                })
            }
        }

        return {
            configUser,
            username,
            email,
            isAdmin,
            hideEditModal,
            showDelWarning,
            submitHandler,
            editLoading,
            deleteUserHandler,
            delLoading
        }
    }
})
</script>