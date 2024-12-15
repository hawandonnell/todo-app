<script setup>
const emit = defineEmits(['delete'])
</script>

<template>
    <div class="trash-icon" @click="emit('delete')">
        <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="tasks__item_svg"
        >
            <path
                d="M3 5H19L17.42 19.22C17.3658 19.7094 17.1331 20.1616 16.7663 20.49C16.3994 20.8184 15.9244 21 15.432 21H6.568C6.07564 21 5.60056 20.8184 5.23375 20.49C4.86693 20.1616 4.63416 19.7094 4.58 19.22L3 5Z"
                stroke="#FF6464"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M6.345 2.147C6.50675 1.80397 6.76271 1.514 7.083 1.31091C7.4033 1.10782 7.77474 0.999996 8.154 1H13.846C14.2254 0.999806 14.5971 1.10755 14.9176 1.31064C15.2381 1.51374 15.4942 1.80381 15.656 2.147L17 5H5L6.345 2.147Z"
                stroke="#FF6464"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M1 5H21"
                stroke="#FF6464"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M9 10V15"
                stroke="#FF6464"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M13 10V15"
                stroke="#FF6464"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    </div>
</template>

<style lang="scss" scoped>
.trash-icon {
    margin-left: 40px;
    height: 24px;
    &:hover {
        cursor: pointer;
    }
}
@media screen and (max-width: 735px) {
    .trash-icon {
        margin-left: 30px;
    }
}
</style>
