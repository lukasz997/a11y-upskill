import { css, Global, ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import { GatsbyLinkProps, Link } from "gatsby";
import React, {
  FunctionComponent,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import theme from "~/theme";
import { colors, getColor } from "~/theme/colors";
import { media } from "~/theme/media";
import { defaultSpacing } from "~/theme/spacing";
import { zindex } from "~/theme/zindex";
import HamburgerButton from "~/components/hamburger-button/hamburger-button";
import Logo from "~/components/logo/logo";
import { useWindowSize } from "~/utils/useWindowSize";
import Modal from "../modal";
import Button from "../button/button";

interface LayoutProps {
  children: ReactNode;
}

const globalStyles = css`
  @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap");

  * {
    font-family: "Raleway", sans-serif;
    box-sizing: border-box;
    color: #565d8f;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  body,
  html,
  #___gatsby {
    padding: 0px;
    margin: 0px;
    background-color: ${colors.white1};
    overflow-x: hidden;
    height: 100%;
  }

  #___gatsby {
    padding: 0px;
    margin: 0px;
  }
`;

const StyledLink = styled(Link)<{ label: string; current?: boolean }>`
  color: #565d8f;
  text-decoration: none;
  line-height: 1.25rem;
  position: relative;
  text-align: left;

  transition: font-weight 0.1s ease;

  :hover,
  :focus {
    font-weight: 700;

    ::after {
      width: 5ch;
    }
  }

  ::before {
    line-height: 1.25rem;
    content: attr(label);
    display: block;

    font-weight: bold;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }

  ::after {
    position: absolute;
    left: -9px;
    top: -5px;
    bottom: -5px;
    background-color: #fed6e3;
    width: 0px;
    content: "";
    z-index: ${zindex.background};
    transition: width 0.3s ease;
  }

  &[aria-current="page"] {
    font-weight: 700;

    ::after {
      width: calc(100% + 18px) !important;
    }
  }
`;

StyledLink.defaultProps = {
  partiallyActive: true,
};

const Header = styled.header<{ transparent: boolean }>`
  display: block;

  transition: background-color 0.3s ease;
  transition-delay: ${({ transparent }) => (!transparent ? 0.3 : 0)};

  background-color: ${getColor("white1")};

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding-left: 16px;
  padding-right: 16px;

  ${media.S} {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

const Nav = styled.nav`
  display: inline-flex;

  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const List = styled.ul<{ open: boolean }>`
  padding: 0;
  margin: 0;
  padding: 16px 32px 16px 16px;
  display: none;
  gap: 18px;
  list-style: none;
  grid-auto-flow: row;
  grid-auto-rows: max-content;
  padding-top: ${({ open }) => open && "84px"};

  z-index: ${zindex.menu};
  position: absolute;
  top: 0px;
  left: 100%;
  right: 0;
  bottom: 0;
  background-color: ${({ theme, open }) =>
    open ? getColor("white1")({ theme }) : "transparent"};
  transform: translateY(calc(-60px));
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: 0;

  ${media.M} {
    background-color: transparent;
    height: auto;
    transform: translateY(0) !important;
    opacity: 1 !important;
    display: grid;
    gap: 42px;

    position: initial;
    grid-auto-flow: column;
  }

  ${({ open }) =>
    open &&
    css`
      display: grid;

      transform: translateY(0px);
      opacity: 1;
      left: 0;
    `}
`;

const MobileCloseButton = styled(Button)`
  margin-top: 42px;

  ${media.M} {
    display: none;
  }
`;

const logoStyles = css`
  width: 140px;

  ${media.S} {
    width: 220px;
  }

  ${media.M} {
    width: 240px;
  }
`;

const CustomLink = ({
  children,
  to,
  partiallyActive = true,
  onClick,
}: GatsbyLinkProps<unknown> & { children: string }) => {
  return (
    <li>
      <StyledLink
        to={to}
        partiallyActive={partiallyActive}
        label={children}
        onClick={onClick}
      >
        {children}
      </StyledLink>
    </li>
  );
};

const StyledFooter = styled.footer`
  background-color: ${getColor("white1")};
  text-align: center;
`;

const MenuListWrapper = ({
  children,
  open,
  closeModal,
}: {
  children: ReactNode;
  open: boolean;
  closeModal: () => void;
}) => {
  const { width } = useWindowSize();
  if (typeof width === "undefined") {
    return <>{children}</>;
  }

  if (width < 1024) {
    return (
      <Modal open={open} closeModal={closeModal}>
        {children}
      </Modal>
    );
  }

  return <>{children}</>;
};

const Navigation = () => {
  const ref = useRef<HTMLUListElement>(null);

  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = useCallback(() => setMenuOpened((curr) => !curr), []);

  const hideMenu = () => setMenuOpened(false);

  return (
    <Header transparent={!menuOpened}>
      <Nav aria-label="Main menu">
        <Logo styles={logoStyles} />
        <HamburgerButton open={menuOpened} onClick={toggleMenu} label="Menu" />
        <MenuListWrapper open={menuOpened} closeModal={hideMenu}>
          <List ref={ref} open={menuOpened} aria-label="Menu">
            <CustomLink to="/" onClick={hideMenu} partiallyActive={false}>
              Insurance
            </CustomLink>
            <CustomLink to="/about-us" onClick={hideMenu}>
              About us
            </CustomLink>
            <CustomLink to="/report" onClick={hideMenu}>
              Claim report
            </CustomLink>
            <CustomLink to="/contact" onClick={hideMenu}>
              Contact us
            </CustomLink>
            <MobileCloseButton variant="outlined" onClick={hideMenu}>
              Close navigation
            </MobileCloseButton>
          </List>
        </MenuListWrapper>
      </Nav>
    </Header>
  );
};

const FooterContent = styled.div`
  ${defaultSpacing}
  padding-top: 16px;
  padding-bottom: 16px;
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;

  ${media.M} {
    flex-direction: row;
  }
`;

const FooterItem = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const FooterHeader = styled.h3`
  margin-bottom: 12px;
  font-size: 1.4rem;
`;

const FooterMenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-decoration: none;
  display: grid;
  grid-auto-flow: row;
  gap: 10px;
`;

const FooterListsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-auto-flow: row;

  ${media.M} {
    grid-auto-flow: column;
    gap: 32px;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
`;

const footerLogoStyles = css`
  width: 240px;
  margin-bottom: 12px;
`;

const Footer = () => {
  return (
    <StyledFooter id="footer">
      <FooterContent>
        <Logo styles={footerLogoStyles} />

        <FooterListsContainer>
          <FooterItem>
            <FooterHeader>About us</FooterHeader>
            <FooterMenuList>
              <CustomLink to="/empty">Newsroom</CustomLink>
              <CustomLink to="/empty">Careers</CustomLink>
              <CustomLink to="/empty">Our story</CustomLink>
              <CustomLink to="/empty">Customer stories</CustomLink>
            </FooterMenuList>
          </FooterItem>

          <FooterItem>
            <FooterHeader>Products</FooterHeader>
            <FooterMenuList>
              <CustomLink to="/empty">Vacation / Holiday</CustomLink>
              <CustomLink to="/empty">Student / Scholar</CustomLink>
              <CustomLink to="/empty">Mission</CustomLink>
              <CustomLink to="/empty">Marine Captain / Crew</CustomLink>
              <CustomLink to="/empty">Employer / Business traveler</CustomLink>
            </FooterMenuList>
          </FooterItem>

          <FooterItem>
            <FooterHeader>Members</FooterHeader>
            <FooterMenuList>
              <CustomLink to="/empty">Forms library</CustomLink>
              <CustomLink to="/empty">Find a doctor</CustomLink>
              <CustomLink to="/empty">Renew policy</CustomLink>
              <CustomLink to="/empty">Claims center</CustomLink>
            </FooterMenuList>
          </FooterItem>
        </FooterListsContainer>
      </FooterContent>
    </StyledFooter>
  );
};

const SkipLinksContainer = styled.ul`
  height: 0px;
  margin: 0px;
  display: flex;
  padding: 0px;
  list-style: none;
`;

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <SkipLinksContainer id="skip-links" aria-label="Skip links" />
      <Global styles={globalStyles} />
      <Navigation />
      {children}
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
