export default class Renderer {
  constructor({renderList, wrapper}) {
    this.renderedElements = {};
    this.wrapper = null;
    this._wrapper = wrapper;
    this._renderList = renderList;
  }
  render() {
    this._createElements({list: this._renderList, wrapperElement: this._getWrapper()});
  }
  _getWrapper() {
    this.wrapper = document.querySelector(`.${this._wrapper}`);
    return this.wrapper;
  }
  _createElements({list, wrapperElement}) {
    list.forEach((elementOptions) => {
      this._componentRendering(wrapperElement, elementOptions);
    });
  }
  _componentRendering(wrapperElement, elementOptions) {
    const {markup, name} = elementOptions;
    const element = document.createElement(`div`);
    element.innerHTML = markup;
    wrapperElement.append(element);
    this.renderedElements[name] = element;
  }
  removeElement(name) {
    this.renderedElements[name].remove();
    delete this.renderedElements[name];
  }
}
