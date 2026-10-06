import Link from "next/link";

type GoBackProps = {
  href: string;
};

export default function GoBack({ href }: GoBackProps) {
  return (
    <div className="v-container">
      <Link
        href={href}
        className="text-body text-muted hover:text-brand inline-block transition-[color] duration-200"
      >
        Go Back
      </Link>
    </div>
  );
}
