// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import canon from '#canon/back/addon.js';

canon.patterns.Fn('do.unify', function(pattern, node, captures)
{
    this.miss = (text) =>
    {
        if(!captures.miss)
        {
            captures.miss = text;
        }

        return false;
    };

    this.length = () =>
    {
        const extra = node.length > pattern.length ? ', split or remove the extra' : '';

        return this.miss('the pattern holds ' + pattern.length + ' statements here, the file holds ' + node.length + extra);
    };

    this.lone = () =>
    {
        const hole = pattern.length === 1 ? this.Fn('get.hole', pattern[0]) : null;

        if(hole)
        {
            captures[hole] = node;
        }

        return !!hole;
    };

    this.list = () =>
    {
        if(this.lone())
        {
            return true;
        }

        if(!Array.isArray(node))
        {
            return false;
        }

        if(pattern.length !== node.length)
        {
            return this.length();
        }

        return pattern.every((part, index) => this.Fn('do.unify', part, node[index], captures));
    };

    this.named = () =>
    {
        return pattern.type === 'Literal'
            && typeof pattern.value === 'string'
            && /^__([a-z]+)__$/.test(pattern.value);
    };

    this.literal = () =>
    {
        captures[pattern.value.slice(2, -2)] = node ? node.value : undefined;

        return !!node
            && node.type === 'Literal';
    };

    this.mismatch = () =>
    {
        if(node && node.loc)
        {
            const carries = node.type ? node.type : 'nothing';

            this.miss('line ' + node.loc.start.line + ' carries ' + carries + ', the pattern expects ' + pattern.type);
        }

        return false;
    };

    this.shape = () =>
    {
        if(this.named())
        {
            return this.literal();
        }

        if(!node || typeof node !== 'object' || pattern.type !== node.type)
        {
            return this.mismatch();
        }

        return Object.keys(pattern)
            .filter((key) => !['start', 'end', 'loc', 'raw'].includes(key))
            .every((key) => this.Fn('do.unify', pattern[key], node[key], captures));
    };

    if(Array.isArray(pattern))
    {
        return this.list();
    }

    if(!pattern || typeof pattern !== 'object')
    {
        return pattern === node;
    }

    const hole = this.Fn('get.hole', pattern);

    return hole ? this.Fn('do.hole', hole, node, captures, this.miss) : this.shape();
});
