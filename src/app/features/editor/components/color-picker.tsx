import { ChromePicker, CirclePicker } from "react-color";
import { colors } from "../../types";
import { rgbaObjectToString } from "@/lib/utils";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ColorPicker({ value, onChange }: Props) {
  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={value}
        onChange={(color) => {
          const formattedColor = rgbaObjectToString(color.rgb);
          onChange(formattedColor);
        }}
        className="border rounded-lg"
      />
      <CirclePicker
        colors={colors}
        color={value}
        onChangeComplete={(color) => {
          const formattedColor = rgbaObjectToString(color.rgb);
          onChange(formattedColor);
        }}
      />
    </div>
  );
}
