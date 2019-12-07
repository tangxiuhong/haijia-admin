<template>
    <div>
        <div>即将返回首页</div>
        <div @click="onRouterBack">确定</div>
    </div>
</template>

<script>
    export default {
        name: "errorStatus",
        methods(){
            onRouterBack(){
                this.$router.push(`/login?redirect=${this.$route.fullPath}`);
            }
        }
    }
</script>

<style scoped>

</style>
