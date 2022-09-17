<template>
  <div class="loader-bg">
    <div class="loader">
        <span style="--i:1;"></span>
        <span style="--i:2;"></span>
        <span style="--i:3;"></span>
        <span style="--i:4;"></span>
        <span style="--i:5;"></span>
        <span style="--i:6;"></span>
        <span style="--i:7;"></span>
        <span style="--i:8;"></span>
        <span style="--i:9;"></span>
        <span style="--i:10;"></span>
        <span style="--i:11;"></span>
        <span style="--i:12;"></span>
        <span style="--i:13;"></span>
        <span style="--i:14;"></span>
        <span style="--i:15;"></span>
        <span style="--i:16;"></span>
        <span style="--i:17;"></span>
        <span style="--i:18;"></span>
        <span style="--i:19;"></span>
        <span style="--i:20;"></span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'LoaderSmall'
}
</script>

<style lang="scss" scoped>

    .loader-bg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        width: 80px;
        background-color: #042104;
        border-radius: 50%;
        box-shadow: 5px 8px 15px black;
        border: 2px solid rgb(172, 169, 169);
        animation: animateDotBg 5s linear infinite;

        .loader {
            position: relative;
            width: 40px;
            height: 40px;

            span {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                transform: rotate(calc(18deg * var(--i)));

                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background-color: #00ff0a;
                    box-shadow: 0 0 10px #00ff0a, 0 0 20px #00ff0a, 0 0 40px #00ff0a,
                        0 0 60px #00ff0a, 0 0 80px #00ff0a, 0 0 100px #00ff0a;
                    animation: animateDot 0.5s linear infinite;
                }
            }
        }
    }

    @keyframes animateDotBg {
        0% {
            filter: hue-rotate(0deg);
        }
        100% {
            filter: hue-rotate(360deg);
        }
    }




    @keyframes animateDot {
        0% {
            transform: scale(1);
        }
        80%,
        100% {
            transform: scale(0);
        }
    }
</style>