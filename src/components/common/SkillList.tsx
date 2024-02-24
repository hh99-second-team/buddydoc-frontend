import React from 'react';
import styled from 'styled-components';
import { skillsIcon } from '../../constants/data';
import CircleIcon from '../common/CircleIcon';

interface Props {
  skip?: boolean;
  skillList: string[];
  size?: 'small' | 'basic' | string;
}

const SkillList = ({ skip, skillList, size }: Props) => {
  return (
    <SkillBox>
      {skip &&
        skillList
          .slice(0, 5)
          .map((skill, idx) => <CircleIcon key={idx} size={size} src={skillsIcon[skill]} fallback={skill} />)}
      {skip && skillList.length > 5 && (
        <CircleIcon size={size} src="" fallback={'+' + (skillList.length - 5).toString()} />
      )}
      {!skip &&
        skillList.map((skill, idx) => <CircleIcon key={idx} size={size} src={skillsIcon[skill]} fallback={skill} />)}
    </SkillBox>
  );
};

const SkillBox = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
`;

export default SkillList;
