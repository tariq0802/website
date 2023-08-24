interface TagSectionProps {
  tags: {
    id: string;
    label: string;
  }[];
}
const TagSection: React.FC<TagSectionProps> = ({ tags }) => {
  return (
    <section className="bg-slate-50 p-4 en">
      <h4 className="text-lg font-bold text-sky-900 bn">ট্যাগ সমূহ:</h4>
      <div className="flex flex-wrap gap-3 mt-2">
        {tags.map((tag) => (
          <div key={tag.id} className="bg-sky-800 rounded p-1 px-3">
            <p className="text-slate-50 text-sm font-medium">{tag.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TagSection;
