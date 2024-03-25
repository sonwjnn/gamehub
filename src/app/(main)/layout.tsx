import { UserButton } from "@/components/auth/user-button";
import { Navbar } from "./_components/navbar";

interface SetupLayoutProps {
  children: React.ReactNode;
}

const SetupLayout = ({ children }: SetupLayoutProps) => {
  return (
    <div className="inner_page">
      <main>
        <Navbar />
        <div className="game_body">{children}</div>
      </main>
    </div>
  );
};

export default SetupLayout;
