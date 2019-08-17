import {Control} from "./components/control";
import {FilterPanel} from "./components/filters-panel";
import {LoadMoreButton} from "./components/load-more-button";
import {TaskPanel} from "./components/taskPanel";
import {getFilter, getTask} from "./data";

const tasks = Array(3)
  .fill(``)
  .map(() => {
    return getTask();
  });
const filters = getFilter(tasks)

const rendererList = [
  new Control(),
  new FilterPanel({filters}),
  new LoadMoreButton(),
  new TaskPanel(tasks),
];

rendererList.forEach((el) => el.render());
