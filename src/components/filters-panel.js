import Renderer from "../renderer";
import {getSearchMarkup, getFilterMarkup, getSortMarkup, getNoTaskMarkup} from "./templates";
import {createElement} from "../utils";

export class FilterPanel extends Renderer {
  constructor({filters}) {
    super({
      wrapper: `main`,
      renderList: [{
        name: `search`,
        markup: getSearchMarkup(),
      }, {
        name: `filter`,
        markup: getFilterMarkup(filters),
      }, {
        name: `sort`,
        markup: getSortMarkup(),
      }],
    });
  }
  setNoTasks() {
    const noTaskElement = createElement(getNoTaskMarkup());
    Array.from(this.renderedElements.sort.childNodes).filter((el) => el.classList).forEach((el) => {
      el.classList.add(`visually-hidden`);
    });
    console.log(noTaskElement);
    this.renderedElements.sort.appendChild(noTaskElement);
  }
}
