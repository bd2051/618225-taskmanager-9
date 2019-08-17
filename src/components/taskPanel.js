import Renderer from "../renderer";
import {getTaskCardMarkup} from "./templates";

export class TaskPanel extends Renderer {
  constructor(tasks) {
    super({
      wrapper: `board__tasks`,
      renderList: tasks.map((task, index) => {
        return {
          name: index,
          markup: getTaskCardMarkup(task)
        };
      })
    });
  }
}
