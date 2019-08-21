export const _getFilterMarkup = (filters) => {
  const filtersTemplate = filters.map(({title, count}) => `
    <input
      type="radio"
      id="filter__${title}"
      class="filter__input visually-hidden"
      name="filter"
      checked
    />
    <label for="filter__all" class="filter__label">
      ${title} <span class="filter__all-count">${count}</span></label
    >`).join(``);

  return `<section class="main__filter filter container">${filtersTemplate}</section>`;
};
