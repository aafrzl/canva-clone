import { protectPage } from "@/app/features/auth/utils";
import { Editor } from "@/app/features/editor/components/editor";
import React from "react";

export default async function EditorProjectId() {
  await protectPage();

  return <Editor />;
}
