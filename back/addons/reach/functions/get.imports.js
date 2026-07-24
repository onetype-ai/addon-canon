// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import { readFileSync } from 'fs';
import canon from '#canon/back/addon.js';

canon.reach.Fn('get.imports', function(file)
{
    let tree = null;

    try
    {
        tree = canon.ast.Fn('get.tree', readFileSync(file, 'utf8'));
    }
    catch(error)
    {
        error.silent = true;

        return [];
    }

    return tree.body
        .filter((node) => node.type === 'ImportDeclaration')
        .map((node) => node.source.value);
});
