/* eslint-disable no-param-reassign */
import { requirements } from './requirements';

type Requirement = {
  mod: number;
  points: number;
  text: string;
};

type RequirementSection = Record<string, Requirement[]>;

const getResult = (requirementList: RequirementSection, max: number): string => {
  let total = 0;
  let message = '';
  Object.entries(requirementList).forEach(([section, list]) => {
    message += `${section}:\n`;
    list.forEach(({ mod, points, text }) => {
      if (mod) {
        total += points;
        message += `\t+${points}\t- ${text}\n`;
      }
    });
  });
  return `Score: ${total}/${max}\n${message}`;
};

export const selfCheck = {
  student: getResult(requirements.Functional, 190),
  mentor: getResult(requirements['Non-functional'], 150),
};
