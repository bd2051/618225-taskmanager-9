import Renderer from "../renderer";
import {getLoadMoreButtonMarkup} from "./templates";

export class LoadMoreButton extends Renderer {
  constructor() {
    super({
      wrapper: `board`,
      renderList: [{
        name: `loadMoreButton`,
        markup: getLoadMoreButtonMarkup(),
      }],
    });
  }
}
