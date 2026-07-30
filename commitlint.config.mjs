const types = ['feat', 'fix', 'refactor', 'docs', 'design', 'style', 'misc', 'chore', 'deps', 'test', 'hotfix'];

const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [...types, ...types.map((type) => type[0].toUpperCase() + type.slice(1))]],
    'type-case': [0],
    'subject-case': [0],
    'body-max-line-length': [0],
    'footer-max-line-length': [0],
  },
};

export default config;
