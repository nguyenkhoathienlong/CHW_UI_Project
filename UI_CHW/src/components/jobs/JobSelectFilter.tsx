import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface JobSelectFilterProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  widthClass?: string;
}

export default function JobSelectFilter({ label, value, onChange, options, placeholder, widthClass = "w-48" }: JobSelectFilterProps) {
  return (
    <div className={widthClass}>
      {label && <div className="mb-1 text-sm font-medium text-gray-700">{label}</div>}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={`${widthClass} h-10 px-5 py-2 rounded-[5px] border border-gray-300 bg-white text-blue-700 placeholder:text-gray-400 focus:bg-[#e0e7ef] focus:text-[#2563eb]`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="rounded-[5px]">
          <SelectGroup>
            {options.map((opt) => (
              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
} 