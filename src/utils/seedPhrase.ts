import * as _ from 'lodash-es';

export type SeedPhraseChecker = {
  answer: number;
  options: number[];
};

const generateKeyphraseArray = (totalKeywords: number): number[] => {
  return _.range(0, totalKeywords);
};

/**
 * Randomize words from generated keyphrase
 * Given how many words we'd like to validate,
 * This will create a random index object using key index only (based on keyphrase generated)
 * For word conversion, this will be done in actual UI
 */
export const generateSeedPhraseCheckers = (
  totalKeywords: number,
  totalWordCheck: number
): SeedPhraseChecker[] => {
  const initWordKeys = generateKeyphraseArray(totalKeywords);
  const randomWordIds: number[] = _.shuffle(initWordKeys).splice(
    0,
    totalWordCheck
  );

  /**
   * Idea:
   * For each key index:
   *  - Create another shuffled array from total keyphrase (excluding the current key)
   *  - Take 2 first elements from the shuffled in Step 1
   *  - Create a shuffled array from [2 first elements, current key]
   */
  const result = randomWordIds.reduce(
    (checkers: SeedPhraseChecker[], id: number) => {
      const newWordArr = generateKeyphraseArray(totalWordCheck);
      const excludedWordIds = newWordArr.filter((k: number) => k !== id);
      const newRandom = _.shuffle(excludedWordIds);
      const remaining = newRandom.slice(0, 3);

      checkers.push({
        answer: id,
        options: [..._.shuffle([...remaining, id])],
      });
      return checkers;
    },
    []
  );

  return result;
};
