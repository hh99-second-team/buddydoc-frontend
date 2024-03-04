import React from 'react';
import { skillsIcon } from '../../constants';
import CircleIcon from '../common/CircleIcon';

interface Props {
  skip?: boolean;
  skillList: string[];
  size?: 'small' | 'basic' | string;
}

const SkillList = ({ skip, skillList, size }: Props) => {
  return (
    <div>
      {skip &&
        skillList
          .slice(0, 5)
          .map((skill, idx) => <CircleIcon key={idx} size={size} src={skillsIcon[skill]} fallback={skill} />)}
      {skip && skillList.length > 5 && (
        <CircleIcon size={size} src="" fallback={'+' + (skillList.length - 5).toString()} />
      )}
      {!skip &&
        skillList.map((skill, idx) => <CircleIcon key={idx} size={size} src={skillsIcon[skill]} fallback={skill} />)}
    </div>
  );
};

export default SkillList;
