import React from 'react';
import styled from 'styled-components';

const Pattern = () => {
  return (
    <StyledWrapper>
      <div className="container" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    width: 100%;
    height: 100%;
    /* Add your background pattern here */
    background: repeating-radial-gradient(circle, #000, #000 5px, transparent 6px);
    background-size: 30px 30px;
  }`;

export default Pattern;
