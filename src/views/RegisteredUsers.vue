<template>
  <div class="registered-users">
    <header class="registered-users__header">
      <div class="text">
        <h1>Registered Users <small>( {{users.length}} of {{count}} )</small></h1>
      </div>
      <div class="search-sort">
        <div class="search">
          <input type="text" placeholder="Search by Username or Email" @keyup="searchHandler" />
          <div class="search-icon"><i class="fas fa-search"></i></div>
        </div>
        <div title="Sort by Date" class="sort">
          <div v-if="sort === 'asc'" @click="sort = 'desc'" class="asc">
            <i class="fas fa-long-arrow-alt-up"></i>
            <i class="fas fa-long-arrow-alt-down"></i>
          </div>
          <div v-else @click="sort = 'asc'" class="desc">
            <i class="fas fa-long-arrow-alt-up"></i>
            <i class="fas fa-long-arrow-alt-down"></i>
          </div>
        </div>
      </div>
    </header>
    <section class="registered-users__body">
      <loader-big v-if="fetchUsersLoading" />
      <error-msg v-if="fetchUsersError" :msg="fetchUsersError" />
      <p v-if="users.length === 0" class="no-users">No Registered Users!</p>

      <div v-for="user in users" :key="user._id" class="user-card">
        <div class="col-1">
          <img class="user-dummy" src="@/assets/images/dummy-account-img.png" alt="Dummy Account">
          <div class="col-1__user-info">
            <h3>{{user.username}}</h3>
            <address>{{user.email}}</address>
          </div>
        </div>
        <div class="col-2">
          <div class="info">
            <h5>ID: <span>{{user._id}}</span></h5>
            <h5>LIKES: <span>{{user.likes && user.likes.length}}</span></h5>
            <h5>COMMENTS: <span>{{user.comments && user.comments.length}}</span></h5>
            <h5>REGISTERED AT: <span>{{user.createdAt}}</span></h5>
            <h5>
              IS ADMIN: 
              <i v-if="user.isAdmin" class="fas fa-check"></i>
              <i v-else class="fas fa-times"></i>
            </h5>
          </div>
          <div 
            @click="showEditModal({
              id: user._id,
              username: user.username,
              email: user.email,
              isAdmin: user.isAdmin
            })" 
            class="edit" 
            title="Edit User"
          >
            <i class="far fa-edit"></i>
          </div>
        </div>
      </div>
    </section>

    <section v-if="paginationData.totalDocs > 12" class="pagination-wrapper">
      <pagination :data="paginationData" />
    </section>

    <config-user :data="updUserData" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import {useFetchUsers} from '../composables/auth/user'
import LoaderBig from '../components/LoaderBig.vue'
import ErrorMsg from '../components/ErrorMsg.vue' 
import Pagination from '../components/Pagination.vue'
import { useRoute } from "vue-router";
import ConfigUser from '../components/ConfigUser.vue'
import useStates from '../composables/states'
import {useHead} from '@vueuse/head'

interface userDataIFace {
  id: string,
  username: string,
  email: string,
  isAdmin: boolean,
  searchQ?: string,
  sort?: string,
  page?: number
}

export default defineComponent({
  name: "RegisteredUsers",
  components: {LoaderBig, ErrorMsg, Pagination, ConfigUser},
  setup() {
    const route = useRoute()

    const timeOut = ref<any>(null)
    const sort = ref('asc')
    const searchQ = ref('')
    const updUserData = ref({} as userDataIFace)


    const page: string | any = computed(() => route.query.page)

    const {
      loading: fetchUsersLoading,
      error: fetchUsersError,
      users,
      count,
      paginationData,
      fetchUsers
    } = useFetchUsers()

    const {toggleConfigUser} = useStates()

    useHead({
      title: computed(() => `Registered Users ( ${count.value} )`)
    })

    watchEffect(() => {
        fetchUsers({
          searchQ: searchQ.value,
          sort: sort.value,
          page: page.value || 1
        })
    })

    const searchHandler = (e: any) => {
      searchQ.value = e.target.value

      clearTimeout(timeOut.value)

      timeOut.value = setTimeout(() => {
        if (e.target.value) {
          fetchUsers({
            searchQ: e.target.value,
            sort: sort.value,
            page: page.value
          })
        }
      }, 500)
    }

    const showEditModal = (userData: userDataIFace) => {
      toggleConfigUser(true)
      updUserData.value = {
        ...userData,
        searchQ: searchQ.value,
        sort: sort.value,
        page: page.value
      }
    }

    return {
      users,
      count,
      fetchUsersLoading,
      fetchUsersError,
      searchHandler,
      sort,
      paginationData,
      showEditModal,
      updUserData
    }
  }
});
</script>
