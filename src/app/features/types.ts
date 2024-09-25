import { fabric } from "fabric";
import { ITextOptions } from "fabric/fabric-impl";
import * as material from "material-colors";

export const filters = [
  "none",
  "polaroid",
  "sepia",
  "kodachrome",
  "contrast",
  "brightness",
  "greyscale",
  "brownie",
  "vintage",
  "technicolor",
  "pixelate",
  "invert",
  "blur",
  "sharpen",
  "emboss",
  "removecolor",
  "blacknwhite",
  "vibrance",
  "blendcolor",
  "huerotate",
  "resize",
  "saturation",
  "gamma",
];

export const fonts = [
  // Default browser fonts
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
  "Times New Roman",
  "Times",
  "Georgia",
  "Palatino",
  "Baskerville",
  "Cambria",
  "Courier",
  "Courier New",
  "Consolas",
  "Monaco",
  "Lucida Console",
  "Menlo",
  "Comic Sans MS",
  "Apple Chancery",
  "Bradley Hand",
  "Impact",
  "Luminari",
  "Marker Felt",
  "Papyrus",

  // Extended Google Fonts list (Canva-like selection)
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Raleway",
  "Oswald",
  "Merriweather",
  "Ubuntu",
  "Playfair Display",
  "Rubik",
  "Noto Sans",
  "Nunito",
  "Source Sans Pro",
  "PT Sans",
  "Roboto Condensed",
  "Roboto Slab",
  "Yanone Kaffeesatz",
  "Quicksand",
  "Work Sans",
  "Fira Sans",
  "Arimo",
  "Noto Serif",
  "Dosis",
  "PT Serif",
  "Titillium Web",
  "Muli",
  "Crimson Text",
  "Josefin Sans",
  "Libre Baskerville",
  "Arvo",
  "Libre Franklin",
  "Nunito Sans",
  "Prompt",
  "Bitter",
  "Inconsolata",
  "Barlow",
  "Hind",
  "Karla",
  "Lora",
  "Anton",
  "Cabin",
  "Fjalla One",
  "Oxygen",
  "Nanum Gothic",
  "Exo 2",
  "IBM Plex Sans",
  "Pacifico",
  "Dancing Script",
  "Indie Flower",
  "Shadows Into Light",
  "Lobster",
  "Amatic SC",
  "Caveat",
  "Permanent Marker",
  "Satisfy",
  "Great Vibes",
  "Courgette",
  "Kaushan Script",
  "Cookie",
  "Sacramento",
  "Handlee",
  "Architects Daughter",
  "Fredoka One",
  "Patua One",
  "Abril Fatface",
  "Comfortaa",
  "Righteous",
  "Alegreya",
  "Alegreya Sans",
  "Archivo",
  "Archivo Narrow",
  "Assistant",
  "Asap",
  "Bangers",
  "Barlow Condensed",
  "Bebas Neue",
  "Bree Serif",
  "Calistoga",
  "Catamaran",
  "Cardo",
  "Chivo",
  "Cormorant",
  "Cormorant Garamond",
  "DM Sans",
  "DM Serif Display",
  "EB Garamond",
  "Encode Sans",
  "Exo",
  "Fira Code",
  "Francois One",
  "Gelasio",
  "Glegoo",
  "Heebo",
  "IBM Plex Mono",
  "IBM Plex Serif",
  "Inknut Antiqua",
  "Inter",
  "Jost",
  "Kanit",
  "Khand",
  "Kreon",
  "Lemonada",
  "Lexend Deca",
  "Libre Caslon Text",
  "Libre Franklin",
  "Literata",
  "Lustria",
  "Manrope",
  "Markazi Text",
  "Maven Pro",
  "Merriweather Sans",
  "Mulish",
  "Neuton",
  "Noto Sans JP",
  "Noto Sans KR",
  "Noto Sans SC",
  "Noto Sans TC",
  "Noto Serif JP",
  "Noto Serif KR",
  "Noto Serif SC",
  "Noto Serif TC",
  "Overpass",
  "Piazzolla",
  "Playfair Display SC",
  "Podkova",
  "Public Sans",
  "Quattrocento",
  "Quattrocento Sans",
  "Rajdhani",
  "Red Hat Display",
  "Red Hat Text",
  "Roboto Mono",
  "Rock Salt",
  "Rokkitt",
  "Ropa Sans",
  "Rozha One",
  "Rubik Mono One",
  "Ruda",
  "Rufina",
  "Signika",
  "Sora",
  "Source Code Pro",
  "Source Serif Pro",
  "Space Mono",
  "Spectral",
  "Staatliches",
  "Syne",
  "Tajawal",
  "Teko",
  "Tenor Sans",
  "Tinos",
  "Trirong",
  "Varela Round",
  "Viga",
  "Vollkorn",
  "Vollkorn SC",
  "Yeseva One",
  "Zilla Slab",
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
  copy: () => void;
  paste: () => void;
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
  onCopy: () => void;
  onPaste: () => void;
  changeFilterImage: (url: string) => void;
  addImage: (url: string) => void;
  deleteObject: () => void;
  addText: (value: string, options?: ITextOptions) => void;
  getActiveTextAlign: () => string;
  getActiveFontUnderline: () => boolean;
  getActiveFontLinethrough: () => boolean;
  getActiveFontStyle: () => string;
  getActiveOpacity: () => number;
  getActiveFontSize: () => number;
  changeFontSize: (value: number) => void;
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
