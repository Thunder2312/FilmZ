export interface ShowTime {
  movieId: number;
  screenId: number;
  startTime: string; // ISO format e.g. '2025-03-01T14:00:00'
  endTime: string;
  ticketPrice: number;
}
