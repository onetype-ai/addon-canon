// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('tests.back', (tests) =>
{
    tests.Item({
        id: 'back/lists',
        addon: 'canon',
        description: 'Every rule is an item carrying an id and a sentence, so the law is a registry to list and not a config to trust.',
        callback: function({ assert })
        {
            this.layers = ['linter', 'ast', 'structure', 'patterns', 'placements', 'tree', 'reach'];

            this.entries = (layer) =>
            {
                return Object.values(onetype.AddonGet('canon.' + layer).Items());
            };

            this.answering = (rule) =>
            {
                if(typeof rule.Get('check') === 'function')
                {
                    return true;
                }

                return !!rule.Get('path');
            };

            this.holding = (rule) =>
            {
                if(rule.Get('pattern'))
                {
                    return true;
                }

                return !!rule.Get('json');
            };

            this.spoken = () =>
            {
                this.layers.forEach((layer) =>
                {
                    const rules = this.entries(layer);

                    assert.truthy(rules.length > 0, 'the ' + layer + ' layer holds rules');

                    rules.forEach((rule) =>
                    {
                        assert.truthy(rule.Get('id'), 'a ' + layer + ' rule carries an id');
                        assert.truthy(rule.Get('description'), 'the ' + layer + ' rule ' + rule.Get('id') + ' says what it keeps');
                    });
                });
            };

            this.checking = () =>
            {
                ['linter', 'ast', 'structure', 'tree', 'reach'].forEach((layer) =>
                {
                    this.entries(layer).forEach((rule) =>
                    {
                        const carries = this.answering(rule);

                        assert.truthy(carries, 'the ' + layer + ' rule ' + rule.Get('id') + ' carries a check or a path');
                    });
                });
            };

            this.named = () =>
            {
                const seen = new Set();

                this.layers.forEach((layer) =>
                {
                    this.entries(layer).forEach((rule) =>
                    {
                        const key = layer + ':' + rule.Get('id');

                        assert.falsy(seen.has(key), 'the rule ' + key + ' is registered once');
                        seen.add(key);
                    });
                });

                assert.truthy(seen.size > 80, 'the whole law counts ' + seen.size + ' rules');
            };

            this.shaped = () =>
            {
                const patterns = this.entries('patterns');

                patterns.forEach((rule) =>
                {
                    const holds = this.holding(rule);

                    assert.truthy(holds, 'the pattern ' + rule.Get('id') + ' holds a shape to hold a file to');
                });
            };

            this.spoken();
            this.checking();
            this.named();
            this.shaped();
        }
    });
});
