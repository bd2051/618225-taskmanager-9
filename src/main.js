import {Control} from "./components/control";
import {FilterPanel} from "./components/filters-panel";
import {LoadMoreButton} from "./components/load-more-button";
import {TaskPanel} from "./components/taskPanel";
import {getFilter, getTask} from "./data";

const tasks = Array(19)
  .fill(``)
  .map(() => {
    return getTask();
  });
const filters = getFilter(tasks);

const control = new Control();
const filterPanel = new FilterPanel({filters});
const loadMoreButton = new LoadMoreButton();
const taskPanel = new TaskPanel(tasks);

const renderers = [
  control,
  filterPanel,
  loadMoreButton,
  taskPanel,
];

renderers.forEach((el) => el.render());

taskPanel.editTask(0);


loadMoreButton.renderedElements.button.addEventListener(`click`, () => {
  taskPanel.loadMoreTasks();
  if (!taskPanel.hasMoreTasks) {
    loadMoreButton.hideButton();
  }
});
