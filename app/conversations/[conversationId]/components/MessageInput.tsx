"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface MessageInputProps {
  id: string;
  errors: FieldErrors;
  placeholder?: string;
  required?: boolean;
  type?: string;
  register: UseFormRegister<FieldValues>;
}
const MessageInput: React.FC<MessageInputProps> = ({
  id,
  errors,
  placeholder,
  required,
  register,
  type,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        placeholder={placeholder}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
