// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import canon from '#canon/back/addon.js';

canon.patterns.Fn('assert.match', function(pattern, tree)
{
    const shape = canon.ast.Fn('get.tree', pattern).body.filter((node) => node.type !== 'ImportDeclaration');
    const body = tree.body.filter((node) => node.type !== 'ImportDeclaration');
    const captures = {};
    const matched = this.Fn('do.unify', shape, body, captures);

    return { ok: matched, captures };
});
