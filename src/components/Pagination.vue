<template>
  <div class="pagination">
      <div @click="firstPageHandler" :class="data.prevPage ? 'first' : 'first-disabled'">
        <span>First</span>
      </div>
      <div @click="prevPageHandler" :class="data.prevPage ? 'prev' : 'prev-disabled'">
        <span>{{!data.prevPage ? 1 : data.prevPage}}</span>
      </div>
      <div class="page">
        <span>{{data.page}}</span>
      </div>
      <div @click="nextPageHandler" :class="data.nextPage ? 'next' : 'next-disabled'">
        <span>{{!data.nextPage ? data.totalPages : data.nextPage}}</span>
      </div>
      <div @click="lastPageHandler" :class="data.nextPage ? 'last' : 'last-disabled'">
        <span>Last</span>
      </div>
      <div class="total">
          <span>Total: {{data.totalPages}}</span>
      </div>
  </div>
</template>

<script lang='ts'>
import {defineComponent} from 'vue'

export default defineComponent({
    name: 'Pagination',
    props: ['data'],
    setup(props) {
        const nextPageHandler = () => {
            if (props.data.nextPage) {
                window.history.pushState('', '', `?page=${props.data.nextPage}`)
                window.location.reload()
            }
        }

        const prevPageHandler = () => {
            if (props.data.prevPage) {
                window.history.pushState('', '', `?page=${props.data.prevPage}`)
                window.location.reload()
            }
        }

        const firstPageHandler = () => {
            if (props.data.prevPage) {
                window.history.pushState('', '', `?page=1`)
                window.location.reload()
            }
        }
        
        const lastPageHandler = () => {
            if (props.data.nextPage) {
                window.history.pushState('', '', `?page=${props.data.totalPages}`)
                window.location.reload()
            }
        }

        return {
            nextPageHandler,
            prevPageHandler,
            firstPageHandler,
            lastPageHandler
        }
    }
})
</script>

<style lang="scss" scoped>
    .pagination {
        display: flex;
        width: 450px;
        min-width: 250px;
        justify-content: space-around;

        .first,
        .last {
            background-color: bisque;
            padding: 5px;
            width: 50px;
            height: 40px;
            border-radius: 5px;
            border-top: 3px solid black;
            border-bottom: 3px solid black;
            text-align: center;
            font-weight: bold;
            box-shadow: 2px 2px 3px black;
            cursor: pointer;
            transition: 0.2s ease-in-out;
            display: flex;
            justify-content: center;
            align-items: center;

            &:hover {
                background-color: white;
            }
        }

        .first-disabled,
        .last-disabled {
            background-color: rgb(102, 102, 102);
            padding: 5px;
            width: 40px;
            height: 40px;
            border-radius: 5px;
            border-top: 3px solid rgb(70, 70, 70);
            border-bottom: 3px solid rgb(70, 70, 70);
            text-align: center;
            font-weight: bold;
            box-shadow: 2px 2px 3px black;
            color: rgb(46, 46, 46);
            cursor: default;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .prev,
        .next {
            background-color: bisque;
            padding: 5px;
            width: 40px;
            height: 40px;
            border-radius: 5px;
            border-top: 3px solid black;
            border-bottom: 3px solid black;
            text-align: center;
            font-weight: bold;
            box-shadow: 2px 2px 3px black;
            cursor: pointer;
            transition: 0.2s ease-in-out;
            display: flex;
            justify-content: center;
            align-items: center;

            &:hover {
                background-color: white;
            }
        }

        .prev-disabled,
        .next-disabled {
            background-color: rgb(102, 102, 102);
            padding: 5px;
            width: 40px;
            height: 40px;
            border-radius: 5px;
            border-top: 3px solid rgb(70, 70, 70);
            border-bottom: 3px solid rgb(70, 70, 70);
            text-align: center;
            font-weight: bold;
            box-shadow: 2px 2px 3px black;
            color: rgb(46, 46, 46);
            cursor: default;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .page {
            background-color: bisque;
            padding: 5px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border-top: 3px solid black;
            border-bottom: 3px solid black;
            text-align: center;
            font-weight: bold;
            box-shadow: 2px 2px 3px black;
            cursor: default;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .total {
            background-color: rgb(194, 194, 194);
            padding: 5px;
            width: 80px;
            height: 40px;
            border-radius: 5px;
            border-top: 3px solid rgb(124, 124, 124);
            border-bottom: 3px solid rgb(124, 124, 124);
            text-align: center;
            font-weight: bold;
            box-shadow: 2px 2px 3px black;
            color: rgb(70, 66, 66);
            cursor: default;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        @media (min-width: 1700px) {
            width: 850px;

            .first,
            .last {
                padding: 10px;
                width: 80px;
                height: 60px;
                border-radius: 10px;
                box-shadow: 4px 4px 5px black;
                font-size: 1.7rem;
            }

            .first-disabled,
            .last-disabled {
                padding: 10px;
                width: 80px;
                height: 60px;
                border-radius: 10px;
                box-shadow: 4px 4px 5px black;
                font-size: 1.7rem;
            }

            .prev,
            .next {
                padding: 10px;
                width: 80px;
                height: 60px;
                border-radius: 10px;
                box-shadow: 4px 4px 5px black;
                font-size: 1.7rem;
            }

            .prev-disabled,
            .next-disabled {
                padding: 10px;
                width: 60px;
                height: 60px;
                border-radius: 10px;
                box-shadow: 4px 4px 5px black;
                font-size: 1.7rem;
            }

            .page {
                padding: 10px;
                width: 60px;
                height: 60px;
                box-shadow: 4px 4px 5px black;
                font-size: 1.7rem;
                border-radius: 50%;
            }

            .total {
                padding: 10px;
                width: 120px;
                height: 60px;
                border-radius: 10px;
                box-shadow: 4px 4px 5px black;
                font-size: 1.7rem;
            }
        }

        @media (max-width: 400px) {
            width: 100%;

            .first,
            .last {
                width: 25px;
                height: 25px;
                font-size: 0.7rem;
            }

            .first-disabled,
            .last-disabled {
                width: 25px;
                height: 25px;
                font-size: 0.7rem;
            }

            .prev,
            .next {
                width: 25px;
                height: 25px;
                font-size: 0.7rem;
            }

            .prev-disabled,
            .next-disabled {
                width: 25px;
                height: 25px;
                font-size: 0.7rem;
            }

            .page {
                width: 25px;
                height: 25px;
                font-size: 0.7rem;
                border-radius: 50%;
            }

            .total {
                width: 50px;
                height: 25px;
                font-size: 0.7rem;
            }
        }
    }
</style>
