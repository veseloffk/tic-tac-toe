import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store from "../index";
import { WIN_COUNT } from "../../config";
import gameFieldsInit from "./gameFields";

export enum FieldsValues {
  Zero,
  Cross,
}

type Field = {
  cellIndex: number;
  rowIndex: number;
  value: FieldsValues | null;
};

type SliceState = {
  currentPlayer: FieldsValues;
  playingFields: Array<Array<FieldsValues | null>>;
  payLine: Array<Field | undefined>;
  isFirstMove: boolean;
};

const initialState: SliceState = {
  currentPlayer: FieldsValues.Zero,
  playingFields: gameFieldsInit,
  payLine: [],
  isFirstMove: true
};

const getNextPlayer = (currentPlayer: FieldsValues) =>
  currentPlayer === FieldsValues.Zero ? FieldsValues.Cross : FieldsValues.Zero;

const getWiningFields = (
  line: Array<Field | undefined>,
  currentPlayer: FieldsValues
) => {
  return line.reduce(
    (
      acc: Array<Field | undefined>,
      field: Field | undefined,
      currentIndex: number
    ) => {
      if (acc.length === WIN_COUNT) {
        return acc;
      }

      if (field && field.value === currentPlayer) {
        if (acc.length) {
          acc.push(field);
          return acc;
        } else {
          return [field];
        }
      } else {
        return [];
      }
    },
    []
  );
};

const isLineWin = (
  line: Array<Field | undefined>,
  currentPlayer: FieldsValues
) => {
  return getWiningFields(line, currentPlayer).length === WIN_COUNT;
};

const getField = (
  cellIndex: number,
  rowIndex: number,
  playingFields: Array<Array<FieldsValues | null>>
): Field | undefined => {
  const isRowExist = Array.isArray(playingFields[rowIndex]);
  const isCellExist =
    isRowExist && playingFields[rowIndex][cellIndex] !== undefined;

  if (isRowExist && isCellExist) {
    const value = playingFields[rowIndex][cellIndex];

    return {
      cellIndex,
      rowIndex,
      value,
    };
  } else {
    return undefined;
  }
};

const getPayline = (
  cellIndex: number,
  rowIndex: number,
  playingFields: Array<Array<FieldsValues | null>>,
  currentPlayer: FieldsValues
) => {
  const firstCellIndex = cellIndex - (WIN_COUNT - 1);
  const lastCellIndex = cellIndex + (WIN_COUNT - 1);
  const firstRowIndex = rowIndex - (WIN_COUNT - 1);

  const potentialPaylines: Array<Array<Field | undefined>> = [[], [], [], []];

  for (let i = 0; i < WIN_COUNT * 2 - 1; i++) {
    const [first, second, third, fourth] = potentialPaylines;

    first.push(getField(firstCellIndex + i, rowIndex, playingFields));
    second.push(getField(cellIndex, firstRowIndex + i, playingFields));
    third.push(getField(firstCellIndex + i, firstRowIndex + i, playingFields));
    fourth.push(getField(lastCellIndex - i, firstRowIndex + i, playingFields));
  }

  const line = potentialPaylines.find((line) => isLineWin(line, currentPlayer));

  return line ? getWiningFields(line, currentPlayer) : [];
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    makeMove: (
      state,
      action: PayloadAction<{ cellIndex: number; rowIndex: number }>
    ) => {
      const { cellIndex, rowIndex } = action.payload;

      state.playingFields[rowIndex][cellIndex] = state.currentPlayer;
      state.payLine = getPayline(
        cellIndex,
        rowIndex,
        state.playingFields,
        state.currentPlayer
      );
      state.currentPlayer = getNextPlayer(state.currentPlayer);
      state.isFirstMove = false;
    },
  },
});

export const { makeMove } = gameSlice.actions;

export const selectCurrentPlayer = (state: ReturnType<typeof store.getState>) =>
  state.game.currentPlayer;

export const selectPlayingFields = (state: ReturnType<typeof store.getState>) =>
  state.game.playingFields;

export const selectPayLine = (state: ReturnType<typeof store.getState>) =>
  state.game.payLine;

export const selectIsFirstMove = (state: ReturnType<typeof store.getState>) =>
state.game.isFirstMove;

export default gameSlice.reducer;
