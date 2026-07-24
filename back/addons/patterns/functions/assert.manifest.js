// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import { readFileSync } from 'fs';
import canon from '#canon/back/addon.js';

canon.patterns.Fn('assert.manifest', function(file, define, report)
{
    this.read = () =>
    {
        try
        {
            return JSON.parse(readFileSync(file, 'utf8'));
        }
        catch(error)
        {
            report(1, 'The manifest does not parse: ' + error.message);

            return null;
        }
    };

    this.kind = (value) =>
    {
        if(Array.isArray(value))
        {
            return 'array';
        }

        return typeof value;
    };

    this.known = (data) =>
    {
        for(const name of Object.keys(data))
        {
            this.field(name, data[name]);
        }
    };

    this.field = (name, value) =>
    {
        if(!define[name])
        {
            return report(1, 'Field ' + name + ' is not in the canon, it goes.');
        }

        const shape = this.kind(value);

        if(define[name].type && !define[name].type.split('|').includes(shape))
        {
            report(1, 'Field ' + name + ' holds ' + shape + ' but the canon defines ' + define[name].type + '.');
        }
    };

    this.required = (data) =>
    {
        for(const name of Object.keys(define))
        {
            if(define[name].required && !(name in data))
            {
                report(1, 'Field ' + name + ' is required, it is missing.');
            }
        }
    };

    const data = this.read();

    if(!data)
    {
        return;
    }

    this.known(data);
    this.required(data);
});
