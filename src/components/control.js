import Renderer from "../renderer";
import {getMenuMarkup} from "./templates";

export class Control extends Renderer {
  constructor() {
    super({
      wrapper: `control`,
      renderList: [{
        name: `menu`,
        markup: getMenuMarkup(),
      }],
    });
  }
}
