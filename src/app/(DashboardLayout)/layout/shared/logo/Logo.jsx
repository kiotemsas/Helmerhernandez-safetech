import { useSelector } from 'react-redux';
import Link from "next/link";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { Margin } from '@mui/icons-material';

const Logo = () => {
  const customizer = useSelector((state) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: "auto",
    width: customizer.isCollapse ? "40px" : "180px",
  }));


  if (customizer.activeDir === "ltr") {
    return (
      <LinkStyled href="/">
        {customizer.activeMode === "dark" ? (
          <Image
            src="/images/logos/logo.webp"
            alt="logo"
            height={60}
            width={175}
            className="logo"
            priority
          />
        ) : (
          <Image
            src={"/images/logos/logo.webp"}
            alt="logo"
            height={60}
            width={175}
            className="logo"
            priority
          />
        )}
      </LinkStyled>
    );
  }

  

  return (
    <LinkStyled href="/">
      {customizer.activeMode === "dark" ? (
        <Image
          src="/images/logos/dark-rtl-logo.svg"
          alt="logo"
          height={30}
          width={174}
          priority
        />
      ) : (
        <Image
          src="/images/logos/light-logo-rtl.svg"
          alt="logo"
          height={30}
          width={174}
          priority
        />
      )}
    </LinkStyled>
  );
};

export default Logo;
