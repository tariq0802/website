"use client";

function CustomQuoteRenderer({ data }: any) {
  data;

  return (
    <div className="my-4 mx-12 border-l-4 pl-4 border-orange-200">
      <p className="text-gray-800 text-xs italic font-serif">{data.text}</p>
      <p className="text-xs font-semibold text-gray-600 pt-2 font-serif">
        {data.caption}
      </p>
    </div>
  );
}

export default CustomQuoteRenderer;
