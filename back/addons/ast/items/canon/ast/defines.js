// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.ast', (ast) =>
{
    ast.Item({
        id: 'defines',
        description: 'A schema define names a canon type and describes itself, an object names its config and an array names its each.',
        check: (tree, walk, report) =>
        {
            const types = () =>
            {
                return ['number', 'string', 'boolean', 'object', 'json', 'array', 'function', 'binary', 'any'];
            };

            const property = (node, name) =>
            {
                return node.properties.find((entry) =>
                {
                    const key = entry.key && !entry.computed ? entry.key : null;

                    return !!key
                        && (key.name === name
                            || key.value === name);
                });
            };

            const literal = (type) =>
            {
                if(!type || !type.value || type.value.type !== 'Literal')
                {
                    return false;
                }

                return typeof type.value.value === 'string';
            };

            const assert = (define, name) =>
            {
                if(!define || define.type !== 'ObjectExpression' || seen.has(define))
                {
                    return;
                }

                seen.add(define);

                const type = property(define, 'type');
                const line = define.loc.start.line;

                if(!literal(type))
                {
                    return report(line, 'The define ' + name + ' has no type, every field names its shape.');
                }

                const declared = type.value.value;

                known(define, type, name);
                shape(define, declared, name, line);
            };

            const known = (define, type, name) =>
            {
                for(const entry of type.value.value.split('|'))
                {
                    if(!types().includes(entry.trim().toLowerCase()))
                    {
                        report(type.loc.start.line, 'The define ' + name + ' reads type ' + entry.trim() + ', the canon knows ' + types().join(', ') + '.');
                    }
                }

                if(!property(define, 'description'))
                {
                    report(define.loc.start.line, 'The define ' + name + ' has no description, every field speaks.');
                }
            };

            const shape = (define, declared, name, line) =>
            {
                const config = property(define, 'config');
                const each = property(define, 'each');

                if(declared === 'object' && !config)
                {
                    report(line, 'The define ' + name + ' is an object with no config, name its shape or make it json.');
                }

                if(declared === 'array' && !each)
                {
                    report(line, 'The define ' + name + ' is an array with no each, name what it holds.');
                }

                config && config.value.type === 'ObjectExpression' && block(config.value);
                each && assert(each.value, name + '.each');
            };

            const shorthand = (define, name) =>
            {
                if(define && define.type === 'ArrayExpression')
                {
                    report(define.loc.start.line, 'The define ' + name + ' rides the array shorthand, shorthands are gone, a define is an object with a type.');

                    return true;
                }

                return false;
            };

            const block = (node) =>
            {
                for(const entry of node.properties)
                {
                    if(!entry.key)
                    {
                        continue;
                    }

                    const name = entry.key.name
                        || entry.key.value
                        || 'computed';

                    shorthand(entry.value, name) || assert(entry.value, name);
                }
            };

            const calls = (node) =>
            {
                return node.type === 'CallExpression'
                    && node.callee.type === 'MemberExpression'
                    && node.callee.property.name === 'Field'
                    && !!node.arguments[0]
                    && !!node.arguments[1]
                    && typeof node.arguments[0].value === 'string';
            };

            const holds = (node) =>
            {
                return node.type === 'Property'
                    && !node.computed
                    && !!node.key
                    && ['in', 'out', 'config', 'attributes'].includes(node.key.name)
                    && node.value.type === 'ObjectExpression'
                    && !seen.has(node.value);
            };

            const seen = new Set();

            walk((node) =>
            {
                if(calls(node))
                {
                    const define = node.arguments[1];
                    const name = node.arguments[0].value;

                    !shorthand(define, name) && define.type === 'ObjectExpression' && assert(define, name);
                }

                holds(node) && block(node.value);
            });
        }
    });
});
