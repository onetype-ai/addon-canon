// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import canon from '#canon/back/addon.js';

canon.patterns.Fn('get.name', function(property)
{
    return property.key.name ? property.key.name : property.key.value;
});
