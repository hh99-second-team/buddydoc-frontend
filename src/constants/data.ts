import react from '../assets/react-icon.png';
import typescript from '../assets/typescript-icon.png';
import node from '../assets/nodejs-icon.png';

interface skillType {
  [key: string]: string;
}

const skillsIcon: skillType = {
  react,
  typescript,
  node,
};

const skills = [
  'React.js',
  'Vue.js',
  'React Native',
  'Node.js',
  'JavaScript',
  'TypeScript',
  'Java',
  'Spring',
  'Spring Boot',
  'HTML',
  'CSS',
  'MySql',
  'Mongo DB',
  'Python',
];

const positions = ['프론트엔드', '백엔드', 'IOS', '안드로이드', '데브옵스', '디자이너', '기획'];

const career = ['초보', '1년 미만', '1년 이상 ~ 3년 이하', '3년 이상 ~ 5년 이하', '5년 이상'];

const studyType = ['스터디', '프로젝트'];

const period = ['2주 이내', '3주', '1달', '1달 ~ 2달', '2달 ~ 3달', '3개월 이상', '미정'];

export { skillsIcon, skills, positions, career, studyType, period };
