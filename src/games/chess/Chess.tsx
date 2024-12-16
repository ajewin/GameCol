import React, { useState } from 'react';
import { ChessPiece, Position, Move } from '../../types/chess';
import { ChessBoard } from './components/ChessBoard';
import { createInitialBoard } from './utils/board';
import { getPossibleMoves } from './utils/moves';
import { isKingInCheck, isCheckmate, isCastlingPossible, isEnPassantPossible } from './utils/gameLogic';
import { ChessControls } from './components/ChessControls';

export function Chess() {
  const [board, setBoard] = useState<(ChessPiece | null)[][]>(createInitialBoard());
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<'white' | 'black'>('white');
  const [possibleMoves, setPossibleMoves] = useState<Position[]>([]);
  const [lastMove, setLastMove] = useState<Move | null>(null);
  const [gameMode, setGameMode] = useState<'player' | 'bot'>('player');
  const [isGameOver, setIsGameOver] = useState(false);

  const handleSquareClick = (position: Position) => {
    const piece = board[position.row][position.col];

    // If no piece is selected and clicked square has a piece of current player's color
    if (!selectedPosition && piece && piece.color === currentPlayer) {
      setSelectedPosition(position);
      const moves = getPossibleMoves(board, position, piece);
      
      // Add castling moves
      if (piece.type === 'king' && !piece.hasMoved) {
        const castlingMoves = [
          { row: position.row, col: position.col + 2 },
          { row: position.row, col: position.col - 2 }
        ].filter(move => isCastlingPossible(board, piece, position, move));
        moves.push(...castlingMoves.map(to => ({ from: position, to, piece })));
      }

      // Add en passant moves
      if (piece.type === 'pawn' && lastMove) {
        const enPassantMove = { 
          row: lastMove.to.row + (piece.color === 'white' ? -1 : 1),
          col: lastMove.to.col 
        };
        if (isEnPassantPossible(board, position, enPassantMove, lastMove)) {
          moves.push({ from: position, to: enPassantMove, piece });
        }
      }

      setPossibleMoves(moves.map(move => move.to));
      return;
    }

    // If a piece is selected and clicked square is a valid move
    if (selectedPosition && possibleMoves.some(move => 
      move.row === position.row && move.col === position.col
    )) {
      const newBoard = board.map(row => [...row]);
      const movingPiece = board[selectedPosition.row][selectedPosition.col];
      
      // Handle castling
      if (movingPiece?.type === 'king' && Math.abs(position.col - selectedPosition.col) === 2) {
        const rookCol = position.col > selectedPosition.col ? 7 : 0;
        const newRookCol = position.col > selectedPosition.col ? position.col - 1 : position.col + 1;
        const rook = newBoard[selectedPosition.row][rookCol];
        newBoard[selectedPosition.row][newRookCol] = { ...rook!, hasMoved: true };
        newBoard[selectedPosition.row][rookCol] = null;
      }

      // Handle en passant
      if (movingPiece?.type === 'pawn' && Math.abs(position.col - selectedPosition.col) === 1) {
        newBoard[lastMove?.to.row!][lastMove?.to.col!] = null;
      }

      // Move the piece
      newBoard[position.row][position.col] = {
        ...movingPiece!,
        hasMoved: true
      };
      newBoard[selectedPosition.row][selectedPosition.col] = null;

      const move: Move = {
        from: selectedPosition,
        to: position,
        piece: movingPiece!
      };

      setBoard(newBoard);
      setLastMove(move);
      setCurrentPlayer(current => current === 'white' ? 'black' : 'white');
      setSelectedPosition(null);
      setPossibleMoves([]);

      // Check for checkmate
      const nextPlayer = currentPlayer === 'white' ? 'black' : 'white';
      if (isCheckmate(newBoard, nextPlayer)) {
        setIsGameOver(true);
      }

      return;
    }

    // Reset selection
    setSelectedPosition(null);
    setPossibleMoves([]);
  };

  const resetGame = () => {
    setBoard(createInitialBoard());
    setCurrentPlayer('white');
    setSelectedPosition(null);
    setPossibleMoves([]);
    setLastMove(null);
    setIsGameOver(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <ChessControls
        currentPlayer={currentPlayer}
        gameMode={gameMode}
        isGameOver={isGameOver}
        onGameModeChange={setGameMode}
        onReset={resetGame}
      />
      
      <ChessBoard
        board={board}
        selectedPosition={selectedPosition}
        possibleMoves={possibleMoves}
        onSquareClick={handleSquareClick}
      />

      {isGameOver && (
        <div className="mt-4 text-center text-xl font-bold text-violet-600">
          Checkmate! {currentPlayer === 'black' ? 'White' : 'Black'} wins!
        </div>
      )}
    </div>
  );
}