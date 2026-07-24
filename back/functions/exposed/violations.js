// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import canon from '#canon/back/addon.js';

canon.FnExpose('violations', function(file)
{
    return this.Fn('assert.violations', file);
});
