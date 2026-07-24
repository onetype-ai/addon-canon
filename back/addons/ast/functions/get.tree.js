// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import { parse } from 'acorn';
import canon from '#canon/back/addon.js';

canon.ast.Fn('get.tree', function(source)
{
    const comments = [];

    const tree = parse(source, {
        ecmaVersion: 'latest',
        sourceType: 'module',
        locations: true,
        onComment: comments
    });

    tree.comments = comments;

    return tree;
});
