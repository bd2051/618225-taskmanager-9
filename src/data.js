import moment from "moment";

export const getTask = () => ({
  description: [
    `Prepare for the pitch`,
    `Find money for travel`,
    `Eat something`,
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`
  ]),
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': Boolean(Math.round(Math.random())),
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][Math.floor(Math.random() * 5)],
  isFavorite: Boolean(Math.round(Math.random() + 0.25)),
  isArchive: Boolean(Math.round(Math.random() + 0.25)),
});

export const getFilter = (tasks) => {
  const startOfToday = moment().startOf(`day`).valueOf();
  const endOfToday = moment().endOf(`day`).valueOf();
  const titlesMap = {
    'all': tasks.length,
    'overdue': tasks.filter(({dueDate}) => dueDate < startOfToday).length,
    'today': tasks.filter(({dueDate}) => dueDate <= endOfToday && dueDate >= startOfToday).length,
    'favorites': tasks.filter(({isFavorite}) => isFavorite).length,
    'repeating': tasks.filter(({repeatingDays}) => Object.values(repeatingDays).some((day) => day)).length,
    'tags': tasks.filter(({tags}) => Array.from(tags).length > 0).length,
    'archive': tasks.filter(({isFavorite}) => isFavorite).length,
  };
  return Object.keys(titlesMap).map((title) => {
    return {
      title,
      get count() {
        return titlesMap[title];
      }
    };
  });
};
