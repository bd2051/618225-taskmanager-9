import Renderer from "../renderer";
import {getSearchMarkup, getFilterMarkup, getSortMarkup} from "./templates";

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
}
