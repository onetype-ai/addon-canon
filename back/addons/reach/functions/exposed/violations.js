// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import canon from '#canon/back/addon.js';

canon.reach.FnExpose('violations', function(root)
{
    return this.Fn('assert.violations', root);
});
