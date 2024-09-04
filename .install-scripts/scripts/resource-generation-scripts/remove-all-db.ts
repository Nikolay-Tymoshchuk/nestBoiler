import fs from 'fs';
import path from 'path';

import replace from '../../helpers/replace';

const removeAllDbResourceGeneration = () => {
  const filesToRemove = [
    path.join(process.cwd(), '.hygen', 'generate', 'all-db-resource'),
  ];

  replace({
    path: path.join(process.cwd(), 'package.json'),
    actions: [
      {
        find: /\s*\"generate:resource:all-db\":.*/g,
        replace: '',
      },
      {
        find: /\s*\"postgenerate:resource:all-db\":.*/g,
        replace: '',
      },
    ],
  });

  filesToRemove.map((file) => {
    fs.rmSync(file, {
      recursive: true,
      force: true,
    });
  });
};

export default removeAllDbResourceGeneration;
