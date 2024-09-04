import fs from 'fs';
import path from 'path';

import replace from '../helpers/replace';

const removeInstallScripts = () => {
  replace({
    path: path.join(process.cwd(), 'package.json'),
    actions: [
      {
        find: /\s*\"app:config\".*/g,
        replace: '',
      },
      {
        find: /\s*\"@types\/prompts\"\:.*/g,
        replace: '',
      },
    ],
  });
  fs.rmSync(path.join(process.cwd(), '.install-scripts'), {
    recursive: true,
    force: true,
  });
};

export default removeInstallScripts;
