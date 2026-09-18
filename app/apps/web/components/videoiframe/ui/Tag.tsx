export const Tag = ({
  icon,
  number,
  text,
}: {
  icon: React.ReactNode;
  number: string;
  text: string;
}) => {
  return (
    <div className="flex gap-2 items-center">
      <span className="*:size-5 text-foreground/50">{icon}</span>
      <span className="text-2xl font-semibold">{number}</span>
      <span className="text-xs text-foreground/50">{text}</span>
    </div>
  );
};
