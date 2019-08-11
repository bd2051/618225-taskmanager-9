import {taskCard} from "./components/task-card";
import {createAndEditForm} from "./components/create-and-edit-form";
import {loadMoreButton} from "./components/load-more-button";
import {sort} from "./components/sort";
import {filter} from "./components/filter";
import {search} from "./components/search";
import {menu} from "./components/menu";

function Renderer({renderList, wrapper}) {
  this.renderedElements = {};
  this.wrapper = null;
  this.render = () => this._createElements({list: this._renderList, wrapperElement: this._getWrapper()});

  this._renderList = renderList;
  this._getWrapper = () => {
    this.wrapper = document.querySelector(`.${wrapper}`);
    return this.wrapper;
  };
  this._createElements = ({list, wrapperElement}) => {
    list.forEach((elementOptions) => {
      this._componentRendering(wrapperElement, elementOptions);
    });
  };
  this._componentRendering = (wrapperElement, elementOptions) => {
    const {markup, count = 1, classes = [], name} = elementOptions;
    const tempCount = classes.length || count;
    this.renderedElements[name] = [];
    for (let i = 0; i < tempCount; i++) {
      const element = document.createElement(`div`);
      if (classes[i]) {
        element.classList.add(classes[i]);
      }
      element.innerHTML = `${markup}`;
      wrapperElement.append(element);
      this.renderedElements[name].push(element);
    }
  };
}

const rendererList = [
  new Renderer({
    wrapper: `control`,
    renderList: [{
      name: `menu`,
      markup: menu,
    }],
  }),
  new Renderer({
    wrapper: `main`,
    renderList: [{
      name: `search`,
      markup: search,
    }, {
      name: `filter`,
      markup: filter,
    }, {
      name: `sort`,
      markup: sort,
    }],
  }),
  new Renderer({
    wrapper: `board`,
    renderList: [{
      name: `loadMoreButton`,
      markup: loadMoreButton,
    }],
  }),
  new Renderer({
    wrapper: `board__tasks`,
    renderList: [{
      name: `createAndEditForm`,
      markup: createAndEditForm,
    }, {
      name: `taskCard`,
      markup: taskCard,
      classes: [`card--blue`, `card--yellow`, `card--black`]
    }],
  }),
];

rendererList.forEach((el) => el.render());
