import React from 'react';
import styled from 'styled-components';
import VideoFilterDropdown from './VideoFilterDropdown';
const VideoFilter = ({ scrollProp, setScrollProp }) => {
  const handleMode = (e) => {
    setScrollProp({ ...scrollProp, length: Number(e.target.value), page: 0 });
  };
  return (
    <FilterContainer>
      <VideoFilterDropdown
        scrollProp={scrollProp}
        setScrollProp={setScrollProp}
      />
      <RadioWrapper>
        <label htmlFor="ALL">
          <Checkbox
            name="mode"
            id="ALL"
            value="0"
            defaultChecked
            onChange={handleMode}
          />
          전체
        </label>
        <label htmlFor="3분">
          <Checkbox name="mode" id="3분" value="3" onChange={handleMode} />
          3분
        </label>
        <label htmlFor="5분">
          <Checkbox name="mode" id="5분" value="5" onChange={handleMode} />
          5분
        </label>
        <label htmlFor="10분">
          <Checkbox name="mode" id="10분" value="10" onChange={handleMode} />
          10분
        </label>
      </RadioWrapper>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  margin-top: 0.3rem;

  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const RadioWrapper = styled.div`
  width: 17.5rem;
  display: flex;
  justify-content: space-evenly;
  margin-top: 0.1rem;
  color: ${(props) => props.theme.color.primary};
  font-weight: bold;

  & > label {
    &:hover {
      cursor: pointer;
    }
  }
`;
export default VideoFilter;

const Checkbox = styled.input.attrs({ type: 'radio' })`
  margin-right: 0.5rem;
  appearance: none;
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 100%;
  background-color: ${(props) => props.theme.color.secondary};
  cursor: pointer;
  &:checked {
    background-color: ${(props) => props.theme.color.primary};
  }
`;
