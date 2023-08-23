"use client";

function CustomCodeRenderer({ data }: any) {
  data;

  return (
    <pre className="bg-gray-800 rounded-md p-4 font-semibold my-4 overflow-auto">
      <code className="text-gray-200 text-sm">{data.code}</code>
    </pre>
  );
}

export default CustomCodeRenderer;
