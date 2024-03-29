import type { IQuestionObject, IHighScoreObject, IStoredUserType } from './types';

/**
 * getter function that returns an array of objects from localStorage after parsing the stored data
 * @param arrayOfOjbects array of objects as declared in localStorage
 * @param storageName stored name given to the stored array of type string
 * @returns array of objects of type IStoredUserType[];
 */
export function getArrayOfObjectsFromLocalStorage(
  arrayOfOjbects: IStoredUserType[],
  storageName: string
): IStoredUserType[] {
  const storedData = localStorage.getItem(storageName);
  // if there is not storedData arrayOfObjects should be empty, else parse the JSON string
  arrayOfOjbects = storedData === null ? [] : JSON.parse(storedData);
  return arrayOfOjbects;
}

export function getHighScoreFromLocalStorage(
  storedHighScore: IHighScoreObject[],
  highScores: string
): IHighScoreObject[] {
  const storedHighscoreData = localStorage.getItem(highScores);

  storedHighScore = storedHighscoreData === null ? [] : JSON.parse(storedHighscoreData);
  return storedHighScore;
}

export function getRandomQuestions(jsonArray: IQuestionObject[], numQuestions: number): IQuestionObject[] {
  return [...jsonArray].sort(() => Math.random() - 0.5).slice(0, numQuestions);
}

export function getFractionAsString(nominator: number, denominator: number): string {
  return `${nominator.toString()}/${denominator.toString()}`;
}

export function getLinearGradienceLeftToRightAsString(
  percentage: number,
  firstColor: string,
  secondColor: string
): string {
  return `linear-gradient(to right, ${firstColor} ${percentage}%, ${secondColor} ${percentage}%)`;
}
export function toggleAddClassNameOnElement(headerResultsPanel: Element | null, className: string, add: boolean): void {
  if (add) {
    headerResultsPanel?.classList.add(className);
  } else {
    headerResultsPanel?.classList.remove(className);
  }
}

export function setTheme(themeName: string): void {
  localStorage.setItem('theme', themeName);
  if (themeName === 'light-mode') {
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.remove('light-mode');
  }
}

export function initialTheme(): void {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme !== null) {
    setTheme(storedTheme);
    return;
  }

  const prefersLightTheme = window.matchMedia('prefers-color-scheme: light');
  if (prefersLightTheme.matches) {
    setTheme('light-mode');
  } else {
    setTheme('dark-mode');
  }
}
