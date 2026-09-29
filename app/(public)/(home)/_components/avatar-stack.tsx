import { Avatar } from "./avatar";

export function AvatarStack({ names, alumni }: { names: string[]; alumni: boolean }) {
  return (
    <div className="flex justify-center -space-x-3">
      {names.slice(0, 5).map((n) => (
        <Avatar key={n} name={n} alumni={alumni} size={46} />
      ))}
    </div>
  );
}
