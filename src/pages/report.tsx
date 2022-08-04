import styled from "@emotion/styled";
import type { HeadFC } from "gatsby";
import * as React from "react";
import { media } from "~/theme/media";
import { defaultSpacing } from "~/theme/spacing";
import { getColor } from "~/theme/colors";
import { getTypography } from "~/theme/typography";
import ReportForm from "~/components/report-form";
import SkipLinks from "~/components/skip-links/skip-links";

const StyledMain = styled.main`
  ${defaultSpacing}

  text-align: center;
  padding-top: 128px;
  padding-bottom: 64px;

  ${media.M} {
    padding-top: 256px;
    padding-bottom: 128px;
  }
`;

const MainHeader = styled.h1`
  ${getTypography("h2")}

  > span {
    box-shadow: 10px 0px ${getColor("pink1")}, -10px 0px ${getColor("pink1")};
    background-color: ${getColor("pink1")};
  }

  margin-bottom: 12px;

  ${media.M} {
    margin-bottom: 48px;
  }
`;

export default function ReportClaim() {
  return (
    <>
      <SkipLinks
        content={[{ href: "#form-content", label: "Go to form content" }]}
      ></SkipLinks>
      <StyledMain>
        <MainHeader>
          <span>Claim report</span>
        </MainHeader>
        <ReportForm />
      </StyledMain>
    </>
  );
}

export const Head: HeadFC = () => (
  <>
    <title>The Insurer | Claim report</title>
    <meta
      name="description"
      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
          pellentesque sapien."
    ></meta>
  </>
);
