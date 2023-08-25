import { Tag } from "lucide-react";

interface TagSectionProps {
  tags: {
    id: string;
    label: string;
  }[];
}
const TagSection: React.FC<TagSectionProps> = ({ tags }) => {
  return (
    <section className="bg-slate-50 p-4 en">
      <div className="flex text-md font-bold text-sky-900 gap-2 items-center">
        <Tag className="h-4 w-4" />
        <h4 className="">Related topics</h4>
      </div>
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
