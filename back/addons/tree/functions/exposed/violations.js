// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import canon from '#canon/back/addon.js';

canon.tree.FnExpose('violations', function(root)
{
    return this.Fn('assert.violations', root);
}, 'Walks a package and answers every file living where the tree allows nothing, and every part it misses.');
