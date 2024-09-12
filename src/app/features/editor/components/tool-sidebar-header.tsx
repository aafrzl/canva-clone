import React from "react";

interface Props {
  title: string;
  description?: string;
}

export default function ToolSidebarHeader({ title, description }: Props) {
  return (
    <div className="p-4 border-b space-y-1 h-16">
      <p className="text-sm font-medium">{title}</p>
      {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
  );
}
