import {Control} from "./components/control";
import {FilterPanel} from "./components/filters-panel";
import {LoadMoreButton} from "./components/load-more-button";
import {TaskPanel} from "./components/taskPanel";
import {getFilter, getTask} from "./data";

const tasksData = Array(19)
  .fill(``)
  .map(() => {
    return getTask();
  });
const filters = getFilter(tasksData);

const control = new Control();
const filterPanel = new FilterPanel({filters});
const loadMoreButton = new LoadMoreButton();
const taskPanel = new TaskPanel(tasksData);

const renderers = [
  control,
  filterPanel,
  loadMoreButton,
  taskPanel,
];

renderers.forEach((el) => el.render());

if (taskPanel.isAllInArchive) {
  filterPanel.setNoTasks();
}
taskPanel.wrapper.addEventListener(`archive-update`, () => {
  if (taskPanel.isAllInArchive) {
    filterPanel.setNoTasks();
  }
});
window.addEventListener(`keydown`, (e) => {
  if (e.key === `Escape`) {
    e.preventDefault();
    const inputFields = taskPanel.inputFields;
    Object.keys(taskPanel.openedForms).forEach((key) => {
      if (!inputFields[key].isSameNode(e.target)) {
        taskPanel.tasks[key].isEditing = false;
      }
    });
  }
});
loadMoreButton.renderedElements.button.addEventListener(`click`, () => {
  taskPanel.loadMoreTasks();
  if (!taskPanel.hasMoreTasks) {
    loadMoreButton.hideButton();
  }
});
