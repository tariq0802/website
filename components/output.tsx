"use client";

import CustomImageRenderer from "@/components/renderers/CustomImageRenderer";
import CustomCodeRenderer from "@/components/renderers/CustomCodeRenderer";
import { FC } from "react";
import dynamic from "next/dynamic";
import CustomQuoteRenderer from "./renderers/CustomQuoteRenderer";
import CustomCardRenderer from "./renderers/CustomCardRenderer";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);

interface EditorOutputProps {
  content: any;
  suggestion?: any;
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
  quote: CustomQuoteRenderer,
  card: CustomCardRenderer,
};

const style = {
  paragraph: {
    fontSize: "1.05rem",
    lineHeight: "1.75rem",
    margin: "0 0 1.25rem",
    color: "#161725e6",
  },
};

const EditorOutput: FC<EditorOutputProps> = ({ content, suggestion }) => {
  const blocks = content.blocks || [];
  const middleBlockIndex = Math.floor(blocks.length / 2);
  const updatedBlocks = [...blocks];

  updatedBlocks.splice(middleBlockIndex + 1, 0, {
    id: "articleId",
    data: {
      cards: suggestion,
    },
    type: "card",
    extraClass: "additional-content",
  });

  const modifiedContent = {
    ...content,
    blocks: updatedBlocks,
  };

  return <Output style={style} renderers={renderers} data={modifiedContent} />;
};

export default EditorOutput;
