function createButtons(count: number, offset = 0, key: string) {
  return new Array(count).fill(0).map((_, index) => {
    const digit = index + 1 + offset;
    const itemNumber = `${key}:${digit}`;
    return {
      type: 'button',
      text: {
        type: 'plain_text',
        text: digit.toString(),
      },
      value: itemNumber,
    };
  });
}

export function createSections(
  itemsPerSection: number,
  maxCount: number,
  key: string
) {
  return new Array(Math.ceil(maxCount / itemsPerSection))
    .fill(0)
    .map((_, index) => ({
      type: 'actions',
      elements: createButtons(Math.min(itemsPerSection, maxCount - (index * itemsPerSection)), itemsPerSection * index, key),
    }));
}

export function formatCustomInput() {
  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Choose a number:*',
        },
      },
      {
        type: 'divider',
      },
      ...createSections(5, 50, 'number'),
      {
        type: 'divider',
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Choose a bonus number:*',
        },
      },
      ...createSections(5, 12, 'bonus'),
    ],
  };
}
