import react from '../assets/react-icon.png';
import typescript from '../assets/typescript-icon.png';
import node from '../assets/nodejs-icon.png';

interface skillType {
  [key: string]: string;
}

export const skillsIcon: skillType = {
  react,
  typescript,
  node,
};

export const skills = [
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

export const positions = ['프론트엔드', '백엔드', 'IOS', '안드로이드', '데브옵스', '디자이너', '기획'];

export const career = ['초보', '1년 미만', '1년 이상 ~ 3년 이하', '3년 이상 ~ 5년 이하', '5년 이상'];
