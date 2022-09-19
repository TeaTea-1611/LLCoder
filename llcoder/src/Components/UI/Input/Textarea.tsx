interface TextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function Textarea({ label, value, onChange }: TextareaProps) {
  return (
    <div className="relative w-full">
      <textarea
        className="peer w-full h-full min-h-[88px] bg-transparent text-sky-700 font-sans font-normal outline outline-0 focus:outline-0 resize-y disabled:bg-sky-50 disabled:border-0 disabled:resize-none transition-all placeholder-shown:border placeholder-shown:border-slate-700 placeholder-shown:border-t-slate-700 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-slate-700 focus:border-sky-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        placeholder=""
      />
      <label
        className={`flex w-full h-full select-none pointer-events-none absolute left-0 font-normal leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-sky-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] peer-focus:text-sky-500 before:border-slate-700 peer-focus:before:border-sky-500 dark:after:border-slate-700 peer-focus:after:border-sky-500`}
      >
        {label}
      </label>
    </div>
  );
}

export default Textarea;
