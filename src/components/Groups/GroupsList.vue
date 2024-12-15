<script setup>
import { useGroupsStore } from '~/stores/groups'
import tabClasses from '@/css/tab.module.css'

const groupsStore = useGroupsStore()
</script>

<template>
    <div id="group-container" ref="groupViewport" v-dragscroll.x="true">
        <div ref="groupContent" class="group-list__items">
            <transition-group name="group">
                <span
                    v-for="group in groupsStore.groups"
                    :key="group.docId"
                    class="group-list__item"
                    :class="
                        groupsStore.activeGroupIndex === group.docId
                            ? tabClasses['primary-tab']
                            : tabClasses['secondary-tab']
                    "
                    @click="groupsStore.activeGroupIndex = group.docId"
                    >{{ group.name }}</span
                >
            </transition-group>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#group-container {
    position: relative;
    width: 100%;
    height: 67px;
    margin-left: 25px;
    overflow-x: hidden;
    display: flex;
    align-items: center;
}
.group-list__items {
    white-space: nowrap;
    padding: 10px 0;
}
.group-list__item {
    cursor: pointer;
    user-select: none;
    display: inline-block;
    transition: opacity 0.5s, transform 0.5s;

    & + & {
        margin-left: 25px;
    }
}
@media screen and (max-width: 735px) {
    #group-container {
        grid-row-start: 1;
        grid-column-start: 1;
        grid-column-end: 3;
        margin-left: 0;
        margin-bottom: 25px;
    }
}
</style>
