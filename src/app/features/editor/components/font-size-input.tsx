import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { ChangeEvent } from "react";

interface FontSizeInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function FontSizeInput({ value, onChange }: FontSizeInputProps) {
  const increament = () => onChange(value + 1);
  const decreament = () => onChange(value - 1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) return;
    onChange(value);
  };

  return (
    <div className="flex items-center">
      <Button
        variant={"outline"}
        className="rounded-r-none border-r-0 p-2"
        size={"icon"}
        onClick={decreament}
      >
        <Minus size={16} />
      </Button>
      <Input
        value={value}
        onChange={handleChange}
        className="w-[50px] h-8 focus-visible:ring-offset-0 focus-visible:ring-0 rounded-none border-x-0"
      />
      <Button
        variant={"outline"}
        className="rounded-l-none border-l-0 p-2"
        size={"icon"}
        onClick={increament}
      >
        <Plus size={16} />
      </Button>
    </div>
  );
}
