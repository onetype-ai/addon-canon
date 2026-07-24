// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import { existsSync } from 'fs';
import { join } from 'path';
import canon from '#canon/back/addon.js';

canon.reach.Fn('get.base', function(root, side)
{
    const base = join(root, side);

    return existsSync(base) ? base : null;
});
