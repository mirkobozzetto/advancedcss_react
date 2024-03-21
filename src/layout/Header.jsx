import CircleLogo from "@/components/CircleLogo";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo-box">
        <CircleLogo />
      </div>
      <h1 className="heading-primary">
        <span className="heading-primary--main">WWWave</span>
        <span className="heading-primary--sub">
          Exciting journeys for your mind
        </span>
      </h1>
    </header>
  );
};
export default Header;
