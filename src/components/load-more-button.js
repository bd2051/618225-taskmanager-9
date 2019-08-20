import Renderer from "../renderer";
import {getLoadMoreButtonMarkup} from "./templates";

export class LoadMoreButton extends Renderer {
  constructor() {
    super({
      wrapper: `board`,
      renderList: [{
        name: `button`,
        markup: getLoadMoreButtonMarkup(),
      }],
    });
  }
  hideButton() {
    this.renderedElements.button.classList.add(`visually-hidden`);
  }
}
