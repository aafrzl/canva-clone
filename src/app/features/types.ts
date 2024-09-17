import { fabric } from "fabric";
import { ITextOptions } from "fabric/fabric-impl";
import * as material from "material-colors";

export const fonts = [
  // Sans-serif fonts
  "Arial",
  "Helvetica",
  "Helvetica Neue",
  "Calibri",
  "Noto Sans",
  "Roboto",
  "Verdana",
  "Tahoma",
  "Trebuchet MS",
  "Segoe UI",
  "Open Sans",
  "Gill Sans",
  "Geneva",

  // Serif fonts
  "Times New Roman",
  "Times",
  "Georgia",
  "Palatino",
  "Baskerville",
  "Cambria",

  // Monospace fonts
  "Courier",
  "Courier New",
  "Consolas",
  "Monaco",
  "Lucida Console",
  "Menlo",

  // Cursive fonts
  "Comic Sans MS",
  "Apple Chancery",
  "Bradley Hand",

  // Fantasy fonts
  "Impact",
  "Luminari",
  "Marker Felt",
  "Papyrus",
];

export interface EditorHookProps {
  clearSelectionCallback: () => void;
}

export const selectedDependentTools = [
  "fill",
  "font",
  "filter",
  "opacity",
  "remove-bg",
  "stroke-color",
  "stroke-width",
];

export const colors = [
  material.red["500"],
  material.pink["500"],
  material.purple["500"],
  material.deepPurple["500"],
  material.indigo["500"],
  material.blue["500"],
  material.lightBlue["500"],
  material.cyan["500"],
  material.teal["500"],
  material.green["500"],
  material.lightGreen["500"],
  material.lime["500"],
  material.yellow["500"],
  material.amber["500"],
  material.orange["500"],
  material.deepOrange["500"],
  material.brown["500"],
  material.grey["500"],
  material.blueGrey["500"],
  "black",
  "transparent",
];

export type ActiveTool =
  | "select"
  | "shapes"
  | "text"
  | "images"
  | "templates"
  | "settings"
  | "draw"
  | "fill"
  | "stroke-color"
  | "stroke-width"
  | "font"
  | "opacity"
  | "filter"
  | "remove-bg"
  | "ai";

//Define shape options
export const FILL_COLOR = "rgba(0,0,0,1)";
export const STROKE_COLOR = "rgba(0,0,0,1)";
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY = [];
export const FONT_FAMILY = "Arial";
export const FONT_SIZE = 32;
export const FONT_WEIGHT = 500;

export const CIRCLE_OPTIONS = {
  radius: 150,
  fill: FILL_COLOR,
  left: 100,
  top: 100,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};

export const TEXT_OPTIONS = {
  type: "text",
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  fontSize: FONT_SIZE,
  width: 600,
  fontFamily: FONT_FAMILY,
};

export const RECTANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
};

export const TRIANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
};

export const DIAMOND_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
};

export type BuildEditorProps = {
  canvas: fabric.Canvas;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  strokeDashArray: number[];
  selectedObjects: fabric.Object[];
  fontFamily: string;
  setStrokeDashArray: (value: number[]) => void;
  setFillColor: (value: string) => void;
  setStrokeColor: (value: string) => void;
  setStrokeWidth: (value: number) => void;
  setFontFamily: (value: string) => void;
};

export interface Editor {
  addText: (value: string, options?: ITextOptions) => void;
  getActiveTextAlign: () => string;
  getActiveFontUnderline: () => boolean;
  getActiveFontLinethrough: () => boolean;
  getActiveFontStyle: () => string;
  getActiveOpacity: () => number;
  changeOpacity: (value: number) => void;
  bringForward: () => void;
  sendBackward: () => void;
  changeTextAlign: (value: string) => void;
  changeFontUnderline: (value: boolean) => void;
  changeFontLinethrough: (value: boolean) => void;
  changeFontStyle: (value: string) => void;
  changeFontWeight: (value: number) => void;
  changeFontFamily: (value: string) => void;
  changeStrokeColor: (value: string) => void;
  changeStrokeWidth: (value: number) => void;
  changeFillColor: (value: string) => void;
  changeStrokeDashArray: (value: number[]) => void;
  addCircle: () => void;
  addRectangleSoft: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;
  canvas: fabric.Canvas;
  getActiveFontWeight: () => number;
  getActiveFontFamily: () => string;
  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveStrokeWidth: () => number;
  getActiveStrokeDashArray: () => number[];
  selectedObjects: fabric.Object[];
}
