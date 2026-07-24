// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import { readdirSync, existsSync, realpathSync } from 'fs';
import { join } from 'path';
import canon from '#canon/back/addon.js';

canon.Fn('find.subaddons', function(item)
{
    this.real = (path) =>
    {
        return path && existsSync(path) ? realpathSync(path) : null;
    };

    this.signature = (back, front) =>
    {
        return this.real(back) + '|' + this.real(front);
    };

    this.sides = (entry) =>
    {
        return {
            back: entry.Get('path').back,
            front: entry.Get('path').front
        };
    };

    this.names = (sides) =>
    {
        const names = new Set();

        for(const root of Object.values(sides))
        {
            const folder = root ? join(root, 'addons') : null;

            if(folder && existsSync(folder))
            {
                readdirSync(folder).forEach((name) => names.add(name));
            }
        }

        return names;
    };

    this.nest = (entry, sides, name) =>
    {
        const back = sides.back ? join(sides.back, 'addons', name) : null;
        const front = sides.front ? join(sides.front, 'addons', name) : null;
        const mark = this.signature(back, front);

        if(seen.has(mark))
        {
            return;
        }

        seen.add(mark);

        this.walk(this.Item({
            id: entry.Get('id') + '.' + name,
            addon: entry.Get('addon') + '.' + name,
            path: {
                back: back,
                front: front
            }
        }));
    };

    this.walk = (entry) =>
    {
        const sides = this.sides(entry);

        for(const name of this.names(sides))
        {
            if(!this.Item(entry.Get('id') + '.' + name))
            {
                this.nest(entry, sides, name);
            }
        }
    };

    const seen = new Set();

    this.walk(item);
});
