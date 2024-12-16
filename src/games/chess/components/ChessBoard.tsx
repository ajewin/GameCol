import React from 'react';
import { ChessPiece, Position } from '../../../types/chess';
import { ChessSquare } from './ChessSquare';
import { getSquareColor } from '../utils/board';

interface ChessBoardProps {
  board: (ChessPiece | null)[][];
  selectedPosition: Position | null;
  possibleMoves: Position[];
  onSquareClick: (position: Position) => void;
}

export function ChessBoard({
  board,
  selectedPosition,
  possibleMoves,
  onSquareClick,
}: ChessBoardProps) {
  return (
    <div className="grid grid-cols-8 gap-0 border-2 border-violet-800 rounded-lg overflow-hidden">
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => {
          const position = { row: rowIndex, col: colIndex };
          const isSelected = selectedPosition?.row === rowIndex && selectedPosition?.col === colIndex;
          const isPossibleMove = possibleMoves.some(
            move => move.row === rowIndex && move.col === colIndex
          );

          return (
            <ChessSquare
              key={`${rowIndex}-${colIndex}`}
              piece={piece}
              position={position}
              color={getSquareColor(rowIndex, colIndex)}
              isSelected={isSelected}
              isPossibleMove={isPossibleMove}
              onClick={() => onSquareClick(position)}
            />
          );
        })
      )}
    </div>
  );
}