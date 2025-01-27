import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type Props = {
  message?: string;
};

const FormError = ({ message }: Props) => {
  if (!message) return null;

  return (
    <div className="bg-destructive p-3 py-2 rounded-md flex items-center gap-x-2 text-sm text-white">
      <ExclamationTriangleIcon className="size-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
