interface TextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function Textarea({ label, value, onChange }: TextareaProps) {
  return (
    <div className="relative w-full min-w-[188px] mt-6">
      <textarea
        className="peer w-full h-full min-h-[68px] bg-transparent border-2 rounded border-gray-500 focus:border-primary p-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <label
        className={`absolute top-5 ${
          value.length > 0
            ? "-translate-y-11 left-1"
            : "-translate-y-1/2 left-3"
        } text-gray-500 duration-200 ease-linear peer-focus:-translate-y-11 peer-focus:text-primary peer-focus:left-1`}
      >
        {label}
      </label>
    </div>
  );
}

export default Textarea;
