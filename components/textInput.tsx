import { useField } from "formik";

export const TextInput = ({label, hidden = false, ...props} : any) => {
    const [field, meta] = useField(props);
    return (
        <div className={`${!hidden ? 'flex flex-col gap-2 w-full' : 'hidden'}`}>
            <label {...field} {...props} htmlFor={props.id || props.name}>{label}</label>
            <input className="border-solid border-[1px] border-gray-300 p-2 rounded-md" {...field} {...props} />
            {meta.touched && meta.error ? (
                <span className="font-bold text-red-500">{meta.error}</span>
            ) : null}
        </div>
    );
};