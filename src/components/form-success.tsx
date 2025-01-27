import { CheckCircledIcon } from "@radix-ui/react-icons";

type Props = {
  message?: string;
};

const FormSuccess = ({ message }: Props) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500 p-3 py-2 rounded-md flex items-center gap-x-2 text-sm text-white">
      <CheckCircledIcon className=" h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
