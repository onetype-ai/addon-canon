// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.structure', (structure) =>
{
    structure.Item({
        id: 'register',
        description: 'The name of a _/ registration carries the addon and the file, and the addon field agrees with both.',
        check: function(file, tree, walk, report)
        {
            this.find = () =>
            {
                return tree.body
                    .map((node) => node.type === 'ExpressionStatement' ? node.expression : null)
                    .find((node) =>
                    {
                        return !!node
                            && node.type === 'CallExpression'
                            && node.callee.type === 'MemberExpression'
                            && node.callee.object.name === 'onetype';
                    });
            };

            this.registers = () =>
            {
                return ['EmitRegister', 'MiddlewareRegister', 'SchemasRegister', 'AssetsRegister'];
            };

            this.assert = (call, name, match) =>
            {
                if(!name || name.type !== 'Literal' || typeof name.value !== 'string')
                {
                    return;
                }

                const owner = structure.Fn('get.owner', file, match[1]);

                structure.Fn('assert.name', call, name, report, { owner, base: match[2] });
            };

            const match = file.match(/\/(back|front)\/(?:.*\/)?_\/[^/]+\/([^/]+)\.js$/);

            if(!match)
            {
                return;
            }

            const call = this.find();

            if(call && this.registers().includes(call.callee.property.name))
            {
                this.assert(call, call.arguments[0], match);
            }
        }
    });
});
