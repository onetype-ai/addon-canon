// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';

onetype.AddonReady('canon.linter', (linter) =>
{
    const resolve = (folder) =>
    {
        if(existsSync(join(folder, 'onetype.json')))
        {
            return JSON.parse(readFileSync(join(folder, 'onetype.json'), 'utf8')).slug;
        }

        if(existsSync(join(folder, 'package.json')))
        {
            return JSON.parse(readFileSync(join(folder, 'package.json'), 'utf8')).name;
        }

        return null;
    };

    const cached = (folder) =>
    {
        if(!owners.has(folder))
        {
            owners.set(folder, resolve(folder));
        }

        return owners.get(folder);
    };

    const owner = (file) =>
    {
        let folder = dirname(file);

        while(folder.length > 1)
        {
            const slug = cached(folder);

            if(slug !== null)
            {
                return slug;
            }

            folder = dirname(folder);
        }

        return '';
    };

    const owners = new Map();

    linter.Item({
        id: 'banner',
        description: 'Every file of an official OneType package opens with the banner, one exact line names the system and its authors.',
        check: (source, lines, report, file) =>
        {
            const banner = '// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai';

            if(!file)
            {
                return;
            }

            const name = String(owner(file));

            if(!name.startsWith('onetype/') && !name.startsWith('@onetype/'))
            {
                return;
            }

            if(lines[0] !== banner)
            {
                report(1, 'The first line carries the banner: ' + banner);
            }
        }
    });
});
