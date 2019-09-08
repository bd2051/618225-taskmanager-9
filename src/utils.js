export const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;
  if (element.firstChild.nodeName === `#text`) {
    throw new Error(`Template has whitespaces before tags`);
  }
  return element.firstChild;
};
