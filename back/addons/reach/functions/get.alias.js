// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import { readFileSync } from 'fs';
import canon from '#canon/back/addon.js';

canon.reach.Fn('get.alias', function(manifest)
{
    this.aliases = () =>
    {
        const parsed = JSON.parse(readFileSync(manifest, 'utf8'));

        return parsed.imports ? parsed.imports : {};
    };

    this.star = (imports) =>
    {
        const star = Object.keys(imports).find((key) => key.endsWith('/*'));

        if(!star)
        {
            return null;
        }

        return {
            prefix: star.slice(0, -1),
            target: imports[star].slice(0, -1)
        };
    };

    let imports = {};

    try
    {
        imports = this.aliases();
    }
    catch(error)
    {
        error.silent = true;

        return null;
    }

    return this.star(imports);
});
