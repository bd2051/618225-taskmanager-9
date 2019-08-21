export default function Renderer({renderList, wrapper}) {
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
    const {markup, name} = elementOptions;
    const element = document.createElement(`div`);
    element.innerHTML = markup;
    wrapperElement.append(element);
    this.renderedElements[name] = element;
  };
}
