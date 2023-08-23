"use client";

import CustomImageRenderer from "@/components/renderers/CustomImageRenderer";
import CustomCodeRenderer from "@/components/renderers/CustomCodeRenderer";
import { FC } from "react";
import dynamic from "next/dynamic";
import CustomQuoteRenderer from "./renderers/CustomQuoteRenderer";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);

interface EditorOutputProps {
  content: any;
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
  quote: CustomQuoteRenderer,
};

const style = {
  paragraph: {
    fontSize: "1.1rem",
    lineHeight: "1.5rem",
    margin: "0 0 1.25rem",
    color: "#161725e6",
  },
};

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return <Output style={style} renderers={renderers} data={content} />;
};

export default EditorOutput;
