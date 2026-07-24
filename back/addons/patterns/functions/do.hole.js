// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import canon from '#canon/back/addon.js';

canon.patterns.Fn('do.hole', function(hole, node, captures, miss)
{
    this.same = () =>
    {
        if(!node || node.type !== 'Identifier')
        {
            return false;
        }

        return node.name === (captures.name ? captures.name.name : null);
    };

    this.keyword = () =>
    {
        if(node && node.type === 'ArrowFunctionExpression')
        {
            return miss('line ' + node.loc.start.line + ' carries an arrow, this hole takes the function keyword');
        }

        return !!node
            && node.type === 'FunctionExpression';
    };

    this.callback = () =>
    {
        if(!node || !['FunctionExpression', 'ArrowFunctionExpression'].includes(node.type))
        {
            return false;
        }

        if(node.body.type !== 'BlockStatement')
        {
            return miss('line ' + node.loc.start.line + ' holds an inline callback, the body opens a block over its own lines');
        }

        return true;
    };

    if(hole === 'same')
    {
        return this.same();
    }

    captures[hole] = node;

    if(hole === 'function')
    {
        return this.keyword();
    }

    return hole === 'callback' ? this.callback() : true;
});
