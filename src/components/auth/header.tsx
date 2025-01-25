type Props = {
  label: string;
};

const Header = ({ label }: Props) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="font-bold text-3xl text-neutral-800 dark:text-neutral-200">Auth</h1>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">{label}</p>
    </div>
  );
};

export default Header;
