import {
  ImageIcon,
  LayoutTemplate,
  Settings,
  Shapes,
  SparklesIcon,
  TypeIcon,
} from "lucide-react";
import SidebarItem from "./sidebar-item";
import { ActiveTool } from "../../types";

interface SidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export default function Sidebar({
  activeTool,
  onChangeActiveTool,
}: SidebarProps) {
  return (
    <aside className="bg-white flex flex-col w-[100px] h-full border-r overflow-auto">
      <ul className="flex flex-col">
        <SidebarItem
          icon={LayoutTemplate}
          label="Design"
          isActive={activeTool === "templates"}
          onClick={() => onChangeActiveTool("templates")}
        />
        <SidebarItem
          icon={ImageIcon}
          label="Images"
          isActive={activeTool === "images"}
          onClick={() => onChangeActiveTool("images")}
        />
        <SidebarItem
          icon={TypeIcon}
          label="Text"
          isActive={activeTool === "text"}
          onClick={() => onChangeActiveTool("text")}
        />
        <SidebarItem
          icon={Shapes}
          label="Shapes"
          isActive={activeTool === "shapes"}
          onClick={() => onChangeActiveTool("shapes")}
        />
        <SidebarItem
          icon={SparklesIcon}
          label="AI Generate"
          isActive={activeTool === "ai"}
          onClick={() => onChangeActiveTool("ai")}
        />
        <SidebarItem
          icon={Settings}
          label="Settings"
          isActive={activeTool === "settings"}
          onClick={() => onChangeActiveTool("settings")}
        />
      </ul>
    </aside>
  );
}
