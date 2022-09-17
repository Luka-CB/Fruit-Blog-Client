<template>
  <div class="loader-tiny">
      <div class="dot1"></div>
      <div class="dot2"></div>
  </div>
</template>

<script>
export default {
    name: 'LoaderTiny'
}
</script>

<style lang="scss" scoped>
    .loader-tiny {
        width: 30px;
        height: 30px;
        border: 6px solid white;
        border-radius: 50%;
        position: relative;
        animation: spin 1s linear infinite;

        .dot1 {
            width: 26px;
            height: 26px;
            border-top: 2px solid red;
            border-right: 2px solid red;
            box-shadow: 0 0 6px red;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .dot2 {
            width: 26px;
            height: 26px;
            border-bottom: 2px solid green;
            border-left: 2px solid green;
            box-shadow: 0 0 6px green;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        @keyframes spin {
            0% {
                transform: rotate(0);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }
</style>
