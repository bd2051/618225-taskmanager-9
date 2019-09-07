import Renderer from "../renderer";
import {getCreateAndEditFormMarkup, getTaskCardMarkup} from "./templates";

const TASKS_COUNT = 8;
let tasksCounter = 0;

export class TaskPanel extends Renderer {
  constructor(tasks) {
    super({
      wrapper: `board__tasks`,
      renderList: tasks.slice(0, TASKS_COUNT).map((task, index) => {
        return {
          name: index,
          markup: getTaskCardMarkup(task)
        };
      })
    });
    this._tasks = tasks;
    this.editForms = this._renderList.reduce((acc, key) => {
      const editForm = document.createElement(`div`);
      editForm.innerHTML = getCreateAndEditFormMarkup();
      acc[key.name] = editForm;
      return acc;
    }, {});
  }
  loadMoreTasks() {
    tasksCounter += TASKS_COUNT;
    const loadingTasks = this._tasks
      .slice(tasksCounter, tasksCounter + TASKS_COUNT)
      .map((task, index) => {
        return {
          name: index + tasksCounter,
          markup: getTaskCardMarkup(task)
        };
      });
    this._createElements({
      list: loadingTasks,
      wrapperElement: this.wrapper
    });
    return loadingTasks.length === TASKS_COUNT;
  }
  get hasMoreTasks() {
    return this._tasks.length >= tasksCounter + TASKS_COUNT;
  }
  get editButtons() {
    return Object.keys(this.renderedElements).reduce((acc, key) => {
      acc[key] = this.renderedElements[key].querySelector(`.card__btn--edit`);
      return acc;
    }, {});
  }
  editTask(name) {
    this.wrapper.replaceChild(this.editForms[name], this.renderedElements[name]);
  }
  completeTask(name) {
    this.wrapper.replaceChild(this.renderedElements[name], this.editForms[name]);
  }
}
