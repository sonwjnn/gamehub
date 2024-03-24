import { UserButton } from "@/components/auth/user-button";

interface SetupLayoutProps {
  children: React.ReactNode;
}

const SetupLayout = ({ children }: SetupLayoutProps) => {
  return (
    <>
      <UserButton />
      <div className="flex h-full pt-20">{children}</div>
    </>
  );
};

export default SetupLayout;
