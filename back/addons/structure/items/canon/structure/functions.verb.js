// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('canon.structure', (structure) =>
{
    structure.Item({
        id: 'functions.verb',
        description: 'A function name opens with a canon verb and continues with what it touches, a group continues after the dot, an exposed name is free.',
        check: function(file, tree, walk, report)
        {
            this.verbs = () =>
            {
                return ['get', 'set', 'is', 'has', 'do', 'make', 'run', 'send', 'map', 'find', 'load', 'sync', 'assert'];
            };

            this.groups = () =>
            {
                return ['item'];
            };

            this.name = () =>
            {
                const base = file.split('/').pop().replace(/\.js$/, '');

                return file.includes('/item/functions/') ? 'item.' + base : base;
            };

            this.family = (name, head) =>
            {
                if(name.split('.').length < 2)
                {
                    report(1, 'Group ' + head + ' holds a family, the name continues after the dot, like item.run.');
                }
            };

            this.spelled = (name) =>
            {
                const head = name.split('.')[0];

                if(this.groups().includes(head))
                {
                    return this.family(name, head);
                }

                if(!this.verbs().includes(head))
                {
                    return report(1, 'Function ' + name + ' opens with ' + head + ', the canon verbs are ' + this.verbs().join(', ') + '.');
                }

                if(name.split('.').length < 2)
                {
                    report(1, 'Function ' + name + ' says only the verb, the name continues with what it touches, like ' + head + '.http.');
                }
            };

            if(!file.includes('/functions/') || file.includes('/functions/exposed/'))
            {
                return;
            }

            this.spelled(this.name());
        }
    });
});
