import React from "react";
import styled from "@emotion/styled";
import type { HeadFC } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import SkipLinks, { SkipLinkItem } from "~/components/skip-links/skip-links";
import { getColor } from "~/theme/colors";
import { defaultSpacing } from "~/theme/spacing";
import { getTypography } from "~/theme/typography";
import Button from "../components/button/button";
import { media } from "../theme/media";

const skipLinks: SkipLinkItem[] = [
  { href: "#main", label: "Skip to main" },
  { href: "#footer", label: "Skip to page footer" },
];

const StyledHeader = styled.h1`
  ${getTypography("h1")}
  margin: 0px 0px 2rem;
  text-align: center;
`;

const StyledHeroContainer = styled.section`
  ${defaultSpacing}
  min-height: 100vh;
  padding-bottom: 64px;
  padding-top: 64px;
  color: #565d8f;

  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledHeroParagraph = styled.p`
  font-size: 1.2rem;
  padding: 0px 16px;
  text-align: center;
  line-height: 1.6rem;
  max-width: 48ch;

  ${media.M} {
    font-size: 1.6rem;
    line-height: 2.4rem;

    padding: 0px 32px;
    max-width: 64ch;
  }

  ${media.L} {
    font-size: 2rem;
    line-height: 3rem;
    padding: 0px 48px;
  }

  ${media.XL} {
    font-size: 2.6rem;
    line-height: 3.4rem;
    padding: 0px 64px;
  }
`;

const DescriptionSection = styled.section`
  ${defaultSpacing}

  display: grid;
  gap: 48px;
  padding-bottom: 48px;

  ${media.M} {
    margin-top: -30vh;
    padding-top: 25vh;
    padding-bottom: 12vh;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 70px;
`;

const ImageWrapper = styled.div<{ shadow?: "left" | "right" }>`
  display: flex;
  max-width: 480px;
  margin: auto;
  box-shadow: ${({ shadow }) => (shadow === "left" ? -10 : 10)}px -8px ${getColor("pink1")};
  margin-top: 32px;

  ${media.M} {
    width: 90%;
    max-width: 900px;
  }
`;

const TopicsSection = styled.section`
  text-align: center;
  ${defaultSpacing}
`;

const FlexTile = styled.div`
  ${media.M} {
    flex: 0 0 50%;
  }
`;

const DescriptionArticle = styled.article<{ reverse?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin: auto;

  ${media.M} {
    max-width: 1200px;
    flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};
    justify-content: space-between;
  }

  ul {
    padding-left: 24px;
    margin: 0;
    margin-top: 8px;

    li {
      ${getTypography("p")}
    }
  }
`;

const Header = styled.h2`
  ${getTypography("h2")}
  margin-bottom: 16px;

  > span {
    background-color: ${getColor("pink1")};
    box-shadow: 10px 0px ${getColor("pink1")}, -10px 0px ${getColor("pink1")};
    line-height: 2.8rem;
  }
`;

const DescriptionParagraph = styled.p`
  ${getTypography("p")}

  ${media.M} {
    max-width: 45ch;
    margin-top: 12px;
    margin-bottom: 8px;
  }

  ${media.L} {
  }
`;

const DescriptionContent = styled.div`
  ${media.M} {
    display: flex;
    justify-content: center;
    height: 100%;
    flex-direction: column;
    max-width: 70%;
    margin: auto;
  }
`;

const TopicsSectionHeader = styled(Header)`
  margin-bottom: 16px;

  ${media.S} {
    margin-bottom: 24px;
  }

  ${media.M} {
    margin-bottom: 48px;
  }
`;

const TopicsList = styled.ul`
  width: 100%;
  max-width: 1200px;
  margin: 0px auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
  list-style: none;
  padding-left: 0px;

  ${media.M} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const TopicItem = styled.li`
  text-align: center;
`;

const TopicHeader = styled.h3`
  ${getTypography("h3")}
  margin-top: 12px;
  margin-bottom: 12px;

  ${media.M} {
    font-size: 1.4rem;
    line-height: 1.8rem;
  }
`;

const TopicImage = () => (
  <StaticImage
    src="../images/rect-illustration.jpg"
    alt="Image for "
    placeholder="blurred"
    layout="constrained"
  />
);

const TestimonialSection = styled.section`
  ${defaultSpacing};
  padding-top: 64px;
  padding-bottom: 64px;

  ${media.M} {
    padding-top: 128px;
    padding-bottom: 128px;
  }
`;

const TestimonialContainer = styled.article`
  padding: 32px;
  background-color: ${getColor("pink1")};
  max-width: 800px;
  margin: auto;
  text-align: center;

  ${media.S} {
    padding: 48px;
  }
`;

const Blockquote = styled.blockquote`
  margin: 0;
  > p {
    font-style: italic;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 2.4rem;
    margin-bottom: 1rem;

    ${media.S} {
      margin-bottom: 1.8rem;
    }
  }

  > address {
    font-style: normal;
    font-weight: 400;
    margin-top: 1rem;

    ${media.S} {
      margin-top: 1.4rem;
    }
  }
`;

const ContactSection = styled.section`
  ${defaultSpacing}
  max-width: 1200px;
  margin: auto;
  width: 100%;
  padding-bottom: 64px;
  padding-top: 32px;

  ${media.M} {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 64px;
    padding-bottom: 128px;
  }
`;

const ContactSectionHeader = styled.h2`
  > span {
    border-bottom: 5px solid ${getColor("pink1")};
    background-color: none;
  }

  font-size: 1.6rem;
  line-height: 2.4rem;
  margin-bottom: 12px;

  ${media.S} {
    font-size: 2rem;
    line-height: 2.2rem;
  }

  ${media.M} {
    display: inline-block;
  }
`;

const ContactSectionParagraph = styled(ContactSectionHeader)`
  font-size: 1.2rem;
  line-height: 1.4rem;

  ${media.S} {
    font-size: 1.4rem;
    line-height: 1.6rem;
  }
`;

const ContactSectionTextContainer = styled.div`
  text-align: center;

  ${media.M} {
    text-align: left;
    display: flex;
    white-space: nowrap;
    flex-direction: column;
  }
`;
const ContactSectionButtonxBox = styled.div`
  display: inline-flex;
  justify-content: space-around;
  width: 100%;
  gap: 24px;
  padding-top: 32px;

  > button {
    min-width: 140px;
  }

  ${media.M} {
    width: auto;
    padding-top: 0px;
    justify-content: flex-start;
    align-items: center;
  }
`;

const IndexPage = () => {
  return (
    <main id="main">
      <SkipLinks content={skipLinks} />

      <StyledHeroContainer>
        <StyledHeader>Travel insurance</StyledHeader>
        <StyledHeroParagraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
          pellentesque sapien.
        </StyledHeroParagraph>
        <StyledButton
          size="big"
          onClick={() => {
            console.log("click");
          }}
        >
          Order now
        </StyledButton>
      </StyledHeroContainer>

      <DescriptionSection>
        <DescriptionArticle reverse>
          <FlexTile>
            <DescriptionContent>
              <Header>
                <span>Insurance for International Visitors</span>
              </Header>
              <DescriptionParagraph>
                Nullam consequat in nunc id hendrerit. Fusce varius rhoncus
                risus sit amet varius. Etiam fermentum ornare nunc eget congue.
                Nullam id arcu a justo malesuada rhoncus sit amet at velit.
              </DescriptionParagraph>
              <ul>
                <li>List item #1</li>
                <li>List item #2</li>
                <li>List item #3</li>
              </ul>
            </DescriptionContent>
          </FlexTile>

          <FlexTile>
            <ImageWrapper shadow="left">
              <StaticImage
                src="../images/illustration1.webp"
                alt="A dinosaur"
                placeholder="blurred"
                layout="constrained"
              />
            </ImageWrapper>
          </FlexTile>
        </DescriptionArticle>
        <DescriptionArticle>
          <FlexTile>
            <DescriptionContent>
              <Header>
                <span>Safe travels</span>
              </Header>
              <DescriptionParagraph>
                Suspendisse nunc nunc, iaculis ac sollicitudin a, gravida id
                quam. Sed id consequat nunc, vel viverra nibh. Duis vel ante
                augue. Mauris congue purus vehicula, vestibulum tellus et,
                ullamcorper sapien.
              </DescriptionParagraph>
            </DescriptionContent>
          </FlexTile>
          <FlexTile>
            <ImageWrapper>
              <StaticImage
                src="../images/illustration2.jpeg"
                alt="A dinosaur"
                placeholder="blurred"
                layout="constrained"
              />
            </ImageWrapper>
          </FlexTile>
        </DescriptionArticle>
      </DescriptionSection>

      <TopicsSection>
        <TopicsSectionHeader>
          <span>Explore our travel topics</span>
        </TopicsSectionHeader>
        <TopicsList>
          <TopicItem>
            <TopicImage />
            <TopicHeader>Renting vacation homes</TopicHeader>
          </TopicItem>
          <TopicItem>
            <TopicImage />
            <TopicHeader>Trends & predictions</TopicHeader>
          </TopicItem>
          <TopicItem>
            <TopicImage />
            <TopicHeader>Popular travel destinations for 2021</TopicHeader>
          </TopicItem>
          <TopicItem>
            <TopicImage />
            <TopicHeader>Travel gear for safe travels in 2021</TopicHeader>
          </TopicItem>
        </TopicsList>
      </TopicsSection>

      <TestimonialSection>
        <TestimonialContainer>
          <Blockquote>
            <p>
              "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit."
            </p>
            <StaticImage src="../images/dd.png" alt="Donald Duck" width={40} />
            <address>Donald Duck, CEO of Disney</address>
          </Blockquote>
        </TestimonialContainer>
      </TestimonialSection>

      <ContactSection>
        <ContactSectionTextContainer>
          <ContactSectionHeader>
            <span>Are you looking for an insurance?</span>
          </ContactSectionHeader>
          <ContactSectionParagraph as="p">
            <span>Contact us to order now</span>
          </ContactSectionParagraph>
        </ContactSectionTextContainer>

        <ContactSectionButtonxBox>
          <Button variant="outlined">Call us</Button>
          <Button>Send a message</Button>
        </ContactSectionButtonxBox>
      </ContactSection>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>The Insurer | Home Page</title>
    <meta
      name="description"
      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
          pellentesque sapien."
    ></meta>
  </>
);
