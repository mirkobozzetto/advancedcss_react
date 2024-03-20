import CircleLogo from "@/components/CircleLogo";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-box">
        <CircleLogo />
      </div>
      <h1 className="heading-primary">
        <span className="heading-primary-main">WWWave</span>
        <span className="heading-primary-sub">
          Exciting tours for adventurous for your brain
        </span>
      </h1>
    </header>
  );
};
export default Header;
