<script>
  import { Icon } from '@iconify/vue';

  export default {
    data() {
    return {
      groups: JSON.parse(localStorage.getItem('groups')) || [],
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      activeGroupIndex: 0,
      groupLastId: JSON.parse(localStorage.getItem('groupLastId')) || 0,
      taskLastId: JSON.parse(localStorage.getItem('taskLastId')) || 0,
      isActiveItemsViewing: true,
      addGroupInputValue: '',
      addTaskInputValue: '',
      addTaskInputPlaceholder: 'Add task...',
      changingTaskId: null,
      isTaskChanging: false,
      isGroupInputActive: false,
      addGroupInputPlaceholder: 'Add group...',
      isChangeGroupState: false
    }
  },
  components: {
    Icon
  },
  methods: {
    setGroupActive(id) {
      this.activeGroupIndex = id
    },
    changeTaskView(value) {
      if ( value == 'active' ) {
        this.isActiveItemsViewing = true
      } else if ( value == 'completed' ) {
        this.isActiveItemsViewing = false
      }
    },
    // This method is also method that changing name of the group
    addGroup(event) {
      event.preventDefault()
      if ( !this.isChangeGroupState ) {
        if ( this.addGroupInputValue != "" ) {
          this.groupLastId++
          this.groups.unshift({
            id: this.groupLastId,
            name: this.addGroupInputValue
          })
          this.activeGroupIndex = this.groupLastId
        }
      } else {
        var group = this.groups.find(el => el.id == this.activeGroupIndex)
        group.name = this.addGroupInputValue
      }
      this.addGroupInputValue = ''
    },
    addTask(event) {
      event.preventDefault()
      if ( this.isTaskChanging ) {
        this.changeTask()
      } else {
        if (this.addTaskInputValue != "") {
          this.taskLastId++
          this.tasks.push({
            userId: this.activeGroupIndex,
            id: this.taskLastId,
            title: this.addTaskInputValue,
            completed: false
          })
        }
        this.addTaskInputValue = ''
      }
    },
    deleteTask(task) {
      this.tasks.splice(this.tasks.indexOf(task), 1)
    },
    changeTask() {
      if ( this.addTaskInputValue != "" ) {
        var task = this.tasks.find(el => el.id == this.changingTaskId)
        this.tasks[this.tasks.indexOf(task)].title = this.addTaskInputValue
      }
      this.isTaskChanging = false
      this.changingTaskId = null
      this.addTaskInputValue = ""
    },
    setCompleted(task) {
      task.completed = true
    },
    toggleGroupInputActive() {
      if ( this.isGroupInputActive ) {
        this.isGroupInputActive = false
      } else {
        this.isGroupInputActive = true
      }
      this.addGroupInputValue = ''
    },
    deleteGroup() {
      var groupToDelete = this.groups.find(el => el.id == this.activeGroupIndex)
      this.groups.splice(this.groups.indexOf(groupToDelete), 1)
      this.tasks = this.tasks.filter(task => task.userId != this.activeGroupIndex)
      this.activeGroupIndex = this.groups[0].id
    },
    // Recursive solution to clear array from tasks which group is deleted
    // There is another solution by using internal JS filter() function
    // this.tasks = this.tasks.filter(task => task.userId != this.activeGroupIndex)
    // clearTasksFromId(id) {
    //   var cleared = true
    //   this.tasks.forEach((el) => {
    //     if ( el.userId == id ) {
    //       cleared = false
    //     }
    //   })
    //   if ( cleared ) {
    //     return
    //   } else {
    //     this.tasks.forEach((el) => {
    //       if ( el.userId == id ) {
    //         this.tasks.splice(this.tasks.indexOf(el), 1)
    //         this.clearTasksFromId(id)
    //       }
    //     })
    //   }
    // }
  },
  watch: {
    tasks: {
      handler(newTasks, oldTasks) {
        localStorage.setItem('tasks', JSON.stringify(newTasks))
      },
      deep: true
    },
    groups: {
      handler(newGroup, oldGroup) {
        localStorage.setItem('groups', JSON.stringify(newGroup))
      },
      deep: true
    },
    isChangeGroupState(newVal, oldVal) {
      if ( newVal ) {
        this.addGroupInputPlaceholder = 'Change group...'
      } else {
        this.addGroupInputPlaceholder = 'Add group...'
      }
      this.isGroupInputActive = true
    },
    isTaskChanging(newVal, oldVal) {
      if ( newVal ) {
        this.addTaskInputPlaceholder = 'Change task...'
        this.$refs.addTaskInput.focus()
      } else {
        this.addTaskInputPlaceholder = 'Add task...'
      }
    },
    groupLastId(newVal, oldVal) {
      localStorage.setItem('groupLastId', JSON.stringify(newVal))
    },
    taskLastId(newVal, oldVal) {
      localStorage.setItem('taskLastId', JSON.stringify(newVal))
    }
  },
  computed: {
    fillLevel() {
      var completedCount = 0
      this.getTasks.forEach((elem) => {
        if ( elem.completed == true ) {
          completedCount++
        }
      })
      var res = 100 / (this.getTasks.length / completedCount)
      if ( res ) {
        return res.toString() + "%" 
      } else {
        return "0"
      }
    },
    getTasks() {
      var resTasks = []
      this.tasks.forEach(el => {
        if ( el.userId == this.activeGroupIndex ) {
          resTasks.push(el)
        }
      })
      return resTasks
    },
    getViewTasks() {
      var resTasks = []
      this.tasks.forEach(el => {
        if ( el.userId == this.activeGroupIndex && el.completed != this.isActiveItemsViewing ) {
          resTasks.push(el)
        }
      })
      return resTasks.reverse()
    }
  },
  mounted() {
    this.activeGroupIndex = this.groups.length ? this.groups[0].id : 0
  }
  }
</script>


<template>
    <div class="level-block">
      <div class="container">
        <div class="level-block__inner">
          <div class="level-block__bar">
            <div class="level-block__bar_in" id="progress-bar" :style="{ 'max-width': fillLevel }"></div>
          </div>
        </div>
      </div>
    </div>


    <div class="active-completed">
      <div class="container">
        <div class="active-completed__inner">
          <div class="btn-container" :class="{ 'active': isActiveItemsViewing }" @click="changeTaskView('active')">
            <h4 class="active__btn">Active</h4>
            <div class="btn__underline"></div>
          </div>
          <div class="btn-container" :class="{ 'active': !isActiveItemsViewing }" @click="changeTaskView('completed')">
            <h4 class="completed__btn">Completed</h4>
            <div class="btn__underline"></div>
          </div>
        </div>
      </div>
    </div>



    <div class="group-list">
      <div class="container">
        <div class="group-list__inner">
          <div class="group-list__form">
            <Icon icon="akar-icons:circle-plus-fill" id="plus-circle-icon" color="#888" height="24" @click="toggleGroupInputActive(), isChangeGroupState = false" />
            <form v-on:submit="addGroup" class="group-list__input-container" :class="{ 'group-list__input-active': isGroupInputActive }">
              <input :placeholder="addGroupInputPlaceholder" ref="groupInput" type="text" class="group-list__input" v-model="addGroupInputValue">
            </form>
          </div>
          <div id="group-container" ref="groupViewport" v-dragscroll.x="true">
            <div class="group-list__items" ref="groupContent">
              <transition-group name="group">
                <span v-for="group in groups" :key="group.id" class="group-list__item" :class="{ 'group-list__item-active': activeGroupIndex == group.id }" @click="setGroupActive(group.id)">{{ group.name }}</span>
              </transition-group>
            </div>
          </div>
          <div v-if="groups.length" class="edit-groups">
            <Icon icon="clarity:edit-solid" color="#ff6464" height="22" @click="isChangeGroupState = true, toggleGroupInputActive()"/>
            <div class="trash-icon" @click="deleteGroup">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" class="tasks__item_svg">
                    <path
                      d="M3 5H19L17.42 19.22C17.3658 19.7094 17.1331 20.1616 16.7663 20.49C16.3994 20.8184 15.9244 21 15.432 21H6.568C6.07564 21 5.60056 20.8184 5.23375 20.49C4.86693 20.1616 4.63416 19.7094 4.58 19.22L3 5Z"
                      stroke="#FF6464" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                      d="M6.345 2.147C6.50675 1.80397 6.76271 1.514 7.083 1.31091C7.4033 1.10782 7.77474 0.999996 8.154 1H13.846C14.2254 0.999806 14.5971 1.10755 14.9176 1.31064C15.2381 1.51374 15.4942 1.80381 15.656 2.147L17 5H5L6.345 2.147Z"
                      stroke="#FF6464" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M1 5H21" stroke="#FF6464" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                    <path d="M9 10V15" stroke="#FF6464" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                    <path d="M13 10V15" stroke="#FF6464" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
            </div>
          </div>
        </div>
      </div>
    </div>



    <div v-if="groups.length" class="tasks">
      <div class="container">
        <div class="tasks__inner">
          <form class="tasks__form" v-on:submit="addTask">
            <input :placeholder="addTaskInputPlaceholder" ref="addTaskInput" class="group-list__input tasks__input" type="text" v-model="addTaskInputValue">
            <div v-if="!isTaskChanging" class="tasks-plus-icon" v-on:click="addTask">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M17 0.5C7.8875 0.5 0.5 7.8875 0.5 17C0.5 26.1125 7.8875 33.5 17 33.5C26.1125 33.5 33.5 26.1125 33.5 17C33.5 7.8875 26.1125 0.5 17 0.5ZM18.5 23C18.5 23.3978 18.342 23.7794 18.0607 24.0607C17.7794 24.342 17.3978 24.5 17 24.5C16.6022 24.5 16.2206 24.342 15.9393 24.0607C15.658 23.7794 15.5 23.3978 15.5 23V18.5H11C10.6022 18.5 10.2206 18.342 9.93934 18.0607C9.65804 17.7794 9.5 17.3978 9.5 17C9.5 16.6022 9.65804 16.2206 9.93934 15.9393C10.2206 15.658 10.6022 15.5 11 15.5H15.5V11C15.5 10.6022 15.658 10.2206 15.9393 9.93934C16.2206 9.65804 16.6022 9.5 17 9.5C17.3978 9.5 17.7794 9.65804 18.0607 9.93934C18.342 10.2206 18.5 10.6022 18.5 11V15.5H23C23.3978 15.5 23.7794 15.658 24.0607 15.9393C24.342 16.2206 24.5 16.6022 24.5 17C24.5 17.3978 24.342 17.7794 24.0607 18.0607C23.7794 18.342 23.3978 18.5 23 18.5H18.5V23Z"
                  fill="#FF6464" />
              </svg>
            </div>
            <Icon v-else class="tasks-plus-icon" icon="el:ok-sign" color="#ff6464" height="34" @click="changeTask" />
          </form>
          <div class="tasks__content">
              <transition-group name="list">
                      <div class="tasks__item" v-for="task in getViewTasks" :key="task.id">
                          <span class="tasks__item_value" :class="{ 'task-changing': changingTaskId == task.id }">{{ task.title }}</span>
                          <div class="tasks__item_icons">
                            <div id="completed-icon" @click="setCompleted(task)">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="tasks__item_svg">
                                <path
                                  d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM17.1489 5.6206L19.6421 8.11376L11.855 15.9024L9.37646 18.3794L6.8833 15.8862L4.3579 13.3594L6.83496 10.8823L9.36036 13.4092L17.1489 5.6206Z"
                                  fill="#FF6464" />
                              </svg>
                            </div>
                            <Icon icon="clarity:edit-solid" id="tasks-edit-icon" color="#ff6464" height="22" @click="changingTaskId = task.id, isTaskChanging = true" />
                            <div class="trash-icon" @click="deleteTask(task)">
                              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" class="tasks__item_svg">
                                <path
                                  d="M3 5H19L17.42 19.22C17.3658 19.7094 17.1331 20.1616 16.7663 20.49C16.3994 20.8184 15.9244 21 15.432 21H6.568C6.07564 21 5.60056 20.8184 5.23375 20.49C4.86693 20.1616 4.63416 19.7094 4.58 19.22L3 5Z"
                                  stroke="#FF6464" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                  d="M6.345 2.147C6.50675 1.80397 6.76271 1.514 7.083 1.31091C7.4033 1.10782 7.77474 0.999996 8.154 1H13.846C14.2254 0.999806 14.5971 1.10755 14.9176 1.31064C15.2381 1.51374 15.4942 1.80381 15.656 2.147L17 5H5L6.345 2.147Z"
                                  stroke="#FF6464" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M1 5H21" stroke="#FF6464" stroke-width="2" stroke-linecap="round"
                                  stroke-linejoin="round" />
                                <path d="M9 10V15" stroke="#FF6464" stroke-width="2" stroke-linecap="round"
                                  stroke-linejoin="round" />
                                <path d="M13 10V15" stroke="#FF6464" stroke-width="2" stroke-linecap="round"
                                  stroke-linejoin="round" />
                              </svg>
                            </div>
                          </div>
                  </div>
              </transition-group>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="msg">
      <div class="container">
        <div class="msg__inner">
          <h3>There is no groups!. Create some groups in order to create tasks</h3>
        </div>
      </div>
    </div>
</template>


<style>

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@font-face {
  font-family: "Poppins";
  src: url("./assets/Poppins-ExtraBold.ttf") format("truetype");
  font-display: swap;
}

body {
  background-color: #fafafa;
  font-family: 'Poppins', sans-serif;
  color: rgba(128, 128, 128, 1);
  padding-bottom: 50px;
}

a {
  text-decoration: none;
  color: rgba(128, 128, 128, 1);
}

.container {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1rem;
}

.level-block__inner {
  padding: 65px 0;
}

.level-block__bar {
  width: 100%;
  height: 30px;
  background-color: #e3e3e3;
  border-radius: 15px;
  position: relative;
}

.level-block__bar_in {
  transition: max-width .5s;
  width: 100%;
  border-radius: 15px;
  max-width: 0%;
  height: 30px;
  background: linear-gradient(270deg, #FF7A7A 0%, #FF9D9D 100%);
}

.level-txt {
  color: rgba(128, 128, 128, 1);
  font-size: 64px;
}

.level-block__counter {
  font-size: 36px;
  color: rgba(128, 128, 128, 1);
}

.active-completed__inner {
  padding: 0 40px;
  display: flex;
  align-items: center;
  font-size: 24px;
}
.active-completed__inner h4 {
  transition: color .3s;
}

.active-completed__inner h4:hover {
  cursor: pointer;
  color: #ff6464;
}

.btn-container:last-child {
  margin-left: 65px;
}

.btn__underline {
  max-width: 0;
  border-radius: 50px;
  height: 4px;
  background-color: #ff6464;
  transition: max-width .3s;
}

.active .btn__underline {
  max-width: 100%;
}

.active h4 {
  color : #ff6464;
}

.group-list__inner {
  display: flex;
  align-items: center;
  position: relative;
}

.group-list__input {
  padding: 10px 0;
  padding-left: 20px;
  padding-right: 10px;
  border: none;
  background-color: #f4f4f4;
  border-radius: 83px;
  padding-left: 50px;
}
.group-list__input:focus {
  outline: none;
}
.group-list__input::placeholder {
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: #bebebe;
} 

.group-list__input[type=text] {
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: #bebebe;
}

.group-list {
  margin-top: 50px;
}

.group-list__form {
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 35px;
}

.form-icon__container {
  background-color: #f4f4f4;
  padding: 10px 20px;
}

#plus-circle-icon {
  position: absolute;
  left: 10px;
  z-index: 1;
}
#plus-circle-icon:hover {
  cursor: pointer;
}
.group-list__items {
  white-space: nowrap;
  padding: 10px 0;
}
.group-list__item {
  color: rgba(97, 97, 97, 1);
  font-size: 18px;
  background: rgba(255, 255, 255, 1);
  padding: 10px 20px;
  border-radius: 83px;
  margin-left: 25px;
  cursor: pointer;
  user-select: none;
  display: inline-block;
  transition: opacity .5s, transform .5s;
}

.group-list__item:first-child {
  margin-left: 0;
}

.group-list__item-active {
  background: linear-gradient(90deg, #FF6464 0%, #FF9E9E 100%);
  color: rgba(255, 255, 255, 1);
}

.tasks {
  margin-top: 50px;
}

.tasks__form {
  position: relative;
}

.tasks__input {
  padding: 20px 40px;
  width: 100%;
}

.tasks__input[type=text] {
  font-size: 24px;
}

.tasks__input::placeholder {
  font-size: 24px;
}

.tasks-plus-icon {
  position: absolute;
  right: 30px;
  top: 21px;
}

.tasks-plus-icon:hover {
  cursor: pointer;
}

.tasks__content {
  margin-top: 50px;
  position: relative;
}

.tasks__item_icons {
  display: flex;
  align-items: center;
}

.tasks__item { 
  padding: 20px 40px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 100px;
  margin-top: 25px;
  transition: opacity .5s, transform .5s;
}

.tasks__item:first-child {
  margin-top: 0;
}

.trash-icon {
  margin-left: 40px;
}

#completed-icon, .trash-icon {
  height: 24px;
}

.tasks__item_value {
  font-size: 24px;
  width: 70%;
}

#group-container {
  position: relative;
  width: 100%;
  height: 67px;
  margin-left: 25px;
  overflow-x: hidden;
  display: flex;
  align-items: center;
}

.group-list__input-container {
  max-width: 0;
  transition: max-width .5s, margin-left .3s;
  overflow: hidden;
}

.group-list__input-active {
  max-width: 330px;
}

.edit-groups {
  display: flex;
  align-items: center;
}

#delete-group {
  height: 22px;
  margin-left: 15px;
}

.edit-groups {
  margin-left: 25px;
}

#tasks-edit-icon {
  margin-left: 40px;
}

#tasks-edit-icon:hover, .trash-icon:hover, #completed-icon:hover, .edit-groups svg:hover {
  cursor: pointer;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}

.group-leave-to,
.group-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.group-leave-active {
  position: absolute;
}

.task-changing {
  transition: color .5s;
  color: #ff6464;
}


@media screen and (max-width: 735px) {
  .level-txt {
    font-size: 34px;
  }
  .level-block__counter {
    font-size: 24px;
  }
  .active-completed__inner {
    font-size: 18px;
  }
  .btn-container:last-child {
    margin-left: 45px;
  }
  .group-list__item {
    font-size: 14px;
    padding: 8px 15px;
  }
  .active-completed__inner {
    padding: 0;
  }
  .group-list__input {
    padding-top: 8px;
    padding-bottom: 8px;
    min-width: 210px;
    width: 100%;
  }
  .group-list__input::placeholder {
    font-size: 16px;
  }
  .group-list__input[type=text] {
    font-size: 16px;
  }
  .level-block__values {
    padding: 0;
  }
  .tasks__item_value {
    font-size: 18px;
  }
  .tasks__item {
    margin-top: 15px;
  }
  .tasks__item_svg {
    width: 18px;
  }
  .trash-icon, #tasks-edit-icon {
    margin-left: 30px;
  }
  .tasks-plus-icon {
    width: 24px;
    top: 5px;
    right: 35px;
  }
  .tasks-plus-icon svg {
    width: 24px;
  }
  .tasks__input {
    padding: 10px 40px;
    top: 5px;
  }
  .level-block__bar, .level-block__bar_in {
    height: 20px;
  }
  .group-list__inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  #group-container {
    grid-row-start: 1;
    grid-column-start: 1;
    grid-column-end: 3;
    margin-left: 0;
    margin-bottom: 25px;
  }
  .edit-groups {
    justify-content: end;
  }
}

</style>