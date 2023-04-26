import { DarkTheme } from "../../Themes/DarkTheme";
import { LightTheme } from "../../Themes/LightTheme";
import { PrimaryTheme } from "../../Themes/PrimaryTheme";
import { arrTheme } from "../../Themes/ThemeManager";
import { editTaskAction } from "../actions/ToDoListActions";
import {
  add_task,
  change_theme,
  delete_task,
  done_task,
  edit_task,
  update_task,
} from "../types/ToDoListTypes";

const initialState = {
  theme: DarkTheme,
  taskList: [
    { id: 1, taskName: "task 1", done: true },
    { id: 2, taskName: "task 2", done: false },
    { id: 3, taskName: "task 3", done: true },
    { id: 4, taskName: "task 4", done: false },
  ],
  taskEdit: { id: -1, taskName: "", done: false },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case add_task: {
      // ktra rong
      if (action.newTask.taskName.trim() == "") {
        alert("Nhap vao task name");
        return { ...state };
      }
      // ktra ton tai
      let taskListUpdate = [...state.taskList];
      console.log(taskListUpdate);
      let index = taskListUpdate.findIndex((task) => {
        return task.taskName === action.newTask.taskName;
      });
      if (index !== -1) {
        alert("Task name already exists!");
        return { ...state };
      } else {
        taskListUpdate.push(action.newTask);
      }

      // xu ly xong gan tasklist moi vao taks hien tai
      state.taskList = [...taskListUpdate];
      return { ...state };
    }
    case change_theme: {
      let theme = arrTheme.find((theme) => theme.id == action.themeId);
      if (theme) {
        state.theme = { ...theme.theme };
      }
      return { ...state };
    }
    case done_task: {
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex((task) => task.id === action.taskId);
      if (index !== -1) {
        taskListUpdate[index].done = true;
      }
      return { ...state, taskList: taskListUpdate };
    }
    case delete_task: {
      // let taskListUpdate = [...state.taskList];
      // taskListUpdate = taskListUpdate.filter((task) => {
      //   return task.id !== action.taskId;
      // });
      // return { ...state, taskList: taskListUpdate };
      return {
        ...state,
        taskList: state.taskList.filter((task) => task.id !== action.taskId),
      };
    }
    case edit_task: {
      return { ...state, taskEdit: action.task };
    }
    case update_task: {
      state.taskEdit = { ...state.taskEdit, taskName: action.taskName };

      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex(
        (task) => task.id == state.taskEdit.id
      );
      if (index != -1) {
        taskListUpdate[index] = state.taskEdit;
      }
      state.taskList = taskListUpdate;
      state.taskEdit = { id: -1, taskName: "", done: false };
      return { ...state };
    }
    default:
      return { ...state };
  }
};
