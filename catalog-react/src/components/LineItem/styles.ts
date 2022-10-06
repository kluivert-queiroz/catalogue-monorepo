import styled from "@emotion/styled";

export const LineItemContainer = styled.div`
  display: flex;
  gap: 1em;
  position: relative;
`;
export const LineItemInformationContainer = styled.div`
  display: flex;
  flexdirection: column;
  position: relative;
`;

export const LineItemStock = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`;
export const LineItemPrice = styled.div`
  bottom: 0px;
  position: absolute;
`;
export const ItemThumbnail = styled.img`
  width: 70px;
  height: 70px;
  background: grey;
  object-fit: cover;
`;
