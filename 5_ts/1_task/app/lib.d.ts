interface CustomSize {
  width: number;
  height: number;
}

export interface Rectangle {
  calculateArea(size: CustomSize): number
}
