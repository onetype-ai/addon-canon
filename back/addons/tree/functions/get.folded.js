// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import canon from '#canon/back/addon.js';

canon.tree.Fn('get.folded', function(path)
{
    let folded = path;

    while(/^(back|front)\/addons\/[^/]+\//.test(folded))
    {
        folded = folded.replace(/^((?:back|front)\/)addons\/[^/]+\//, '$1');
    }

    return folded;
});
