<template>
    <div class="my-dialog">
        <div class="my-dialog_header">
            <span class="my-dialog_header_title">标题</span>
            <span class="my-dialog_header_close">×</span>
        </div>
        <div class="logMain"></div>
        <slot name="logFooter">
            <div></div>
        </slot>
    </div>
</template>

<script>
    export default {
        name: "dialog"
    }
</script>

<style scoped>
    .dialog{

    }
    .logHeader{

    }
    .logMain{

    }
    .logFooter{

    }
</style>
