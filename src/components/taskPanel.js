import Renderer from "../renderer";
import {getCreateAndEditFormMarkup, getTaskCardMarkup} from "./templates";

const TASKS_COUNT = 8;
const getTaskKey = (i) => `task${i}`;

class Task {
  constructor(task, wrapper, element) {
    this._task = task;
    this._wrapper = wrapper;
    this.element = element;
    const editingForm = document.createElement(`div`);
    editingForm.innerHTML = getCreateAndEditFormMarkup();
    this.editingForm = editingForm;
    this._isEditing = false;
    Object.keys(task).forEach((key) => {
      Object.defineProperty(this, key, {
        get: () => {
          return this._task[key];
        },
        set: (val) => {
          this._task[key] = val;
          this._removeEvents();
          this._replaceElement();
          this._replaceEditForm();
          this._setEvents();
        }
      });
    });
    this._onClickEditingButton = () => {
      this.isEditing = true;
    };
    this._onSubmitForm = (e) => {
      e.preventDefault();
      this.isEditing = false;
    };
    this._setEvents();
  }
  get editingButton() {
    return this.element.querySelector(`.card__btn--edit`);
  }
  get inputField() {
    return this.editingForm.querySelector(`textarea.card__text`);
  }
  get isEditing() {
    return this._isEditing;
  }
  set isEditing(val) {
    this._isEditing = val;
    if (val) {
      this._editTask();
    } else {
      this._closeTask();
    }
  }
  _editTask() {
    this._wrapper.replaceChild(this.editingForm, this.element);
  }
  _closeTask() {
    this._wrapper.replaceChild(this.element, this.editingForm);
  }
  _replaceElement() {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = getTaskCardMarkup(this._task);
    if (this._wrapper.contains(this.element)) {
      this._wrapper.replaceChild(newElement, this.element);
    }
    this.element = newElement;
  }
  _replaceEditForm() {
    const newEditingForm = document.createElement(`div`);
    newEditingForm.innerHTML = getCreateAndEditFormMarkup();
    if (this._wrapper.contains(this.editingForm)) {
      this._wrapper.replaceChild(newEditingForm, this.editingForm);
    }
    this.editingForm = newEditingForm;
  }
  _setEvents() {
    this.editingButton.addEventListener(`click`, this._onClickEditingButton);
    this.editingForm.addEventListener(`submit`, this._onSubmitForm);
  }
  _removeEvents() {
    this.editingButton.removeEventListener(`click`, this._onClickEditingButton);
    this.editingForm.removeEventListener(`submit`, this._onSubmitForm);
  }
}

export class TaskPanel extends Renderer {
  constructor(tasksData) {
    super({
      wrapper: `board__tasks`,
      renderList: tasksData.slice(0, TASKS_COUNT).map((task, index) => {
        return {
          name: getTaskKey(index),
          markup: getTaskCardMarkup(task),
        };
      })
    });
    this._tasksData = tasksData;
    this.tasks = {};
  }
  render(renderList = []) {
    if (renderList.length > 0) {
      this._renderList = renderList;
    }
    super.render();
    this.tasks = this._computeTasks({});
  }
  get _taskDataMap() {
    return this._tasksData.reduce((acc, task, index) => {
      acc[getTaskKey(index)] = task;
      return acc;
    }, {});
  }
  get tasksCounter() {
    return Object.keys(this.tasks).length;
  }
  _computeTasks(tasks) {
    const taskMap = this._taskDataMap;
    return this._tasksData
      .reduce((acc, curr, index) => {
        if (this.renderedElements[getTaskKey(index)] && !tasks[getTaskKey(index)]) {
          acc[getTaskKey(index)] = new Task(taskMap[getTaskKey(index)], this.wrapper, this.renderedElements[getTaskKey(index)]);
        }
        return acc;
      }, tasks);
  }
  loadMoreTasks() {
    const loadingTasks = this._tasksData
      .slice(this.tasksCounter, this.tasksCounter + TASKS_COUNT)
      .map((task, index) => {
        return {
          name: getTaskKey(index + this.tasksCounter),
          markup: getTaskCardMarkup(task)
        };
      });
    this.render(loadingTasks);
    return loadingTasks.length === TASKS_COUNT;
  }
  get hasMoreTasks() {
    return this._tasksData.length > this.tasksCounter;
  }
  get isAllInArchive() {
    return Object.keys(this.tasks)
      .filter((key) => this.tasks[key].isArchive)
      .reduce((acc, key) => {
        acc[key] = this.tasks[key];
        return acc;
      }, {});
  }
  get openedForms() {
    return Object.keys(this.tasks)
      .filter((key) => this.tasks[key].isEditing)
      .reduce((acc, key) => {
        acc[key] = this.tasks[key];
        return acc;
      }, {});
  }
  get inputFields() {
    const tasks = this.tasks;
    return Object.keys(tasks).reduce((acc, key) => {
      acc[key] = tasks[key].inputField;
      return acc;
    }, {});
  }
}
