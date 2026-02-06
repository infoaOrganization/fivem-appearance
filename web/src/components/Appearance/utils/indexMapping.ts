export interface IndexMappingResult {
  visibleIndices: number[];
  uiToActual: Map<number, number>;
  actualToUi: Map<number, number>;
  maxUiIndex: number;
}

/**
 * Create index mapping with excluded indices
 * @param totalCount - Total drawable count
 * @param excludedIndices - Indices to exclude from UI
 * @returns Mapping between UI indices and actual indices
 *
 * Example: totalCount=4, excludedIndices=[1]
 * Result: visibleIndices=[0,2,3], UI 0→0, UI 1→2, UI 2→3
 */
export function createIndexMapping(totalCount: number, excludedIndices: number[] = []): IndexMappingResult {
  const excludedSet = new Set(excludedIndices);
  const visibleIndices: number[] = [];

  for (let i = 0; i < totalCount; i++) {
    if (!excludedSet.has(i)) {
      visibleIndices.push(i);
    }
  }

  const uiToActual = new Map<number, number>();
  const actualToUi = new Map<number, number>();

  visibleIndices.forEach((actual, ui) => {
    uiToActual.set(ui, actual);
    actualToUi.set(actual, ui);
  });

  return {
    visibleIndices,
    uiToActual,
    actualToUi,
    maxUiIndex: visibleIndices.length - 1,
  };
}

/**
 * Convert UI index to actual drawable index
 */
export function uiToActualIndex(mapping: IndexMappingResult, uiIndex: number): number {
  return mapping.uiToActual.get(uiIndex) ?? uiIndex;
}

/**
 * Convert actual drawable index to UI index
 */
export function actualToUiIndex(mapping: IndexMappingResult, actualIndex: number): number {
  return mapping.actualToUi.get(actualIndex) ?? actualIndex;
}
