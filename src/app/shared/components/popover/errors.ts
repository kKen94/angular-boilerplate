import { VALID_HORIZ_ALIGN, VALID_SCROLL, VALID_VERT_ALIGN } from './types';

const generateGenericError = (
  apiName: string,
  invalid: any,
  valid: string[],
): string =>
  `Invalid ${apiName}: '${invalid}'. Valid options are ${valid
    .map(v => `'${v}'`)
    .join(', ')}.`;

export const getUnanchoredPopoverError = (): Error =>
  Error('SatPopover does not have an anchor.');

export const getInvalidPopoverAnchorError = (): Error =>
  Error(
    'SatPopover#anchor must be an instance of SatPopoverAnchor, ElementRef, or HTMLElement.',
  );

export const getInvalidPopoverError = (): Error =>
  Error('SatPopoverAnchor#satPopoverAnchor must be an instance of SatPopover.');

export const getInvalidSatPopoverAnchorError = (): Error =>
  Error(
    `SatPopoverAnchor must be associated with a ` +
      `SatPopover component. ` +
      `Examples: <ce-popover [anchor]="cePopoverAnchorTemplateRef"> or ` +
      `<button cePopoverAnchor [cePopoverAnchor]="cePopoverTemplateRef">`,
  );

export const getInvalidHorizontalAlignError = (alignment): Error =>
  Error(
    generateGenericError(
      'horizontalAlign/xAlign',
      alignment,
      VALID_HORIZ_ALIGN,
    ),
  );

export const getInvalidVerticalAlignError = (alignment): Error =>
  Error(
    generateGenericError('verticalAlign/yAlign', alignment, VALID_VERT_ALIGN),
  );

export const getInvalidScrollStrategyError = (strategy): Error =>
  Error(generateGenericError('scrollStrategy', strategy, VALID_SCROLL));
