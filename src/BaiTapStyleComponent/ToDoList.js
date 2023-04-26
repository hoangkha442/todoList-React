import React, { Component } from "react";
import { Container } from "../Components/Container";
import { ThemeProvider } from "styled-components";
import { DarkTheme } from "./Themes/DarkTheme";
import { LightTheme } from "./Themes/LightTheme";
import { PrimaryTheme } from "./Themes/PrimaryTheme";
import { Dropdown } from "../Components/Dropdown";
import { Heading1, Heading3 } from "../Components/Heading";
import { Input, Label, TextField } from "../Components/TextField";
import { Button } from "../Components/Button";
import { Table, Th, Thead, Tr } from "../Components/Table";
import { connect } from "react-redux";
import {
  addTaskAction,
  changeThemeAction,
  deleteTaskAction,
  doneTaskAction,
  editTaskAction,
  updateTaskAction,
} from "./redux/actions/ToDoListActions";
import { arrTheme } from "./Themes/ThemeManager";

class ToDoList extends Component {
  state = {
    taskName: "",
    disabled: true,
  };
  renderTaskToDo = () => {
    return this.props.taskList
      .filter((task) => !task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right" style={{ verticalAlign: "middle" }}>
              <Button
                className="ml-1"
                onClick={() => {
                  this.setState(
                    {
                      disabled: false,
                    },
                    () => {
                      this.props.dispatch(editTaskAction(task));
                    }
                  );
                }}
              >
                <i className="fa fa-edit"></i>
              </Button>
              <Button
                className="ml-1"
                onClick={() => {
                  this.props.dispatch(doneTaskAction(task.id));
                }}
              >
                <i className="fa fa-check"></i>
              </Button>
              <Button
                className="ml-1"
                onClick={() => {
                  this.props.dispatch(deleteTaskAction(task.id));
                }}
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderTaskCompleted = () => {
    return this.props.taskList
      .filter((task) => task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right" style={{ verticalAlign: "middle" }}>
              <Button
                className="ml-1"
                onClick={() => {
                  this.props.dispatch(deleteTaskAction(task.id));
                }}
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };
  // render theme
  renderTheme = () => {
    return arrTheme.map((theme, index) => {
      return <option value={theme.id}>{theme.name}</option>;
    });
  };

  // componentWillReceiveProps(newProps) {
  //   this.setState({
  //     taskName: newProps.taskEdit.taskName,
  //   });
  // }
  // static getDerivedStateFromProps(newProps, currentState) {
  //   let newState = { ...currentState, taskName: newProps.taskEdit.taskName };
  //   return newState;
  // }
  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <Container className="w-50">
          <Dropdown
            onChange={(e) => {
              let { value } = e.target;
              this.props.dispatch(changeThemeAction(value));
            }}
          >
            {this.renderTheme()}
          </Dropdown>
          <Heading3>To Do List</Heading3>
          <TextField
            value={this.state.taskName}
            label="Task name"
            className="w-50"
            name="taskName"
            onChange={(e) => {
              this.setState({
                taskName: e.target.value,
              });
            }}
          ></TextField>
          <Button
            className="ml-2"
            onClick={() => {
              // lay thong tin nguoi dung nhap vao tu input
              let { taskName } = this.state;
              // tao ra mot task object
              let newTask = {
                id: Date.now(),
                taskName: taskName,
                done: false,
              };
              // dua task object len redux thong qua phuong thuc dispatch
              this.props.dispatch(addTaskAction(newTask));
            }}
          >
            <i className="fa fa-plus"></i> Add task
          </Button>
          {this.state.disabled ? (
            <Button
              disabled
              className="ml-2"
              onClick={() => {
                this.props.dispatch(updateTaskAction(this.state.taskName));
              }}
            >
              <i className="fa fa-upload"></i> Update task
            </Button>
          ) : (
            <Button
              className="ml-2"
              onClick={() => {
                let { taskName } = this.state;
                this.setState(
                  {
                    disabled: true,
                    taskName: "",
                  },
                  () => {
                    this.props.dispatch(updateTaskAction(taskName));
                  }
                );
              }}
            >
              <i className="fa fa-upload"></i> Update task
            </Button>
          )}

          <hr />
          <Heading3>Task To Do</Heading3>
          <Table>
            <Thead>{this.renderTaskToDo()}</Thead>
          </Table>

          <Heading3>Task Completed</Heading3>
          <Table>
            <Thead>{this.renderTaskCompleted()}</Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }

  componentDidUpdate(preProps, preState) {
    if (preProps.taskEdit.id !== this.props.taskEdit.id) {
      this.setState({
        taskName: this.props.taskEdit.taskName,
      });
    }
  }
}
const mapStateToProps = (state) => {
  return {
    theme: state.ToDoListReducer.theme,
    taskList: state.ToDoListReducer.taskList,
    taskEdit: state.ToDoListReducer.taskEdit,
  };
};

export default connect(mapStateToProps)(ToDoList);
