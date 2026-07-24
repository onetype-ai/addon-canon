// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import canon from '#canon/back/addon.js';

canon.tree.Fn('is.allowed', function(path)
{
    const folded = this.Fn('get.folded', path);

    for(const item of Object.values(this.Items()))
    {
        if(this.Fn('get.pattern', item.Get('path')).test(folded))
        {
            return true;
        }
    }

    return false;
});
